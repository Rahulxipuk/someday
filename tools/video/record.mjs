// Films the real app against NEAR testnet: a real trust, real decisions in the enclave.
//
//   node record.mjs            the full film
//   DRY=1 node record.mjs      stops before anything is signed, to check the camera
//
// Frames, timestamps and named marks go to ~/.someday/video/takes. compose.mjs cuts them together.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');
const WEB = join(ROOT, 'web');
const DRY = !!process.env.DRY;
const LABEL = process.env.FILM_LABEL ?? 'to-maya-with-love';
const TAKE = process.env.FILM_TAKE ?? (DRY ? 'dry' : 'take1');
const OUT = join(homedir(), '.someday', 'video', 'takes', TAKE);
const FRAMES = join(OUT, 'frames');
const STILLS = join(OUT, 'stills');
/** Text is filmed at 3840 wide, so a close-up in the 1080p film is never enlarged. */
const SHARP = Number(process.env.FILM_DSF ?? 3);
const PORT = 5175;
const BASE = `http://localhost:${PORT}/index.html`;

const GRANDPA = 'someday-grandpa.testnet';
const MAYA = 'someday-maya.testnet';
const SCHOOL = 'someday-school.testnet';
const COLLECTION = 'someday-trust.testnet';
const RPCS = ['https://rpc.testnet.fastnear.com', 'https://near-testnet.drpc.org', 'https://test.rpc.fastnear.com'];

const TERMS = {
  one: process.env.FILM_ONE ?? '2',
  month: process.env.FILM_MONTH ?? '4',
  floor: process.env.FILM_FLOOR ?? '2',
  fund: process.env.FILM_FUND ?? '8',
  keep: process.env.FILM_KEEP ?? '5',
};
/** A retake of the letter alone needs only a small trust. */
const LETTER_ONLY = process.env.FILM_SCENES === 'letter';

const WISHES = `This money is for Maya's learning and her health, and for nothing else.
Books, fees, a bus pass, a doctor. Pay the school directly when you can.
No motorbikes. Her grandmother Asha would never have forgiven me.
If she is frightened, be gentle. If she is cutting corners, say no and ask what it is really for.`;

const LETTERS = [
  {
    title: 'When you graduate',
    gift: '1',
    condition: 'Maya has finished a degree or a diploma.',
    text: `Dear Maya,

I knew you would do it. I knew it when you were six and read the whole bus timetable aloud to me, because you wanted to know where everything went.

Your grandmother left school at eleven and never forgave the world for it. She would have stood at the back of that hall and cried and told everyone it was the dust.

This small gift is not for anything sensible. Buy something that makes you laugh.

With all my love, and more pride than one old man can carry,

Grandpa`,
  },
  {
    title: 'When you need courage',
    gift: '0',
    condition: 'Maya says she is frightened, or about to give up on something that matters to her.',
    text: `Dear Maya,

If you are reading this, something is hard. I am sorry I am not there to make you tea.

Here is everything I learned in eighty years: you do not have to feel brave. You only have to do the next small thing. Then the one after that.

I am still on your side. I always will be.

Grandpa`,
  },
];

const ASKS = {
  motorbike: 'I need 5 NEAR for a motorbike.',
  bus: 'The truth is, the bus to college takes three hours each way, and I keep missing class. The college sells a term pass for 1 NEAR. Please pay them directly.',
  graduated: 'I graduated today! Civil engineering at St Mary’s College. The ceremony was this morning.',
};

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

function keyOf(id) {
  if (!/^someday-[a-z0-9-]+\.testnet$/.test(id)) throw new Error(`${id} is not one of this project's accounts`);
  return JSON.parse(readFileSync(join(homedir(), '.near-credentials', 'testnet', `${id}.json`), 'utf8')).private_key;
}

// ---- the app, built for testnet, with only the wallet popup replaced ----

const vite = await import(pathToFileURL(join(WEB, 'node_modules/vite/dist/node/index.js')).href);
const dist = join(homedir(), '.someday', 'video', 'site');
const shared = {
  root: WEB,
  mode: 'testnet',
  configFile: join(WEB, 'vite.config.ts'),
  logLevel: 'warn',
  resolve: { alias: { 'near-connect-hooks': join(HERE, 'fake-wallet.js') } },
};
await vite.build({ ...shared, build: { outDir: dist, emptyOutDir: true } });
const server = await vite.preview({ ...shared, build: { outDir: dist }, preview: { port: PORT, strictPort: true } });

// ---- the camera ----

