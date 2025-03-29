MoodJournal/
├── client/                  # React frontend
│   ├── public/              # Static assets like favicon
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages (Login, Register, Dashboard, etc.)
│   │   ├── services/        # API request logic (fetch/post etc.)
│   │   ├── App.js           # App entry point
│   │   └── index.js         # ReactDOM.render
│   └── package.json         # React app dependencies
│
├── api/                     # Backend logic with Node.js & Prisma
│   ├── prisma/              # Prisma schema and migration files
│   │   └── schema.prisma
│   ├── middleware/          # requireAuth.js middleware
│   ├── routes/              # Auth & journal route handlers
│   │   ├── auth.js
│   │   └── journal.js
│   ├── utils/               # JWT helper functions, hashing, etc.
│   ├── server.js            # Express app entry point
│   └── package.json         # Backend dependencies
│
├── accessibility_reports/   # Lighthouse accessibility reports (Part 3)
│
├── README.md                # Project description & deployment links
└── .env                     # Shared secrets (DB URL, JWT secret, et