"""Speech in (Whisper) and speech out (Piper). Both run locally, both are free."""
import subprocess, tempfile, os
from faster_whisper import WhisperModel
import config
import sys, pathlib

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
    """Returns WAV bytes by running Piper through the same Python that runs the server."""
    model = pathlib.Path(config.PIPER_VOICE)
    if not model.is_absolute():
        model = pathlib.Path(__file__).parent / model   # always relative to the backend folder
    out = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    out.close()
    try:
        try:
            subprocess.run([sys.executable, "-m", "piper", "--model", str(model),
                            "--output_file", out.name],
                           input=text.encode("utf8"), check=True, capture_output=True)
        except subprocess.CalledProcessError as e:
            raise RuntimeError(e.stderr.decode("utf8", "ignore")[-300:])
        with open(out.name, "rb") as f:
            return f.read()
    finally:
        os.unlink(out.name)