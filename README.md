# NxtWave Growth Challenge App

Full-stack implementation of the workshop registration and referral asset.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Recharts
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (demo memory mode when `MONGODB_URI` is not configured)
- Deployment target: Vercel for `client`, Render for `server`

## Run locally

1. Install Node.js 20+ and MongoDB or create a MongoDB Atlas database.
2. Copy `.env.example` to `server/.env` and set `MONGODB_URI`.
3. Run `npm install` at the repository root.
4. Run `npm run dev`.
5. Open `http://localhost:5173` for registration or `http://localhost:5173/dashboard` for analytics.

Without MongoDB credentials, the API deliberately uses two demo records in memory so the UI and dashboard can be reviewed immediately. Set `VITE_API_URL` in `client/.env` when the API is deployed separately.

## API

- `POST /api/registrations`: validates and stores registration, source, referral code, and UTM fields.
- `GET /api/analytics`: returns totals, referral count, source mix, daily counts, and recent registrations.
- `GET /api/health`: reports API and database mode.

The dashboard is intentionally a demo admin surface without authentication. For production, add an admin identity provider or signed session before exposing `/dashboard` publicly.