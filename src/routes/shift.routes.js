// auth/auth.routes.js
import express from 'express';
import {createShift, getAllShifts, getShiftById, resetQueue} from '../controllers/shift.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create', authMiddleware, createShift);
router.get('/shifts', getAllShifts);
router.post('/shift', getShiftById);

// ========================================================
// RUTA TEMPORAL PARA TESTING: BORRAR DESPUÉS 
router.delete('/reset', resetQueue);
// ========================================================
export default router;
