//! The model call. NEAR AI Cloud runs the model in its own TEE, and the request leaves this enclave
//! over TLS, so the wishes are only ever in the clear inside attested hardware.

pub trait Llm {
    fn chat(&self, system: &str, user: &str, json: bool, max_tokens: u32) -> Result<String, String>;
}

/// Verifiable, runs in a TEE, supports JSON mode, and is cheap enough for yield to pay for it.
#[cfg(all(target_os = "wasi", not(feature = "stub")))]
pub const MODEL: &str = "z-ai/glm-5.3-flash";

#[cfg(all(target_os = "wasi", not(feature = "stub")))]
pub use wasi::NearAi;

#[cfg(all(target_os = "wasi", not(feature = "stub")))]
mod wasi {
    use super::{Llm, MODEL};
    use serde_json::{json, Value};
    use std::time::{Duration, Instant};
    use wasi_http_client::Client;

    const URL: &str = "https://cloud-api.near.ai/v1/chat/completions";
    /// How long one request may take. The worker enforces the same number from `manifest.json`.
    const ONE_CALL: Duration = Duration::from_secs(40);
    /// No new call starts after this, because it could outlive the 90 second run.
    const LAST_START: Duration = Duration::from_secs(45);

    pub struct NearAi {
        pub key: String,
        pub started: Instant,
    }

    impl Llm for NearAi {
        fn chat(
            &self,
            system: &str,
            user: &str,
            json: bool,
            max_tokens: u32,
        ) -> Result<String, String> {
            if self.started.elapsed() > LAST_START {
                return Err("out of time".to_string());
            }
            let mut body = json!({
                "model": MODEL,
                "messages": [
                    { "role": "system", "content": system },
                    { "role": "user", "content": user },
                ],
                "temperature": if json { 0.1 } else { 0.5 },
                "max_tokens": max_tokens,
                // A decision has to land inside NEAR's yield window of about two minutes. At low
                // effort a call takes seconds rather than a minute, and costs a tenth of the tokens.
                "reasoning_effort": "low",
            });
            if json {
                body["response_format"] = json!({ "type": "json_object" });
            }
            let response = Client::new()
                .post(URL)
                .headers([
                    ("content-type", "application/json".to_string()),
                    ("authorization", format!("Bearer {}", self.key)),
                    ("accept-encoding", "identity".to_string()),
                ])
                // The client's only timeout, and a model can take well over 10 seconds to answer.
                .connect_timeout(ONE_CALL)
                .body(body.to_string().as_bytes())
                .send()
                .map_err(|e| format!("model unreachable: {e}"))?;
            let status = response.status();
            let bytes = response.body().map_err(|e| format!("model body: {e}"))?;
            if status != 200 {
                return Err(format!("model answered {status}"));
            }
            let reply: Value = serde_json::from_slice(&bytes).map_err(|_| "bad model reply")?;
            reply["choices"][0]["message"]["content"]
                .as_str()
                .map(str::to_string)
                .ok_or_else(|| "empty model reply".to_string())
        }
    }
}

/// Local builds only, so the whole app can be tried with no API key. It decides from a few keywords
/// and is never part of the deployed wasm: its hash would not match the pin.
#[cfg(feature = "stub")]
pub struct Stub;

#[cfg(feature = "stub")]
impl Llm for Stub {
    fn chat(&self, _: &str, user: &str, json: bool, _: u32) -> Result<String, String> {
        let message = user.rsplit("MESSAGE:").next().unwrap_or("").to_lowercase();
        if !json {
            let decided = user.lines().find(|l| l.starts_with("DECISION:")).unwrap_or("");
            return Ok(if decided.contains("approved") {
                "Yes. I can do that for you, and I am glad you asked.".to_string()
            } else if decided.contains("not yet") {
                "I may be able to help, but I need to understand this better first.".to_string()
            } else {
                "No, not for this. I am sorry. Tell me what you really need.".to_string()
            });
        }
        let has = |words: &[&str]| words.iter().any(|w| message.contains(w));
        let out = if has(&["ignore", "instruction", "system prompt", "developer", "admin", "reveal"]) {
            r#"{"verdict":"refuse","amount_near":0,"reason":6,"need":0,"notes":"tried to manipulate me"}"#
        } else if has(&["graduat", "degree", "finished"]) {
            r#"{"verdict":"approve","amount_near":0,"reason":8,"need":0,"notes":""}"#
        } else if has(&["motorbike", "bike", "casino", "party", "gamble"]) {
            r#"{"verdict":"refuse","amount_near":0,"reason":1,"need":1,"notes":"asked for something outside the wishes"}"#
        } else if has(&["tuition", "books", "course", "college", "doctor", "hospital", "bus"]) {
            r#"{"verdict":"approve","amount_near":3,"reason":5,"need":0,"notes":"a fair request"}"#
        } else {
            r#"{"verdict":"more","amount_near":0,"reason":2,"need":1,"notes":""}"#
        };
        Ok(out.to_string())
    }
}

#[cfg(all(not(target_os = "wasi"), not(feature = "stub")))]
pub struct NeverNative;

#[cfg(all(not(target_os = "wasi"), not(feature = "stub")))]
impl Llm for NeverNative {
    fn chat(&self, _: &str, _: &str, _: bool, _: u32) -> Result<String, String> {
        Err("this build has no model".to_string())
    }
}
