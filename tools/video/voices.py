"""Generates the film's voices with open models that run on this machine.

    python voices.py refs              makes one reference clip per character (Kokoro)
    python voices.py lines [id ...]    speaks the lines in script.json (Chatterbox), several takes each
    python voices.py check [id ...]    transcribes every take and scores it against the script

Chatterbox has a control for emotional intensity, and copies the sound of a short reference clip.
The reference clips are synthetic too, so no real person's voice is copied.
"""

import json
import os
import re
import sys
import time
from pathlib import Path

HOME = Path.home() / ".someday" / "video"
os.environ["HF_HOME"] = str(HOME / "hf")
os.environ["HF_HUB_OFFLINE"] = "1"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

import librosa  # noqa: E402
import numpy as np  # noqa: E402
import soundfile as sf  # noqa: E402

HERE = Path(__file__).parent
SCRIPT = json.loads((HERE / "script.json").read_text(encoding="utf-8"))
REFS = HOME / "refs"
TAKES = HOME / os.environ.get("VOICES_DIR", "voices")
SR = 24000


def clean(wav, sr):
    """Trims silence, softens the ends, and sets a level so lines can be mixed evenly."""
    wav, _ = librosa.effects.trim(wav, top_db=38, frame_length=1024, hop_length=256)
    fade = int(0.025 * sr)
    if len(wav) > 2 * fade:
        ramp = np.linspace(0.0, 1.0, fade)
        wav[:fade] *= ramp
        wav[-fade:] *= ramp[::-1]
    peak = float(np.max(np.abs(wav))) or 1.0
    return wav * (0.85 / peak)


def kokoro_engine():
    from kokoro_onnx import Kokoro
    import onnxruntime as rt

    class Renamed:
        """This export of the model names its first input `input_ids` and adds a batch dimension."""

        def __init__(self, session):
            self.session = session
            self._model_path = session._model_path

        def run(self, names, inputs):
            renamed = dict(inputs)
            renamed["input_ids"] = np.array(renamed.pop("tokens"), dtype=np.int64)
            return [np.squeeze(self.session.run(names, renamed)[0])]

    model = (HOME / "kokoro" / "model_path.txt").read_text(encoding="utf-8").strip()
    session = Renamed(rt.InferenceSession(model, providers=["CPUExecutionProvider"]))
    voices_json = HOME / "kokoro" / "voices.json"
    if not voices_json.exists():  # this version of the library reads its voices from JSON
        stored = np.load(HOME / "kokoro" / "voices.npz")
        voices_json.write_text(json.dumps({name: stored[name].tolist() for name in stored.files}))
    return Kokoro.from_session(session, str(voices_json))


def make_refs():
    REFS.mkdir(parents=True, exist_ok=True)
    kokoro = kokoro_engine()
    for name, voice in SCRIPT["voices"].items():
        samples, sr = kokoro.create(voice["ref_text"], voice=voice["kokoro"], speed=voice.get("speed", 1.0), lang=voice["lang"])
        samples = np.asarray(samples, dtype=np.float32)
        if voice.get("semitones"):
            samples = librosa.effects.pitch_shift(samples, sr=sr, n_steps=voice["semitones"])
        sf.write(REFS / f"{name}.wav", clean(samples, sr), sr)
        print(name, f"{len(samples) / sr:.1f}s", flush=True)


def plain(args):
    """The trustee speaks through Kokoro directly: calm by nature, and many times faster."""
    TAKES.mkdir(parents=True, exist_ok=True)
    kokoro = kokoro_engine()
    path_report = HOME / f"{TAKES.name}.json"
    report = json.loads(path_report.read_text(encoding="utf-8")) if path_report.exists() else {}
    for line in wanted(args):
        voice = SCRIPT["voices"][line["voice"]]
        samples, sr = kokoro.create(line.get("say", line["text"]), voice=voice["kokoro"], speed=voice.get("speed", 1.0), lang=voice["lang"])
        audio = clean(np.asarray(samples, dtype=np.float32), sr)
        sf.write(TAKES / f"{line['id']}.0.wav", audio, sr)
        print(line["id"], f"{len(audio) / sr:.1f}s", flush=True)
        report[f"{line['id']}.0"] = {"seconds": round(len(audio) / sr, 2), "wer": 0, "pitch_spread_semitones": 0}
    path_report.write_text(json.dumps(report, indent=1), encoding="utf-8")


