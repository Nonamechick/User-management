# User Management System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

A full-stack web application for user management with authentication, featuring a responsive admin panel with user table operations.

## Features

- **User Authentication**: Registration and login with JWT
- **Admin Dashboard**: Manage users with block/unblock and delete functionality
- **Responsive Design**: Built with Bootstrap for all device sizes
- **Secure Operations**: Protected routes and server-side validation
- **Data Management**: Sortable user table with multiple selection

## Tech Stack

- **Frontend**: React, Vite, Bootstrap, Axios
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT, bcrypt
- **Middleware**: CORS, express-validator

## Live Demo

Check out the live demo: [Demo Website](https://user-management-six-orcin.vercel.app)

Watch the video walkthrough: [YouTube Demo](https://youtu.be/-UM2uPr_EUw)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory with:
     ```
     PORT=5000
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. Run database migrations:
   ```bash
   cd server && npx prisma migrate dev
   ```

5. Start the development servers:
   ```bash
   # In one terminal (server)
   cd server && npm run dev

   # In another terminal (client)
   cd client && npm run dev
   ```

## Database Schema

The Prisma schema includes a unique index on the email field to ensure email uniqueness:

```prisma
model User {
  id          Int      @id @default(autoincrement())
  name        String
  email       String   @unique
  password    String
  lastLogin   DateTime?
  status      String   @default("active")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| POST   | /api/auth/register | Register new user               |
| POST   | /api/auth/login    | User login                      |
| GET    | /api/users         | Get all users (protected)       |
| PATCH  | /api/users/block   | Block selected users (protected)|
| PATCH  | /api/users/unblock | Unblock selected users (protected)|
| DELETE | /api/users         | Delete selected users (protected)|
