# Image Review App

A web app where users can upload images and an admin can review them (accept, reject, or keep pending).

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Cloudinary
- **Frontend:** React, Tailwind CSS, Axios, React Router

## Project Structure

```
Image Operation/
├── .gitignore                    # Files Git should ignore
├── README.md                     # This file
│
├── backend/                      # ----- BACKEND (API Server) -----
│   ├── .env                      # Environment variables (secret keys)
│   ├── package.json              # Backend dependencies & scripts
│   ├── index.js                  # Entry point - starts the server
│   ├── config/
│   │   ├── db.js                 # MongoDB database connection
│   │   └── cloudinary.js         # Cloudinary image storage config
│   ├── controllers/
│   │   └── imageController.js    # Functions that handle each request
│   ├── middleware/
│   │   └── upload.js             # Multer file upload middleware
│   ├── models/
│   │   └── Image.js              # Mongoose schema (database structure)
│   └── routes/
│       └── imageRoutes.js        # URL route definitions
│
└── frontend/                     # ----- FRONTEND (React App) -----
    ├── package.json              # Frontend dependencies
    ├── index.html                # HTML template
    ├── vite.config.js            # Vite + Tailwind + proxy config
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Main app with router setup
        ├── index.css             # Tailwind CSS import
        ├── components/
        │   ├── Navbar.jsx        # Navigation bar component
        │   └── ImageCard.jsx     # Single image card component
        ├── pages/
        │   ├── UploadPage.jsx    # Image upload page
        │   └── AdminPage.jsx     # Admin dashboard page
        └── services/
            └── api.js            # API helper functions (axios calls)
```

## How to Run

### 1. Install dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Set up .env file
Create a `.env` file inside the `backend/` folder:
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

### 3. Start the servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Open the app
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

| Method | URL                        | Description              |
|--------|----------------------------|--------------------------|
| GET    | /api/images                | Get all images           |
| POST   | /api/images/upload         | Upload a new image       |
| PATCH  | /api/images/:id/status     | Update image status      |
| DELETE | /api/images/:id            | Delete an image          |
