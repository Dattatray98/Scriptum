from pathlib import Path
from src.postprocessing.pdf_generator import Generate_pdf


def srt_to_text(srt_filepath, filename):

    srt_filepath = str(srt_filepath)

    txt_dir = Path("txt")
    pdf_dir = Path("pdf")
    txt_dir.mkdir(parents=True, exist_ok=True)
    pdf_dir.mkdir(parents=True, exist_ok=True)

    output_txt = txt_dir / f"{filename}.txt"

    with open(srt_filepath, "r", encoding="utf-8") as f_in, open(
        output_txt, "w", encoding="utf-8"
    ) as f_out:
        for line in f_in:
            line = line.strip()
            if not line or line.isdigit() or "-->" in line:
                continue
            f_out.write(line + "\n")

    pdf_path = pdf_dir / f"{filename}.pdf"

    try:
        Generate_pdf(str(output_txt), str(pdf_path))
    except Exception as e:
        raise RuntimeError(f"PDF generation failed: {e}") from e

    return str(pdf_path)
