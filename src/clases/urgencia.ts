import {Paciente} from './paciente';

export class Urgencias extends Paciente {
    find(arg0: {}): any {
        throw new Error("Method not implemented.");
    }
    private _prueba: string;
    constructor(id: number, nombre: string, apellido1: string, apellido2:string, edad: number, dni: string, seguro: boolean, telefono: number, dolencia: string, tipo: string, prueba: string, preciobase: number){
    super (id, nombre, apellido1, apellido2, edad, dni, seguro, telefono, dolencia, tipo, preciobase)
    this._prueba = prueba;
    }
    get prueba(){
        return this._prueba;
    }
    get precioBase(){
        return this._preciobase;
    }
    get seguro(){
        return this._seguro;
    }
    pago(): number{
        let pago: number;
        pago = super.pago();
        if (this._seguro){
            pago = 0;
        } else {
            if (this._prueba == 'rayos x'){
                pago += 30 + pago;
            } else if(this._prueba == 'resonancia'){
                pago += 35 + pago;
            } else if (this._prueba == 'tac') {
                pago += 40 + pago;
            } else if (this._prueba == 'traumatologia'){
                pago += 45 + pago;
            } else if (this._prueba == 'otorrino'){
                pago += 50 + pago;
            } else if (this.prueba == "ginecologia"){
                pago += 69 + pago;
            } else if (this._prueba == "oftalmologia"){
                pago += 56 + pago;
            } else if (this._prueba == 'operacion'){
                pago += 100 + pago;
            } else if (this._prueba == 'cardiovascular'){
                pago += 150 + pago;
            } else {
                pago = 80;
        }
    }
        return pago
    }
}