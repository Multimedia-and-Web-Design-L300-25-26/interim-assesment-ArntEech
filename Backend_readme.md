# Coinbase Clone – Backend API

Node.js + Express + MongoDB backend for the Coinbase Clone frontend.

---

## Project Structure

```
coinbase-backend/
├── controllers/
│   ├── authController.js    # register, login, logout
│   ├── userController.js    # getProfile
│   └── cryptoController.js  # CRUD for cryptocurrencies
├── middleware/
│   └── authMiddleware.js    # JWT protect middleware
├── models/
│   ├── User.js              # Mongoose user schema
│   └── Crypto.js            # Mongoose crypto schema
├── routes/
│   ├── authRoutes.js        # /api/auth/*
│   ├── userRoutes.js        # /api/user/*
│   └── cryptoRoutes.js      # /api/crypto/*
├── seed.js                  # One-time DB seed script
├── server.js                # Entry point
├── .env.example
└── package.json
```

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/coinbase-clone
JWT_SECRET=replace_with_a_long_random_secret_string
FRONTEND_URL=http://localhost:5173
```

### 3. Seed the database (optional but recommended)
Populates the database with 18 initial cryptocurrencies:
```bash
node seed.js
```

### 4. Start the server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

---

## API Reference

### Auth

| Method | Endpoint              | Body                                    | Description          |
|--------|-----------------------|-----------------------------------------|----------------------|
| POST   | `/api/auth/register`  | `firstName, lastName, email, password`  | Create account       |
| POST   | `/api/auth/login`     | `email, password`                       | Login, sets cookie   |
| POST   | `/api/auth/logout`    | —                                       | Clears cookie        |

### User (Protected – requires JWT cookie)

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/api/user/profile`  | Get authenticated user's info  |

### Crypto

| Method | Endpoint               | Body                                       | Description                    |
|--------|------------------------|--------------------------------------------|--------------------------------|
| GET    | `/api/crypto`          | —                                          | All cryptocurrencies           |
| GET    | `/api/crypto/gainers`  | —                                          | Top gainers (sorted desc)      |
| GET    | `/api/crypto/new`      | —                                          | Newest listings (sorted desc)  |
| POST   | `/api/crypto`          | `name, symbol, price, image?, change24h?, color?` | Add new cryptocurrency |

---

## Frontend Integration

Copy the files from `frontend-updates/` into your frontend `src/` folder:

```
frontend-updates/
├── src/
│   ├── api/
│   │   └── api.js          → copy to src/api/api.js
│   └── pages/
│       ├── SignIn.jsx       → replace src/pages/SignIn.jsx
│       ├── SignUp.jsx       → replace src/pages/SignUp.jsx
│       ├── Explore.jsx      → replace src/pages/Explore.jsx
│       ├── Profile.jsx      → add as src/pages/Profile.jsx
│       └── App.jsx          → replace src/App.jsx
```

Also create a `.env` in your frontend root:
```env
VITE_API_URL=http://localhost:5000
```
(Change the URL to your deployed backend URL when deploying.)

---

## Deployment (Render)

1. Push the backend folder to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add environment variables in Render's dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL` (your deployed frontend URL)
   - `NODE_ENV=production`

---

## Security Notes

- Passwords are hashed with **bcrypt** (12 salt rounds) before storage.
- JWTs are stored in **HTTP-only cookies** (not localStorage) to prevent XSS.
- CORS is configured to only allow requests from the frontend origin.
- In production, cookies use `secure: true` and `sameSite: 'none'`.