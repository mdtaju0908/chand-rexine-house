# Chand Rexine House

Full-stack web application for Chand Rexine House with:
- `frontend`: React + Vite + Tailwind admin/public UI
- `backend`: Node.js + Express + MongoDB REST API

## Project Structure

```text
CHAND REXINE HOUSE/
|- backend/    # Express API, MongoDB models, auth, content management
|- frontend/   # React app (public website + admin dashboard)
```

## Core Features

- Product catalog with search and top products
- Dealer and retail enquiry management
- Dealer directory management
- Manufacturing status/order tracking
- WhatsApp template management
- Analytics dashboard endpoint
- CMS-style content management endpoints
- Cloudinary image upload support
- JWT-based admin authentication

## Tech Stack

### Frontend
- React 18
- Vite 5
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Cloudinary + Multer

## Environment Variables (`backend/.env`)

Create a `.env` file inside `backend`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Local Setup

### 1) Install Dependencies

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

### 2) Run Backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3) Run Frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

## Available Scripts

### Backend (`backend/package.json`)
- `npm run dev`: Start backend with nodemon
- `npm start`: Start backend with node

### Frontend (`frontend/package.json`)
- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## API Route Groups

Base URL: `http://localhost:5000/api`

- `/auth`
- `/products`
- `/enquiries`
- `/dealers`
- `/manufacturing`
- `/whatsapp-templates`
- `/analytics`
- `/upload`
- `/content`

## Notes

- Frontend Axios base URL is set to `http://localhost:5000/api`.
- Most admin routes require `Authorization: Bearer <token>`.
- Seeder file (`backend/seeder.js`) can import/destroy initial data.
