# src/postprocessing/srt_generator.py

from pathlib import Path
from typing import Iterable, Dict, Any


def format_timestamp(seconds: float) -> str:
    """Convert seconds (float) to SRT timestamp format HH:MM:SS,mmm."""
    if seconds is None:
        seconds = 0.0
    total_ms = int(round(seconds * 1000))
    ms = total_ms % 1000
    total_seconds = total_ms // 1000
    secs = total_seconds % 60
    mins = (total_seconds // 60) % 60
    hrs = total_seconds // 3600
    return f"{hrs:02}:{mins:02}:{secs:02},{ms:03}"


def save_srt(segments: Iterable[Dict[str, Any]], output_path: str | Path) -> Path:
    """
    Save Whisper-like segments into a valid .srt file.

    segments: iterable of dicts with at least 'start', 'end', 'text' keys
    output_path: path to write the .srt (string or Path). If a directory is given,
                 a default filename will be used.
    Returns the Path to the written file.
    """
    out_path = Path(output_path)
    if out_path.is_dir():
        out_path = out_path / "output.srt"

    lines = []
    for idx, seg in enumerate(segments, start=1):
        # Use dict indexing (NOT calling) and guard against missing keys
        start = seg.get("start", 0.0)
        end = seg.get("end", start + seg.get("duration", 1.0))
        text = seg.get("text", "").strip()
        if not text:
            continue  # skip empty segments

        start_ts = format_timestamp(float(start))
        end_ts = format_timestamp(float(end))

        block = f"{idx}\n{start_ts} --> {end_ts}\n{text}\n"
        lines.append(block)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    return out_path, lines
