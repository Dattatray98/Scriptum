from fastapi import FastAPI, UploadFile, File  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore

from Config.whisper import model

app = FastAPI()

origins = [
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Frontend URLs you allow
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all request headers
)


@app.get("/")
def read_root():
    return {"message ": "Fast API is running "}


@app.post("/scriptum")
async def scriptum(file: UploadFile = File(...)):
    file_location = f"temp/{file.filename}"

    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())
    

    result = model.transcribe(f"temp/{file.filename}")

    return {
        "message": "File received successfully",
        "filename": file.filename,
        "result": result["text"],
    }
