import {Request, Response, Router} from 'express'
import {Trabajadores} from '../schemas/empleados'
import {Atendidos} from '../schemas/pacientes'
import {db} from '../database/database'

class Routes {
    private _router: Router

    constructor(){
        this._router = Router()
    }
    get router(){
        return this._router
    }
    private getPacientes = async (req:Request, res: Response) => {
        const promise = new Promise<any>( async (resolve, reject) => {
            await db.conectarBD()
            .then( async () => {
                Atendidos.find({})
                .then( (pacientes) => {
                    db.desconectarBD()
                    .then( () => resolve(pacientes) )
                    .catch( (error) => reject(`Error desconectando de ${db._cadenaConexion}: ${error}`) )
                })
                .catch( (error) => reject(`Error consultando a ${db._cadenaConexion}: ${error}`) )
            })
            .catch( (error) => reject(`Error conectando a ${db._cadenaConexion}: ${error}`) )
        })
        res.json(await promise)
        db.desconectarBD()
    }
    private getEmpleados = async (req:Request, res: Response) => {
        const promise = new Promise<any>( async (resolve, reject) => {
            await db.conectarBD()
            .then( async () => {
                Trabajadores.find({})
                .then( (empleados) => {
                    db.desconectarBD()
                    .then( () => resolve(empleados) )
                    .catch( (error) => reject(`Error desconectando de ${db._cadenaConexion}: ${error}`) )
                })
                .catch( (error) => reject(`Error consultando a ${db._cadenaConexion}: ${error}`) )
            })
            .catch( (error) => reject(`Error conectando a ${db._cadenaConexion}: ${error}`) )
        })
        res.json(await promise)
        db.desconectarBD()
    }
    private postpaciente = async (req: Request, res: Response) => {

        let paci= new Atendidos({
            _id: req.body._id,
            _nombre: req.body._nombre,
            _apellido1: req.body._apellido1,
            _apellido2: req.body._apellido2,
            _edad: req.body._edad,
            _dni: req.body._dni,
            _seguro: req.body._seguro,
            _telefono: req.body._telefono,
            _dolencia: req.body._dolencia,
            _tipo: req.body._tipo,
            _prueba: req.body._prueba,
            _test: req.body._test,
            _preciobase: req.body._preciobase
        })
        console.log(paci)

        await db.conectarBD() 
        .then( async () => {
            await paci.save()
            .then( (mensaje:any) => res.send(`El documento se ha introducido correctamente en la base de datos ${mensaje}`))
            .catch( (error:any) => res.send(`Ha habido un error en la subida del documento a ${db._cadenaConexion}: ${error}`))
        })
        .catch( (error:any) => res.send(`Error conectando a ${db._cadenaConexion}: ${error}`))
        db.desconectarBD()
    }
    private postempleado = async (req: Request, res: Response) => {

        let paci= new Trabajadores({
            _id: req.body._id,
           _nombremp: req.body._nombremp,
            _apellido: req.body._apellido,
            _contacto: req.body._contacto,
            _especialidad: req.body._especialidad,
            _pacientes: req.body._pacientes,
            _segundoIdioma: req.body._segundoIdioma,
            _sueldo: req.body._sueldo
        })
        console.log(emple)

        await db.conectarBD() 
        .then( async () => {
            await emple.save()
            .then( (mensaje:any) => res.send(`El documento se ha introducido correctamente en la base de datos ${mensaje}`))
            .catch( (error:any) => res.send(`Ha habido un error en la subida del documento a ${db._cadenaConexion}: ${error}`))
        })
        .catch( (error:any) => res.send(`Error conectando a ${db._cadenaConexion}: ${error}`))
        db.desconectarBD()
    }

    misRutas(){
        this._router.get('/pacientes', this.getPacientes)
        this._router.get('/empleados', this.getEmpleados)
        this._router.post('/newpaciente', this.postpaciente)
        this._router.post('/newempleado', this.postempleado)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
function emple(emple: any) {
    throw new Error('Function not implemented.')
}

