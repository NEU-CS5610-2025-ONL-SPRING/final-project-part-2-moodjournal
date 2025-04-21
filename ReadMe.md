# MoodJournal
A full-stack journaling application that allows users to log their thoughts and moods.  
Built with **React + Tailwind CSS** on the frontend and **Node.js + Express + Prisma** on the backend.

Deployed on **Vercel (Frontend)** and **Render (Backend)**.

---

## Live Demo

- Frontend: [[https://final-project-part-2-moodjournal.vercel.app](https://final-project-part-2-moodjournal.vercel.app/)]
- Backend: [[https://final-project-part-2-moodjournal.onrender.com](https://final-project-part-2-moodjournal.onrender.com)]

# Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Vercel (hosting)

### ⚙Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL (Render Database)
- JWT Authentication (with cookies)
- Render (hosting)

---

## Features

- User registration and login with JWT cookies
- Secure routes with middleware protection
- Create, view, edit, and delete journal entries
- Weather-based mood suggestions via external API
- Fully responsive design

## Project Structure
```
MoodJournal/
├── api/                # Backend code (Node.js + Prisma)
│   ├── prisma/        # Database schema
│   ├── middleware/    # Authentication middleware
│   ├── routes/        # API routes (auth & journal entries)
│   ├── utils/         # External API integrations
│   ├── server.js      # Express app entry point
│   ├── package.json   # Backend dependencies
│   └── .env           # Environment variables
│
├── client/            # Frontend code (React)
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── pages/     # React pages (Login, Dashboard, etc.)
│   │   ├── services/  # API utilities
│   │   ├── App.js     # Root component
│   │   ├── index.js   # React entry point
│   │   ├── setupTests.js  # Testing setup
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
│
├── .gitignore         # Ignores node_modules, .env, etc.
├── README.md          # Project description & deployment info
```

## Prerequisites
- Node.js installed
- PostgreSQL installed and running
- Prisma installed globally (`npm install -g prisma`)

## Environment Variables
Create a `.env` file in the `api/` folder with the following content:
```
DATABASE_URL="postgresql://<username>@localhost:5432/moodjournal?schema=public"
JWT_SECRET="<enter your secret>"
WEATHER_API_KEY="<add your weather api key>"
```

## Installation & Running the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/moodjournal.git
   cd moodjournal
   ```

2. Set up the environment variables as described above.

3. Install dependencies for the frontend:
   ```sh
   cd client
   npm install
   npm start
   ```

4. Set up the database using Prisma:
   ```sh
   cd api
   npx prisma migrate dev --name init
   npx prisma studio
   ```

5. Run the backend API:
   ```sh
   node server.js
   ```

## Usage
- Navigate to the frontend URL (usually `http://localhost:3000`).
- Register or log in to access your mood journal.
- Create new journal entries, and the current weather will be fetched automatically.
- View and manage past journal entries.





