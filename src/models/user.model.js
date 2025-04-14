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

  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM usuario WHERE email = ?',
        [email],
        (err, resultado) => {
          if (err) {
            return reject(err);
          }
          resolve(resultado[0]); // puede ser undefined si no encuentra nada
        }
      );
    });
  },

  addUser: (email, password) => {
    console.log("Email:", email);
    console.log("Password:", password);
    connection.query('INSERT INTO usuario (email, password) VALUES (?, ?)', [email, password], (err, resultado) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Usuario registrado con éxito');
      }
    });
  }

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