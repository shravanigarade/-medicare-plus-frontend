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
        return 'bg-success';
      case 'completed':
        return 'bg-primary';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-success';
      case 'processing':
        return 'bg-primary';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  };

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-2">
        My Dashboard
      </h2>

      <p className="text-muted mb-5">
        Welcome back, {user?.name}!
      </p>

      {/* APPOINTMENTS */}

      <h4 className="mb-3">
        🩺 My Appointments
      </h4>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-muted mb-5">
          You haven't booked any appointments yet.
        </p>
      ) : (
        <div className="table-responsive mb-5">

          <table className="table table-hover align-middle">

            <thead className="table-light">
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

                  <td>{appt.doctorName}</td>

                  <td>{appt.specialization}</td>

                  <td>{appt.appointmentDate}</td>

                  <td>
                    <span
                      className={`badge ${getAppointmentStatusClass(
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

      {/* MEDICINE ORDERS */}

      <h4 className="mb-3">
        💊 My Medicine Orders
      </h4>

      {ordersLoading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted">
          You haven't placed any medicine orders yet.
        </p>
      ) : (
        <div className="row">

          {orders.map((order) => (

            <div
              className="col-lg-6 mb-4"
              key={order._id}
            >

              <div className="card shadow-sm h-100">

                <div className="card-header d-flex justify-content-between align-items-center">

                  <strong>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </strong>

                  <span
                    className={`badge ${getOrderStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="card-body">

                  <h6 className="mb-3">
                    Medicines
                  </h6>

                  {order.medicines.map((medicine, index) => (

                    <div
                      key={index}
                      className="d-flex justify-content-between border-bottom py-2"
                    >

                      <span>
                        💊 {medicine.name}
                      </span>

                      <span>
                        ₹{medicine.price}
                      </span>

                    </div>

                  ))}

                  <div className="d-flex justify-content-between mt-3">

                    <strong>
                      Total Amount
                    </strong>

                    <strong>
                      ₹{order.totalAmount}
                    </strong>

                  </div>

                  <small className="text-muted d-block mt-2">
                    Ordered on:{' '}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </small>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;