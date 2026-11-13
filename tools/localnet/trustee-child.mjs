// Runs the transpiled trustee component once: stdin in, stdout out, secrets in the environment.
// Spawned by enclave.mjs, because WASI stdin and stdout belong to the whole process.

import { pathToFileURL } from 'node:url';

const { run } = await import(pathToFileURL(process.argv[2]).href);
run.run();
