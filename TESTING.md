# JanSeva AI - Testing & QA Verification Guide

## Testing Architecture
This guide provides instructions for executing manual and automated test suites across the JanSeva AI system.

---

## 1. Backend API Endpoint Tests

### Auth Suite
- **POST** `/api/auth/register` - Verify user creation with valid payload & duplicate email rejection.
- **POST** `/api/auth/login` - Test invalid credentials failure vs clean JWT token return.

### Scheme AI Suite
- **GET** `/api/schemes` - Verify scheme listing payload pagination and filtering by category/state.
- **POST** `/api/schemes/recommend` - Test TF-IDF AI algorithm matching against citizen profile attributes.

### Application Processing
- **POST** `/api/applications/apply` - Verify document upload middleware and receipt QR hash creation.
- **GET** `/api/applications/my` - Test user-scoped application retrieval.

---

## 2. Running Automated Tests

```bash
# Backend server tests
cd server
npm test

# Client component tests
cd client
npm test
```

---

## 3. Manual Verification Matrix
1. **Chatbot Test**: Open JanSeva Assistant, type scheme query in Hindi ("कृषि योजनाएं"), verify RAG matching response.
2. **Kendra Locator**: Click "Find Nearest Kendra", verify Leaflet map renders government centers dynamically.
3. **Admin Dashboard**: Log in as Admin, update application status from `Pending` to `Approved`, verify email notification dispatch.
