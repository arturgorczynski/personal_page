# Personal Webpage (Vue + FastAPI)

A dark, elegant personal site with a CSV-driven CV section and a FastAPI backend to keep content easily up to date.

## Tech Stack
- **Frontend:** Vue 3 + Vite + Bootstrap (dark theme).
- **Backend:** FastAPI (Poetry-managed).
- **Content:** CSV + JSON for flexible updates.

## Project Structure
```
backend/   # FastAPI + Poetry
frontend/  # Vue + Vite UI
```

## Quickstart (Clone & Run)
```bash
git clone <your-repo-url>
cd personal_page
```
Then follow the dependency install and run steps below for backend and frontend.

## Prerequisites
- **Windows 11:** Install Python 3.11+, Node.js 18+, and Poetry.
- **Ubuntu:** Install Python 3.11+, Node.js 18+, and Poetry.

### Install Poetry
- **Windows (PowerShell):**
  ```powershell
  (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
  ```
- **Ubuntu:**
  ```bash
  curl -sSL https://install.python-poetry.org | python3 -
  ```

Ensure Poetry is on your PATH (restart terminal if needed).

## Install Dependencies

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

## Run Locally

### Backend
```bash
cd backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run dev
```

Set the API base URL if needed:
```bash
# macOS/Linux
export VITE_API_BASE_URL="http://localhost:8000"

# Windows PowerShell
$env:VITE_API_BASE_URL="http://localhost:8000"
```

## Update Content
- **CV data:** `backend/data/cv.csv`
- **Profile info:** `backend/data/profile.json`
- **Projects:** `backend/data/projects.json`
- **CV PDF:** `backend/data/CV.pdf` (add locally; not committed)
- **Uploaded CV PDF:** `backend/data/uploads/CV.pdf` (overrides the default when present; not committed)

Refreshing the page will re-render the new data automatically.

## Expose Over the Internet

### Backend
Run with a public bind and open firewall rules:
```bash
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```
Use a service like **Railway**, **Render**, or **Fly.io** for production hosting.

### Frontend
Build the site and deploy to **Netlify**:
```bash
cd frontend
npm run build
```
Upload the `frontend/dist` folder to Netlify. Set an environment variable in Netlify:
```
VITE_API_BASE_URL=https://your-backend-url
```

## Upload a New CV PDF
You can replace the CV PDF without changing the repository:
```bash
curl -X POST -F "file=@/path/to/CV.pdf" http://localhost:8000/api/cv/upload
```
The latest upload is stored at `backend/data/uploads/CV.pdf` and is served automatically.

## Notes
- The CV page is CSV-driven so updates are fast and repeatable.
- PostgreSQL/Redis can be added later; the code is structured to add new data sources or services.
