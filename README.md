# 💰 Expense Tracker

A full-stack expense management application built with **React, Node.js, Express, and MongoDB**.

The application allows users to securely register, verify their email, log in, and manage their personal expenses with features such as adding, editing, deleting, searching, category filtering, and total spending calculation.

🔗 **Live Demo:** https://expense-tracker-j6g8w6hy6-swarit-s-projects.vercel.app/

🔗 **Backend API:** https://expense-tracker-mbfz.onrender.com/

---

## ✨ Features

### 🔐 Authentication

- User registration
- Email verification
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Protected frontend dashboard
- Automatic rejection of unverified accounts during login

### 💰 Expense Management

- Add new expenses
- Edit existing expenses
- Delete expenses
- View personal expenses
- Calculate total spending
- Store expenses separately for each authenticated user

### 🔍 Search & Filtering

- Search expenses by title
- Filter expenses by category
- Supported categories:
  - Food
  - Travel
  - Shopping
  - All

### 📧 Email Verification

After registration, the backend generates a verification token and sends a verification email using **Resend**.

```text
User Registration
       │
       ▼
Create User
       │
       ▼
Hash Password
       │
       ▼
Generate Verification Token
       │
       ▼
Send Verification Email
       │
       ▼
User Opens Link
       │
       ▼
Verify Account
       │
       ▼
Login Enabled
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Password Security | bcryptjs |
| Email Verification | Resend |
| Styling | CSS |
| Deployment | Vercel, Render |
| Database Hosting | MongoDB / MongoDB Atlas |

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │   React + Vite       │
                         │     Frontend        │
                         └──────────┬──────────┘
                                    │
                                  Axios
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Express.js API     │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                  ┌─────────────┐       ┌─────────────┐
                  │   MongoDB   │       │   Resend    │
                  │   Database  │       │    Email    │
                  └─────────────┘       └─────────────┘
```

---

## 📁 Project Structure

```text
expense-tracker/
│
├── backend/
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── expenseController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Expense.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── expenseService.js
│   │   │
│   │   ├── styles/
│   │   │   └── ...
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

### Registration Flow

```text
User
 │
 ▼
Enter Name, Email & Password
 │
 ▼
Backend Validation
 │
 ▼
Password Hashing
 │
 ▼
Create User
 │
 ▼
Generate Verification Token
 │
 ▼
Send Email
```

Passwords are hashed using `bcryptjs` before being stored in MongoDB.

The user is initially created with:

```text
isVerified = false
```

The user must verify their email before being allowed to log in.

---

## 🔑 Login Flow

```text
User
 │
 ▼
Email + Password
 │
 ▼
Find User
 │
 ▼
Check Email Verification
 │
 ▼
Compare Password
 │
 ▼
Generate JWT
 │
 ▼
Return Token
 │
 ▼
Store Token
 │
 ▼
Access Dashboard
```

JWT payloads contain the authenticated user's ID.

The frontend sends the token with protected API requests using the `Authorization` header.

---

## 🛡️ Protected Routes

Expense endpoints are protected using authentication middleware.

```text
Frontend Request
      │
      ▼
Authorization Header
      │
      ▼
JWT Verification
      │
      ├── Invalid → 401 Unauthorized
      │
      ▼
Authenticated User ID
      │
      ▼
Expense Controller
```

The backend uses the authenticated user's ID when querying expense records.

For example:

```text
User A
 ├── Expense 1
 ├── Expense 2
 └── Expense 3

User B
 ├── Expense 4
 └── Expense 5
```

Each user retrieves only their own expenses.

---

## 💰 Expense Management Flow

```text
                    Dashboard
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
        Create        Update        Delete
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                   Express API
                        │
                        ▼
                     MongoDB
```

The backend provides CRUD operations for expenses.

### API Routes

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/auth/register` | Register a user | No |
| `POST` | `/auth/login` | Login | No |
| `GET` | `/auth/verify/:token` | Verify email | No |
| `GET` | `/expenses` | Get user's expenses | Yes |
| `POST` | `/expenses` | Create expense | Yes |
| `PUT` | `/expenses/:id` | Update expense | Yes |
| `DELETE` | `/expenses/:id` | Delete expense | Yes |

---

## 🗄️ Database Models

### User

The `User` model contains:

