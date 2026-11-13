// Cuts the film together from the recorded takes and the spoken lines.
//
//   node compose.mjs plan                 works out the timeline from the voices, writes timeline.json
//   node compose.mjs stills 3,20,55       renders single frames at those seconds, to check the look
//   node compose.mjs render <out.mp4>     renders the whole film (needs mix.wav from mix.py)

import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const HERE = dirname(fileURLToPath(import.meta.url));
const HOME = join(homedir(), '.someday', 'video');
const FPS = 30;
const VOICES = process.env.VOICES_DIR ?? 'voices';
const SCALE = 1.5; // recorded layout is 1280 wide, the film is 1920 wide
const SCRIPT = JSON.parse(readFileSync(join(HERE, 'script.json'), 'utf8'));
const LINES = Object.fromEntries(SCRIPT.lines.map((line) => [line.id, line]));
const WHO = { grandpa: 'Grandpa', maya: 'Maya', trustee: 'AI Trustee' };

const takes = {};
function take(name) {
  takes[name] ??= (() => {
    const log = JSON.parse(readFileSync(join(HOME, 'takes', name, 'take.json'), 'utf8'));
    return { dir: join(HOME, 'takes', name, 'frames'), frames: log.frames };
  })();
  return takes[name];
}
const frameTime = (name, n) => take(name).frames.find((f) => f[0] === n)[1];

// ---- the film: what is on screen, and who speaks over it ----
// clip: [take, first frame, last frame], played across the whole shot. hold: [take, frame].
// camera: [seconds from shot start (negative counts from its end), centre x, centre y, zoom], layout pixels.

