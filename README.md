# IntelliMatch: AI Resume Analyzer & Job Matching System

A full-stack web application that analyzes resume text, gives it a score, points out weak areas, suggests improvements, and matches the resume against job postings based on skills.

Built as a college project for **IT – Web Application Development (WAD)**.

---

## Features

- **User accounts** – register and log in with JWT-based authentication. Passwords are hashed with bcrypt.
- **Resume analysis** – paste resume text and get:
  - detected technical skills (JavaScript, React, Node, MongoDB, Python, Java, HTML, CSS, Git)
  - a **resume score** (0–100)
  - **issues** found (e.g. too short, no projects, no work experience, few skills)
  - **suggestions** (e.g. add measurable achievements, highlight teamwork, use action verbs)
- **Dashboard** – view, edit, and delete your saved resumes (paginated, 5 per page). Editing a resume re-runs the analysis.
- **Job matching** – compares a resume's skills with each job's required skills and shows:
  - match percentage and level (**High** ≥ 80%, **Moderate** ≥ 50%, **Low**)
  - matched skills and missing skills
  - results sorted from best to worst match
- **Security** – Helmet security headers, rate limiting (100 requests / 15 min per IP), input validation, and ownership checks so users can only access their own resumes.

> **Note:** The "AI" analysis is currently a **rule-based keyword analyzer** ([backend/services/aiService.js](backend/services/aiService.js)). It can be swapped for a real AI/LLM service later without changing the rest of the app.

---

## Tech Stack

### Languages
- **JavaScript** (Node.js on the backend, React/JSX on the frontend)
- **HTML** and **CSS**

### Frontend — [frontend/ai-resume-system](frontend/ai-resume-system)
| Technology | Purpose |
|---|---|
| React 19 | User interface |
| Vite | Development server and build tool |
| React Router | Page routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests to the backend API |
| Lucide React | Icons |
| ESLint | Code linting |

### Backend — [backend](backend)
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and data models |
| JSON Web Token (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| Helmet | Security HTTP headers |
| express-rate-limit | Rate limiting |
| CORS | Allows the frontend to call the API |
| dotenv | Environment variables |
| Nodemon | Auto-restart during development |

### Tools
- Visual Studio Code
- Git & GitHub
- npm
- MongoDB (local or MongoDB Atlas)

---

## Project Structure

```
AI Resume Analyzer/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/            # Auth, resume, and job logic
│   ├── middleware/             # JWT auth middleware
│   ├── models/                 # User, Resume, Job schemas
│   ├── routes/                 # API routes
│   ├── services/aiService.js   # Resume analysis (skills, issues, suggestions)
│   ├── utils/matchUtils.js     # Skill match score helper
│   └── server.js               # App entry point
└── frontend/
    └── ai-resume-system/
        └── src/
            ├── components/     # Navbar, ResumeCard, JobCard
            ├── pages/          # Login, Register, Dashboard, Upload, Matches
            ├── services/api.js # Axios instance with token handling
            └── App.jsx         # Routes
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/) running locally, or a MongoDB Atlas connection string

### 1. Backend

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env` and fill in your own values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend/ai-resume-system
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## API Endpoints

All `/api/resumes` and `/api/jobs` routes need the header `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in and receive a JWT |
| POST | `/api/resumes` | Submit and analyze a resume |
| GET | `/api/resumes?page=1` | List your resumes (paginated) |
| PUT | `/api/resumes/:id` | Update a resume and re-analyze it |
| DELETE | `/api/resumes/:id` | Delete a resume |
| POST | `/api/jobs` | Create a job with required skills |
| GET | `/api/jobs/match/:id` | Match a resume against all jobs |

---

## How Scoring Works

**Resume score** (max 100):
- +15 points for each detected skill
- +20 points if the resume is longer than 150 characters
- +10 points if no issues are found

**Job match score:**
```
match % = (matched skills ÷ required job skills) × 100
```

---

## Author

**Shaine Ella Pines** — IT Web Application Development
