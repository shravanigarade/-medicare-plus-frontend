import { useState } from 'react';
import axios from 'axios';

function Pharmacy() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Pain Relief',
      price: 30,
      description: 'For fever and mild pain',
    },
    {
      id: 2,
      name: 'Vitamin C Tablets',
      category: 'Vitamins',
      price: 120,
      description: 'Vitamin C supplement',
    },
    {
      id: 3,
      name: 'Cetirizine',
      category: 'Allergy',
      price: 45,
      description: 'For allergy symptoms',
    },
    {
      id: 4,
      name: 'Antacid Tablets',
      category: 'Digestive Care',
      price: 60,
      description: 'For acidity and heartburn',
    },
    {
      id: 5,
      name: 'Multivitamin',
      category: 'Vitamins',
      price: 180,
      description: 'Daily multivitamin supplement',
    },
    {
      id: 6,
      name: 'ORS Sachets',
      category: 'Health Care',
      price: 25,
      description: 'Helps maintain hydration',
    },
  ];

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, medicine) => sum + medicine.price,
    0
  );

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert('Please add medicine to cart first.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
      alert('Please login first.');
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        patientId: user.id,
        medicines: cart.map((medicine) => ({
          name: medicine.name,
          price: medicine.price,
        })),
        totalAmount: total,
      };

      const response = await axios.post(
        'https://medicare-plus-backend-1.onrender.com/api/orders/create',
        orderData
      );

      alert(response.data.message);

      setCart([]);
    } catch (error) {
      console.error('Order Error:', error);

      alert(
        error.response?.data?.message ||
          'Failed to place order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Online Pharmacy</h2>

        <p className="text-muted">
          Order your medicines easily from MediCare+
        </p>
      </div>

      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="🔍 Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row">

        {/* Medicine List */}
        <div className="col-lg-8">

          <div className="row">

            {filteredMedicines.length === 0 ? (
              <div className="text-center">
                <p className="text-muted">
                  No medicines found.
                </p>
              </div>
            ) : (
              filteredMedicines.map((medicine) => (

                <div
                  className="col-md-6 mb-4"
                  key={medicine.id}
                >
                  <div className="card h-100 shadow-sm">

                    <div className="card-body">

                      <span className="badge bg-primary mb-2">
                        {medicine.category}
                      </span>

                      <h5 className="card-title">
                        {medicine.name}
                      </h5>

                      <p className="text-muted">
                        {medicine.description}
                      </p>

                      <div className="d-flex justify-content-between align-items-center">

                        <h5 className="mb-0">
                          ₹{medicine.price}
                        </h5>

                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(medicine)}
                        >
                          Add to Cart
                        </button>

                      </div>

                    </div>
                  </div>
                </div>

              ))
            )}

          </div>
        </div>

        {/* Cart */}
        <div className="col-lg-4">

          <div className="card shadow-sm sticky-top">

            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                🛒 Your Cart
              </h5>
            </div>

            <div className="card-body">

              {cart.length === 0 ? (
                <p className="text-muted text-center">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  {cart.map((medicine, index) => (

                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                    >

                      <div>
                        <strong>{medicine.name}</strong>

                        <br />

                        <small className="text-muted">
                          ₹{medicine.price}
                        </small>
                      </div>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>

                    </div>

                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>₹{total}</strong>
                  </div>

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handleOrder}
                    disabled={loading}
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>

                </>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Pharmacy;