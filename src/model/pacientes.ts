import {Schema, model } from 'mongoose'

const pacienteSchema = new Schema({
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
        unique:true
      },
    _telefono: {
        type: Number
      },
      _medico:{
        type: String
      },
    _urgencia: {
        type: String
      },
    _tipo: {
      type: String
    },
      _prueba: {
        type: Array,
        default: 'String'
      },
      _test: {
        type: String,
      }
})

export type pacigeneral = {
  _id: number | null,
  _nombre: string | null,
  _apellido1: string | null,
  _apellido2: string | null,
  _edad: number | null,
  _dni: string | null,
  _telefono: number | null,
  _medico: number | null,
  _urgencia: string | null,
  _tipo: string | null,
  _pruebas: string | null,
  _test: string | null
}

export type pacicovid = {
    _id: number | null,
    _nombre: string | null,
    _apellido1: string | null,
    _apellido2: string | null,
    _edad: number | null,
    _dni: string | null,
    _telefono: number | null,
    _medico: number | null,
    _urgencia: string | null,
    _tipo: string | null,
    _test: string | null,
}

export type paciurgencia = {
  _id: number | null,
  _nombre: string | null,
  _apellido1: string | null,
  _apellido2: string | null,
  _edad: number | null,
  _dni: string | null,
  _telefono: number | null,
  _medico: number | null,
  _urgencia: string | null,
  _tipo: string | null,
  _pruebas: String [] | null,
}
export const Atendidos = model('pacientes', pacienteSchema)