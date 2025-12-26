from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from fastapi.concurrency import run_in_threadpool
from pathlib import Path
from src.postprocessing.srt_to_text import srt_to_text

router = APIRouter(prefix="/download", tags=["Download"])


@router.get("/srt/{filename}")
async def download_srt(filename: str):
    srt_path = Path("srt") / filename
    if not srt_path.exists():
        return {"error": "File not found"}
    return FileResponse(srt_path, media_type="text/srt", filename=filename)


@router.get("/pdf/{filename}")
async def download_pdf(filename: str):
    srt_path = Path("srt") / filename
    if not srt_path.exists():
        return {"error": "File not found"}
    
    print(srt_path)

    # original filename
    raw_name = Path(filename).stem
    print(raw_name)
    # print(videoName)

    try:
        pdf_path_str = await run_in_threadpool(srt_to_text, str(srt_path), raw_name)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation error: {e}")

    pdf_path = Path(pdf_path_str)
    if not pdf_path.exists():
        raise HTTPException(
            status_code=500, detail="PDF file not found after generation"
        )

    return FileResponse(
        str(pdf_path), media_type="application/pdf", filename=pdf_path.name
    )
