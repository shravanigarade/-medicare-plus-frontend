import express from 'express';
import { bookAppointment, getMyAppointments, getAllAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.get('/my/:patientId', getMyAppointments);
router.get('/all', getAllAppointments);

export default router;