import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'https://medicare-plus-backend-egq7.onrender.com/api/auth/register',
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
        }
      );

      setSuccessMessage(
        response.data.message || 'Registration successful!'
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
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
      <div className="auth-card register-card">

        <div className="auth-icon">
          🩺
        </div>

        <div className="auth-heading">
          <span>JOIN MEDICARE+</span>

          <h1>Create your account</h1>

          <p>
            Register to book appointments and manage your
            healthcare services.
          </p>
        </div>

        {successMessage && (
          <div className="auth-success">
            ✅ {successMessage}
          </div>
        )}

        {serverError && (
          <div className="auth-error">
            ❌ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="auth-field">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className={errors.name ? 'input-error' : ''}
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <small>{errors.name}</small>
            )}
          </div>

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
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit phone number"
              className={errors.phone ? 'input-error' : ''}
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <small>{errors.phone}</small>
            )}
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className={errors.password ? 'input-error' : ''}
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <small>{errors.password}</small>
            )}
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className={
                errors.confirmPassword ? 'input-error' : ''
              }
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {errors.confirmPassword && (
              <small>{errors.confirmPassword}</small>
            )}
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Create Account →
          </button>

        </form>

        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>

        <Link
          to="/login"
          className="auth-register-link"
        >
          Login to your account
        </Link>

      </div>
    </div>
  );
}

export default Register;