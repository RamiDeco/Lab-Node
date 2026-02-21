import jwt from 'jsonwebtoken';

/*
 * Verificar que el usuario este logueado
 */

const JWT_SECRET = process.env.JWT_SECRET

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Token faltante' });
    }
  
    try {
      const data = verifyToken(token);
      req.user = data; // Poner la data del token en el objeto request para usarlo en las siguientes funciones
      next();
    } catch (err) {
      return res.status(401).json({ error: `Error en el token ${err}` });
    }
  };

  export const verificarSesion = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};