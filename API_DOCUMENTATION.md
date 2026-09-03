# JanSeva AI REST API Reference Documentation

## Authentication Endpoints (`/api/auth`)
- `POST /api/auth/register` — Citizen demographic registration
- `POST /api/auth/login` — Sign in and receive JWT token
- `GET /api/auth/me` — Get current logged in user & profile
- `PUT /api/auth/profile` — Update demographic details

## Scheme Endpoints (`/api/schemes`)
- `GET /api/schemes` — Search and filter schemes
- `GET /api/schemes/:id` — Get single scheme details
- `POST /api/schemes/recommend` — AI recommendation scan
- `POST /api/schemes/eligibility-check` — Interactive wizard evaluator

## Application Endpoints (`/api/applications`)
- `POST /api/applications` — Submit new scheme application
- `GET /api/applications/my-applications` — Citizen application history
- `GET /api/applications` — Officer verification queue
- `PATCH /api/applications/:id/status` — Officer status sign-off
- `POST /api/applications/upload-document` — Supporting document upload

## AI Assistant (`/api/assistant`)
- `POST /api/assistant/chat` — RAG-powered chatbot inquiry
