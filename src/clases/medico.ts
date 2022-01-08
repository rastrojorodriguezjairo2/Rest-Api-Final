import {Empleado} from "./empleado";
import {Paciente} from "./paciente";

export class Medico extends Empleado{
    findOneAndDelete(arg0: { _contacto: number; }, arg1: (err: any, doc: string | null) => void) {
        throw new Error("Method not implemented.");
    }
    find(arg0: {}): any {
        throw new Error("Method not implemented.");
    }
    private _especialidad: string;
    private _pacientes: Array<Paciente>;
    constructor(id: number, nombremp:string, apellido:string, contacto: number, especialidad: string, pacientes: Array<Paciente>, salarioBase:number){
    super (id, nombremp, apellido, contacto, salarioBase)
    this._especialidad = especialidad;
    this._pacientes = pacientes
    }
    get salarioBase (){
        return this._salarioBase;
    }
    get especialidad (){
        return this._especialidad;
    }
    get pacientes (){
        return this._pacientes;
    }


    sueldo(){
        let sueldo : number;
        sueldo = super.salarioBase;
        if (this._especialidad == "cirujano"){
            sueldo += 350 + sueldo
        } else if (this._especialidad == "oftalmologo"){
            sueldo += 100 + sueldo
        } else if (this._especialidad == "traumatologo"){
            sueldo += 250 + sueldo
        } else if (this._especialidad == "ginecologo"){
            sueldo += 150 + sueldo
        } else if (this._especialidad == "otorrino"){
            sueldo += 100 + sueldo
        } else if (this._especialidad == "cardiovascular"){
            sueldo += 400 + sueldo
        } else if (this._especialidad == "neurologo"){
            sueldo += 500 + sueldo
        } else if (this._especialidad == "pediatra"){
            sueldo += 125 + sueldo
        } else {
            sueldo =+ 0
        }
        return sueldo
    }
}