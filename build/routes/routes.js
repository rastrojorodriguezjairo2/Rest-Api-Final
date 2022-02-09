"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const pacientes_1 = require("../model/pacientes");
const empleados_1 = require("../model/empleados");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        //Añadir un nuevo paciente
        this.postpacientes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, apellido1, apellido2, edad, dni, telefono, medico, urgencia, tipo, prueba, test } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _id: id,
                _nombre: nombre,
                _apellido1: apellido1,
                _apellido2: apellido2,
                _edad: edad,
                _dni: dni,
                _telefono: telefono,
                _medico: medico,
                _urgencia: urgencia,
                _tipo: tipo,
                _prueba: prueba,
                _test: test
            };
            const oSchema = new pacientes_1.Atendidos(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        //Añadir un nuevo Empleado
        this.postempleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, apellido, contacto, puesto, especialidad, idiomas, sueldo } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _id: id,
                _nombre: nombre,
                _apellido: apellido,
                _contacto: contacto,
                _puesto: puesto,
                _especialidad: especialidad,
                _idiomas: idiomas,
                _sueldo: sueldo
            };
            const oSchema = new empleados_1.Trabajadores(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        //Listar todos los pacientes de la base de datos
        this.getPacientes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield database_1.db.conectarBD()
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    pacientes_1.Atendidos.find({})
                        .then((pacientes) => {
                        database_1.db.desconectarBD()
                            .then(() => resolve(pacientes))
                            .catch((error) => reject(`Error desconectando de ${database_1.db._cadenaConexion}: ${error}`));
                    })
                        .catch((error) => reject(`Error consultando a ${database_1.db._cadenaConexion}: ${error}`));
                }))
                    .catch((error) => reject(`Error conectando a ${database_1.db._cadenaConexion}: ${error}`));
            }));
            res.json(yield promise);
            database_1.db.desconectarBD();
        });
        //Listar todos los empleados de la BD
        this.getEmpleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield empleados_1.Trabajadores.aggregate([{
                        $lookup: {
                            from: 'pacientes',
                            localField: '_apellido',
                            foreignField: '_medico',
                            as: "pacientes"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Buscar un paciente especifico
        this.getbuspaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const pac = yield pacientes_1.Atendidos.findOne({
                    _id: id
                });
                res.json(pac);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Buscar un empleado especifico
        this.getbusempleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { apellido } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const emp = yield empleados_1.Trabajadores.aggregate([
                    {
                        $match: {
                            "_apellido": apellido
                        },
                    }, {
                        $lookup: {
                            from: 'pacientes',
                            localField: '_apellido',
                            foreignField: '_medico',
                            as: "pacientes"
                        }
                    }
                ]);
                res.json(emp);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Actualizar o cambiar los datos de un paciente especifico
        this.updatepaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, apellido1, apellido2, dni, telefono, medico, tipo, pruebas, test } = req.body;
            yield database_1.db.conectarBD();
            yield pacientes_1.Atendidos.findOneAndUpdate({
                _id: id
            }, {
                _nombre: nombre,
                _apellido1: apellido1,
                _apellido2: apellido2,
                _dni: dni,
                _telefono: telefono,
                _medico: medico,
                _tipo: tipo,
                _prueba: pruebas,
                _test: test
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        //Actualizar o cambiar los datos de un empleado especifico
        this.updateempleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, apellido, contacto, sueldo, idiomas } = req.body;
            yield database_1.db.conectarBD();
            yield empleados_1.Trabajadores.findOneAndUpdate({
                _id: id
            }, {
                _nombre: nombre,
                _apellido: apellido,
                _contacto: contacto,
                _sueldo: sueldo,
                _idiomas: idiomas,
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        //Eliminar un paciente de la base de datos
        this.deletepaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield pacientes_1.Atendidos.findOneAndDelete({
                _id: id
            })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.json({ "Borrado": true });
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        //Eliminar un empleado de la base de datos
        this.deleteempleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield empleados_1.Trabajadores.findOneAndDelete({
                _id: id
            })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.json({ "Borrado": true });
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.post('/newpaciente', this.postpacientes),
            this._router.post('/newempleado', this.postempleados),
            this._router.get('/verpaciente', this.getPacientes),
            this._router.get('/verempleado', this.getEmpleados),
            this._router.get('/buspaciente/:id', this.getbuspaciente),
            this._router.get('/busempleado/:apellido', this.getbusempleado),
            this._router.put('/actualizarpaciente/:id', this.updatepaciente),
            this._router.put('/actualizarempleado/:id', this.updateempleado),
            this._router.delete('/eliminarpaciente/:id', this.deletepaciente),
            this._router.delete('/eliminarempleado/:id', this.deleteempleado);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
