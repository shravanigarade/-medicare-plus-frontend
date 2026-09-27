import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import Pharmacy from './pages/Pharmacy';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

import PrivateRoute from './components/PrivateRoute';

import './App.css';

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <nav className="medicare-navbar">
      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="medicare-logo">
          <span className="logo-icon">+</span>
          MediCare<span className="logo-plus">+</span>
        </Link>

        {/* NAV LINKS */}
        <div className="nav-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/doctors" className="nav-link">
            Find Doctors
          </Link>

          {token && (
            <Link to="/pharmacy" className="nav-link">
              Pharmacy
            </Link>
          )}

          {token && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}

          {token && user?.role === 'admin' && (
            <Link to="/admin" className="nav-link nav-admin">
              Admin
            </Link>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="nav-actions">

          {token ? (
            <>
              <span className="welcome-user">
                Hi, {user?.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* FIND DOCTORS */}
        <Route
          path="/doctors"
          element={<Doctors />}
        />

        {/* PHARMACY */}
        <Route
          path="/pharmacy"
          element={
            <PrivateRoute>
              <Pharmacy />
            </PrivateRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;