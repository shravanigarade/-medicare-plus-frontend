import { useState } from 'react';
import dummyDoctors from '../services/dummyDoctors';
import DoctorCard from '../components/DoctorCard';

function Doctors() {
  const [searchText, setSearchText] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');

  const specializations = [
    'All',
    ...new Set(dummyDoctors.map((doc) => doc.specialization))
  ];

  const filteredDoctors = dummyDoctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesSpecialization =
      specializationFilter === 'All' ||
      doctor.specialization === specializationFilter;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="doctors-page">

      <section className="doctors-header">
        <div className="doctors-header-content">

          <div className="doctors-badge">
            🩺 Trusted Healthcare
          </div>

          <h1>Find the Right Doctor</h1>

          <p>
            Connect with experienced doctors and book your appointment
            easily from one place.
          </p>

        </div>
      </section>

      <section className="doctor-search-section">

        <div className="doctor-search-box">

          <div className="search-field">
            🔍

            <input
              type="text"
              placeholder="Search doctor by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="filter-field">
            🩺

            <select
              value={specializationFilter}
              onChange={(e) =>
                setSpecializationFilter(e.target.value)
              }
            >

              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === 'All'
                    ? 'All Specializations'
                    : spec}
                </option>
              ))}

            </select>
          </div>

        </div>

      </section>

      <section className="doctors-list-section">

        <div className="doctors-list-header">

          <div>
            <div className="small-heading">
              OUR SPECIALISTS
            </div>

            <h2>Meet Our Doctors</h2>
          </div>

          <div className="doctor-count">
            {filteredDoctors.length} Doctors
          </div>

        </div>

        <div className="doctor-grid">

          {filteredDoctors.length > 0 ? (

            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))

          ) : (

            <div className="no-doctors">

              <div className="no-doctors-icon">
                🔍
              </div>

              <h3>No doctors found</h3>

              <p>
                Try searching with another name or specialization.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Doctors;