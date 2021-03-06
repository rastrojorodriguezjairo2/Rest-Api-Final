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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leerTeclado = void 0;
// https://nodejs.org/dist./v4.8.3/docs/doc/api/readline.html
const readline_1 = __importDefault(require("readline"));
let readlineI;
let leelinea = (prompt) => {
    readlineI = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resuelta, rechazada) => {
        readlineI.question(`${prompt}:`, (cadenaEntrada) => {
            resuelta(cadenaEntrada);
        });
    });
};
let leerTeclado = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let valor;
    valor = yield leelinea(prompt);
    readlineI.close();
    return valor;
});
exports.leerTeclado = leerTeclado;
