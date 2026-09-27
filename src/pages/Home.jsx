import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">🩺 Trusted Healthcare Platform</span>

            <h1>
              Your Health,
              <br />
              <span>Our Priority</span>
            </h1>

            <p>
              Find trusted doctors, book appointments and order medicines
              online — all in one place.
            </p>

            <div className="hero-buttons">
              <Link to="/doctors" className="primary-btn">
                Find a Doctor →
              </Link>

              <Link to="/pharmacy" className="secondary-btn">
                💊 Order Medicines
              </Link>
            </div>

            <div className="hero-trust">
              <span>✓ Easy Booking</span>
              <span>✓ Trusted Doctors</span>
              <span>✓ Online Pharmacy</span>
            </div>
          </div>

          <div className="hero-image">
            <div className="doctor-circle">
              👨‍⚕️
            </div>

            <div className="floating-card card-one">
              📅 <span>Easy Appointments</span>
            </div>

            <div className="floating-card card-two">
              💊 <span>Online Pharmacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="section-heading">
          <span>OUR SERVICES</span>
          <h2>Healthcare made simple</h2>
          <p>
            Everything you need for your healthcare journey in one place.
          </p>
        </div>

        <div className="service-grid">

          <div className="service-card">
            <div className="service-icon">🩺</div>
            <h3>Find Doctors</h3>
            <p>
              Browse doctors by specialization and choose the right doctor
              for your needs.
            </p>
            <Link to="/doctors">Explore Doctors →</Link>
          </div>

          <div className="service-card">
            <div className="service-icon">📅</div>
            <h3>Book Appointment</h3>
            <p>
              Select a doctor and book your appointment quickly and easily.
            </p>
            <Link to="/doctors">Book Now →</Link>
          </div>

          <div className="service-card">
            <div className="service-icon">💊</div>
            <h3>Online Pharmacy</h3>
            <p>
              Browse medicines and place your order from the comfort of
              your home.
            </p>
            <Link to="/pharmacy">Shop Medicines →</Link>
          </div>

          <div className="service-card">
            <div className="service-icon">📋</div>
            <h3>Track Your History</h3>
            <p>
              View your appointments and medicine orders from your dashboard.
            </p>
            <Link to="/dashboard">View Dashboard →</Link>
          </div>

        </div>
      </section>

      {/* WHY MEDICARE */}
      <section className="why-section">
        <div className="why-content">

          <div className="why-image">
            <div className="medical-illustration">
              ❤️
            </div>
          </div>

          <div className="why-text">
            <span>WHY MEDICARE+</span>

            <h2>
              Healthcare that puts
              <br />
              <strong>you first.</strong>
            </h2>

            <p>
              MediCare+ brings doctors, appointments and medicines together
              in one simple platform designed for a better healthcare
              experience.
            </p>

            <div className="why-points">
              <div>
                <b>✓</b>
                <span>Simple & easy appointment booking</span>
              </div>

              <div>
                <b>✓</b>
                <span>Convenient online medicine ordering</span>
              </div>

              <div>
                <b>✓</b>
                <span>Manage everything from your dashboard</span>
              </div>
            </div>

            <Link to="/doctors" className="primary-btn">
              Get Started →
            </Link>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Take care of your health today.</h2>
        <p>
          Find a doctor or order your medicines with MediCare+.
        </p>

        <div className="cta-buttons">
          <Link to="/doctors">Find a Doctor</Link>
          <Link to="/pharmacy">Visit Pharmacy</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div>
          <h3>🩺 MediCare+</h3>
          <p>Your health, our priority.</p>
        </div>

        <div>
          <p>© 2026 MediCare+. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
