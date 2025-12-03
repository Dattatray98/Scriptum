# src/postprocessing/srt_generator.py

from pathlib import Path
from typing import Iterable, Dict, Any
import math


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


max_duration = 3.0


def Split_Segments(segment):
    start = segment["start"]
    end = segment["end"]
    text = segment["text"].strip()

    words = text.split()
    duration = end - start

    if duration <= max_duration:
        return [(start, end, text)]

    chunk_count = math.ceil(duration / max_duration)
    words_per_chunk = math.ceil(len(words) / chunk_count)

    subtitles = []

    for i in range(chunk_count):
        chunk_start = start + i * max_duration
        chunk_end = min(start + (i + 1) * max_duration, end)

        chunk_words = words[i * words_per_chunk : (i + 1) * words_per_chunk]
        chunk_text = " ".join(chunk_words)

        subtitles.append((chunk_start, chunk_end, chunk_text))

    return subtitles


def save_srt(segments, filepath):
    counter = 1

    with open(filepath, "w", encoding="utf-8") as f:
        for seg in segments:
            split_segs = Split_Segments(seg)

            for start, end, text in split_segs:
                f.write(f"{counter}\n")
                f.write(f"{format_timestamp(start)} --> {format_timestamp(end)} \n")
                f.write(f"{text}" + "\n\n")
                counter += 1

                