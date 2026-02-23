# ✅ Todo MERN App

A full-stack Todo application built with **MongoDB, Express, React, and Node.js**.

🌐 **Live Demo:** [https://todo-mern-steel.vercel.app](https://todo-mern-steel.vercel.app)  
⚙️ **Backend API:** [https://todo-mern-api-zh9p.onrender.com/api](https://todo-mern-api-zh9p.onrender.com/api)

---

## 🚀 Features

- ✅ Create, Read, Update, Delete todos
- 🔄 Toggle completed status with one click
- 🔍 Search todos by title in real time
- 🏷️ Priority levels — Low, Medium, High
- 📅 Due dates with overdue detection
- 🗑️ Clear all completed tasks at once
- 📱 Fully responsive design
- ☁️ Cloud database — tasks persist for all users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6, Context API, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
todo-mern/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # TodoForm, TodoItem, TodoFilter
│       ├── context/         # TodoContext (global state)
│       ├── pages/           # Home page
│       └── services/        # Axios API service layer
├── server/                  # Node.js + Express backend
│   ├── controllers/         # Business logic
│   ├── middleware/          # MongoDB connection
│   ├── models/              # Mongoose schemas
│   └── routes/              # REST API routes
└── package.json             # Root scripts
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos?completed=true` | Filter by status |
| GET | `/api/todos?priority=high` | Filter by priority |
| GET | `/api/todos?search=keyword` | Search todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completed |
| DELETE | `/api/todos/:id` | Delete todo |
| DELETE | `/api/todos/completed/clear` | Delete all completed |

---

## 💻 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/Saadsiddiqui10/todo-mern.git
cd todo-mern

# Install all dependencies
npm run install-all
```

### Configure Environment

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-mern
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Start Development

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

---

## 🌍 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://todo-mern-steel.vercel.app |
| Backend | Render | https://todo-mern-api-zh9p.onrender.com/api |
| Database | MongoDB Atlas | Cloud hosted |

---

## 👨‍💻 Author

**Saad Siddiqui**  
GitHub: [@Saadsiddiqui10](https://github.com/Saadsiddiqui10)
