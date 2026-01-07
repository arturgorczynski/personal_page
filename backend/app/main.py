from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
CV_FILE = DATA_DIR / "cv.json"
PROFILE_FILE = DATA_DIR / "profile.json"
PROJECTS_FILE = DATA_DIR / "projects.json"
PDF_FILE = DATA_DIR / "CV.pdf"
UPLOAD_DIR = DATA_DIR / "uploads"
UPLOAD_PDF = UPLOAD_DIR / "CV.pdf"

app = FastAPI(title="Personal Page API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


def load_cv() -> dict:
    with CV_FILE.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_profile() -> dict:
    with PROFILE_FILE.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_projects() -> list[dict]:
    with PROJECTS_FILE.open(encoding="utf-8") as handle:
        return json.load(handle)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/profile")
def profile() -> dict:
    return load_profile()


@app.get("/api/cv")
def cv() -> dict:
    return load_cv()


@app.get("/api/projects")
def projects() -> list[dict]:
    return load_projects()


@app.get("/api/cv/download")
def download_cv() -> FileResponse:
    pdf_path = UPLOAD_PDF if UPLOAD_PDF.exists() else PDF_FILE
    return FileResponse(path=pdf_path, filename="Artur_Gorczynski_CV.pdf")


@app.post("/api/cv/upload")
async def upload_cv(file: UploadFile = File(...)) -> dict:
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    UPLOAD_PDF.write_bytes(content)
    return {"status": "uploaded", "filename": UPLOAD_PDF.name}
