# JanSeva AI Developer Architecture Guide

This document outlines the system architecture and workflow for developers building on **JanSeva AI**.

## 1. RAG & AI Subsystem Architecture
- Knowledge chunk indexing is performed in `server/services/retrievalService.js`.
- Embeddings and term vector similarity calculations are handled in `server/services/embeddingService.js`.
- AI scheme recommendation percentage scores are calculated in `server/services/schemeRecommendationService.js`.

## 2. Document Uploads & DBT Processing
- File uploads are validated via Multer middleware (`server/middleware/uploadMiddleware.js`).
- Files are saved in `/server/uploads` with maximum size limits of 5MB per document.

## 3. Database Models Overview
- `User`: Manages authentication credentials, bcrypt password hashes, and user roles (`CITIZEN`, `OFFICER`, `ADMIN`).
- `CitizenProfile`: Stores demographic metrics including age, annual income, occupation, and welfare flags.
- `GovernmentScheme`: Houses government scheme guidelines, required documents, and eligibility criteria.
- `Application`: Tracks application status history, officer remarks, and document verification states.
