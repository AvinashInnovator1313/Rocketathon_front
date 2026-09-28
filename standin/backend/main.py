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
@app.post("/api/stt")
async def stt(file: UploadFile = File(...), language: str | None = None):
    text = voice.transcribe(await file.read(), language=language)
    return {"text": text}


@app.post("/api/tts")
def tts(body: dict):
    try:
        wav = voice.synthesize(str(body.get("text", ""))[:1200])
    except Exception as e:
        raise HTTPException(503, f"Piper failed: {e}")
    return Response(wav, media_type="audio/wav")


@app.get("/api/rules")
def get_rules():
    return [{"cat": r["cat"], "why": r["why"], "do": r["do"]} for r in rules.RULES]


@app.post("/api/review")
def add_review(r: Review):
    with REVIEWS.open("a", encoding="utf8") as f:
        f.write(json.dumps({**r.model_dump(), "t": time.time()}, ensure_ascii=False) + "\n")
    return {"ok": True}


@app.get("/api/review")
def list_reviews():
    if not REVIEWS.exists():
        return {"items": [], "agree": 0, "disagree": 0, "should_escalate": 0}
    items = [json.loads(l) for l in REVIEWS.read_text(encoding="utf8").splitlines() if l.strip()]
    c = lambda m: sum(i["mark"] == m for i in items)
    return {"items": items, "agree": c("agree"), "disagree": c("disagree"), "should_escalate": c("should_escalate")}