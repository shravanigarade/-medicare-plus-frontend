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
      newErrors.email =
        'Please enter a valid email address (e.g. name@example.com)';
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

      // Save token
      localStorage.setItem('token', response.data.token);

      // Save logged-in user's information
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      setSuccessMessage(
        response.data.message || 'Login successful!'
      );

      // Go to Dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
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
    <div
      className="container py-5"
      style={{ maxWidth: '450px' }}
    >
      <h2 className="text-center fw-bold mb-4">
        Login to MediCare+
      </h2>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">
            Email Address
          </label>

          <input
            type="text"
            name="email"
            className={`form-control ${
              errors.email ? 'is-invalid' : ''
            }`}
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <div className="invalid-feedback">
              {errors.email}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            name="password"
            className={`form-control ${
              errors.password ? 'is-invalid' : ''
            }`}
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <div className="invalid-feedback">
              {errors.password}
            </div>
          )}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
          />

          <label
            className="form-check-label"
            htmlFor="rememberMe"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
        >
          Login
        </button>

        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/register">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;