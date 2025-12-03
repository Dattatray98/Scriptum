from reportlab.pdfgen import canvas  # type: ignore
from reportlab.lib.pagesizes import letter, A4  # type: ignore
from reportlab.lib.units import inch  # type: ignore
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer  # type: ignore
from reportlab.lib.styles import getSampleStyleSheet  # type: ignore
from pathlib import Path


def srt_to_text(srt_filepath, output_filepath):
    with open(srt_filepath, "r", encoding="utf-8") as srt_file:
        lines = srt_file.readlines()

    with open(output_filepath, "w", encoding="utf-8") as text_file:
        for line in lines:
            line = line.strip()
            if not line or line.isdigit() or "-->" in line:
                continue
            text_file.write(line + "\n")


BASE = Path(__file__).resolve().parent.parent

srt_file_path = BASE / "srt" / "FAST__FREE_Audio_Transcription_Hack__speechtotext_.srt"
txt_file_path = BASE / "Test" / "hello.txt"

srt_to_text(srt_file_path, txt_file_path)


def Generate_pdf(text_file, output_path="output.pdf"):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=50,
    )

    f = open(text_file, "r")
    text = f.read()

    styles = getSampleStyleSheet()
    style = styles["Normal"]

    Story = []

    for line in text.split("\n"):
        Story.append(Paragraph(line, style))
        Story.append(Spacer(1, 10))

    doc.build(Story)


text_file = BASE / "Test" / "hello.txt"

Generate_pdf(text_file)
