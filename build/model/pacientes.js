"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atendidos = void 0;
const mongoose_1 = require("mongoose");
const pacienteSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        unique: true
    },
    _nombre: {
        type: String
    },
    _apellido1: {
        type: String
    },
    _apellido2: {
        type: String
    },
    _edad: {
        type: Number
    },
    _dni: {
        type: String,
        unique: true
    },
    _telefono: {
        type: Number
    },
    _medico: {
        type: String
    },
    _urgencia: {
        type: String
    },
    _tipo: {
        type: String
    },
    _pruebas: {
        type: Array,
        default: 'String'
    },
    _test: {
        type: String,
    }
});
exports.Atendidos = (0, mongoose_1.model)('pacientes', pacienteSchema);
