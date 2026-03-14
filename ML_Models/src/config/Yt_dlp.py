import yt_dlp
from pathlib import Path


def DownloadYTVideo(Media_path: str, Url: str):

    ydl_opts = {
        "format": "bestaudio[ext=m4a]/best",
        "outtmpl": str(Media_path) + ".%(ext)s",
        "noplaylist": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as dlp:
        info = dlp.extract_info(Url, download=True)  # extracting info with download
        ext = info.get("ext", "m4a")  # featching the extention from info
        final_path = Path(
            f"{Media_path}.{ext}"
        )                               # adding the extention into meadia path

    return final_path
