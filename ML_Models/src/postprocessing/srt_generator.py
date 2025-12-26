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

max_words = 6

def Split_Segments(segment):
    start = segment["start"]
    end = segment["end"]
    text = segment["text"].strip()

    words = text.split()
    duration = end - start

    if len(words) <= max_words:
        return [(start, end, text)]

    chunks = [
        " ".join(words[i : i + max_words]) for i in range(0, len(words), max_words)
    ]

    total_chars = sum(len(c) for c in chunks)

    subtitles = []

    current_time = start

    for chunk in chunks:
        chunk_chars = len(chunk)
        propostional_duration = duration * (chunk_chars / total_chars)

        chunk_start = current_time
        chunk_end = current_time + propostional_duration

        subtitles.append((chunk_start, chunk_end, chunk))
        current_time = chunk_end

    return subtitles


def split_with_word_timestamp(segments, max_words=6):
    words = segments.get("words", [])
    subtitles = []

    for i in range(0, len(words), max_words):
        chunk = words[i : i + max_words]

        chunk_text = " ".join(w["text"] for w in chunk)
        chunk_start = chunk[0]["start"]
        chunk_end = chunk[-1]["end"]

        subtitles.append((chunk_start, chunk_end, chunk_text))

    return subtitles


def save_srt(segments, filepath):
    counter = 1
    with open(filepath, "w", encoding="utf-8") as f:
        for seg in segments:
            if "words" in seg:
                split_segs = split_with_word_timestamp(seg)
            else:
                split_segs = Split_Segments(seg)

            for start, end, text in split_segs:
                f.write(f"{counter}\n")
                f.write(f"{format_timestamp(start)} --> {format_timestamp(end)} \n")
                f.write(f"{text}" + "\n\n")
                counter += 1
