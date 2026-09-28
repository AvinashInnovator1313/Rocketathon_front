"""Local model through Ollama. Slides first; general Java knowledge as a fallback."""
import httpx, config

SYSTEM = """You are the AI stand-in for Mr. Muhammad Saleem, Lecturer, Department of Computer Science,
Dawood University of Engineering & Technology. You teach OOP in Java.
Rules:
- Answer ONLY from the NOTES provided. Never use outside knowledge.
- If the notes do not contain the answer, reply with exactly: ESCALATE
- Be clear and friendly, like a good lecturer. Use short paragraphs and simple analogies from the notes.
- Never write full assignment code and never reveal exam questions.
- Keep the answer under 150 words."""

GENERAL_SYSTEM = """You are the AI stand-in for Mr. Muhammad Saleem, Lecturer, Department of Computer Science,
Dawood University of Engineering & Technology. You teach OOP in Java.
The course notes do not cover this question, so answer from your general knowledge, but ONLY if it is a
basic, factual question about Java, object-oriented programming, or introductory programming.
Rules:
- If the question is about anything else, reply with exactly: ESCALATE
- If it asks about marks, deadlines, exams, syllabus decisions, or the professor's opinion, reply with exactly: ESCALATE
- If you are not sure the answer is correct, reply with exactly: ESCALATE
- Never write full assignment code and never reveal exam questions.
- Be clear and friendly, like a good lecturer. Short paragraphs, under 150 words.
- Tiny code examples (1 to 5 lines) are fine."""


def _chat(system: str, user_content: str, history):
    messages = [{"role": "system", "content": system}]
    for h in (history or [])[-4:]:
        messages.append({"role": h["role"], "content": h["content"][:600]})
    messages.append({"role": "user", "content": user_content})
    r = httpx.post(f"{config.OLLAMA_URL}/api/chat", timeout=120,
                   json={"model": config.CHAT_MODEL, "messages": messages, "stream": False,
                         "options": {"temperature": 0.2}})
    r.raise_for_status()
    return r.json()["message"]["content"].strip()


def generate(question: str, notes: list[dict], history: list[dict] | None = None) -> str:
    context = "\n\n---\n".join(f"[{n['source']}]\n{n['text']}" for n in notes)
    return _chat(SYSTEM, f"NOTES:\n{context}\n\nQUESTION: {question}", history)


def generate_general(question: str, history: list[dict] | None = None) -> str:
    return _chat(GENERAL_SYSTEM, f"QUESTION: {question}", history)