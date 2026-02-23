# ✅ Todo MERN App

A full-stack Todo application built with **MongoDB, Express, React, and Node.js**.
🌐 Live Demo: https://todo-mern-steel.vercel.app
⚙️ Backend API: https://todo-mern-api-zh9p.onrender.com/api

## 📁 Project Structure

```
todo-mern/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # TodoForm, TodoItem, TodoFilter
│       ├── context/         # TodoContext (global state)
│       ├── pages/           # Home page
│       ├── services/        # Axios API service
│       ├── App.js
│       └── App.css
├── server/                  # Node.js + Express backend
│   ├── controllers/         # todoController.js
│   ├── middleware/          # db.js (MongoDB connection)
│   ├── models/              # Todo.js (Mongoose schema)
│   ├── routes/              # todos.js
│   ├── .env
│   └── index.js
└── package.json             # Root scripts (concurrently)
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 1. Clone and Install
```bash
git clone <your-repo>
cd todo-mern
npm run install-all
```

### 2. Configure Environment
Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-mern
CLIENT_URL=http://localhost:3000
```

For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/todo-mern
```

### 3. Run Development
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📡 REST API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/todos                  | Get all todos            |
| GET    | /api/todos?completed=true   | Filter by status         |
| GET    | /api/todos?priority=high    | Filter by priority       |
| GET    | /api/todos?search=keyword   | Search todos             |
| GET    | /api/todos/:id              | Get single todo          |
| POST   | /api/todos                  | Create todo              |
| PUT    | /api/todos/:id              | Update todo              |
| PATCH  | /api/todos/:id/toggle       | Toggle completed         |
| DELETE | /api/todos/:id              | Delete todo              |
| DELETE | /api/todos/completed/clear  | Delete all completed     |

## 🎯 Features
- ✅ Create, Read, Update, Delete todos
- 🔄 Toggle completed status
- 🔍 Search todos by title
- 🏷️ Priority levels (Low / Medium / High)
- 📅 Due dates with overdue detection
- 🗑️ Clear all completed at once
- 📱 Responsive design

## 🛠️ Tech Stack
- **Frontend:** React 18, React Router 6, Context API, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Dev Tools:** Nodemon, Concurrently
