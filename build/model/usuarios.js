"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    _usuario: {
        type: String,
        required: true,
        unique: true
    },
    _password: {
        type: String,
        required: true
    }
}, { versionKey: false });
exports.Usuarios = (0, mongoose_1.model)('usuarios', UserSchema);
