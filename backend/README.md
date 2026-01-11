# Personal Page API

FastAPI backend for the personal webpage.

## Installation

```bash
poetry install
```

## Running

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, access interactive docs at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/profile` | GET | Profile information |
| `/api/cv` | GET | CV/resume data |
| `/api/projects` | GET | Projects portfolio |
| `/api/technologies` | GET | Technology timeline |
| `/api/info-points` | GET | Welcome page info points |
| `/api/evangelist` | GET | TechDemocracy panels |
| `/api/photo` | GET | Profile photo (image/jpeg) |
| `/api/cv/download` | GET | Download CV PDF |
| (disabled) `/api/cv/upload` | POST | Upload new CV PDF |

## Data Files

All data is stored in `data/`:

| File | Description |
|------|-------------|
| `profile.json` | Name, role, contact info, links, highlights |
| `cv.json` | Summary, personal info, skills, experience, education, certifications, hobbies |
| `projects.json` | Array of project objects with name, summary, stack, impact, descriptions |
| `technologies.json` | Array of technology objects with name, start date, description |
| `info_points.json` | Array of info point objects for welcome page (title, body, offset, top) |
| `evangelist.json` | Array of panel objects for TechDemocracy page (title, body) |
| `artur.jpg` | Profile photo |

## File Structure

```
backend/
├── app/
│   ├── __init__.py
│   └── main.py         # FastAPI application
├── data/
│   ├── cv.json
│   ├── profile.json
│   ├── projects.json
│   ├── technologies.json
│   ├── info_points.json
│   ├── evangelist.json
│   ├── artur.jpg
│   └── uploads/        # Uploaded files (CV PDFs)
├── pyproject.toml
└── README.md
```

## Adding New Endpoints

1. Add data file loader function in `main.py`
2. Create the API endpoint with `@app.get()` or `@app.post()`
3. Update frontend to consume the new endpoint