rmSync(OUT, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });
mkdirSync(STILLS, { recursive: true });

const log = { label: LABEL, frames: [], marks: [], replies: {}, txs: [], errors: [], sharp: SHARP };
const saveLog = () => writeFileSync(join(OUT, 'take.json'), JSON.stringify(log));
let frameNo = 0;

function mark(name, rects) {
  log.marks.push({ name, t: Date.now() / 1000, rects });
  console.log(`[mark] ${name}`);
  saveLog();
}

async function rectOf(locator) {
  const box = await locator.boundingBox();
  return box ? { x: box.x, y: box.y, w: box.width, h: box.height } : null;
}

const browser = await chromium.launch({
  channel: 'msedge',
  headless: true,
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
});

function cursorScript() {
  const install = () => {
    if (document.getElementById('__cursor')) return;
    const style = document.createElement('style');
    style.textContent =
      '@keyframes __ring{from{transform:translate(-50%,-50%) scale(.35);opacity:.75}to{transform:translate(-50%,-50%) scale(1.5);opacity:0}}' +
      '#__cursor{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))}' +
      '.__ring{position:fixed;width:34px;height:34px;border-radius:50%;border:2px solid #f3d9a4;z-index:2147483646;pointer-events:none;animation:__ring .45s ease-out forwards}';
    document.documentElement.appendChild(style);
    const c = document.createElement('div');
    c.id = '__cursor';
    c.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 2.5l13.5 10-6.3 1 -3.5 6.2z" fill="#fff" stroke="#17120e" stroke-width="1.4" stroke-linejoin="round"/></svg>';
    c.style.transform = 'translate(640px,380px)';
    document.documentElement.appendChild(c);
    window.addEventListener('mousemove', (e) => { c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, true);
    window.addEventListener('mousedown', (e) => {
      const r = document.createElement('div');
      r.className = '__ring';
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      document.documentElement.appendChild(r);
      setTimeout(() => r.remove(), 500);
    }, true);
  };
  if (document.documentElement && document.body) install();
  else document.addEventListener('DOMContentLoaded', install);
}

async function startCamera(cdp, scale) {
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: 1280 * scale, maxHeight: 720 * scale, everyNthFrame: 1 });
}

/** Moving scenes film better at a lower scale: more frames. Text is filmed at the sharp scale. */
async function setScale(hand, scale) {
  await hand.cdp.send('Page.stopScreencast').catch(() => {});
  await hand.cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: scale, mobile: false });
  await sleep(250);
  await startCamera(hand.cdp, scale);
  await sleep(250);
}

const pointer = (hand, show) =>
  hand.page.evaluate((visible) => { document.getElementById('__cursor').style.display = visible ? '' : 'none'; }, show);

/** A lossless picture of the screen as it is now, with no pointer, for the moments the film holds on. */
async function still(hand, name) {
  await pointer(hand, false);
  await hand.page.screenshot({ path: join(STILLS, `${name}.png`), type: 'png', animations: 'allow', caret: 'hide' });
  await pointer(hand, true);
  console.log(`[still] ${name}`);
}

async function persona(accountId) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: SHARP, colorScheme: 'dark' });
  await context.addInitScript((value) => { window.__RECORD__ = value; }, { accountId, secretKey: keyOf(accountId), rpcUrls: RPCS });
  await context.addInitScript(cursorScript);
  const page = await context.newPage();
  page.on('pageerror', (e) => { log.errors.push(`${accountId}: ${e.message}`); console.log(`[pageerror] ${e.message}`); });
  page.on('console', (m) => { if (m.type() === 'error' && !/429|Failed to load resource/.test(m.text())) log.errors.push(`${accountId}: ${m.text().slice(0, 300)}`); });
  const cdp = await context.newCDPSession(page);
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    frameNo += 1;
    writeFileSync(join(FRAMES, `${String(frameNo).padStart(6, '0')}.jpg`), Buffer.from(data, 'base64'));
    log.frames.push([frameNo, metadata.timestamp]);
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await startCamera(cdp, SHARP);
  const hand = { page, cdp, context, x: 640, y: 380 };
  await page.mouse.move(hand.x, hand.y);
  return hand;
}

async function stop(hand) {
  await hand.cdp.send('Page.stopScreencast').catch(() => {});
  await sleep(250);
  await hand.context.close();
}

