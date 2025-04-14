// auth/auth.routes.js
const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shift.controller');

router.post('/create', shiftController.createShift);
router.get('/shifts', shiftController.getAllShifts);
router.post('/shift', shiftController.getShiftById);


module.exports = router;
