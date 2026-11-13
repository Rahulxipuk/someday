// Uploads the trustee program to FastFS. Usage: node upload-wasm.mjs <file> <sender>

import { readFileSync } from 'node:fs';
import { fastfsUrl, upload } from './fastfs.mjs';
import { OUTLAYER, sha256hex } from './lib.mjs';

const [file, sender] = process.argv.slice(2);
const content = readFileSync(file);
const hash = sha256hex(content);
const path = `${hash}.wasm`;

console.log('tx', await upload({ sender, receiver: OUTLAYER, path, mime: 'application/wasm', content }));
console.log(JSON.stringify({ sha256: hash, bytes: content.length, url: fastfsUrl(sender, OUTLAYER, path) }));