def wanted(args):
    """Lines in the order asked for, so the ones that matter most are spoken first."""
    if not args:
        return SCRIPT["lines"]
    by_id = {line["id"]: line for line in SCRIPT["lines"]}
    return [by_id[name] for name in args]


def speak(args):
    import torch
    from chatterbox.tts import ChatterboxTTS

    TAKES.mkdir(parents=True, exist_ok=True)
    started = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    print(f"model loaded in {time.time() - started:.0f}s, threads {torch.get_num_threads()}", flush=True)
    limit = int(os.environ.get("MAX_TAKES", "99"))
    for line in wanted(args):
        for take in range(min(limit, line.get("takes", 2))):
            path = TAKES / f"{line['id']}.{take}.wav"
            if path.exists():
                continue
            torch.manual_seed(1000 * take + sum(map(ord, line["id"])))
            began = time.time()
            wav = model.generate(
                line.get("say", line["text"]),
                audio_prompt_path=str(REFS / f"{line['voice']}.wav"),
                exaggeration=line.get("emotion", 0.6),
                cfg_weight=line.get("cfg", 0.4),
                temperature=line.get("temperature", 0.8),
            )
            audio = clean(wav.squeeze(0).cpu().numpy(), model.sr)
            sf.write(path, audio, model.sr)
            seconds = len(audio) / model.sr
            print(f"{line['id']}.{take}: {seconds:.1f}s audio in {time.time() - began:.0f}s", flush=True)


def words(text):
    text = text.lower().replace("’", "'").replace("n f t", "nft")
    for digit, word in zip("123456789", "one two three four five six seven eight nine".split()):
        text = re.sub(rf"{digit}", word, text)
    return re.findall(r"[a-z0-9']+", text)


def distance(a, b):
    row = list(range(len(b) + 1))
    for i, x in enumerate(a, 1):
        prev, row[0] = row[0], i
        for j, y in enumerate(b, 1):
            prev, row[j] = row[j], min(row[j] + 1, row[j - 1] + 1, prev + (x != y))
    return row[-1]


def check(args):
    from faster_whisper import WhisperModel

    whisper = WhisperModel("Systran/faster-whisper-small.en", device="cpu", compute_type="int8")
    report = {}
    path_report = HOME / f"{TAKES.name}.json"
    if path_report.exists():
        report = json.loads(path_report.read_text(encoding="utf-8"))
    for line in wanted(args):
        target = words(line.get("say", line["text"]))
        for path in sorted(TAKES.glob(f"{line['id']}.*.wav")):
            audio, sr = sf.read(path)
            segments, _ = whisper.transcribe(str(path), language="en", beam_size=5, vad_filter=False)
            heard = " ".join(s.text.strip() for s in segments)
            got = words(heard)
            wer = distance(target, got) / max(1, len(target))
            f0, voiced, _ = librosa.pyin(audio.astype(np.float32), fmin=60, fmax=420, sr=sr, frame_length=2048)
            pitched = f0[voiced] if voiced.any() else np.array([0.0])
            spread = float(np.std(12 * np.log2(pitched / np.median(pitched)))) if voiced.any() else 0.0
            rate = len(target) / (len(audio) / sr)
            report[path.stem] = {
                "seconds": round(len(audio) / sr, 2),
                "wer": round(wer, 3),
                "heard": heard,
                "pitch_spread_semitones": round(spread, 2),
                "median_hz": round(float(np.median(pitched)), 1),
                "words_per_second": round(rate, 2),
            }
            print(f"{path.stem}: {len(audio) / sr:.1f}s wer {wer:.2f} spread {spread:.1f} {rate:.1f} w/s | {heard}", flush=True)
    path_report.write_text(json.dumps(report, indent=1), encoding="utf-8")


if __name__ == "__main__":
    command, *rest = sys.argv[1:] or ["lines"]
    {"refs": lambda _: make_refs(), "plain": plain, "lines": speak, "check": check}[command](rest)
