import Appointment from '../models/Appointment.js';

// Create new appointment (booking)
export const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorName, specialization, appointmentDate } = req.body;

    const newAppointment = new Appointment({
      patientId,
      doctorName,
      specialization,
      appointmentDate,
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all appointments for a specific patient
export const getMyAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get ALL appointments (for admin only)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};