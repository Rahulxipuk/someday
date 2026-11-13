"""Enlarges the frames the film holds on, so close-ups of text stay crisp.

    python sharpen.py take1:566 take1:1052 ...

A good resize at this step keeps letter edges much cleaner than the browser's scaling in the edit.
"""

import sys
from pathlib import Path

from PIL import Image, ImageFilter

TAKES = Path.home() / ".someday" / "video" / "takes"

for item in sys.argv[1:]:
    take, number = item.split(":")
    name = f"{int(number):06d}"
    out = TAKES / take / "sharp"
    out.mkdir(exist_ok=True)
    image = Image.open(TAKES / take / "frames" / f"{name}.jpg").convert("RGB")
    image = image.resize((3840, 2160), Image.LANCZOS)
    image = image.filter(ImageFilter.UnsharpMask(radius=2.4, percent=85, threshold=3))
    image.save(out / f"{name}.png", compress_level=1)
    print(item, flush=True)
