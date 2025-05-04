// auth/auth.routes.js
import express from 'express';
import {createShift, getAllShifts, getShiftById} from '../controllers/shift.controller.js';

const router = express.Router();

router.post('/create', createShift);
router.get('/shifts', getAllShifts);
router.post('/shift', getShiftById);

export default router;
