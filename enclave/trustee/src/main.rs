//! The Someday trustee, run by an OutLayer worker inside Intel TDX.
//!
//! Input arrives on stdin from the trust contract. The answer leaves on stdout and goes back to that
//! contract through NEAR's yield and resume. Printing anything that does not match the contract's
//! expected shape counts as no answer, so every failure here is safe by default.

mod decide;
mod llm;
mod sealbox;

use std::io::Read;

use decide::Input;
use serde_json::json;

const MASTER_VAR: &str = "PROTECTED_SOMEDAY_MASTER";

/// The one host this code may reach, and how long a request to it may take. OutLayer reads this out
/// of the wasm itself, so the hash pinned on chain covers it.
#[cfg(target_os = "wasi")]
#[used]
#[link_section = "outlayer.manifest"]
static OUTLAYER_MANIFEST: [u8; include_bytes!("../manifest.json").len()] =
    *include_bytes!("../manifest.json");

fn master() -> Result<[u8; 32], String> {
    let text = std::env::var(MASTER_VAR).map_err(|_| "no master secret".to_string())?;
    let bytes = hex::decode(text.trim()).map_err(|_| "bad master secret".to_string())?;
    bytes.try_into().map_err(|_| "bad master secret length".to_string())
}

#[cfg(target_os = "wasi")]
fn random(out: &mut [u8]) {
    getrandom::fill(out).expect("the runtime provides randomness");
}

/// The trustee only ever runs as wasm. Native builds exist for its unit tests.
#[cfg(not(target_os = "wasi"))]
fn random(_: &mut [u8]) {
    panic!("no randomness outside the enclave");
}

/// A trust may only act for itself, however its input was built. The real check is the keystore's
/// `Predecessor` rule on the secret: this is the same rule again, inside the code that uses it.
fn assert_caller(input: &Input) -> Result<(), String> {
    if cfg!(feature = "stub") {
        return Ok(());
    }
    let caller = std::env::var("NEAR_PREDECESSOR_ID").unwrap_or_default();
    if caller == input.trust {
        Ok(())
    } else {
        Err("a trust may only act for itself".to_string())
    }
}

#[cfg(feature = "stub")]
fn model() -> Result<llm::Stub, String> {
    Ok(llm::Stub)
}

#[cfg(all(not(feature = "stub"), target_os = "wasi"))]
fn model() -> Result<llm::NearAi, String> {
    let key = std::env::var("NEAR_AI_API_KEY").map_err(|_| "no model key".to_string())?;
    Ok(llm::NearAi { key, started: std::time::Instant::now() })
}

#[cfg(all(not(feature = "stub"), not(target_os = "wasi")))]
fn model() -> Result<llm::NeverNative, String> {
    Err("this build has no model".to_string())
}

fn run(text: &str) -> Result<String, String> {
    let input: Input = serde_json::from_str(text).map_err(|e| format!("bad input: {e}"))?;
    let master = master()?;
    match input.action.as_str() {
        "pubkey" => Ok(json!({ "public_key": decide::public_key(&master) }).to_string()),
        "decide" => {
            assert_caller(&input)?;
            let output = decide::decide(&input, &master, &model()?, &mut random)?;
            serde_json::to_string(&output).map_err(|e| e.to_string())
        }
        other => Err(format!("unknown action {other}")),
    }
}

fn main() {
    let mut text = String::new();
    let answer = match std::io::stdin().read_to_string(&mut text) {
        Ok(_) => run(&text),
        Err(e) => Err(e.to_string()),
    };
    match answer {
        Ok(json) => print!("{json}"),
        Err(error) => print!("{}", json!({ "error": error })),
    }
}
