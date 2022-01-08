import {Schema, model } from 'mongoose'
import { Paciente } from '../clases/paciente'

const empleSchema = new Schema({
    _id:{
      type: Number,
      required:[true, 'No olvides el identificador']
    },
    _nombremp: {
        type: String,
        required:[true, '¿Quien es el empleado?, tendremos que saber su nombre ¿no?'],
      },
    _apellido: {
        type: String,
        required:[true, 'Importante diferenciar entre los empleados por su apellido'],
      },
    _contacto: {
        type: Number,
        unique: true,
      },
    _pacientes: {
        type: Array,
        default: [Number],
    },
    _sueldo: {
        type: Number
    },
    _especialidad: {
      type: String,
    },
    _segundoIdioma: {
        type: String,
    }
})

export type emple = {
    _id: number | null
    _nombremp: string | null,
    _apellido: string | null,
    _contacto: number | null,
    _especialidad: string | null,
    _pacientes: Array<Paciente> | null,
    _segundoIdioma: string | null,
    _sueldo: number | null
}
export const Trabajadores = model('empleados', empleSchema)