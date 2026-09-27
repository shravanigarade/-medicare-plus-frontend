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
    setCart(cart.filter((_, i) => i !== index));
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
        'https://medicare-plus-backend-egq7.onrender.com/api/orders/create',
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
    <div className="pharmacy-page">
      <div className="pharmacy-container">

        {/* HEADER */}
        <div className="pharmacy-header">
          <span>MEDICARE+ PHARMACY</span>

          <h1>Online Pharmacy</h1>

          <p>
            Order your medicines easily and manage your healthcare
            essentials from one place.
          </p>
        </div>

        {/* SEARCH */}
        <div className="pharmacy-search">
          <input
            type="text"
            placeholder="🔍  Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="row">

          {/* MEDICINES */}
          <div className="col-lg-8">
            <div className="row">

              {filteredMedicines.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No medicines found</h5>
                  <p className="text-muted">
                    Try searching with another medicine name.
                  </p>
                </div>
              ) : (
                filteredMedicines.map((medicine) => (
                  <div
                    className="col-md-6 mb-4"
                    key={medicine.id}
                  >
                    <div className="medicine-card">

                      <div className="medicine-icon">
                        💊
                      </div>

                      <span className="medicine-category">
                        {medicine.category}
                      </span>

                      <h3>{medicine.name}</h3>

                      <p>{medicine.description}</p>

                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <span className="medicine-price">
                          ₹{medicine.price}
                        </span>

                        <button
                          className="medicine-add-btn"
                          onClick={() => addToCart(medicine)}
                        >
                          Add to Cart
                        </button>
                      </div>

                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* CART */}
          <div className="col-lg-4">

            <div className="pharmacy-cart">

              <div className="pharmacy-cart-header">
                🛒 Your Cart
              </div>

              <div className="pharmacy-cart-body">

                {cart.length === 0 ? (
                  <div className="text-center py-3">
                    <div style={{ fontSize: '35px' }}>
                      🛒
                    </div>

                    <p className="text-muted mb-0">
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  <>
                    {cart.map((medicine, index) => (
                      <div
                        key={index}
                        className="cart-item"
                      >
                        <div>
                          <div className="cart-item-name">
                            {medicine.name}
                          </div>

                          <div className="cart-item-price">
                            ₹{medicine.price}
                          </div>
                        </div>

                        <button
                          className="cart-remove"
                          onClick={() => removeFromCart(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <div className="cart-total">
                      <strong>Total</strong>
                      <strong>₹{total}</strong>
                    </div>

                    <button
                      className="place-order-btn"
                      onClick={handleOrder}
                      disabled={loading}
                    >
                      {loading
                        ? 'Placing Order...'
                        : 'Place Order'}
                    </button>
                  </>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Pharmacy;