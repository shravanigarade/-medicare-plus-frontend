import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `https://medicare-plus-backend-egq7.onrender.com/api/appointments/my/${user.id}`
        );

        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://medicare-plus-backend-egq7.onrender.com/api/orders/my/${user.id}`
        );

        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user?.id) {
      fetchAppointments();
      fetchOrders();
    } else {
      setLoading(false);
      setOrdersLoading(false);
    }
  }, [user?.id]);

  const getAppointmentStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'status-confirmed';
      case 'processing':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <span className="dashboard-label">MY MEDICARE+</span>

            <h1>My Dashboard</h1>

            <p>
              Welcome back, {user?.name}! Manage your appointments
              and medicine orders from one place.
            </p>
          </div>

          <div className="dashboard-welcome">
            🩺
          </div>
        </div>

        {/* SUMMARY */}
        <div className="dashboard-summary">

          <div className="summary-card">
            <div className="summary-icon">📅</div>

            <div>
              <span>Appointments</span>
              <strong>{appointments.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">💊</div>

            <div>
              <span>Medicine Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">❤️</div>

            <div>
              <span>Healthcare</span>
              <strong>Active</strong>
            </div>
          </div>

        </div>

        {/* APPOINTMENTS */}
        <section className="dashboard-section">

          <div className="dashboard-section-title">
            <div>
              <span>APPOINTMENTS</span>
              <h2>My Appointments</h2>
            </div>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              <p>Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">📅</div>
              <h3>No appointments yet</h3>
              <p>
                Your booked doctor appointments will appear here.
              </p>
            </div>
          ) : (
            <div className="appointment-table-wrapper">

              <table className="dashboard-table">

                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id}>

                      <td>
                        <strong>{appt.doctorName}</strong>
                      </td>

                      <td>
                        {appt.specialization}
                      </td>

                      <td>
                        {appt.appointmentDate}
                      </td>

                      <td>
                        <span
                          className={`dashboard-status ${getAppointmentStatusClass(
                            appt.status
                          )}`}
                        >
                          {appt.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* ORDERS */}
        <section className="dashboard-section">

          <div className="dashboard-section-title">
            <div>
              <span>PHARMACY</span>
              <h2>My Medicine Orders</h2>
            </div>
          </div>

          {ordersLoading ? (
            <div className="dashboard-empty">
              <p>Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">💊</div>

              <h3>No medicine orders yet</h3>

              <p>
                Your pharmacy orders will appear here.
              </p>
            </div>
          ) : (
            <div className="dashboard-order-grid">

              {orders.map((order) => (

                <div
                  className="dashboard-order-card"
                  key={order._id}
                >

                  <div className="order-card-header">

                    <strong>
                      Order #{order._id.slice(-6).toUpperCase()}
                    </strong>

                    <span
                      className={`dashboard-status ${getOrderStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="order-card-body">

                    <h4>Medicines</h4>

                    {order.medicines.map((medicine, index) => (

                      <div
                        key={index}
                        className="order-medicine"
                      >

                        <span>
                          💊 {medicine.name}
                        </span>

                        <span>
                          ₹{medicine.price}
                        </span>

                      </div>

                    ))}

                    <div className="order-total">

                      <strong>Total Amount</strong>

                      <strong>
                        ₹{order.totalAmount}
                      </strong>

                    </div>

                    <small>
                      Ordered on:{' '}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </small>

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

export default Dashboard;