import {Schema, model} from 'mongoose'

const UserSchema = new Schema ({
    _usuario: {
        type: String,
        required: true,
        unique: true
    },
    _password: {
        type: String,
        required: true
    }
}, {versionKey: false})

export const Usuarios = model('usuarios', UserSchema)