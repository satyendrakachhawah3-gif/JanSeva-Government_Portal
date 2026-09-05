# JanSeva AI - System Architecture & Data Flow

## System Overview
JanSeva AI is a multi-tier public service portal designed to bridge citizens with government welfare schemes through intelligent RAG recommendations, multi-lingual natural language assistance, GIS-based center mapping, and automated application status tracking.

---

## Technical Stack Architecture

```
[ User Browser / Mobile Web ]
            │
            ▼
┌─────────────────────────┐
│     React 18 + Vite     │  <-- Client Layer (TailwindCSS, Recharts, Leaflet GIS)
└───────────┬─────────────┘
            │  REST API / Dynamic CORS
            ▼
┌─────────────────────────┐
│   Node.js + Express API │  <-- Server Layer (JWT Auth, Multer, Rate Limiter)
└─────┬──────────────┬────┘
      │              │
      ▼              ▼
┌───────────┐  ┌──────────────┐
│ MongoDB   │  │ RAG NLP      │  <-- Data Layer & Recommendation Engine
│ Database  │  │ TF-IDF Engine│
└───────────┘  └──────────────┘
```

---

## Core System Modules

1. **AI Scheme Recommendation Engine**: Uses Term Frequency-Inverse Document Frequency (TF-IDF) scoring to analyze user demographic profiles (income, category, state, age, occupation) and surface top eligible schemes.
2. **JanSeva Chatbot Assistant**: Multi-lingual assistant with Hindi & English voice synthesis and contextual intent extraction for real-time scheme query resolution.
3. **Seva Kendra GIS Mapping**: Leaflet-based interactive mapping for locating nearby government facilitation centers based on user geolocation coordinates.
4. **Receipt & Application Processing**: Digital receipt generator with verification hashes and status tracking dashboard for citizens and government officers.
