// auth/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

export async function registerUser(email, password) {

  const user = await Usuario.getByEmail(email);
  if (user) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  Usuario.addUser(email, hashedPassword);

  return { email };
}

export async function loginUser(email, password) {
  const user = await Usuario.getByEmail(email);
  console.log(user.password);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }
  const userId = user.id_usuario;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
