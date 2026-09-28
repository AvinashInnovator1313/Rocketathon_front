import os
OLLAMA_URL   = os.getenv("OLLAMA_URL", "http://localhost:11434")
CHAT_MODEL   = os.getenv("CHAT_MODEL", "qwen2.5:3b")          # or llama3.2:3b
EMBED_MODEL  = os.getenv("EMBED_MODEL", "nomic-embed-text")
WHISPER_SIZE = os.getenv("WHISPER_MODEL", "small")            # tiny/base/small; small handles Urdu accents better
PIPER_VOICE  = os.getenv("PIPER_VOICE", "voices/en_US-lessac-medium.onnx")
CHROMA_DIR   = os.getenv("CHROMA_DIR", "chroma_db")
TOP_K        = int(os.getenv("TOP_K", "3"))
# Chroma cosine distance: lower = closer. Above this the question is treated as outside the slides.
# TUNE THIS with the professor's 30-answer review (start at 0.55).
MAX_DISTANCE = float(os.getenv("MAX_DISTANCE", "0.55"))
