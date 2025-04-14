const { get } = require('mongoose');
const conection = require('../config/db');
const { getAll } = require('./user.model');

const Shift = {
    createShift: (user_id) => {
        return new Promise((resolve, reject) => {
            conection.query('INSERT INTO shift (id_usuario) VALUES (?)', [user_id], (err, result) => {
                if (err) {
                    console.error('Error creando el shift:', err);
                    return reject(err);
                }
                resolve(result.insertId); // o { id: result.insertId } si prefieres un objeto
            });
        });
    },
    getAllShifts: () => {
        return new Promise((resolve, reject) => {
            conection.query('SELECT * FROM shift', (err, result) => {
                if (err) {
                    console.error('Error creando el shift:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },  
    getShiftByUser: (id) => {
        return new Promise((resolve, reject) => {
            conection.query('SELECT * FROM shift WHERE id_usuario = ?', [id], (err, result) => {
                if (err) {
                    console.error('Error obteniendo el shift:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}
module.exports = Shift;