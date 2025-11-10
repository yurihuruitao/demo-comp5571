# Vercel Static Files Fix

## Problem
Static files (CSS/JS) are not loading on Vercel, causing the page to display without styles.

## Root Cause
Vercel's serverless function doesn't automatically serve static files like a traditional Flask app. The `static/` folder needs to be explicitly configured.

## Solution Applied

### 1. Updated `vercel.json`
Added static file build configuration:
```json
{
  "builds": [
    {"src": "api/index.py", "use": "@vercel/python"},
    {"src": "static/**", "use": "@vercel/static"}  // NEW!
  ]
}
```

### 2. Alternative Solution (if still not working)
Create a custom route handler in `api/index.py` to serve static files.

## Deploy
```bash
git add vercel.json
git commit -m "Fix static files serving on Vercel"
git push origin main
```

## Verification
After deployment, check:
- https://demo-comp5571.vercel.app/static/style.css (should return CSS)
- https://demo-comp5571.vercel.app/static/script.js (should return JS)

If these URLs return 404, we need plan B.
