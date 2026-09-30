# JanSeva AI - System Troubleshooting & Diagnostic Guide

This guide provides step-by-step diagnostic workflows for resolving common operational issues across the JanSeva AI stack.

---

## 1. Database & Connection Issues

### Symptom: `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`
- **Cause**: MongoDB service is stopped or port `27017` is blocked.
- **Resolution**:
  ```bash
  # Check MongoDB service status on Windows
  net start MongoDB
  
  # Check connection string in server/.env
  MONGODB_URI=mongodb://localhost:27017/janseva
  ```

---

## 2. JWT Authentication & Session Errors

### Symptom: `401 Unauthorized - Token expired or invalid`
- **Cause**: Client authentication token has passed its 24-hour expiration window or `JWT_SECRET` mismatches.
- **Resolution**:
  - Direct user to log in again to receive a fresh JWT token.
  - Verify `JWT_SECRET` in `server/.env` is consistent across server restarts.

---

## 3. Leaflet GIS Map Glitches

### Symptom: Seva Kendra map tiles fail to render or display gray background.
- **Cause**: OpenStreetMap tile server rate limiting or missing tile CSS import.
- **Resolution**:
  - Ensure `leaflet/dist/leaflet.css` is imported in [`ServiceMap.jsx`](file:///d:/JanSeva%20AI%20Governement/client/src/components/map/ServiceMap.jsx).
  - Verify client network connectivity to `https://{s}.tile.openstreetmap.org/`.
