import {Paciente} from './paciente';

export  class Empleado {
    private _id: number;
    private _nombremp: string;
    private _apellido: string;
    private _contacto: number;
    protected _salarioBase: number;
    constructor(id:number, nombremp:string, apellido:string, contacto: number, salarioBase:number){
        this._id = id;
        this._nombremp = nombremp;
        this._apellido = apellido;
        this._contacto = contacto;
        this._salarioBase = salarioBase;
    }
    get id(){
        return this._id;
    }
    get nombremp() {
        return this._nombremp;
     }
    get apellido() {
      return this._apellido;
    }
    get contacto() {
        return this._contacto;
    }
    get salarioBase() {
        return this._salarioBase;
      }
      sueldo(): number {
          let sueldo : number;
          sueldo = this._salarioBase;
          sueldo = 1000;
          return sueldo
      }
}               