const FULL = [640, 360, 1];
const SHOTS = [
  { id: 'wishes', chapter: 'The problem', clip: ['take1', 210, 565], say: ['g1', 'g2'], lead: 0.35, gap: 0.45, tail: 0.25,
    camera: [[0, ...FULL], [3.5, 450, 455, 1.42]] },
  { id: 'cipher', chapter: 'The solution', holds: [[0, 'take1', 566], [0.6, 'take1', 1052]], say: ['g3'], lead: 0.2, tail: 0.35,
    camera: [[0, 450, 455, 1.42], ['59.9%', 450, 445, 1.46], ['60%', 428, 330, 1.6], [-0.01, 428, 345, 1.7]] },
  { id: 'limits', chapter: 'The solution', clip: ['take1', 633, 785], say: ['g4'], lead: 0.2, tail: 0.25,
    camera: [[0, ...FULL], [1.5, 900, 470, 1.42], [-0.01, 990, 445, 1.75]] },
  { id: 'seal', chapter: 'The solution', clip: ['take1', 1053, 1100], dur: 1.2,
    camera: [[0, 560, 400, 1.3], [1.6, 640, 455, 1.55]] },
  { id: 'nft', chapter: 'The solution', clip: ['take1', 1101, 1172], say: ['g6'], lead: 0.5, tail: 0.3, retimeSeconds: 1.2,
    camera: [[0, ...FULL], [2.2, 330, 400, 1.42], ['62%', 330, 400, 1.42], [-0.01, 640, 400, 1.14]] },

  { id: 'ask1', chapter: 'See it work', clip: ['take1', 1321, 1479], say: ['m1'], lead: 0.2, tail: 0.3, min: 4.2,
    camera: [[0, 465, 480, 1.4], [-0.01, 465, 480, 1.44]] },
  { id: 'wait1', chapter: 'See it work', clip: ['take1', 1481, 1960], dur: 1.4,
    camera: [[0, 465, 262, 1.55], [-0.01, 465, 262, 1.62]] },
  { id: 'reply1', chapter: 'See it work', hold: ['take1', 2653], say: ['t1'], lead: 0.25, tail: 0.35,
    camera: [[0, 465, 305, 1.5], [-0.01, 465, 318, 1.56]] },
  { id: 'refused', chapter: 'See it work', hold: ['take1', 2653], say: ['m2a'], lead: 0.1, tail: 0.3,
    camera: [[0, 465, 318, 1.56], [0.5, 465, 345, 1.78]] },
  { id: 'ask2', chapter: 'See it work', clip: ['take1', 2654, 2935], say: ['m2b'], lead: 0.2, tail: 0.3,
    camera: [[0, 465, 480, 1.4], [-0.01, 465, 490, 1.44]] },
  { id: 'wait2', chapter: 'See it work', clip: ['take1', 2937, 3300], dur: 1.4,
    camera: [[0, 465, 262, 1.55], [-0.01, 465, 262, 1.6]] },
  { id: 'reply2', chapter: 'See it work', hold: ['take1', 4180], say: ['t2'], lead: 0.25, tail: 0.35,
    camera: [[0, 465, 325, 1.5], [-0.01, 465, 335, 1.56]] },
  { id: 'paid', chapter: 'See it work', hold: ['take1', 4180], say: ['m3'], lead: 0.1, tail: 0.5,
    camera: [[0, 465, 335, 1.56], [0.7, 465, 345, 1.78], [-1.6, 465, 345, 1.78], [-0.01, 465, 340, 1.5]] },

  { id: 'claim', chapter: 'See it work', clip: ['take1', 4181, 4455], say: ['m4'], lead: 0.9, tail: 0.4,
    camera: [[0, 700, 300, 1.15], [1.6, 465, 600, 1.6]] },
  { id: 'envelope', clip: ['take2', 3216, 3398], dur: 4.9, badge: 0, fadeIn: 0.5,
    retime: [[0, 0], [0.25, 0.4], [0.47, 0.6], [1, 1]],
    camera: [[0, ...FULL], [-0.01, 640, 370, 1.1]] },
  { id: 'letter', clip: ['take4', 200, 283], say: ['L1', 'L2'], lead: 0.8, gap: 0.55, tail: 0.4, badge: 0, caption: false, fadeIn: 0.4,
    retimeSeconds: 2,
    camera: [[0, ...FULL], [-0.01, 640, 350, 1.06]] },
  { id: 'letter2', clip: ['take4', 284, 401], say: ['L3a'], lead: 0, tail: 0.4, badge: 0, caption: false,
    camera: [[0, 640, 350, 1.06], [-0.01, 640, 380, 1.1]] },
  { id: 'letter3', clip: ['take4', 402, 518], say: ['L3b'], lead: 0, tail: 0.4, badge: 0, caption: false,
    camera: [[0, 640, 380, 1.1], [-0.01, 640, 400, 1.12]] },
  { id: 'letter4', hold: ['take4', 518], say: ['L5'], lead: 0, tail: 1.7, badge: 0, caption: false, fadeOut: 0.7,
    camera: [[0, 640, 400, 1.12], [-0.01, 640, 420, 1.2]] },

  { id: 'near-keys', chapter: 'Why it matters', hold: ['take3', 266], say: ['m5'], lead: 0.5, tail: 0.25, fadeIn: 0.5,
    camera: [[0, 640, 480, 1.15], [1.2, 590, 560, 1.35]] },
  { id: 'near-staked', chapter: 'Why it matters', hold: ['take3', 108], say: ['m7'], lead: 0.2, tail: 0.3,
    camera: [[0, 500, 450, 1.35], [1.0, 364, 490, 1.75]] },
  { id: 'still-no', chapter: 'Why it matters', hold: ['take3', 107], say: ['m9', 'm8a', 'm8b'], lead: 0.15, gap: 0.5, tail: 0.6, fadeOut: 0.6,
    camera: [[0, 500, 330, 1.25], [-0.01, 300, 350, 1.42]] },
  { id: 'end', card: true, dur: 4.2, badge: 0 },
];

// ---- timeline ----

function report() {
  const path = join(HOME, `${VOICES}.json`);
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};
}

