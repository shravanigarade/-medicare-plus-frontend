import { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = 'https://medicare-plus-backend-egq7.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = await axios.get(
          `${backendURL}/api/appointments/all`
        );

        const ordersResponse = await axios.get(
          `${backendURL}/api/orders/all`
        );

        setAppointments(appointmentsResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Admin data error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Admin Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        🛡️ Admin Dashboard
      </h2>

      {/* Statistics */}
      <div className="row mb-5">

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-4">
            <h5>Total Appointments</h5>
            <h2>{appointments.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-4">
            <h5>Total Medicine Orders</h5>
            <h2>{orders.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-4">
            <h5>Total Revenue</h5>
            <h2>
              ₹{orders.reduce(
                (total, order) => total + order.totalAmount,
                0
              )}
            </h2>
          </div>
        </div>

      </div>

      {/* Appointments */}
      <h4 className="mb-3">🩺 All Appointments</h4>

      {appointments.length === 0 ? (
        <p className="text-muted mb-5">
          No appointments found.
        </p>
      ) : (
        <div className="table-responsive mb-5">
          <table className="table table-hover align-middle">

            <thead className="table-light">
              <tr>
                <th>Patient</th>
                <th>Email</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>

                  <td>
                    {appointment.patientId?.name || 'N/A'}
                  </td>

                  <td>
                    {appointment.patientId?.email || 'N/A'}
                  </td>

                  <td>
                    {appointment.doctorName}
                  </td>

                  <td>
                    {appointment.specialization}
                  </td>

                  <td>
                    {appointment.appointmentDate}
                  </td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      {appointment.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Orders */}
      <h4 className="mb-3">💊 All Medicine Orders</h4>

      {orders.length === 0 ? (
        <p className="text-muted">
          No medicine orders found.
        </p>
      ) : (
        <div className="row">

          {orders.map((order) => (
            <div
              className="col-lg-6 mb-4"
              key={order._id}
            >
              <div className="card shadow-sm h-100">

                <div className="card-header d-flex justify-content-between">
                  <strong>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </strong>

                  <span className="badge bg-warning text-dark">
                    {order.status}
                  </span>
                </div>

                <div className="card-body">

                  <p>
                    <strong>Patient:</strong>{' '}
                    {order.patientId?.name || 'N/A'}
                  </p>

                  <p>
                    <strong>Email:</strong>{' '}
                    {order.patientId?.email || 'N/A'}
                  </p>

                  <h6>Medicines</h6>

                  {order.medicines.map((medicine, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <span>💊 {medicine.name}</span>
                      <span>₹{medicine.price}</span>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between mt-3">
                    <strong>Total</strong>
                    <strong>₹{order.totalAmount}</strong>
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Admin;