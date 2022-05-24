"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajadores = void 0;
const mongoose_1 = require("mongoose");
//SchemaEmpleados
const empleSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        unique: true
    },
    _nombre: {
        type: String,
        required: true
    },
    _apellido: {
        type: String,
        required: true
    },
    _contacto: {
        type: Number,
        unique: true
    },
    _sueldo: {
        type: Number,
        required: true
    },
    _puesto: {
        type: String,
        required: true
    },
    _especialidad: {
        type: String
    },
    _idiomas: {
        type: Array,
        default: 'String'
    }
});
exports.Trabajadores = (0, mongoose_1.model)('empleados', empleSchema);
