//! The NFT's picture, drawn on chain from live state: a sealed envelope that records what the
//! trustee has done. Wax stays red while the trust is held in trust and turns gold at maturity.

use crate::Entry;

fn near(yocto: u128) -> String {
    let whole = yocto / 1_000_000_000_000_000_000_000_000;
    let tenths = (yocto % 1_000_000_000_000_000_000_000_000) / 100_000_000_000_000_000_000_000;
    format!("{whole}.{tenths}")
}

fn escape(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            '&' => out.push_str("&amp;"),
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '"' => out.push_str("&quot;"),
            '\'' => out.push_str("&#39;"),
            c if c.is_control() => {}
            c => out.push(c),
        }
    }
    out
}

pub fn describe(entry: &Entry) -> String {
    let c = &entry.card;
    format!(
        "A trust fund with a brain. It has approved {} requests, refused {} and given {} NEAR. {} of {} sealed letters are open.",
        c.approved, c.refused, near(c.given.0), c.letters_opened, c.letters_total
    )
}

pub fn draw(token_id: &str, entry: &Entry) -> String {
    let c = &entry.card;
    let wax = if c.matured { "#b08a2e" } else { "#8c1f1f" };
    let state = if c.matured { "Fulfilled" } else { "Held in trust" };
    let name = token_id.split('.').next().unwrap_or(token_id);
    format!(
        concat!(
            r##"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640" font-family="Georgia,serif">"##,
            r##"<rect width="480" height="640" fill="#f3ead9"/>"##,
            r##"<rect x="20" y="20" width="440" height="600" fill="none" stroke="#2a2420" stroke-opacity=".3"/>"##,
            r##"<text x="240" y="84" text-anchor="middle" font-size="34" font-style="italic" fill="#2a2420">Someday</text>"##,
            r##"<text x="240" y="114" text-anchor="middle" font-size="14" letter-spacing="3" fill="#6a5c4f">{state}</text>"##,
            r##"<rect x="70" y="170" width="340" height="220" fill="#fbf6ea" stroke="#2a2420" stroke-opacity=".5"/>"##,
            r##"<path d="M70 170 L240 300 L410 170" fill="none" stroke="#2a2420" stroke-opacity=".5"/>"##,
            r##"<circle cx="240" cy="300" r="34" fill="{wax}"/>"##,
            r##"<circle cx="240" cy="300" r="25" fill="none" stroke="#ffffff" stroke-opacity=".35"/>"##,
            r##"<text x="240" y="311" text-anchor="middle" font-size="30" font-style="italic" fill="#ffffff" fill-opacity=".85">S</text>"##,
            r##"<text x="240" y="442" text-anchor="middle" font-size="24" fill="#2a2420">{title}</text>"##,
            r##"<text x="240" y="470" text-anchor="middle" font-size="14" fill="#6a5c4f">{name}</text>"##,
            r##"<text x="240" y="530" text-anchor="middle" font-size="16" fill="#2a2420">{approved} approved, {refused} refused</text>"##,
            r##"<text x="240" y="556" text-anchor="middle" font-size="16" fill="#2a2420">{given} NEAR given</text>"##,
            r##"<text x="240" y="582" text-anchor="middle" font-size="16" fill="#2a2420">{opened} of {letters} letters open</text>"##,
            r##"</svg>"##
        ),
        state = state,
        wax = wax,
        title = escape(&entry.title),
        name = escape(name),
        approved = c.approved,
        refused = c.refused,
        given = near(c.given.0),
        opened = c.letters_opened,
        letters = c.letters_total,
    )
}
