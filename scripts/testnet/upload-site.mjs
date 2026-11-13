// Publishes the built website to FastFS, one transaction per file.
//
//   npm --prefix web run build -- --mode testnet
//   node scripts/testnet/upload-site.mjs
//
// A file already served with the same bytes is skipped. The page goes last, so the live site never
// points at an asset that has not arrived yet.

import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { fastfsUrl, upload } from './fastfs.mjs';
import { sha256hex } from './lib.mjs';

const DIST = 'web/dist';
const SENDER = 'someday-code.testnet';
const RECEIVER = 'someday-trust.testnet';
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

const files = readdirSync(DIST, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => relative(DIST, join(entry.parentPath, entry.name)).split(sep).join('/'))
  .sort((a, b) => Number(a === 'index.html') - Number(b === 'index.html'));

async function served(path) {
  const response = await fetch(fastfsUrl(SENDER, RECEIVER, path)).catch(() => null);
  return response?.ok ? sha256hex(Buffer.from(await response.arrayBuffer())) : null;
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Stops the whole run if a file never arrives, so the page is not pointed at a missing asset. */
async function deliver(path, mime, content, hash) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    let tx;
    try {
      tx = await upload({ sender: SENDER, receiver: RECEIVER, path, mime, content });
    } catch (error) {
      console.log(`${path}: try ${attempt} was not sent: ${String(error.message).slice(0, 90)}`);
      await pause(45_000);
      continue;
    }
    // The host briefly remembers a 404, so asking too early delays the file.
    await pause(20_000);
    for (let i = 0; i < 12; i += 1) {
      if ((await served(path)) === hash) return tx;
      await pause(15_000);
    }
  }
  throw new Error(`${path} did not arrive, so the page was left as it was`);
}

for (const path of files) {
  const content = readFileSync(join(DIST, path));
  const hash = sha256hex(content);
  if ((await served(path)) === hash) {
    console.log(`${path}: already there`);
    continue;
  }
  const mime = MIME[extname(path)];
  if (!mime) throw new Error(`No media type for ${path}`);
  console.log(`${path}: ${content.length} bytes, served, tx ${await deliver(path, mime, content, hash)}`);
}

console.log(`\n${fastfsUrl(SENDER, RECEIVER, 'index.html')}`);
