# Algotrades

Investment platform: a single Next.js app containing the website, the user dashboard,
the admin panel and the REST API.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`.

## Project layout

| Path | What it is |
| --- | --- |
| `src/app/` | Next.js App Router: one folder per page URL, plus the API at `src/app/api/v1/[[...path]]/route.ts` |
| `src/features/`, `src/components/`, `src/layout/`, `src/shared/` | React UI (pages, forms, tables, layouts) |
| `src/store/` | Redux store and RTK Query base API (calls `/api/v1/`) |
| `src/lib/router.tsx` | `Link` / `useNavigate` / `useLocation` helpers on top of Next.js navigation |
| `src/server/` | Backend: models, controllers, routes, auth middleware, emails, profit job |
| `src/server/lib/express.ts` | Small Express-compatible router so the API routes/controllers run inside Next.js |
| `src/instrumentation.ts` | Starts the daily profit scheduler (Agenda) when the server boots |
| `public/images/` | Static images |

## API

All endpoints are unchanged and live under `/api/v1` (for example `POST /api/v1/auth/login`,
`GET /api/v1/user/wallet`, `PUT /api/v1/admin/handle-deposit/:depositId/:status`).
See `src/server/routes/` for the full list.

## Daily profit job

When running with `npm start` on a normal server, the Agenda job runs at 23:50 on weekdays.
On serverless hosting (e.g. Vercel) it is skipped automatically; trigger
`POST /api/v1/cron/calculate-profit` from an external scheduler instead.
Set `ENABLE_PROFIT_SCHEDULER=false` to disable it.
