---
title: Configuration & Environment
icon: sliders
---

# Configuration & Environment

## 3.1 Environment Variables

Keep your configuration secure and organized with proper environment variable naming.

### Naming Rules

**Use the VITE\_ prefix:**

* `VITE_` for all environments (development and production)

**Make names descriptive:**

```bash
# ❌ Vague and confusing
VITE_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com

# ✅ Clear and descriptive
VITE_SETTINGS_MEMBER_ADMIN_API=https://dev-api-settings-member-admin.example.com
```

**Stay consistent:** Use the VITE\_ prefix for all environment variables across environments.