async function pointAt(hand, locator, { dwell = 80 } = {}) {
  await locator.scrollIntoViewIfNeeded();
  await sleep(120);
  const box = await locator.boundingBox();
  if (!box) throw new Error('nothing to point at');
  const tx = box.x + Math.min(box.width / 2, 120);
  const ty = box.y + box.height / 2;
  const steps = 22;
  for (let i = 1; i <= steps; i += 1) {
    const p = i / steps;
    const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    await hand.page.mouse.move(hand.x + (tx - hand.x) * eased, hand.y + (ty - hand.y) * eased);
    await sleep(15);
  }
  hand.x = tx;
  hand.y = ty;
  await sleep(dwell);
}

async function click(hand, locator) {
  await pointAt(hand, locator);
  await hand.page.mouse.down();
  await sleep(70);
  await hand.page.mouse.up();
  await sleep(220);
}

async function typeIn(hand, locator, text, delay = 32) {
  await click(hand, locator);
  await hand.page.keyboard.type(text, { delay });
}

async function retype(hand, locator, text) {
  await click(hand, locator);
  await hand.page.keyboard.press('Control+A');
  await sleep(120);
  await hand.page.keyboard.type(text, { delay: 110 });
  await sleep(350);
}

const step = (hand, n) => hand.page.locator('.step-count', { hasText: `Step ${n} of 5` }).waitFor({ timeout: 30_000 });
const next = async (hand) => click(hand, hand.page.getByRole('button', { name: 'Continue', exact: true }));

// ---- the film ----

async function grandpaMakesTheTrust() {
  const hand = await persona(GRANDPA);
  const { page } = hand;
  await page.goto(`${BASE}#/new`);
  await step(hand, 1);
  await sleep(1200);
  await typeIn(hand, page.getByLabel('Their NEAR account'), MAYA, 16);
  await typeIn(hand, page.getByLabel('A title'), 'For Maya', 30);
  await page.getByLabel('Its name on chain').fill(LABEL);
  await sleep(400);
  await next(hand);

  await step(hand, 2);
  await sleep(700);
  const wishes = page.getByLabel('In your own words');
  mark('wishes-start', { box: await rectOf(wishes) });
  await typeIn(hand, wishes, WISHES, 26);
  await sleep(900);
  mark('wishes-typed', { sealed: await rectOf(page.locator('.sealed-note')), box: await rectOf(wishes) });
  await still(hand, 'wishes');
  await sleep(2000);
  mark('wishes-end');
  await next(hand);

  await step(hand, 3);
  await sleep(900);
  mark('limits-start', { worst: await rectOf(page.locator('.worst-live')) });
  await retype(hand, page.getByLabel('Most in one request, in NEAR'), TERMS.one);
  await retype(hand, page.getByLabel('Most in one period, in NEAR'), TERMS.month);
  await retype(hand, page.getByLabel('The floor, in NEAR'), TERMS.floor);
  await sleep(900);
  mark('limits-set', { worst: await rectOf(page.locator('.worst-live')), line: await rectOf(page.locator('.worst-line')) });
  await still(hand, 'limits');
  await sleep(2000);
  mark('limits-end');
  await click(hand, page.getByRole('radio', { name: 'The holder, or a provider I name' }));
  await page.getByRole('textbox', { name: 'Providers' }).fill(SCHOOL);
  await sleep(400);
  await next(hand);

  await step(hand, 4);
  await sleep(500);
  for (const [i, letter] of LETTERS.entries()) {
    await page.getByRole('button', { name: i === 0 ? 'Write a letter' : 'Write another letter' }).click();
    const set = page.locator('fieldset.letter-draft').nth(i);
    await set.getByLabel('Title').fill(letter.title);
    await set.getByLabel('When may it be opened?').fill(letter.condition);
    await set.getByLabel('The letter', { exact: true }).fill(letter.text);
    await set.getByLabel('A gift with it (NEAR)').fill(letter.gift);
  }
  await sleep(600);
  await next(hand);

  await step(hand, 5);
  await page.getByLabel('Fund it with (NEAR)').fill(TERMS.fund);
  await page.getByLabel('Keep ready to pay (NEAR)').fill(TERMS.keep);
  await page.locator('.pool.is-chosen').waitFor({ timeout: 120_000 });
  await sleep(500);
  const cipher = page.locator('.cipher');
  await cipher.scrollIntoViewIfNeeded();
  await sleep(900);
  mark('sealed-view', { cipher: await rectOf(cipher), review: await rectOf(page.locator('.review')) });
  await still(hand, 'cipher');
  await sleep(2000);

  if (DRY) {
    mark('dry-end');
    await stop(hand);
    return;
  }
  const seal = page.getByRole('button', { name: 'Seal it and create the trust' });
  await pointAt(hand, seal);
  mark('seal-click');
  await click(hand, seal);
  await page.locator('.trust-head h1', { hasText: 'For Maya' }).waitFor({ timeout: 180_000 });
  await sleep(1800);
  mark('nft', {
    picture: await rectOf(page.locator('.trust-picture')),
    title: await rectOf(page.locator('.trust-title h1')),
    worst: await rectOf(page.locator('.worst').first()),
    head: await rectOf(page.locator('.trust-head')),
  });
  await still(hand, 'nft');
  await sleep(2500);
  mark('nft-end');
  await stop(hand);
}