/** The take with the fewest wrong words; among equals, the one with the most movement in its pitch. */
function chooseTake(id, voices) {
  const overrides = existsSync(join(HERE, 'choice.json')) ? JSON.parse(readFileSync(join(HERE, 'choice.json'), 'utf8')) : {};
  if (overrides[id] !== undefined) return overrides[id];
  const options = Object.entries(voices)
    .filter(([key]) => key.startsWith(`${id}.`))
    .map(([key, value]) => ({ take: Number(key.split('.')[1]), ...value }));
  if (!options.length) return null;
  options.sort((a, b) => a.wer - b.wer || b.pitch_spread_semitones - a.pitch_spread_semitones);
  return options[0].take;
}

function plan() {
  const voices = report();
  let clock = 0;
  const lines = [];
  const missing = [];
  const shots = SHOTS.map((shot) => {
    const start = clock;
    let at = start + (shot.lead ?? 0);
    for (const [i, id] of (shot.say ?? []).entries()) {
      const chosen = chooseTake(id, voices);
      let seconds = LINES[id].text.length / 13; // an estimate until the line has been spoken
      if (chosen === null) missing.push(id);
      else seconds = voices[`${id}.${chosen}`].seconds;
      lines.push({ id, take: chosen, at: Number(at.toFixed(3)), seconds, shot: shot.id, voice: LINES[id].voice, text: LINES[id].text, caption: shot.caption !== false });
      at += seconds + (i < shot.say.length - 1 ? shot.gap ?? 0.4 : 0);
    }
    const end = shot.say ? Math.max(at + (shot.tail ?? 0.3), start + (shot.min ?? 0)) : start + shot.dur;
    clock = end;
    return { ...shot, start, end };
  });
  const cues = {
    refused: shots.find((s) => s.id === 'reply1').start,
    honest: shots.find((s) => s.id === 'ask2').start,
    paid: shots.find((s) => s.id === 'reply2').start,
    envelope: shots.find((s) => s.id === 'envelope').start,
    letter: shots.find((s) => s.id === 'letter').start,
    after: shots.find((s) => s.id === 'near-keys').start,
    end: shots.find((s) => s.id === 'end').start,
  };
  const timeline = { duration: clock, lines, cues, missing };
  writeFileSync(join(HERE, 'timeline.json'), JSON.stringify(timeline, null, 1));
  console.log(`duration ${clock.toFixed(1)}s, ${lines.length} lines, missing voices: ${missing.join(' ') || 'none'}`);
  console.log(shots.map((s) => `${s.id}@${s.start.toFixed(1)}`).join(' '));
  return { shots, timeline };
}

// ---- what the screen shows at a moment ----

const smooth = (p) => p * p * (3 - 2 * p);

function cameraAt(shot, t) {
  const length = shot.end - shot.start;
  const when = (at) => (typeof at === 'string' ? (parseFloat(at) / 100) * length : at < 0 ? length + at : at);
  const keys = shot.camera.map(([at, x, y, zoom]) => [when(at), x, y, zoom]);
  const local = t - shot.start;
  let a = keys[0];
  let b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (local >= keys[i][0] && local <= keys[i + 1][0]) {
      a = keys[i];
      b = keys[i + 1];
      break;
    }
  }
  if (local <= keys[0][0]) b = a;
  if (local >= keys[keys.length - 1][0]) a = b;
  const span = b[0] - a[0];
  const p = span > 0 ? smooth(Math.min(1, Math.max(0, (local - a[0]) / span))) : 0;
  const zoom = Math.exp(Math.log(a[3]) + (Math.log(b[3]) - Math.log(a[3])) * p);
  const cx = (a[1] + (b[1] - a[1]) * p) * SCALE;
  const cy = (a[2] + (b[2] - a[2]) * p) * SCALE;
  const tx = Math.min(0, Math.max(1920 - 1920 * zoom, 960 - zoom * cx));
  const ty = Math.min(0, Math.max(1080 - 1080 * zoom, 540 - zoom * cy));
  return { tx: Number(tx.toFixed(2)), ty: Number(ty.toFixed(2)), zoom: Number(zoom.toFixed(4)) };
}

