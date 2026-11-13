//! Sealed boxes. Anyone can seal to a public key, and only the holder of the matching secret can
//! open one. The same format is implemented in `web/src/lib/sealbox.ts`.
//!
//! ```text
//! box   = 0x01 | ephemeral public key (32) | nonce (12) | ciphertext and tag
//! key   = HKDF-SHA256(ikm = X25519(ephemeral, recipient), salt = "someday/v1", info = context)
//! aead  = ChaCha20-Poly1305 with aad = context
//! ```
//!
//! The context names what the box is for, such as `wishes:maya.someday.testnet`. A box copied to
//! another trust, or used for another purpose, fails to open.

use chacha20poly1305::aead::{Aead, KeyInit, Payload};
use chacha20poly1305::ChaCha20Poly1305;
use hkdf::Hkdf;
use sha2::Sha256;
use x25519_dalek::{PublicKey, StaticSecret};

const VERSION: u8 = 1;
const SALT: &[u8] = b"someday/v1";
const SEALING_INFO: &[u8] = b"someday/sealing-key/v1";
const HEADER: usize = 1 + 32 + 12;

/// The enclave's sealing secret. Derived from the master secret that was generated inside the TEE
/// and has never existed anywhere else.
pub fn sealing_secret(master: &[u8; 32]) -> StaticSecret {
    let mut out = [0u8; 32];
    Hkdf::<Sha256>::new(Some(SALT), master)
        .expand(SEALING_INFO, &mut out)
        .expect("32 bytes is a valid HKDF length");
    StaticSecret::from(out)
}

pub fn public_of(secret: &StaticSecret) -> [u8; 32] {
    PublicKey::from(secret).to_bytes()
}

fn cipher(shared: &[u8], context: &str) -> ChaCha20Poly1305 {
    let mut key = [0u8; 32];
    Hkdf::<Sha256>::new(Some(SALT), shared)
        .expand(context.as_bytes(), &mut key)
        .expect("32 bytes is a valid HKDF length");
    ChaCha20Poly1305::new((&key).into())
}

pub fn seal(
    recipient: &[u8; 32],
    context: &str,
    plain: &[u8],
    ephemeral: [u8; 32],
    nonce: [u8; 12],
) -> Result<Vec<u8>, String> {
    let secret = StaticSecret::from(ephemeral);
    let shared = secret.diffie_hellman(&PublicKey::from(*recipient));
    if !shared.was_contributory() {
        return Err("invalid recipient key".into());
    }
    let body = cipher(shared.as_bytes(), context)
        .encrypt((&nonce).into(), Payload { msg: plain, aad: context.as_bytes() })
        .map_err(|_| "seal failed".to_string())?;
    let mut out = Vec::with_capacity(HEADER + body.len());
    out.push(VERSION);
    out.extend_from_slice(PublicKey::from(&secret).as_bytes());
    out.extend_from_slice(&nonce);
    out.extend_from_slice(&body);
    Ok(out)
}

pub fn open(secret: &StaticSecret, context: &str, sealed: &[u8]) -> Result<Vec<u8>, String> {
    if sealed.len() < HEADER + 16 || sealed[0] != VERSION {
        return Err("not a sealed box".into());
    }
    let mut ephemeral = [0u8; 32];
    ephemeral.copy_from_slice(&sealed[1..33]);
    let mut nonce = [0u8; 12];
    nonce.copy_from_slice(&sealed[33..45]);
    let shared = secret.diffie_hellman(&PublicKey::from(ephemeral));
    if !shared.was_contributory() {
        return Err("invalid sender key".into());
    }
    cipher(shared.as_bytes(), context)
        .decrypt((&nonce).into(), Payload { msg: &sealed[HEADER..], aad: context.as_bytes() })
        .map_err(|_| format!("cannot open box for {context}"))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn pair(seed: u8) -> (StaticSecret, [u8; 32]) {
        let secret = sealing_secret(&[seed; 32]);
        let public = public_of(&secret);
        (secret, public)
    }

    #[test]
    fn round_trip() {
        let (secret, public) = pair(7);
        let sealed = seal(&public, "wishes:a", b"for her learning", [9; 32], [3; 12]).unwrap();
        assert_eq!(open(&secret, "wishes:a", &sealed).unwrap(), b"for her learning");
    }

    #[test]
    fn a_box_cannot_be_moved_to_another_trust_or_purpose() {
        let (secret, public) = pair(7);
        let sealed = seal(&public, "wishes:a", b"x", [9; 32], [3; 12]).unwrap();
        assert!(open(&secret, "wishes:b", &sealed).is_err());
        assert!(open(&secret, "letter:a:0", &sealed).is_err());
    }

    #[test]
    fn a_tampered_box_does_not_open() {
        let (secret, public) = pair(7);
        let mut sealed = seal(&public, "c", b"x", [9; 32], [3; 12]).unwrap();
        let last = sealed.len() - 1;
        sealed[last] ^= 1;
        assert!(open(&secret, "c", &sealed).is_err());
    }

    #[test]
    fn the_wrong_key_does_not_open() {
        let (_, public) = pair(7);
        let (other, _) = pair(8);
        let sealed = seal(&public, "c", b"x", [9; 32], [3; 12]).unwrap();
        assert!(open(&other, "c", &sealed).is_err());
    }

    #[test]
    fn a_low_order_key_is_refused() {
        assert!(seal(&[0; 32], "c", b"x", [9; 32], [3; 12]).is_err());
    }
}
