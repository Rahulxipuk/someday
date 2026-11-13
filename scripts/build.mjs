// Builds everything locally.
//   node scripts/build.mjs             contracts and the local (stub) trustee
//   node scripts/build.mjs contracts   only the contracts
//   node scripts/build.mjs enclave     only the trustee, real and stub
//
// On Windows the repository path can pass the 260 character limit once Cargo adds its own folders,
// so the trustee builds into a short folder in the home directory.

import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const what = process.argv[2] ?? 'all';
const shortDir = join(homedir(), '.someday');
const run = (cmd, args, options = {}) =>
  execFileSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...options });

if (what === 'all' || what === 'contracts') {
  for (const name of ['trust', 'collection']) {
    run('cargo', ['near', 'build', 'non-reproducible-wasm', '--no-abi'], {
      cwd: join('contracts', name),
    });
  }
}

if (what === 'all' || what === 'enclave') {
  mkdirSync('.local', { recursive: true });
  const env = { ...process.env, CARGO_TARGET_DIR: join(shortDir, 't') };
  const built = join(shortDir, 't', 'wasm32-wasip2', 'release', 'someday-trustee.wasm');
  const cwd = join('enclave', 'trustee');
  for (const [flavour, features] of [['real', []], ['stub', ['--features', 'stub']]]) {
    run('cargo', ['build', '--release', '--target', 'wasm32-wasip2', ...features], { cwd, env });
    const wasm = join('.local', `trustee-${flavour}.wasm`);
    copyFileSync(built, wasm);
    run('npx', ['jco', 'transpile', wasm, '-o', join('.local', `trustee-${flavour}`), '--no-typescript', '--name', 'trustee']);
  }
}
