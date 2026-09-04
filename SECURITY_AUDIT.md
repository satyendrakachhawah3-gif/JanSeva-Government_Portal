# JanSeva AI - Security Audit & Compliance Checklist

## Overview
This document outlines the security architecture, encryption standards, and compliance checklist implemented across the JanSeva AI Government Portal.

---

## Security Verification Checklist

| Security Domain | Mechanism | Implementation Status |
| :--- | :--- | :--- |
| **Authentication** | JWT (JSON Web Tokens) with 24h expiration & secret rotation | Verified |
| **Password Protection** | `bcryptjs` with salt rounds = 10 | Verified |
| **Database Access** | Mongoose parameterized queries preventing NoSQL Injection | Verified |
| **CORS Protection** | Whitelisted origin validation for web and admin portals | Verified |
| **File Uploads** | Multer file type filtering (PDF, PNG, JPG only) & size limit (5MB) | Verified |
| **Role Control** | Explicit RBAC middleware (`adminOnly`, `userAuth`) | Verified |
| **Rate Limiting** | IP-based request throttling on sensitive endpoints | Verified |

---

## Data Privacy & PII Handling
- **Aadhaar Masking**: Aadhaar numbers are masked during transmission and stored encrypted.
- **HTTPS Enforced**: Production server enforces SSL/TLS 1.3 encryption.
- **Audit Trails**: Application status changes log officer ID, timestamp, and IP.

---

## Reporting Vulnerabilities
If you discover a security vulnerability within JanSeva AI, please notify the technical security team at `security@janseva.gov.in`.
