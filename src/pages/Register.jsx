import { useState } from 'react';
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
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
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message);
      } else {
        setServerError('Something went wrong. Please try again.');
      }

      setSuccessMessage('');
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: '500px' }}
    >
      <h2 className="text-center fw-bold mb-4">
        Create an Account
      </h2>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          ✅ {successMessage}
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger" role="alert">
          ❌ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            className={`form-control ${
              errors.name ? 'is-invalid' : ''
            }`}
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <div className="invalid-feedback">
              {errors.name}
            </div>
          )}
        </div>

        {/* Email */}
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

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            className={`form-control ${
              errors.phone ? 'is-invalid' : ''
            }`}
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <div className="invalid-feedback">
              {errors.phone}
            </div>
          )}
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="form-label">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;import { useState } from 'react';
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
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
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message);
      } else {
        setServerError('Something went wrong. Please try again.');
      }

      setSuccessMessage('');
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: '500px' }}
    >
      <h2 className="text-center fw-bold mb-4">
        Create an Account
      </h2>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          ✅ {successMessage}
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger" role="alert">
          ❌ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            className={`form-control ${
              errors.name ? 'is-invalid' : ''
            }`}
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <div className="invalid-feedback">
              {errors.name}
            </div>
          )}
        </div>

        {/* Email */}
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

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            className={`form-control ${
              errors.phone ? 'is-invalid' : ''
            }`}
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <div className="invalid-feedback">
              {errors.phone}
            </div>
          )}
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="form-label">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;