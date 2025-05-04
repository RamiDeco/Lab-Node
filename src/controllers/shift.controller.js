import Shift from '../models/shift.model.js';
import { verifyToken } from '../services/auth.service.js';

export const createShift = async (req, res) => {
  try {
    const data = verifyToken(req.cookies.token);
    if (!data) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    const userId = data.userId;
    
    const newShift = await Shift.createShift(userId);
    if (!newShift) {
      return res.status(400).json({ message: 'Error creating shift' });
    }
    res.json({ id: newShift });
  } catch (error) {
    res.status(400).json({ message: 'Error creating shift', error });
  }
};

export const getAllShifts = async (req, res) => {
  try {
    const turnos = await Shift.getAllShifts();
    if (!turnos) {
      return res.status(404).json({ message: 'No shifts found' });
    }
    res.json(turnos);
  } catch (error) {
    res.status(400).json({ message: 'Error getting shifts', error });
  }
};

export const getShiftById = async (req, res) => {
  const data = verifyToken(req.cookies.token);
  try {
    const turno = await Shift.getShiftByUser(data.userId);
    if (!turno) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.json(turno);
  } catch (error) {
    res.status(400).json({ message: 'Error getting shift', error });
  }
};