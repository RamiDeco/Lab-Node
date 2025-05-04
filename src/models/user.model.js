import connection from '../config/db.js';

const Usuario = {
  getAll: async () => {
    try {
      const [users] = await connection.query('SELECT * FROM usuario');
      return users;
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
    }
  },

  getByEmail: async (email) => {
    try {
      const result = await connection.execute( 'SELECT * FROM usuario WHERE email = ?', [email] );
      if (result[0].length === 0) return null;
      return result[0][0];
    } catch (err) {
      console.error('Error al obtener el usuario por email:', err);
    }
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
};

export default Usuario;