"""Stand-in API.  Run:  uvicorn main:app --reload --port 8000"""
import json, time, pathlib
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import rules, rag, llm, voice, config

app = FastAPI(title="Saleem Stand-In")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
REVIEWS = pathlib.Path("reviews.jsonl")


class Ask(BaseModel):
    q: str
    history: list[dict] = []


class Review(BaseModel):
    q: str
    answer: str
    type: str
    mark: str   # agree | disagree | should_escalate


@app.get("/api/health")
def health():
    return {"ok": True, "model": config.CHAT_MODEL, "chunks": rag._col.count()}


@app.post("/api/ask")
def ask(body: Ask):
    q = body.q.strip()[:500]
    if not q:
        raise HTTPException(400, "Empty question")

    # 1. Judgement rules first. No model involved, so they cannot be talked around.
    hit = rules.check_escalation(q)
    if hit:
        return hit

     # 2. Try the professor's slides first.
    notes = [n for n in rag.retrieve(q) if n["distance"] <= config.MAX_DISTANCE]

    try:
        text, general = "ESCALATE", False
        if notes:
            text = llm.generate(q, notes, body.history)
        # 3. Slides missing or unhelpful: fall back to general Java/OOP knowledge.
        if text.strip().upper().startswith("ESCALATE"):
            text = llm.generate_general(q, body.history)
            general = True
    except Exception as e:
        raise HTTPException(503, f"Model unavailable (is Ollama running?): {e}")

    if text.strip().upper().startswith("ESCALATE"):
        return rules.outside_scope()

    sources = ["General Java knowledge (not from slides)"] if general \
        else sorted({n["source"] for n in notes})
    return {"type": "ans", "text": text, "cat": None, "sources": sources, "general": general}