```text
User
├── name
├── email
├── password
├── isVerified
└── verificationToken
```

Passwords are stored as bcrypt hashes rather than plain text.

---

### Expense

The `Expense` model contains:

```text
Expense
├── title
├── amount
├── category
└── user
```

The `user` field references the corresponding authenticated user.

This creates a relationship between users and their expenses.

---

## 🔎 Search & Filtering

The dashboard supports client-side filtering.

### Search

Users can search expenses by title.

```text
All Expenses
     │
     ▼
Search Term
     │
     ▼
Match Expense Title
     │
     ▼
Display Matching Expenses
```

### Category Filtering

Users can filter expenses by:

```text
All
Food
Travel
Shopping
```

The total spending value is calculated from the currently loaded expense collection.

---

## 🖥️ Frontend Architecture

The frontend follows a component-based React architecture.

```text
App
 │
 ├── Login
 │
 ├── Register
 │
 └── Protected Route
       │
       ▼
    Dashboard
       │
       ├── Header
       ├── Expense Form
       ├── Search Bar
       ├── Category Filter
       └── Expense List
```

API communication is separated into service modules:

```text
services/
├── authService.js
└── expenseService.js
```

This keeps HTTP/API logic separate from the UI components.

---

## 🌐 Deployment

The application is deployed as separate frontend and backend services.

### Frontend

**Vercel**

🔗 https://expense-tracker-j6g8w6hy6-swarit-s-projects.vercel.app/

### Backend

**Render**

🔗 https://expense-tracker-mbfz.onrender.com/

### Database

**MongoDB**

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB / MongoDB Atlas
- Resend account for email verification

---

### 1. Clone the Repository

```bash
git clone https://github.com/Swaritdixit/expense-tracker.git
cd expense-tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGO_DB=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BASE_URL=http://localhost:5000

RESEND_API_KEY=your_resend_api_key
```

Start the backend:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🔒 Security

The application implements several security mechanisms:

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Protected frontend routes
- Email verification before login
- User-specific expense queries
- Environment variables for secrets
- Verification tokens for email activation

**Never commit `.env` files or API credentials to GitHub.**

---

## 🧩 Key Implementation Areas

### Password Security

Passwords are never stored directly.

```text
Plain Password
      │
      ▼
bcrypt.hash()
      │
      ▼
Password Hash
      │
      ▼
MongoDB
```

During login, the submitted password is compared against the stored hash using bcrypt.

---

### JWT Authentication

After successful authentication:

```text
User Credentials
       │
       ▼
Verify Password
       │
       ▼
JWT.sign()
       │
       ▼
Authentication Token
```

The frontend then sends the token with protected expense requests.

---

### User-Specific Data

Expense queries are associated with the authenticated user.

```text
Authenticated User
        │
        ▼
      user ID
        │
        ▼
MongoDB Expense Query
        │
        ▼
User's Expenses
```

This prevents the dashboard from simply retrieving all expenses from the database.

---

### Email Verification

The application generates a cryptographically random verification token during registration.

The token is sent through Resend as part of an email verification link.

Once the link is opened, the backend:

1. Finds the user using the verification token.
2. Marks the account as verified.
3. Removes the verification token.
4. Allows the user to log in.

---

## 📌 Future Improvements

- Add automated backend and frontend tests
- Add stronger request validation
- Improve error handling and user feedback
- Add expense pagination
- Add monthly/weekly spending analytics
- Add charts and visual dashboards
- Add date tracking for expenses
- Add recurring expenses
- Add budget management
- Add export to CSV/PDF
- Add password reset functionality
- Add refresh-token based authentication
- Improve token storage and session management
- Add stronger API rate limiting
- Add centralized API error handling

---

## 🎯 What I Learned

Through this project, I worked with:

- React component architecture
- React Router
- Vite
- REST API development
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Password hashing with bcrypt
- Email verification
- Resend API
- Axios
- Protected routes
- CRUD operations
- User-specific database queries
- Vercel deployment
- Render deployment
- Environment variable management

---

## 👨‍💻 Author

**Swarit Dixit**

B.Tech Electronics & Communication Engineering  
IIT Bhilai

- 💻 GitHub: https://github.com/Swaritdixit
- 💼 LinkedIn: https://www.linkedin.com/in/swarit-dixit-b907b8309/
