# 🛍️ Photography Booking Frontend (React + Vite)

This is the **frontend** for the photography booking app, built with **React + Vite**. It connects to the backend APIs to allow users to browse, book, and manage photography sessions.

---

## 🎯 Description

The app supports two types of users:

- 👤 **Regular Users**:
  - Browse available photography sessions
  - Book sessions
  - View their bookings in the dashboard
- 🛠️ **Admin Users**:
  - Add, edit, and delete session packages
  - Manage all booking requests
  - Approve or reject client bookings

The app uses **role-based access**, stores login sessions in `localStorage`, and fetches data from the backend.

---

## 🧑‍💻 User Requirements

1. **Sign Up / Login** with email and password
2. Users can choose a role: `user` or `admin`
3. **Admin Features**:
   - Add, edit, delete photography sessions
   - Approve or reject bookings
4. **Regular User Features**:
   - View available sessions
   - Book sessions
   - View personal bookings
5. Sessions are persisted across page reloads using `localStorage`

---

## 🛠️ Technologies

- React 18
- Vite
- React Router DOM
- Bootstrap / React-Bootstrap
- Axios for API calls
- LocalStorage for session persistence

---

## 🚀 Getting Started

```bash
# 1. Navigate to frontend folder
cd photography-frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Open the app in your browser at http://localhost:5173
````

---

## 🗂️ Project Structure

```
src/
├── components/
│   └── Navbar.jsx            # Main navigation bar component
├── pages/
│   ├── Home.jsx              # Landing / home page
│   ├── Sessions.jsx          # Browse all photography sessions
│   ├── SessionDetails.jsx    # View details of a single session
│   ├── Booking.jsx           # Booking page (for clients)
│   ├── Dashboard.jsx         # Client dashboard for bookings
│   ├── AdminDashboard.jsx    # Admin dashboard for managing sessions/bookings
│   ├── Login.jsx             # Login page
│   └── Signup.jsx            # Signup page
├── styling/
│   ├── Home.css
│   ├── Sessions.css
│   ├── SessionDetails.css
│   ├── Booking.css
│   ├── Dashboard.css
│   ├── AdminDashboard.css
│   ├── Auth.css              # Shared styling for Login & Signup
│   └── Navbar.css
├── App.jsx                   # Main app with routing
└── main.jsx                  # Vite entry point
```

> ⚡ Notes:
>
> * Each page has its **own CSS file** for component-level styling.
> * Shared styles like `Auth.css` and `Navbar.css` are used across multiple components.
> * React Router handles navigation between pages.

---

## 📡 API Integration

* The frontend interacts with backend endpoints (assumes backend running at `http://localhost:5000`):

### Auth Endpoints

* `POST /api/auth/signup` → register new users
* `POST /api/auth/login` → login users

### Session Endpoints

* `GET /api/sessions/` → list all sessions
* `POST /api/sessions/` → add new session (Admin only)
* `PUT /api/sessions/:id` → update session (Admin only)
* `DELETE /api/sessions/:id` → delete session (Admin only)

### Booking Endpoints

* `POST /api/bookings/` → create a booking
* `GET /api/bookings/user/:email` → get user bookings
* `GET /api/bookings/all` → get all bookings (Admin only)
* `PUT /api/bookings/:id/status` → update booking status (Admin only)


---

## 💡 Tips

* Make sure your **backend is running** before testing frontend features.
* Admin actions require **x-role: admin** in headers (handled automatically in frontend Axios calls).
* Use `localStorage` to persist login across sessions.
