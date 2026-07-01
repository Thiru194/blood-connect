# 🩸 BloodConnect

A full-stack **MERN** blood donation platform that connects blood donors with people in urgent need. Donors can register and manage their availability, patients can raise blood requests and reach donors instantly, and admins can oversee the whole network from a dashboard.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white">
  <img alt="Bootstrap" src="https://img.shields.io/badge/React_Bootstrap-5-7952B3?logo=bootstrap&logoColor=white">
</p>

---

## ✨ Features

- **Donor registration & profiles** — sign up, apply as a donor, and manage availability.
- **Blood requests** — raise a request with patient, hospital, blood group, and contact details; browse recent requests.
- **Donor search** — find donors by blood group and city.
- **Donation tracking** — donors log their donations and view their history.
- **Admin dashboard** — manage users, requests, and donations, with aggregate stats.
- **JWT authentication** — secure login with role-based access (`donor` / `admin`).
- **Responsive UI** — mobile-first design built with React Bootstrap.

---

## 🛠 Tech Stack

| Layer     | Technology                                          |
| --------- | --------------------------------------------------- |
| Frontend  | React 19, React Router 7, React Bootstrap 5, Axios  |
| Backend   | Node.js, Express 5, Mongoose                         |
| Database  | MongoDB                                             |
| Auth      | JSON Web Tokens (JWT), bcryptjs                      |

---

## 📁 Project Structure

```
blood-connect/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI (Hero, Navbar, Footer, home sections…)
│       ├── pages/          # Route pages (Home, Login, BloodRequests, Admin…)
│       ├── routes/         # AppRoutes + Protected/Admin route guards
│       ├── services/       # Axios API layer (auth, requests, donors…)
│       └── context/        # AuthContext
│
└── server/                 # Express backend
    ├── config/             # MongoDB connection
    ├── controllers/        # Route handlers (auth, requests, donations…)
    ├── middleware/         # JWT auth + admin guard
    ├── models/             # Mongoose schemas (User, BloodRequest, Donation)
    ├── routes/             # API route definitions
    ├── utils/              # Input validators
    └── server.js           # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) — a local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone https://github.com/Thiru194/blood-connect.git
cd blood-connect
```

### 2. Configure the backend

```bash
cd server
npm install
cp .env.example .env      # then edit .env with your values
```

Fill in `server/.env`:

| Variable     | Description                                | Example                                   |
| ------------ | ------------------------------------------ | ----------------------------------------- |
| `PORT`       | Port the API listens on                    | `5000`                                    |
| `MONGO_URI`  | MongoDB connection string                  | `mongodb://localhost:27017/bloodconnect`  |
| `JWT_SECRET` | Secret used to sign auth tokens (keep long & random) | `a_long_random_string`          |

Start the API:

```bash
npm run dev      # with nodemon (auto-reload)
# or
npm start
```

The server runs at **http://localhost:5000**.

### 3. Configure the frontend

Open a new terminal:

```bash
cd client
npm install
npm start
```

The app runs at **http://localhost:3000** and talks to the API at `http://localhost:5000/api`.

> **Optional:** to point the frontend at a different backend, create `client/.env` with
> `REACT_APP_API_URL=https://your-api-host/api`.

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint         | Access | Description         |
| ------ | ---------------- | ------ | ------------------- |
| POST   | `/auth/register` | Public | Register a new user |
| POST   | `/auth/login`    | Public | Log in, returns JWT |

### Blood Requests
| Method | Endpoint               | Access | Description                  |
| ------ | ---------------------- | ------ | ---------------------------- |
| POST   | `/requests`            | Auth   | Create a blood request       |
| GET    | `/requests`            | Public | List all requests            |
| GET    | `/requests/my`         | Auth   | Requests created by the user |
| GET    | `/requests/all`        | Admin  | All requests (admin view)    |
| GET    | `/requests/:id`        | Auth   | Single request + contact     |
| PUT    | `/requests/:id/status` | Admin  | Update request status        |
| DELETE | `/requests/:id`        | Admin  | Delete a request             |

### Donors / Users
| Method | Endpoint          | Access | Description                    |
| ------ | ----------------- | ------ | ------------------------------ |
| GET    | `/donors/search`  | Public | Search donors by group/city    |
| POST   | `/donors/apply`   | Auth   | Apply to become a donor        |
| GET    | `/donors/profile` | Auth   | Get current user profile       |
| PUT    | `/donors/profile` | Auth   | Update current user profile    |
| GET    | `/donors/all`     | Admin  | List all users                 |
| GET    | `/donors/:id`     | Auth   | Get a donor by id              |
| DELETE | `/donors/:id`     | Admin  | Delete a user                  |

### Donations
| Method | Endpoint          | Access | Description                |
| ------ | ----------------- | ------ | -------------------------- |
| POST   | `/donations`      | Auth   | Log a donation             |
| GET    | `/donations`      | Admin  | List all donations         |
| GET    | `/donations/my`   | Auth   | Current user's donations   |
| DELETE | `/donations/:id`  | Admin  | Delete a donation          |

### Dashboard
| Method | Endpoint            | Access | Description            |
| ------ | ------------------- | ------ | ---------------------- |
| GET    | `/dashboard/stats`  | Admin  | Aggregate admin stats  |

### Health
| Method | Endpoint       | Access | Description             |
| ------ | -------------- | ------ | ----------------------- |
| GET    | `/health`      | Public | Uptime / health check   |

> Authenticated routes expect an `Authorization: Bearer <token>` header. The frontend attaches this automatically once you log in.

---

## 📜 Available Scripts

**Server** (`/server`)
- `npm run dev` — start with nodemon (auto-reload)
- `npm start` — start with node

**Client** (`/client`)
- `npm start` — run the dev server
- `npm run build` — production build
- `npm test` — run tests

---

## 🔒 Security Notes

- Real secrets live in `server/.env`, which is **git-ignored** — never commit it. Use `server/.env.example` as the template.
- Passwords are hashed with **bcrypt**; auth is handled via **JWT**.

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a pull request.

---

## 📄 License

This project is released under the **ISC License**.
