import whisper  #type: ignore

model = whisper.load_model("turbo", device="cuda" )