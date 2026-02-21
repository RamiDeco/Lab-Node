import { Router } from 'express';
import { verificarSesion } from '../middlewares/auth.middleware.js'; 

const router = Router();

// Pagina principal
router.get('/', verificarSesion, (req, res) => {
    res.render('prueba-grafana', { user: req.user });
});

// Vista de Login
router.get('/login', (req, res) => {
    res.render('login');
});

// Vista de Registro
router.get('/registro', (req, res) => {
    res.render('registro');
});

export default router;