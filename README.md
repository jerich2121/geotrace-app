# GeoTrace — IP Geolocation App

A full-stack web application that lets authenticated users look up IP geolocation data with a searchable history, built on React, Express.js, and PostgreSQL.

---

## Tech Stack

| Layer    | Technology                         |
|----------|------------------------------------|
| Frontend | React 18, React Router 6, Leaflet  |
| Backend  | Express.js (Node.js)               |
| Database | PostgreSQL via Prisma ORM          |
| Auth     | JWT (jsonwebtoken + bcryptjs)      |
| Geo API  | ipinfo.io                          |

---

## Project Structure

```
/
├── backend/          # Express.js REST API
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── prisma/
│       └── routes/
└── frontend/         # React SPA
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        ├── services/
        └── styles/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

---

### Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create .env from example
cp .env.example .env
# Edit .env and fill in your DATABASE_URL and JWT_SECRET

# 3. Generate Prisma client
npx prisma generate --schema=src/prisma/schema.prisma

# 4. Run migrations
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma

# 5. Seed the database (creates two demo users)
npm run seed

# 6. Start the server
npm run dev
```

Server runs on: `http://localhost:8000`

---

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Create .env from example
cp .env.example .env
# Optionally fill in REACT_APP_IPINFO_TOKEN for higher rate limits

# 3. Start the dev server
npm start
```

App runs on: `http://localhost:3000`

---

## Demo Credentials

| Email               | Password    |
|---------------------|-------------|
| admin@example.com   | password123 |
| john@example.com    | password123 |

---

## API Endpoints

### Auth

| Method | Endpoint        | Auth | Description          |
|--------|-----------------|------|----------------------|
| POST   | /api/auth/login | —    | Login with credentials |
| GET    | /api/auth/me    | JWT  | Get current user     |

### History

| Method | Endpoint      | Auth | Description             |
|--------|---------------|------|-------------------------|
| GET    | /api/history  | JWT  | Get search history      |
| POST   | /api/history  | JWT  | Add a search entry      |
| DELETE | /api/history  | JWT  | Delete selected entries |

---

## Features

- JWT-based authentication with persistent sessions (localStorage)
- Auto-redirect to login if unauthenticated; to home if already logged in
- IP lookup via ipinfo.io displaying city, region, country, org, timezone, etc.
- Interactive Leaflet map pinning the location
- Search history stored in PostgreSQL per user
- Click any history entry to reload its geo data
- Multi-select checkboxes to delete history in bulk
- Clear search reverts display to your own IP data
- Validation for IP format before API call
- Responsive layout (desktop-first)