function frameFile(name, n) {
  const base = String(n).padStart(6, '0');
  const sharp = join(HOME, 'takes', name, 'sharp', `${base}.png`);
  return pathToFileURL(existsSync(sharp) ? sharp : join(take(name).dir, `${base}.jpg`)).href;
}

function sourceAt(shot, t) {
  if (shot.hold) return frameFile(shot.hold[0], shot.hold[1]);
  if (shot.holds) {
    const p = (t - shot.start) / (shot.end - shot.start);
    const [, name, n] = shot.holds.findLast(([from]) => p >= from) ?? shot.holds[0];
    return frameFile(name, n);
  }
  const [name, first, last] = shot.clip;
  const startTs = frameTime(name, first);
  const endTs = frameTime(name, last);
  let p = (t - shot.start) / (shot.end - shot.start);
  if (shot.retimeSeconds) p = Math.min(1, (t - shot.start) / shot.retimeSeconds);
  if (shot.retime) {
    for (let i = 0; i < shot.retime.length - 1; i += 1) {
      const [u0, v0] = shot.retime[i];
      const [u1, v1] = shot.retime[i + 1];
      if (p >= u0 && p <= u1) {
        p = v0 + ((v1 - v0) * (p - u0)) / (u1 - u0);
        break;
      }
    }
  }
  const wanted = startTs + (endTs - startTs) * p;
  const frames = take(name).frames;
  let low = 0;
  let high = frames.length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (frames[mid][1] <= wanted) low = mid;
    else high = mid - 1;
  }
  const n = Math.max(first, Math.min(last, frames[low][0]));
  return frameFile(name, n);
}

/** Splits a line into pieces short enough to read at a glance, timed by their length. */
function chunks(line) {
  const sentences = line.text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [line.text];
  const pieces = [];
  for (const sentence of sentences) {
    if (sentence.length <= 66 || !sentence.includes(',')) {
      pieces.push(sentence);
      continue;
    }
    const middle = sentence.length / 2;
    let best = -1;
    for (let i = 0; i < sentence.length; i += 1) {
      if (sentence[i] === ',' && (best < 0 || Math.abs(i - middle) < Math.abs(best - middle))) best = i;
    }
    pieces.push(sentence.slice(0, best + 1).trim(), sentence.slice(best + 1).trim());
  }
  // Very short pieces read better joined to their neighbour.
  const merged = [];
  for (const piece of pieces) {
    const last = merged[merged.length - 1];
    if (last && (last + ' ' + piece).length <= 58) merged[merged.length - 1] = `${last} ${piece}`;
    else merged.push(piece);
  }
  const total = merged.reduce((sum, piece) => sum + piece.length, 0);
  let at = line.at;
  return merged.map((text) => {
    const seconds = (line.seconds * text.length) / total;
    const chunk = { text: text.replaceAll("'", '’'), from: at, to: at + seconds };
    at += seconds;
    return chunk;
  });
}

