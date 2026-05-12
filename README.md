# RB Developers Real Estate Platform

Full-stack real estate app for Pakistan with a public showcase website and authenticated admin portal.

## Stack

- Next.js frontend and admin portal
- Express.js API
- MongoDB with Mongoose
- JWT auth with admin/user roles

## Setup

Use Node.js 18.18 or newer. The bundled verification here used Node.js 24.

1. Copy environment files:
   - `server/.env.example` to `server/.env`
   - `client/.env.example` to `client/.env.local`
2. Install dependencies:
   `npm install`
3. Seed demo data:
   `npm run seed`
4. Start both apps:
   `npm run dev`

Default admin:

- Email: `admin@rbdevelopers.pk`
- Password: `Admin12345!`

## URLs

- Public website: `http://localhost:3000`
- Admin portal: `http://localhost:3000/admin`
- API: `http://localhost:5000/api`

## Docker Backend

Start the Express API:

`docker compose up --build api`

Seed the admin user and demo data:

`docker compose --profile seed run --rm seed`
