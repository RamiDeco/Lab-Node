import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initDB } from './initDB.js';
import authRoutes from './routes/auth.routes.js';
import shiftRoutes from './routes/shift.routes.js';
import exproutes from './routes/experiment.routes.js'
import turnoEstadoRoutes from './routes/turnoEstado.routes.js';
const { pathname: root } = new URL('../', import.meta.url);
import dotenv from "dotenv";
import viewsRoutes from './routes/views.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuración de Rutas para ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

await initDB();

app.use('/auth', authRoutes);
app.use('/shift', shiftRoutes);
app.use('/exp', exproutes);
app.use('/turno-estado', turnoEstadoRoutes);

app.use('/', viewsRoutes);
/*Esto es lo que agrege */

//variables de entorno
dotenv.config({path: "./env/.env"});

//Selecciono el motor de plantillas que vamos a utilizar
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//Configuro node para que pueda leer forms
app.use(express.urlencoded({extended:false}));

//Configuro los archivos estaticos del front
app.use("/resources", express.static(path.join(__dirname, "public")));

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

export default server;
