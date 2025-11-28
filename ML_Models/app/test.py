import whisper # type: ignore

model = whisper.load_model("turbo")   # or "turbo"
print("Model running on:", next(model.parameters()).device)
