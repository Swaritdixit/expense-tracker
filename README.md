 📊 Expense Tracker App

A full-stack Expense Tracker web application built using React (Vite) for the frontend and Node.js + Express + MongoDB for the backend.  
It helps users manage daily expenses with authentication, filtering, and search features.

---

 🚀 Live Demo

- Frontend: https://expense-tracker-j6g8w6hy6-swarit-s-projects.vercel.app  
- Backend: https://expense-tracker-mbfz.onrender.com  

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer / Resend (Email verification)

---

## 📁 Project Structure


backend/
│── controllers/
│── middleware/
│── models/
│── routes/
│── server.js
│── .env

frontend/
│── public/
│── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── styles/
│ ├── App.jsx
│── index.html


---

## ✨ Features

### 👤 Authentication
- User registration with email verification
- Secure login using JWT
- Protected routes

### 💰 Expense Management
- Add expenses
- Update expenses
- Delete expenses
- View all expenses

### 🔍 Filtering & Search
- Filter by category
- Search by title
- Total expense calculation

### 📧 Email Verification
- Sends verification email after signup
- Account activation via email link

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:5000
RESEND_API_KEY=your_key

Run backend:

node server.js
3. Frontend Setup
cd frontend
npm install
npm run dev

Create .env file:

VITE_API=http://localhost:5000