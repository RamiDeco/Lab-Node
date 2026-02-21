import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Asegurate que esta ruta sea correcta según tu proyecto

export const Temperature = sequelize.define('Temperature', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    value: {
    type: DataTypes.FLOAT, // Usamos FLOAT para decimales (ej: 24.5)
    allowNull: false,
    },
    timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Se guarda la hora exacta automáticamente
    },
    // Opcional: Relacionarlo con un turno para saber de quién es el dato
    shiftId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    }
}, {
    tableName: 'temperatures',
    timestamps: false // Ya tenemos nuestro propio timestamp custom
});

export default Temperature;