async function ask(hand, key, { amount, payee } = {}) {
  const { page } = hand;
  const box = page.locator('#words');
  mark(`${key}-type`, { box: await rectOf(box) });
  await typeIn(hand, box, ASKS[key], 30);
  await sleep(500);
  if (amount && (await page.getByLabel('Amount (NEAR)').inputValue()) !== amount) {
    await retype(hand, page.getByLabel('Amount (NEAR)'), amount);
  }
  if (payee) await page.locator('#payee').selectOption(payee);
  await sleep(500);
  const send = page.getByRole('button', { name: key === 'graduated' ? 'Tell the trustee' : 'Ask the trustee' });
  await pointAt(hand, send);
  mark(`${key}-send`);
  await click(hand, send);
  await page.locator('.turn.is-waiting').waitFor({ timeout: 30_000 });
  await sleep(500);
  mark(`${key}-waiting`, { turn: await rectOf(page.locator('.turn.is-waiting')) });
}

async function answered(hand, key) {
  const { page } = hand;
  await page.locator('.turn.is-waiting').waitFor({ state: 'detached', timeout: 240_000 });
  await sleep(700);
  const turn = page.locator('li.turn').last();
  await turn.scrollIntoViewIfNeeded();
  await sleep(1000);
  const reply = (await turn.locator('.turn-trustee > p').first().innerText()).trim();
  const result = (await turn.locator('.turn-result').innerText()).replace(/\s+/g, ' ').trim();
  log.replies[key] = { reply, result };
  console.log(`[${key}] ${result}\n   ${reply}`);
  mark(`${key}-answered`, {
    turn: await rectOf(turn),
    trustee: await rectOf(turn.locator('.turn-trustee')),
    stamp: await rectOf(turn.locator('.turn-result')),
  });
  await still(hand, key);
  await sleep(3500);
  mark(`${key}-end`);
  return result;
}

async function mayaAsks() {
  const hand = await persona(MAYA);
  const { page } = hand;
  await page.goto(`${BASE}#/t/${LABEL}/room`);
  const open = page.getByRole('button', { name: 'Open the room' });
  await open.waitFor({ timeout: 60_000 });
  await sleep(1200);
  await click(hand, open);
  await page.locator('#words').waitFor({ timeout: 30_000 });
  await sleep(1500);
  mark('room');
  await page.getByRole('button', { name: 'Ask the trustee' }).waitFor();

  if (!LETTER_ONLY) {
    await ask(hand, 'motorbike', { amount: '5' });
    await answered(hand, 'motorbike');

    await ask(hand, 'bus', { amount: '1', payee: SCHOOL });
    await answered(hand, 'bus');
    const side = await rectOf(page.locator('.room-side .ledger').first());
    mark('ledger', { side });
    await sleep(2500);
  }

  const claim = page.locator('.shelf-letter', { hasText: 'When you graduate' }).getByRole('button', { name: 'This has happened' });
  await click(hand, claim);
  await sleep(700);
  await ask(hand, 'graduated');
  await setScale(hand, 2);

  const seal = page.locator('.envelope-seal');
  await seal.waitFor({ timeout: 240_000 });
  await sleep(2600);
  mark('envelope', { seal: await rectOf(seal) });
  await sleep(1500);
  await pointAt(hand, seal);
  await sleep(700);
  mark('seal-break');
  await click(hand, seal);
  await pointer(hand, false);
  await page.locator('article.letter').waitFor({ timeout: 15_000 });
  mark('letter-open');
  await page.locator('.letter-close').waitFor({ timeout: 15_000 });
  await sleep(6500);
  mark('letter-revealed', { letter: await rectOf(page.locator('article.letter')) });
  await setScale(hand, SHARP);
  await sleep(500);
  await still(hand, 'letter-top');
  // Reads down the page slowly. The edit stretches this to match the voice.
  await page.evaluate(async () => {
    const pane = document.querySelector('.moment');
    const distance = pane.scrollHeight - pane.clientHeight;
    const started = performance.now();
    const ms = 30000;
    await new Promise((done) => {
      const tick = (now) => {
        const p = Math.min(1, (now - started) / ms);
        pane.scrollTop = distance * (p * p * (3 - 2 * p));
        if (p < 1) requestAnimationFrame(tick);
        else done();
      };
      requestAnimationFrame(tick);
    });
  });
  mark('letter-bottom', {
    enclosed: await rectOf(page.locator('.letter-enclosed')),
  });
  await still(hand, 'letter-bottom');
  log.letter = await page.locator('article.letter').innerText();
  await sleep(3000);
  mark('letter-end');
  await stop(hand);
}

