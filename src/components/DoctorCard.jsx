import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleBookClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setShowModal(true);
    setMessage('');
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate) {
      setMessage('Please select a date');
      setIsError(true);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      await axios.post(https://medicare-plus-backend-1.onrender.com/api/appointments/book, {
        patientId: user.id,
        doctorName: doctor.name,
        specialization: doctor.specialization,
        appointmentDate: selectedDate,
      });

      setMessage('Appointment booked successfully!');
      setIsError(false);

      setTimeout(() => {
        setShowModal(false);
        setSelectedDate('');
        setMessage('');
      }, 1500);
    } catch (error) {
      setMessage('Failed to book appointment. Please try again.');
      setIsError(true);
    }
  };

  return (
    <>
      <div className="col-md-4 col-sm-6 mb-4">
        <div className="card h-100 shadow-sm doctor-card">
          <img
            src={doctor.image}
            className="card-img-top"
            alt={doctor.name}
            style={{ height: '220px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title mb-1">{doctor.name}</h5>
            <p className="text-primary mb-1">{doctor.specialization}</p>
            <p className="text-muted small mb-3">{doctor.experience} years experience</p>
            <button className="btn btn-primary w-100" onClick={handleBookClick}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Appointment with {doctor.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {message && (
                  <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                  </div>
                )}
                <label className="form-label">Select Appointment Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirmBooking}>
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorCard;
