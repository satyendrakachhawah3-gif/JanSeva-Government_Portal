# JanSeva AI - Infrastructure Maintenance & Database Backup Protocol

This operational manual covers routine maintenance workflows, database backup procedures, and server monitoring tasks for JanSeva AI system administrators.

---

## 1. MongoDB Database Backup & Restore

### Automated Nightly Dump
```bash
# Export JanSeva database archive with timestamp
mongodump --uri="mongodb://localhost:27017/janseva" --archive=/var/backups/janseva_$(date +%Y%m%d).gz --gzip
```

### Database Restore Procedure
```bash
# Restore from compressed archive
mongorestore --uri="mongodb://localhost:27017/janseva" --archive=/var/backups/janseva_20260927.gz --gzip --drop
```

---

## 2. Server Log Rotation & Housekeeping
- Backend logs are stored in `server/logs/*.log`.
- Logrotate configuration runs weekly to compress logs older than 7 days and delete logs older than 90 days.

---

## 3. Database Indexing Maintenance
Ensure the following compound indexes exist on production MongoDB collections:
```javascript
// Schemes collection text index for TF-IDF RAG search
db.schemes.createIndex({ title: "text", description: "text", eligibility: "text" });

// Applications collection query index
db.applications.createIndex({ userId: 1, createdAt: -1 });
db.applications.createIndex({ applicationId: 1 }, { unique: true });
```
