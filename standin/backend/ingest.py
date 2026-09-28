"""Run once, and again after editing anything in knowledge/:  python ingest.py"""
import rag
print("Ingested chunks:", rag.ingest())
