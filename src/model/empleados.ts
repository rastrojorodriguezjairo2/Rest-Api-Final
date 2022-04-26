import {Schema, model } from 'mongoose'

const empleSchema = new Schema({
    _id:{
      type: Number,
      unique: true
    },
    _nombre: {
        type: String
      },
    _apellido: {
        type: String
      },
    _contacto: {
        type: Number,
        unique: true
      },
    _sueldo: {
        type: Number
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
})

export type empgeneral = {
  _id: number | null
  _nombre: string | null,
  _apellido: string | null,
  _contacto: number | null,
  _sueldo: number | null,
  _puesto: string | null,
  _especialidad: string | null,
  _idioma: string [] | null
}

export type empmedico = {
    _id: number | null
    _nombre: string | null,
    _apellido: string | null,
    _contacto: number | null,
    _sueldo: number | null,
    _puesto: string | null,
    _especialidad: string | null
}
export type empadmin = {
    _id: number | null
    _nombre: string | null,
    _apellido: string | null,
    _contacto: number | null,
    _sueldo: number | null,
    _puesto: string | null,
    _idioma: string [] | null
}
export const Trabajadores = model('empleados', empleSchema)