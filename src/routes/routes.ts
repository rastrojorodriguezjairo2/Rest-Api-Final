import {Request, Response, Router} from 'express'
import {Atendidos} from '../model/pacientes'
import {Trabajadores} from '../model/empleados'
import {db} from '../database/database'
import { debuglog } from 'util'

class Routes {
    private _router: Router

    constructor(){
        this._router = Router()
    }
    get router(){
        return this._router
    }
    //Añadir un nuevo paciente
    private postpacientes = async (req: Request, res: Response) => {
        const { id, nombre, apellido1, apellido2, edad, dni, telefono, medico, urgencia, tipo, pruebas, test} = req.body
        await db.conectarBD()
        const dSchema={
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
            _pruebas: pruebas,
            _test: test
        }
        const oSchema = new Atendidos(dSchema)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    //Añadir un nuevo Empleado
    private postempleado = async (req: Request, res: Response) => {
        console.log("HOLA")
        const { id, nombre, apellido, contacto, sueldo, puesto, especialidad, idiomas} = req.body
        await db.conectarBD()
        console.log(req.body)
        const dSchema={
            _id: id,
            _nombre: nombre,
            _apellido: apellido,
            _contacto: contacto,
            _sueldo: sueldo,
            _puesto: puesto, 
            _especialidad: especialidad,
            _idiomas: idiomas
        }
        const oSchema = new Trabajadores(dSchema)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    //Listar todos los pacientes de la base de datos
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
    //Listar todos los empleados de la BD
    private getEmpleados = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Trabajadores.aggregate([{
                    $lookup: {
                        from: 'pacientes',
                        localField: '_apellido',
                        foreignField: '_medico',
                        as: "pacientes"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Listar todos los medicos de la BD
    private getMedicos=async(req:Request, res:Response)=>{
        await db.conectarBD()
        .then(async ()=>{
            const medicos = await Trabajadores.aggregate([{
                
                $match: {
                    "_puesto": 'medico'
                },
            },{
                $lookup: {
                from: 'pacientes',
                localField: '_apellido',
                foreignField: '_medico',
                as: "pacientes"
            }
            }
        ])
        res.json(medicos)
        })
        .catch((mensaje)=>{
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Listar todos los administrativos de la BD
    private getAdministrativos=async(req:Request, res:Response)=>{
        await db.conectarBD()
        .then(async ()=>{
            const admin = await Trabajadores.aggregate([{
                $match:{
                    "_puesto": 'administrativo'
                }
            }
        ])
        res.json(admin)
        })
        .catch((mensaje)=>{
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Listar todos los pacientes de urgencias de la BD
    private getUrgencias=async(req:Request, res:Response)=>{
        await db.conectarBD()
        .then(async ()=>{
            const urgen = await Atendidos.find({
                "_tipo": 'urgencia'
            }
            )
         res.json(urgen)   
        })
        .catch((mensaje)=>{
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Listar todos los pacientes covid de la BD
    private getCovid=async(req:Request, res:Response)=>{
        await db.conectarBD()
        .then(async ()=>{
            const covi = await Atendidos.aggregate([{
                $match:{
                    "_tipo": 'covid'
                }
            }
        ])
        res.json(covi)
        })
        .catch((mensaje)=>{
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Buscar un paciente especifico
    private getbuspaciente = async (req:Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const pac = await Atendidos.findOne({
                _id: id
        })  
            res.json(pac)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Buscar un empleado especifico
    private getbusempleado = async(req: Request, res: Response)=>{
        const { apellido } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const emp = await Trabajadores.aggregate([
                {
                    $match: {
                        "_apellido": apellido
                    },
                },{
                    $lookup: {
                    from: 'pacientes',
                    localField: '_apellido',
                    foreignField: '_medico',
                    as: "pacientes"
                }
                }
            ])
            res.json(emp)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    //Actualizar o cambiar los datos de un paciente especifico
    private updatepaciente = async (req: Request, res: Response) => {
        const {id} = req.params
        const {nombre, apellido1, apellido2, dni, telefono, medico, tipo, pruebas, test} = req.body
        await db.conectarBD()
        await Atendidos.findOneAndUpdate({
            _id: id
        },{
            _nombre: nombre,
            _apellido1: apellido1,
            _apellido2: apellido2,
            _dni: dni,
            _telefono: telefono,
            _medico: medico,
            _tipo: tipo,
            _pruebas: pruebas,
            _test: test
        },{
            new:true,
            runValidators:true
        }
        )
        .then((doc: any) => res.send(doc))
        .catch((err: any) => res.send ('Error: '+ err))
        await db.desconectarBD()
    }
    //Actualizar o cambiar los datos de un empleado especifico
    private updateempleado = async (req: Request, res: Response) => {
        const {id} = req.params
        const {nombre, apellido, contacto, sueldo, puesto, especialidad, idiomas} = req.body
        await db.conectarBD()
        await Trabajadores.findOneAndUpdate({
            _id: id
        },{
            _nombre: nombre,
            _apellido: apellido,
            _contacto: contacto,
            _sueldo: sueldo,
            _puesto: puesto,
            _especialidad: especialidad,
            _idiomas: idiomas
        },{
            new:true,
            runValidators:true
        }
        )
        .then((doc: any) => res.send(doc))
        .catch((err: any) => res.send ('Error: '+ err))
        await db.desconectarBD()
    }
    //Eliminar un paciente de la base de datos
    private deletepaciente = async (req: Request, res: Response) => {
        const {id} = req.params
        await db.conectarBD()
        await Atendidos.findOneAndDelete(
            { 
                _id:id
            }
        )
        .then( (doc: any) => {
            if (doc == null) {
                res.send(`No encontrado`)
            }else {
                res.json({"Borrado": true})
            }
        })
        .catch ((err: any) => res.send('Error: '+ err))
        db.desconectarBD()
    }
    //Eliminar un empleado de la base de datos
    private deleteempleado = async (req: Request, res: Response) => {
        const {id} = req.params
        await db.conectarBD()
        await Trabajadores.findOneAndDelete(
            { 
                _id:id
            }
        )
        .then( (doc: any) => {
            if (doc == null) {
                res.send(`No encontrado`)
            }else {
                res.json({"Borrado": true})
            }
        })
        .catch ((err: any) => res.send('Error: '+ err))
        db.desconectarBD()
    }
    misRutas(){
        this._router.post('/newpaciente', this.postpacientes),
        this._router.post('/newempleado', this.postempleado),
        this._router.get('/verpaciente', this.getPacientes),
        this._router.get('/verurgencias', this.getUrgencias),
        this._router.get('/vercovid', this.getCovid),
        this._router.get('/verempleado', this.getEmpleados),
        this._router.get('/vermedicos', this.getMedicos),
        this._router.get('/veradministrativos', this.getAdministrativos),
        this._router.get('/buspaciente/:id', this.getbuspaciente),
        this._router.get('/busempleado/:apellido', this.getbusempleado),
        this._router.put('/actualizarpaciente/:id', this.updatepaciente),
        this._router.put('/actualizarempleado/:id', this.updateempleado),
        this._router.delete('/eliminarpaciente/:id', this.deletepaciente),
        this._router.delete('/eliminarempleado/:id', this.deleteempleado)        
    }
}
const obj = new Routes()
obj.misRutas()
export const routes = obj.router