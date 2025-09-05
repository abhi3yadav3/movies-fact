# SCOWTT – Movies App (Next.js + Auth.js + Prisma + OpenAI)

A minimal web app that supports Google sign‑in, first‑time favorite movie capture, and a fresh fun fact on every refresh.

# Stack

- Next.js (App Router) + TypeScript
- Auth.js/NextAuth v5 (Google OAuth) with Prisma Adapter
- Postgres (Supabase)
- OpenAI Responses API (server‑only)

# Things you need to add in .env
Create a .env file
## Database 
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[your].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"

## App URL (keep a single origin end‑to‑end)
NEXTAUTH_URL=http://localhost:3000
AUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true

## Secrets
AUTH_SECRET=[npx auth secret]
NEXTAUTH_SECRET=[same as above]

## Google OAuth (from Google Cloud → Credentials)
AUTH_GOOGLE_ID=[client_id]
AUTH_GOOGLE_SECRET=[client_secret]

## OpenAI API Key
OPENAI_API_KEY=[openai api key]

# Quickstart

```bash
npm install
npx prisma migrate deploy   # or: npx prisma migrate dev
npm run dev
# open http://localhost:3000/login
```
