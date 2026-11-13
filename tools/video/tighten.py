"""Shortens long silences inside spoken lines, and leaves sighs and small sounds alone.

    python tighten.py          processes every take in ~/.someday/video/voices-human

The untouched takes are kept in voices-human-raw, so this can be run again safely.
"""

import shutil
from pathlib import Path

import numpy as np
import soundfile as sf

HOME = Path.home() / ".someday" / "video"
TAKES = HOME / "voices-human"
RAW = HOME / "voices-human-raw"
LONGEST_PAUSE = 0.42
SR = 24000

RAW.mkdir(exist_ok=True)
for path in sorted(TAKES.glob("*.wav")):
    keep = RAW / path.name
    if not keep.exists():
        shutil.copy2(path, keep)
    audio, sr = sf.read(keep, dtype="float32")
    frame = int(0.02 * sr)
    energy = np.sqrt(np.convolve(audio**2, np.ones(frame) / frame, mode="same"))
    quiet = energy < np.max(energy) * 0.012

    pieces = []
    at = 0
    i = 0
    cut = 0.0
    while i < len(audio):
        if not quiet[i]:
            i += 1
            continue
        j = i
        while j < len(audio) and quiet[j]:
            j += 1
        pause = (j - i) / sr
        inside = i > 0 and j < len(audio)
        if inside and pause > LONGEST_PAUSE:
            half = int(LONGEST_PAUSE / 2 * sr)
            pieces.append(audio[at : i + half])
            at = j - half
            cut += pause - LONGEST_PAUSE
        i = j
    pieces.append(audio[at:])

    # A short crossfade at each join, so no click is heard.
    fade = int(0.012 * sr)
    out = pieces[0]
    for piece in pieces[1:]:
        ramp = np.linspace(0.0, 1.0, fade)
        out[-fade:] = out[-fade:] * ramp[::-1] + piece[:fade] * ramp
        out = np.concatenate([out, piece[fade:]])
    sf.write(path, out, sr)
    if cut > 0:
        print(f"{path.stem}: {cut:.1f}s of silence removed, now {len(out) / sr:.1f}s", flush=True)
