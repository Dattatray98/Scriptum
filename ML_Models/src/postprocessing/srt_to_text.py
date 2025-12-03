from pathlib import Path
from src.postprocessing.pdf_generator import Generate_pdf


def srt_to_text(srt_filepath, filename, videoName):

    srt_filepath = str(srt_filepath)

    txt_dir = Path("txt")
    pdf_dir = Path("pdf")
    txt_dir.mkdir(parents=True, exist_ok=True)
    pdf_dir.mkdir(parents=True, exist_ok=True)

    output_txt = txt_dir / f"{filename}.txt"

    paragraph = []

    # Extract all meaningful text lines
    with open(srt_filepath, "r", encoding="utf-8") as f_in:
        for line in f_in:
            line = line.strip()

            if not line or line.isdigit() or "-->" in line:
                continue

            paragraph.append(line)

    # Merge everything into a single paragraph
    full_paragraph = " ".join(paragraph)

    # Save .txt
    with open(output_txt, "w", encoding="utf-8") as f_out:
        f_out.write(full_paragraph)

    # PDF path
    pdf_path = pdf_dir / f"{filename}.pdf"

    # Generate PDF using your existing function
    try:
        Generate_pdf(str(output_txt), str(pdf_path), videoName)
    except Exception as e:
        raise RuntimeError(f"PDF generation failed: {e}") from e

    return str(pdf_path)
