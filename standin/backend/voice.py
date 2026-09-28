"""Speech in (Whisper) and speech out (Piper). Both run locally, both are free."""
import subprocess, tempfile, os
from faster_whisper import WhisperModel
import config

_whisper = None


def transcribe(audio_bytes: bytes, suffix=".webm", language=None) -> str:
    global _whisper
    if _whisper is None:   # lazy load: first call downloads the model once
        _whisper = WhisperModel(config.WHISPER_SIZE, device="cpu", compute_type="int8")
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as f:
        f.write(audio_bytes)
        path = f.name
    try:
        segments, _ = _whisper.transcribe(path, language=language, vad_filter=True)
        return " ".join(s.text.strip() for s in segments).strip()
    finally:
        os.unlink(path)


def synthesize(text: str) -> bytes:
    """Returns WAV bytes using the piper CLI installed by `pip install piper-tts`."""
    out = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    out.close()
    try:
        subprocess.run(["piper", "--model", config.PIPER_VOICE, "--output_file", out.name],
                       input=text.encode("utf8"), check=True, capture_output=True)
        return open(out.name, "rb").read()
    finally:
        os.unlink(out.name)
