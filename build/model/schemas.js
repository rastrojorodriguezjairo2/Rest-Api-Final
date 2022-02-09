"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajadores = exports.Atendidos = void 0;
const mongoose_1 = require("mongoose");
const pacienteSchema = new mongoose_1.Schema({
    _id: Number,
    _nombre: String,
    _apellido1: String,
    _apellido2: String,
    _edad: Number,
    _dni: String,
    _telefono: Number,
    _urgnecia: String,
    _prueba: Array,
    _preciobase: Number
}, {
    collection: 'pacientes'
});
const empleSchema = new mongoose_1.Schema({
    _id: Number,
    _nombre: String,
    _apellido: String,
    _contacto: Number,
    _puesto: String,
    _especialidad: String,
    _pacientes: Array,
    _segundoIdioma: String,
    _sueldo: Number
}, {
    collection: 'empleados'
});
exports.Atendidos = (0, mongoose_1.model)('pacientes', pacienteSchema);
exports.Trabajadores = (0, mongoose_1.model)('empleados', empleSchema);
