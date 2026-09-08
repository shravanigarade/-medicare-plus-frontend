import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          minHeight: '80vh',
          background: 'linear-gradient(135deg, #0d6efd, #6610f2)',
        }}
      >
        <h1 className="display-4 fw-bold mb-3">Your Health, Our Priority</h1>
        <p className="lead mb-4" style={{ maxWidth: '600px' }}>
          Find the best doctors near you and book appointments in just a few clicks.
        </p>
        <Link to="/doctors" className="btn btn-light btn-lg px-4 hero-btn">
          Find a Doctor
        </Link>
      </div>

      {/* Info Section */}
      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h4>🔍 Search Doctors</h4>
            <p className="text-muted">Browse doctors by specialization and experience.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h4>📅 Book Instantly</h4>
            <p className="text-muted">Choose a slot and confirm your appointment in seconds.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h4>📋 Track History</h4>
            <p className="text-muted">View your past appointments and prescriptions anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;