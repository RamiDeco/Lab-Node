// auth/auth.service.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getByEmail, addUser } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

async function registerUser(email, password) {
  const user = await getByEmail(email);
  //Verificamos si el usuario ya existe
   if (user) {
     throw new Error('El usuario ya existe');
   }

  const hashedPassword = await bcrypt.hash(password, 10);
  addUser(email, hashedPassword );

  return { email };
}

async function loginUser(email, password) {
  const user = await getByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }
  const userId = user.id;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { registerUser, loginUser, verifyToken };
