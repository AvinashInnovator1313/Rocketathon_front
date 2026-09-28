# Saleem Stand-In (React + Tailwind, FastAPI, Ollama, ChromaDB, Whisper, Piper)

Everything runs locally and is free. Tested pieces: rules.py logic and Python syntax.
NOT yet tested end to end: Ollama, Chroma, Whisper, Piper and the React build (they need downloads).

## 1. Models (once)
    curl -fsSL https://ollama.com/install.sh | sh          # or the Windows installer
    ollama pull qwen2.5:3b            # or llama3.2:3b
    ollama pull nomic-embed-text      # embeddings for ChromaDB

## 2. Backend
    cd backend
    python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    mkdir voices && python -m piper.download_voices en_US-lessac-medium --data-dir voices
    #   (if the file lands as voices/en_US-lessac-medium.onnx you're set; otherwise set PIPER_VOICE)
    python ingest.py                  # loads knowledge/*.md into ChromaDB
    uvicorn main:app --port 8000

Whisper needs ffmpeg installed (browser audio is webm). First STT call downloads the model.

## 3. Frontend
    cd frontend
    npm install
    npm run dev                       # http://localhost:5173 (proxies /api to :8000)

Open it with Chrome. The microphone needs localhost or https.

## Where the professor's judgement lives
- backend/rules.py            stop rules and hand-off text (plain Python, edited after each interview)
- backend/knowledge/*.md      slide notes, each chunk starts with "## title" and a "Source:" line
- backend/config.py           MAX_DISTANCE decides "outside my slides"; tune it with his 30-answer review
- backend/reviews.jsonl       his agree / disagree / should-escalate marks (your honesty note)

## Config (env vars)
CHAT_MODEL, EMBED_MODEL, WHISPER_MODEL, PIPER_VOICE, MAX_DISTANCE, TOP_K, OLLAMA_URL
