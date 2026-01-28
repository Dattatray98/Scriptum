import re
import shutil
import uuid
import requests
from pathlib import Path
import os


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from src.config.whisper import model
from src.postprocessing.srt_generator import save_srt
from src.api.routes.DownloadFile import router as download_route

app = FastAPI(title="ScripTum ML API")




origins = [
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create folders
MEDIA_DIR = Path("media")
SRT_DIR = Path("srt")

MEDIA_DIR.mkdir(exist_ok=True)
SRT_DIR.mkdir(exist_ok=True)


def clean_filename(name: str) -> str:
    name = re.sub(r"[^\w\s-]", "", name)  # remove emojis and symbols
    name = name.replace(" ", "_")  # replace spaces
    return name[:50]  # limit filename length


def downloadFile(url: str, destination: Path):
    response = requests.get(url, stream=True, timeout=60)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="failled to download media")

    with open(destination, "wb") as f:
        for chunks in response.iter_content(chunk_size=8192):
            if chunks:
                f.write(chunks)



class Item(BaseModel):
    media_url: str


@app.post("/scriptum")
async def scriptum(item: Item):
    media_url = item.media_url

    print("Received media URL: ", media_url)

    if not media_url.startswith("http"):
        raise HTTPException(status_code=400, detail="Invalid media URL")

    raw_name = Path(media_url).stem
    original_ext = Path(media_url).suffix

    safe_name = clean_filename(raw_name)
    unique_Id = uuid.uuid4().hex[:8]

    media_path = MEDIA_DIR / f"{safe_name}_{unique_Id}{original_ext}"
    srt_path = SRT_DIR / f"{safe_name}_{unique_Id}.srt"

    downloadFile(media_url, media_path)

    try:
        result = model.transcribe(str(media_path), fp16=False)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed : {str(e)}")

    # transcribe
    segments = result.get("segments", [])

    # create SRT path using CLEAN filename

    # save SRT
    save_srt(segments, srt_path)

    if srt_path.exists() is True:
        os.remove(media_path)

    return {
        "message": "File received successfully",
        "filename": safe_name,  # return clean name to frontend
        "media_file": media_path.name,
        "srt_file": srt_path.name,
        "srt_url": f"/download/{srt_path.name}",
        "result": segments,
    }


@app.get("/")
def root():
    return {"status": "ScripTum ML API Running"}


app.include_router(download_route)
