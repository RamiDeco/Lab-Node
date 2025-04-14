const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const shiftRoutes = require('./routes/shift.routes');
app.use('/shift', shiftRoutes);

module.exports = app;
