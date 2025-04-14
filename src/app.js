const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const authRoutes = require('./auth/auth.routes');
app.use('/auth', authRoutes);


// Importar rutas
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

module.exports = app;
