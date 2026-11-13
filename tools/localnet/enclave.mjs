// Runs the real trustee component on this machine, the way an OutLayer worker runs it in a TEE.

import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CHILD = join(HERE, 'trustee-child.mjs');

export function runTrustee(generated, input, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CHILD, generated], {
      env: { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', reject);
    child.on('close', () => {
      if (!out) return reject(new Error(`trustee printed nothing: ${err.slice(0, 400)}`));
      resolve(JSON.parse(out));
    });
    child.stdin.end(typeof input === 'string' ? input : JSON.stringify(input));
  });
}
