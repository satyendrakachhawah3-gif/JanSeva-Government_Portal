# JanSeva AI - API Lifecycle & Deprecation Policy

## Overview
This policy defines the versioning guidelines and retirement schedules for public and internal REST API endpoints exposed by the JanSeva AI Government Portal to third-party government department integrations and client applications.

---

## API Versioning Scheme
JanSeva AI APIs utilize URI path versioning (e.g. `/api/v1/schemes`).
- **Major versions** (`v1`, `v2`): Represent breaking contract changes requiring migration.
- **Minor additions**: Backwards-compatible field additions introduced without incrementing URI path.

---

## Deprecation Schedule & Lifecycle Stages

| Stage | Duration | Notice & Requirements |
| :--- | :--- | :--- |
| **Active** | Standard operational period | Fully supported, receives security patches and feature updates. |
| **Deprecated** | Minimum 6 Months | `Sunset` and `Deprecation` HTTP headers included in API responses. Partners notified via portal announcement. |
| **End of Life (EOL)** | Permanent | Endpoint returns `410 Gone` status code with migration URI pointer. |

---

## Deprecation Headers Standard
Deprecated endpoints will respond with the following RFC 8594 standard headers:
```http
Deprecation: @1790812800
Sunset: Sun, 01 Nov 2026 00:00:00 GMT
Link: <https://janseva.gov.in/docs/api/migration>; rel="deprecation"
```
