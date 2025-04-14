const connection = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    connection.query('SELECT * FROM usuario', (err, resultados) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, resultados);
      }
    });
  },

//   obtenerPorId: (id, callback) => {
//     connection.query('SELECT * FROM usuario WHERE id = ?', [id], (err, resultado) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, resultado[0]);
//       }
//     });
//   },

//   agregar: (nombre, callback) => {
//     connection.query('INSERT INTO usuario (nombre) VALUES (?)', [nombre], (err, resultado) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, { id: resultado.insertId, nombre });
//       }
//     });
//   }
};

module.exports = Usuario;