function stateAt(shots, captions, t) {
  const shot = shots.find((s) => t >= s.start && t < s.end) ?? shots[shots.length - 1];
  const state = { tx: 0, ty: 0, zoom: 1, badge: shot.badge ?? 1, fade: 0, card: 0, captionOpacity: 0, chapter: shot.chapter ?? '' };
  if (shot.card) {
    state.card = Math.min(1, (t - shot.start) / 0.7);
    state.fade = Math.max(0, (t - (shot.end - 0.9)) / 0.9);
    state.badge = 0;
    state.src = shots.findLast((s) => !s.card).hold ? sourceAt(shots.findLast((s) => !s.card), shots.findLast((s) => !s.card).end - 0.01) : undefined;
    Object.assign(state, cameraAt(shots.findLast((s) => !s.card), shots.findLast((s) => !s.card).end - 0.01));
    return state;
  }
  state.src = sourceAt(shot, t);
  Object.assign(state, cameraAt(shot, t));
  if (shot.fadeIn) state.fade = Math.max(state.fade, 1 - (t - shot.start) / shot.fadeIn);
  if (shot.fadeOut) state.fade = Math.max(state.fade, 1 - (shot.end - t) / shot.fadeOut);
  state.fade = Number(Math.max(0, Math.min(1, state.fade)).toFixed(3));

  const caption = captions.find((c) => t >= c.from - 0.06 && t < c.to + 0.16);
  if (caption) {
    state.text = caption.text;
    state.who = caption.who;
    const rise = Math.min(1, (t - (caption.from - 0.06)) / 0.14);
    const fall = Math.min(1, (caption.to + 0.16 - t) / 0.16);
    state.captionOpacity = Number(Math.min(rise, fall).toFixed(3));
  }
  return state;
}

// ---- render ----

async function openStage() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--force-color-profile=srgb', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(join(HERE, 'stage.html')).href);
  await page.evaluate(() => window.ready());
  return { browser, page };
}

function ffmpegPath() {
  const dir = join(HOME, 'venv', 'Lib', 'site-packages', 'imageio_ffmpeg', 'binaries');
  return join(dir, readdirSync(dir).find((f) => f.endsWith('.exe')));
}

const command = process.argv[2] ?? 'plan';
const { shots, timeline } = plan();
const captions = timeline.lines
  .filter((line) => line.caption)
  .flatMap((line) => chunks(line).map((chunk) => ({ ...chunk, who: WHO[line.voice] })));

if (command === 'stills') {
  const out = join(HOME, 'stills');
  mkdirSync(out, { recursive: true });
  const { browser, page } = await openStage();
  for (const second of process.argv[3].split(',').map(Number)) {
    await page.evaluate((s) => window.draw(s), stateAt(shots, captions, second));
    await page.waitForTimeout(150);
    await page.screenshot({ path: join(out, `t${String(second).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 85 });
    console.log(second);
  }
  await browser.close();
}

if (command === 'render') {
  const output = process.argv[3];
  const from = Number(process.env.RENDER_FROM ?? 0);
  const to = Number(process.env.RENDER_TO ?? timeline.duration);
  const first = Math.floor(from * FPS);
  const total = Math.ceil(to * FPS);
  const ff = spawn(ffmpegPath(), [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(FPS), '-i', 'pipe:0',
    '-ss', String(from), '-t', String(to - from), '-i', join(HOME, 'mix.wav'),
    '-map', '0:v', '-map', '1:a',
    '-vf', 'unsharp=5:5:0.45:5:5:0,scale=out_range=tv:out_color_matrix=bt709:flags=lanczos,format=yuv420p',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '13', '-profile:v', 'high', '-x264-params', 'deblock=-1,-1:aq-mode=3',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-shortest', '-movflags', '+faststart', output,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const { browser, page } = await openStage();
  let lastKey = '';
  let buffer = null;
  const started = Date.now();
  for (let f = first; f < total; f += 1) {
    const state = stateAt(shots, captions, f / FPS);
    const key = JSON.stringify(state);
    if (key !== lastKey) {
      await page.evaluate((s) => window.draw(s), state);
      buffer = await page.screenshot({ type: 'png' });
      lastKey = key;
    }
    if (!ff.stdin.write(buffer)) await once(ff.stdin, 'drain');
    if (f % 150 === 0) console.log(`${f}/${total} frames, ${Math.round((Date.now() - started) / 1000)}s`);
  }
  ff.stdin.end();
  await once(ff, 'close');
  await browser.close();
  console.log(`done: ${output}`);
}
