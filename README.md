# Personal Webpage (Vue + FastAPI)

A dark, elegant personal portfolio site with a JSON-driven CV section and a FastAPI backend for flexible content management.

## Tech Stack

- **Frontend:** Vue 3 + Vite + Bootstrap (dark theme)
- **Backend:** FastAPI (Poetry-managed)
- **Content:** JSON files for easy updates
- **Testing:** Playwright (E2E)

## Security posture (high level)

- **CORS is restricted** via `CORS_ALLOW_ORIGINS` (no `*`).
- **CV upload is disabled** (no public file upload endpoint).
- **Security headers** are set on API responses.
- **API docs are disabled in production** (`ENV=production`).

## Project Structure

```
personal_page/
├── backend/                    # FastAPI + Poetry backend
│   ├── app/
│   │   └── main.py            # API endpoints
│   ├── data/                   # Data files
│   │   ├── cv.json            # CV/resume data
│   │   ├── profile.json       # Profile information
│   │   ├── projects.json      # Projects portfolio
│   │   ├── technologies.json  # Technology timeline data
│   │   ├── info_points.json   # Welcome page info points
│   │   └── evangelist.json    # TechDemocracy panels
│   └── pyproject.toml         # Python dependencies
├── frontend/                   # Vue + Vite frontend
│   ├── src/
│   │   ├── composables/       # Reusable Vue composables
│   │   │   ├── useApi.js      # API data fetching
│   │   │   ├── useParticles.js # Particle system
│   │   │   └── useTimeline.js  # Timeline calculations
│   │   ├── pages/             # Page components
│   │   ├── styles/            # CSS modules
│   │   │   ├── variables.css  # Design tokens
│   │   │   ├── base.css       # Base styles
│   │   │   ├── navigation.css # Nav styles
│   │   │   ├── cards.css      # Card components
│   │   │   ├── timeline.css   # Timeline styles
│   │   │   ├── welcome.css    # Welcome page
│   │   │   ├── transitions.css # Animations
│   │   │   ├── responsive.css # Media queries
│   │   │   └── index.css      # CSS aggregator
│   │   ├── App.vue            # Root component
│   │   ├── router.js          # Vue Router (lazy loading)
│   │   └── main.js            # Entry point
│   ├── tests/e2e/             # Playwright tests
│   └── package.json           # Node dependencies
└── README.md
```

## Prerequisites

- **Python:** 3.11+
- **Node.js:** 18+
- **Poetry:** Latest version

### Install Poetry

**Windows (PowerShell):**
```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

**Ubuntu/macOS:**
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

## Installation

### Backend

```bash
cd backend
poetry install
```

### Frontend

```bash
cd frontend
npm install
```

## Running Locally

### Backend

```bash
cd backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at `http://localhost:8000`. Swagger docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`.

Set the API base URL if needed:
```bash
# macOS/Linux
export VITE_API_BASE_URL="http://localhost:8000"

# Windows PowerShell
$env:VITE_API_BASE_URL="http://localhost:8000"
```

### Backend security configuration

Set allowed frontend origins (comma-separated):

```bash
# macOS/Linux
export CORS_ALLOW_ORIGINS="http://localhost:5173,https://your-frontend-domain"

# Windows PowerShell
$env:CORS_ALLOW_ORIGINS="http://localhost:5173,https://your-frontend-domain"
```

Disable API docs in production:

```bash
# macOS/Linux
export ENV=production

# Windows PowerShell
$env:ENV="production"
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/profile` | GET | Profile information |
| `/api/cv` | GET | CV/resume data |
| `/api/projects` | GET | Projects portfolio |
| `/api/technologies` | GET | Technology timeline |
| `/api/info-points` | GET | Welcome page info points |
| `/api/evangelist` | GET | TechDemocracy panels |
| `/api/photo` | GET | Profile photo |
| `/api/cv/download` | GET | Download CV PDF |
| (disabled) `/api/cv/upload` | POST | Upload new CV PDF |

## Update Content

All content is stored in JSON files under `backend/data/`:

| File | Description |
|------|-------------|
| `profile.json` | Name, role, contact info, links |
| `cv.json` | Experience, skills, education, certifications |
| `projects.json` | Project portfolio |
| `technologies.json` | Technology timeline data |
| `info_points.json` | Welcome page info points |
| `evangelist.json` | TechDemocracy panels |

Edit these files and refresh the page - changes are reflected immediately.

## Testing

### Run E2E Tests

```bash
cd frontend
npx playwright test
```

### Run with UI

```bash
cd frontend
npx playwright test --ui
```

## Deployment

### Backend

Deploy to Railway, Render, Fly.io, or any Python hosting:

```bash
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

Build for production:

```bash
cd frontend
npm run build
```

Deploy the `frontend/dist` folder to Netlify, Vercel, or similar. Set:
```
VITE_API_BASE_URL=https://your-backend-url
```

## Upload CV PDF

```bash
curl -X POST -F "file=@/path/to/CV.pdf" http://localhost:8000/api/cv/upload
```

Uploaded PDFs are stored at `backend/data/uploads/CV.pdf` and served automatically.

> Note: Uploads are currently disabled in the backend for security hardening.

## Architecture Notes

- **Composables:** Reusable logic extracted into `useApi`, `useParticles`, `useTimeline`
- **Lazy Loading:** Routes are lazy-loaded for faster initial page load
- **CSS Modules:** Styles organized by function for maintainability
- **Data Decoupling:** All content stored in backend JSON files, served via API

## Security checklist (ops)

- Serve both frontend and backend over **HTTPS** in production (terminate TLS at your proxy/host).
- Run dependency audits periodically:
  - `backend/`: `poetry show --outdated` (and update regularly)
  - `frontend/`: `npm audit` (and update regularly)
- Keep `CORS_ALLOW_ORIGINS` to the smallest set of real origins.
