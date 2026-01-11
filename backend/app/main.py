from __future__ import annotations

import json
import os
from collections.abc import Sequence
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.models import (
    CvResponse,
    EvangelistPanelResponse,
    HealthResponse,
    InfoPointResponse,
    ProfileResponse,
    ProjectResponse,
    TechnologyResponse,
)
DATA_DIR = Path(__file__).resolve().parents[1] / "data"
CV_FILE = DATA_DIR / "cv.json"
PROFILE_FILE = DATA_DIR / "profile.json"
PROJECTS_FILE = DATA_DIR / "projects.json"
TECHNOLOGIES_FILE = DATA_DIR / "technologies.json"
INFO_POINTS_FILE = DATA_DIR / "info_points.json"
EVANGELIST_FILE = DATA_DIR / "evangelist.json"
PDF_FILE = DATA_DIR / "CV.pdf"
UPLOAD_DIR = DATA_DIR / "uploads"
UPLOAD_PDF = UPLOAD_DIR / "CV.pdf"
PROFILE_PHOTO = DATA_DIR / "artur.jpg"

ENV = os.getenv("ENV", "development").strip().lower()


def is_production() -> bool:
    return ENV in {"prod", "production"}


def parse_cors_allow_origins(raw: str | None) -> list[str]:
    """
    Parse comma-separated CORS origins from an env var.

    - In dev, defaults to Vite's localhost origin.
    - In prod, requires explicit configuration (no implicit localhost).
    """
    if raw is None or not raw.strip():
        return ["http://localhost:5173"] if ENV != "production" else []

    origins = [part.strip() for part in raw.split(",") if part.strip()]
    if ENV != "production" and "http://localhost:5173" not in origins:
        origins.append("http://localhost:5173")
    return origins


ALLOWED_ORIGINS: Sequence[str] = tuple(parse_cors_allow_origins(os.getenv("CORS_ALLOW_ORIGINS")))

DOCS_URL = None if is_production() else "/docs"
REDOC_URL = None if is_production() else "/redoc"

app = FastAPI(
    title="Personal Page API",
    version="0.1.0",
    docs_url=DOCS_URL,
    redoc_url=REDOC_URL,
)


@app.exception_handler(Exception)
async def unhandled_exception_handler(_request: Request, exc: Exception) -> JSONResponse:
    # Avoid leaking internals to callers. In dev you still get useful logs via uvicorn.
    if not is_production():
        raise exc
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)

        # Baseline hardening for API responses.
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault(
            "Permissions-Policy",
            "geolocation=(), microphone=(), camera=()",
        )
        # Note: CSP is most effective on the frontend hosting response (HTML). Still safe to set.
        response.headers.setdefault("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'")

        return response


app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(ALLOWED_ORIGINS),
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
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


def load_technologies() -> list[dict]:
    with TECHNOLOGIES_FILE.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_info_points() -> list[dict]:
    with INFO_POINTS_FILE.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_evangelist() -> list[dict]:
    with EVANGELIST_FILE.open(encoding="utf-8") as handle:
        return json.load(handle)


@app.get("/api/health")
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/api/profile")
def profile() -> ProfileResponse:
    return ProfileResponse.model_validate(load_profile())


@app.get("/api/cv")
def cv() -> CvResponse:
    return CvResponse.model_validate(load_cv())


@app.get("/api/projects")
def projects() -> list[ProjectResponse]:
    return [ProjectResponse.model_validate(item) for item in load_projects()]


@app.get("/api/technologies")
def technologies() -> list[TechnologyResponse]:
    return [TechnologyResponse.model_validate(item) for item in load_technologies()]


@app.get("/api/info-points")
def info_points() -> list[InfoPointResponse]:
    return [InfoPointResponse.model_validate(item) for item in load_info_points()]


@app.get("/api/evangelist")
def evangelist() -> list[EvangelistPanelResponse]:
    return [EvangelistPanelResponse.model_validate(item) for item in load_evangelist()]


@app.get("/api/cv/download")
def download_cv() -> FileResponse:
    pdf_path = UPLOAD_PDF if UPLOAD_PDF.exists() else PDF_FILE
    return FileResponse(path=pdf_path, filename="Artur_Gorczynski_CV.pdf")


@app.get("/api/photo")
def profile_photo() -> FileResponse:
    if not PROFILE_PHOTO.exists():
        raise HTTPException(status_code=404, detail="Profile photo not found.")
    return FileResponse(path=PROFILE_PHOTO, media_type="image/jpeg")
