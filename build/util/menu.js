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
exports.calcular = exports.emplear = exports.atender = exports.menu = void 0;
const entradaTeclado_1 = require("./entradaTeclado");
let menu = () => __awaiter(void 0, void 0, void 0, function* () {
    let menu1;
    console.log('1.-Gestionar Pacientes');
    console.log('2.-Gestionar Empleados');
    console.log('3.-Calculos');
    console.log('4.-Salir');
    menu1 = parseInt(yield (0, entradaTeclado_1.leerTeclado)('Opción: '));
    return menu1;
});
exports.menu = menu;
let atender = () => __awaiter(void 0, void 0, void 0, function* () {
    let menu2;
    console.log('1.-Nuevo paciente');
    console.log('2.-Guardar paciente');
    console.log('3.-Listado de pacientes');
    console.log('4.-Eliminar paciente');
    console.log('5.-Salir');
    menu2 = parseInt(yield (0, entradaTeclado_1.leerTeclado)('Opción: '));
    return menu2;
});
exports.atender = atender;
let emplear = () => __awaiter(void 0, void 0, void 0, function* () {
    let menu3;
    console.log('1.-Nuevo empleado');
    console.log('2.-Guardar empleado');
    console.log('3.-Listado de empleados');
    console.log('4.-Eliminar empleado');
    console.log('5.-Salir');
    menu3 = parseInt(yield (0, entradaTeclado_1.leerTeclado)('Opción: '));
    return menu3;
});
exports.emplear = emplear;
let calcular = () => __awaiter(void 0, void 0, void 0, function* () {
    let menu4;
    console.log('1.-Coste de Salario');
    console.log('2.-Ganancias');
    console.log('3.-Ganancias de doctor');
    console.log('4.-Salir');
    menu4 = parseInt(yield (0, entradaTeclado_1.leerTeclado)('Opción: '));
    return menu4;
});
exports.calcular = calcular;
