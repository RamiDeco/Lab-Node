// auth/auth.service.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getByEmail, addUser } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

async function registerUser(email, password) {
//   if (getByEmail(email)) {
//     throw new Error('El usuario ya existe');
//   }

  const hashedPassword = await bcrypt.hash(password, 10);
  addUser(email, hashedPassword );

  return { email };
}

async function loginUser(email, password) {
console.log('Email:', email);
  const user = await getByEmail(email);
  console.log(user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { registerUser, loginUser, verifyToken };
