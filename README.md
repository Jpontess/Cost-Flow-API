# CostFlow API

RESTful API for personal expense management. Track fixed and variable expenses with JWT authentication.

## Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL (Neon)
- bcrypt + JWT
- class-validator

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)

### Installation

```bash
git clone https://github.com/Jpontess/Cost-Flow-API.git
cd Cost-Flow-API
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
BD_PRODUCTION=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your_secret_key
PORT=3000
```

### Run

```bash
# development
npm run dev

# production
npm run build
npm start
```

## Project Structure

```
src/
├── @types/         # Express type extensions
├── controllers/    # Request handlers
├── database/       # PostgreSQL connection
├── middlewares/    # Auth and validation
├── models/         # Interfaces and DTOs
├── routes/         # API routes
├── service/        # Business logic
└── main.ts
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/user/register` | Register a new user |
| POST | `/auth/user/login` | Login and get JWT token |

### Expenses

> All routes require `Authorization: Bearer <token>` header

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/expense/` | List all expenses |
| POST | `/expense/create` | Create a new expense |
| PATCH | `/expense/edited/:id` | Update an expense |
| DELETE | `/expense/deleted/:id` | Delete an expense |
| GET | `/expense/total` | Total expenses |
| GET | `/expense/type` | Total by type (fixed/variable) |
| GET | `/expense/month` | Total by month |
| GET | `/expense/average` | Average expenses |
