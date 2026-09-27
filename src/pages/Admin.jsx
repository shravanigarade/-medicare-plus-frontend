import { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL =
    'https://medicare-plus-backend-egq7.onrender.com';

  useEffect(() => {
    fetchData();
  }, []);

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

  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(
        `${backendURL}/api/appointments/status/${id}`,
        { status }
      );

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status }
            : appointment
        )
      );

      alert('Appointment status updated!');
    } catch (error) {
      console.error('Appointment status error:', error);
      alert('Failed to update appointment status.');
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(
        `${backendURL}/api/orders/status/${id}`,
        { status }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );

      alert('Order status updated!');
    } catch (error) {
      console.error('Order status error:', error);
      alert('Failed to update order status.');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
        return 'admin-status-success';

      case 'completed':
      case 'processing':
        return 'admin-status-info';

      case 'cancelled':
        return 'admin-status-danger';

      default:
        return 'admin-status-pending';
    }
  };

  const totalRevenue = orders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-loading">
            <div className="admin-loading-icon">🛡️</div>
            <h3>Loading Admin Dashboard...</h3>
            <p>Please wait while we load the latest data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">

        {/* HEADER */}
        <div className="admin-header">
          <div>
            <span className="admin-label">
              MEDICARE+ MANAGEMENT
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Manage appointments, medicine orders and
              healthcare operations.
            </p>
          </div>

          <div className="admin-header-icon">
            🛡️
          </div>
        </div>

        {/* STATISTICS */}
        <div className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📅</div>

            <div>
              <span>Total Appointments</span>
              <strong>{appointments.length}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">💊</div>

            <div>
              <span>Medicine Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">₹</div>

            <div>
              <span>Total Revenue</span>
              <strong>₹{totalRevenue}</strong>
            </div>
          </div>

        </div>

        {/* APPOINTMENTS */}
        <section className="admin-section">

          <div className="admin-section-heading">
            <div>
              <span>APPOINTMENT MANAGEMENT</span>
              <h2>All Appointments</h2>
            </div>

            <div className="admin-count">
              {appointments.length} Records
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="admin-empty">
              <div>📅</div>
              <h3>No appointments found</h3>
              <p>
                Patient appointments will appear here.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
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
                        <strong>
                          {appointment.patientId?.name || 'N/A'}
                        </strong>
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
                        <select
                          className={`admin-status-select ${getStatusClass(
                            appointment.status
                          )}`}
                          value={appointment.status}
                          onChange={(e) =>
                            updateAppointmentStatus(
                              appointment._id,
                              e.target.value
                            )
                          }
                        >
                          <option value="pending">
                            Pending
                          </option>
                          <option value="confirmed">
                            Confirmed
                          </option>
                          <option value="completed">
                            Completed
                          </option>
                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* ORDERS */}
        <section className="admin-section">

          <div className="admin-section-heading">
            <div>
              <span>PHARMACY MANAGEMENT</span>
              <h2>All Medicine Orders</h2>
            </div>

            <div className="admin-count">
              {orders.length} Orders
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="admin-empty">
              <div>💊</div>
              <h3>No medicine orders found</h3>
              <p>
                Customer pharmacy orders will appear here.
              </p>
            </div>
          ) : (
            <div className="admin-order-grid">

              {orders.map((order) => (
                <div
                  className="admin-order-card"
                  key={order._id}
                >

                  <div className="admin-order-header">

                    <strong>
                      Order #
                      {order._id.slice(-6).toUpperCase()}
                    </strong>

                    <span
                      className={`admin-status-badge ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="admin-order-body">

                    <div className="admin-patient-info">
                      <p>
                        <strong>Patient:</strong>{' '}
                        {order.patientId?.name || 'N/A'}
                      </p>

                      <p>
                        <strong>Email:</strong>{' '}
                        {order.patientId?.email || 'N/A'}
                      </p>
                    </div>

                    <h4>Medicines</h4>

                    {order.medicines.map(
                      (medicine, index) => (
                        <div
                          key={index}
                          className="admin-medicine-row"
                        >
                          <span>
                            💊 {medicine.name}
                          </span>

                          <span>
                            ₹{medicine.price}
                          </span>
                        </div>
                      )
                    )}

                    <div className="admin-order-total">
                      <strong>Total Amount</strong>

                      <strong>
                        ₹{order.totalAmount}
                      </strong>
                    </div>

                    <div className="admin-order-status">
                      <label>
                        Update Order Status
                      </label>

                      <select
                        className={`admin-status-select ${getStatusClass(
                          order.status
                        )}`}
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="placed">
                          Placed
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default Admin;