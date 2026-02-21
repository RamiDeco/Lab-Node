import User from './user.model.js';
import Shift from './shift.model.js';
import TurnoEstado from './turnoEstado.model.js';
import Temperature from './temperature.model.js';

// Definir relaciones
User.hasMany(Shift, {
  foreignKey: 'id_usuario',
  as: 'shifts'
});

Shift.belongsTo(User, {
  foreignKey: 'id_usuario',
  as: 'user'
});

// Relación entre Shift y TurnoEstado
Shift.belongsTo(TurnoEstado, {
  foreignKey: 'id_estado',
  as: 'estado'
});

TurnoEstado.hasMany(Shift, {
  foreignKey: 'id_estado',
  as: 'shifts'
});

// --- [NUEVO] Relaciones de Turnos y Temperaturas ---
// "Un Turno tiene muchas mediciones de temperatura"
Shift.hasMany(Temperature, {
  foreignKey: 'shiftId',
  as: 'temperatures'
});

// Y esto: "Una medición pertenece a un Turno específico"
Temperature.belongsTo(Shift, {
  foreignKey: 'shiftId',
  as: 'shift'
});

export { User, Shift, TurnoEstado, Temperature }; 