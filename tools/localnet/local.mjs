// npm run local: the local chain and the web dev server, together in one process. There are no
// child servers, so however this stops, nothing is left holding a port.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const WEB = join(ROOT, 'web');
const VITE = join(WEB, 'node_modules', 'vite', 'dist', 'node', 'index.js');

function install(cwd, what) {
  console.log(`Installing the ${what} dependencies...`);
  const { status } = spawnSync('npm', ['install'], { cwd, stdio: 'inherit', shell: true });
  if (status !== 0) process.exit(status ?? 1);
}

if (!existsSync(join(ROOT, 'node_modules', '@noble', 'ciphers'))) install(ROOT, 'root');
if (!existsSync(VITE)) install(WEB, 'web');

// Both imports need what was just installed, so they cannot be at the top of the file.
await import('./server.mjs');

const { createServer } = await import(pathToFileURL(VITE).href);
const vite = await createServer({ root: WEB });
await vite.listen();
vite.printUrls();
