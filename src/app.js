const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Importar rutas
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

module.exports = app;
