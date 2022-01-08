import {Empleado} from "./empleado";

export class Administrativo extends Empleado{
    findOneAndDelete(arg0: { _contacto: number; }, arg1: (err: any, doc: string | null) => void) {
        throw new Error("Method not implemented.");
    }
    find(arg0: {}): any {
        throw new Error("Method not implemented.");
    }
    private _segundoIdioma: string;
    constructor(id:number, nombremp:string, apellido:string, contacto: number, segundoIdioma: string, salarioBase:number ){
        super (id, nombremp, apellido, contacto, salarioBase)
        this._segundoIdioma = segundoIdioma;
    }
    get segundoIdioma (){
        return this._segundoIdioma
    }
    sueldo(){
        let sueldo : number;
        sueldo = super.salarioBase;
        if (this._segundoIdioma == "ingles" || this._segundoIdioma == "Ingles"){
            sueldo += 300 + sueldo
        } else if (this._segundoIdioma == "frances" || this._segundoIdioma == "Frances"){
            sueldo += 100 + sueldo
        } else if (this._segundoIdioma == "aleman" || this._segundoIdioma == "Aleman"){
            sueldo += 200 + sueldo
        } else {
            sueldo =+ 0;
        }
        return sueldo
    }
}