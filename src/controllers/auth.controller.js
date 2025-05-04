// auth/auth.controller.js
import { registerUser, loginUser, verifyToken } from '../services/auth.service.js';

export const UserController = {
  //Registrar usuario y guardarlo en la bd
  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      await registerUser(email, password);
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  //Iniciar sesión y generar un token
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const token = await loginUser(email, password);
      console.log(token);
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ message: 'Login exitoso' });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  //Verificar el token
  profile: (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Token faltante' });

    try {
      const data = verifyToken(token);
      res.json({ email: data.email });
    } catch {
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  },
  //Cerrar sesión
  logout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada' });
  }
}
export default UserController;