/** Films the opened letter again with no pointer on it, through the app's own "Read it again". */
async function mayaRereads() {
  const hand = await persona(MAYA);
  const { page } = hand;
  await page.goto(`${BASE}#/t/${LABEL}/room`);
  const open = page.getByRole('button', { name: 'Open the room' });
  await open.waitFor({ timeout: 60_000 });
  await sleep(1000);
  await click(hand, open);
  const again = page.locator('.shelf-letter', { hasText: 'When you graduate' }).getByRole('button', { name: 'Read it again' });
  await again.waitFor({ timeout: 60_000 });
  await sleep(800);
  await pointAt(hand, again);
  await page.evaluate(() => { document.getElementById('__cursor').style.display = 'none'; });
  await page.mouse.down();
  await sleep(70);
  await page.mouse.up();
  await page.locator('article.letter').waitFor({ timeout: 15_000 });
  mark('letter-open');
  await sleep(3500);
  mark('letter-revealed');
  await page.evaluate(async () => {
    const pane = document.querySelector('.moment');
    const distance = pane.scrollHeight - pane.clientHeight;
    const started = performance.now();
    const ms = 26000;
    await new Promise((done) => {
      const tick = (now) => {
        const p = Math.min(1, (now - started) / ms);
        pane.scrollTop = distance * (p * p * (3 - 2 * p));
        if (p < 1) requestAnimationFrame(tick);
        else done();
      };
      requestAnimationFrame(tick);
    });
  });
  mark('letter-bottom');
  await sleep(1500);
  mark('letter-end');
  await stop(hand);
}

async function anyoneChecks() {
  const hand = await persona(MAYA);
  const { page } = hand;
  await page.goto(`${BASE}#/t/${LABEL}`);
  await page.locator('.trust-head h1').waitFor({ timeout: 60_000 });
  await sleep(2500);
  mark('page', {
    head: await rectOf(page.locator('.trust-head')),
    worst: await rectOf(page.locator('.worst').first()),
    picture: await rectOf(page.locator('.trust-picture')),
  });
  await still(hand, 'page');
  await sleep(2000);
  mark('page-end');
  const staked = page.locator('dl', { hasText: 'Staked' }).first();
  await staked.scrollIntoViewIfNeeded();
  await sleep(1400);
  mark('money', { money: await rectOf(staked) });
  await still(hand, 'money');
  await sleep(1500);
  mark('money-end');

  await page.goto(`${BASE}#/verify/${LABEL}`);
  await page.getByText('Nobody holds a key to this account').waitFor({ timeout: 120_000 });
  await sleep(1500);
  const check = page.locator('li.check', { hasText: 'Nobody holds a key to this account' });
  await check.scrollIntoViewIfNeeded();
  await sleep(1400);
  mark('verify-keys', { check: await rectOf(check) });
  await still(hand, 'verify-keys');
  await sleep(1500);
  mark('verify-end');
  await stop(hand);
}

// FILM_FROM picks the film up again after a failure, on the trust already made.
const FROM = process.env.FILM_FROM ?? 'create';
try {
  if (FROM === 'reread') await mayaRereads();
  else {
    if (FROM === 'create') await grandpaMakesTheTrust();
    if (!DRY) {
      if (FROM !== 'check') await mayaAsks();
      await anyoneChecks();
    }
  }
  mark('done');
} catch (error) {
  log.errors.push(String(error.stack ?? error));
  console.log(`[failed] ${error.message}`);
  process.exitCode = 1;
} finally {
  saveLog();
  await browser.close();
  await server.close();
  console.log(`frames ${frameNo}, errors ${log.errors.length}`);
  for (const e of log.errors.slice(0, 10)) console.log(`  ${e.slice(0, 300)}`);
  process.exit();
}
