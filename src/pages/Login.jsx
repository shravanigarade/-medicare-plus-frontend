import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      setServerError('');
      return;
    }

    setErrors({});
    setServerError('');

    try {
      const response = await axios.post(
        'https://medicare-plus-backend-egq7.onrender.com/api/auth/login',
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      localStorage.setItem('token', response.data.token);

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      setSuccessMessage(
        response.data.message || 'Login successful!'
      );

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);

      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError(
          'Something went wrong. Please try again.'
        );
      }

      setSuccessMessage('');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-icon">
          🩺
        </div>

        <div className="auth-heading">
          <span>WELCOME TO MEDICARE+</span>
          <h1>Login to your account</h1>
          <p>
            Access your appointments, orders and healthcare
            services.
          </p>
        </div>

        {successMessage && (
          <div className="auth-success">
            {successMessage}
          </div>
        )}

        {serverError && (
          <div className="auth-error">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="auth-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small>{errors.email}</small>
            )}
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <small>{errors.password}</small>
            )}
          </div>

          <div className="remember-row">
            <label>
              <input
                type="checkbox"
                id="rememberMe"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Login to MediCare+ →
          </button>

        </form>

        <div className="auth-divider">
          <span>New to MediCare+?</span>
        </div>

        <Link
          to="/register"
          className="auth-register-link"
        >
          Create an account
        </Link>

      </div>
    </div>
  );
}

export default Login;