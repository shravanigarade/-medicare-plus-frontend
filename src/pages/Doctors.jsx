import { useState } from 'react';
import dummyDoctors from '../services/dummyDoctors';
import DoctorCard from '../components/DoctorCard';

function Doctors() {
  const [searchText, setSearchText] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');

  // Sagळya specializations cha unique list banवणे (dropdown sathi)
  const specializations = ['All', ...new Set(dummyDoctors.map((doc) => doc.specialization))];

  // Search text ani filter dono applied karून doctors filter karणे
  const filteredDoctors = dummyDoctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesSpecialization =
      specializationFilter === 'All' || doctor.specialization === specializationFilter;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Our Doctors</h2>

      {/* Search + Filter Bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search doctor by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="row">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
        ) : (
          <p className="text-center text-muted">No doctors found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;