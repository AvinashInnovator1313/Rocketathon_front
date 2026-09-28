"""Knowledge base: ChromaDB + Ollama embeddings. Every chunk keeps its slide source."""
import re, pathlib, httpx, chromadb
from chromadb import Documents, EmbeddingFunction, Embeddings
import config


class OllamaEmbed(EmbeddingFunction):
    """Talks to Ollama directly, so no extra ollama package is needed."""

    def __init__(self):
        pass

    def __call__(self, input: Documents) -> Embeddings:
        r = httpx.post(f"{config.OLLAMA_URL}/api/embed", timeout=120,
                       json={"model": config.EMBED_MODEL, "input": list(input)})
        r.raise_for_status()
        return r.json()["embeddings"]

    @staticmethod
    def name() -> str:
        return "ollama_httpx"

    def get_config(self):
        return {}

    @staticmethod
    def build_from_config(config_dict):
        return OllamaEmbed()


_client = chromadb.PersistentClient(path=config.CHROMA_DIR)
_col = _client.get_or_create_collection("saleem", embedding_function=OllamaEmbed(),
                                        metadata={"hnsw:space": "cosine"})

def ingest(folder="knowledge"):
    """Split every .md file on '## ' headings. Each chunk needs a 'Source:' line."""
    ids, docs, metas = [], [], []
    seen = {}
    for f in sorted(pathlib.Path(folder).glob("*.md")):
        for block in re.split(r"\n## ", f.read_text(encoding="utf8"))[1:]:
            title, _, body = block.partition("\n")
            m = re.search(r"^Source:\s*(.+)$", body, re.M)
            text = re.sub(r"^Source:.*\n", "", body, flags=re.M).strip()
            base = f"{f.stem}:{title.strip()}"
            seen[base] = seen.get(base, 0) + 1
            ids.append(base if seen[base] == 1 else f"{base}#{seen[base]}")
            docs.append(f"{title.strip()}\n{text}")
            metas.append({"source": m.group(1).strip() if m else f.name})
    old = _col.get()["ids"]          # clear old chunks so deleted sections don't linger
    if old:
        _col.delete(ids=old)
    if ids:
        _col.upsert(ids=ids, documents=docs, metadatas=metas)
    return len(ids)
def retrieve(question: str):
    r = _col.query(query_texts=[question], n_results=config.TOP_K)
    out = []
    for doc, meta, dist in zip(r["documents"][0], r["metadatas"][0], r["distances"][0]):
        out.append({"text": doc, "source": meta["source"], "distance": dist})
    return out