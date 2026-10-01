# JanSeva AI - System Administration & Operational Governance Guide

This manual establishes administrative protocols for platform operators, system administrators, and regional government officer managers.

---

## 1. Administrative Roles & Hierarchy

| Role Title | Scope & Authority |
| :--- | :--- |
| **Super Admin (`super_admin`)** | Full system access: database indexing, server key rotation, user role promotion. |
| **District Officer (`district_officer`)** | Verification officer: approves/rejects citizen scheme applications within assigned state/district. |
| **Support Operator (`support_op`)** | Citizen grievance resolution and helpdesk assistance interface access. |

---

## 2. Admin Onboarding & Role Assignment

To promote an existing registered user to District Officer status:
```bash
# Execute administrative role update via server CLI
node server/scripts/assignRole.js --email="officer.jaipur@janseva.gov.in" --role="district_officer" --state="Rajasthan"
```

---

## 3. System Environment Secrets Rotation
1. **JWT Secret (`JWT_SECRET`)**: Rotate every 90 days. Active sessions will require re-login.
2. **Encryption Key (`ENCRYPTION_KEY`)**: 32-byte hex key for PII field encryption.
3. **Database URI (`MONGODB_URI`)**: Stored in encrypted secret vault (AWS Secrets Manager / Vault).
