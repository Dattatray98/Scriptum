from reportlab.pdfgen import canvas  # type: ignore
from reportlab.lib.pagesizes import letter, A4  # type: ignore
from reportlab.lib.units import inch  # type: ignore
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer  # type: ignore
from reportlab.lib.styles import getSampleStyleSheet  # type: ignore
from pathlib import Path


def Generate_pdf(text_file, output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=70,
        rightMargin=70,
        topMargin=60,
        bottomMargin=60,
    )

    f = open(text_file, "r")
    text = f.read()

    styles = getSampleStyleSheet()
    style = styles["Normal"]

    Story = []

    title = "<b>Transcript – ContentIQ.ai</b>"
    Story.append(Paragraph(title, styles["Title"]))
    Story.append(Spacer(1, 24))

    for line in text.split("\n"):

        Story.append(Paragraph(line, style))
        Story.append(Spacer(1, 12))

    doc.build(Story)
