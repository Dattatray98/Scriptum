import re
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from src.config.whisper import model
from src.postprocessing.srt_generator import save_srt
from pathlib import Path
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
Path("audio").mkdir(exist_ok=True)
Path("srt").mkdir(exist_ok=True)


def clean_filename(name: str) -> str:
    name = re.sub(r"[^\w\s-]", "", name)  # remove emojis and symbols
    name = name.replace(" ", "_")  # replace spaces
    return name[:50]  # limit filename length


@app.post("/scriptum")
async def scriptum(file: UploadFile = File(...)):

    # original filename
    raw_name = Path(file.filename).stem

    # clean filename
    safe_name = clean_filename(raw_name)

    # clean audio filename
    audio_path = Path("audio") / f"{safe_name}.mp3"

    # save uploaded audio
    with open(audio_path, "wb") as buffer:
        buffer.write(await file.read())

    # transcribe
    result = model.transcribe(str(audio_path), fp16=False)
    segments = result.get("segments", [])

    # create SRT path using CLEAN filename
    srt_path = Path("srt") / f"{safe_name}.srt"

    # save SRT
    save_srt(segments, srt_path)

    return {
        "message": "File received successfully",
        "filename": safe_name,  # return clean name to frontend
        "srt_file": f"{safe_name}.srt",
        "srt_url": f"/download/{safe_name}.srt",
        "result": segments,
    }


@app.get("/")
def root():
    return {"status": "ScripTum ML API Running"}


app.include_router(download_route)
