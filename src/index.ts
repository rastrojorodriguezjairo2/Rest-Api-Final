import { leerTeclado } from "./util/entradaTeclado";
import {menu, atender, emplear} from "./util/menu"
import {Paciente} from "./clases/paciente"
import {Urgencias} from "./clases/urgencia"
import {Covid} from "./clases/covid"
import {Empleado} from "./clases/empleado"
import {Medico} from "./clases/medico"
import {Administrativo} from "./clases/administrativo"
import {Atendidos, paci} from "./schemas/pacientes"
import {Trabajadores, emple} from "./schemas/empleados"
import {db} from './database/database'

let urgencia: Urgencias
let covid: Covid
let medico: Medico
let administrativo: Administrativo
let pacientes: Array<Paciente> = new Array<Paciente>()

const main = async () => {
    let menu1: number
    let menu2: number
    let menu3: number
    let empleados: string, nombre: string, apellido1: string, apellido2: string, edad: number, dni: string, asegurado: boolean, telefono: number, dolencia: string, prueba: string, test: string, preciobase: number
    let newpurgen: any, newcovid: any, newpaci: any
    let tipo: any
    do{
        menu1 = await menu()
        switch(menu1) {
            case 1:
                do{
                    menu2 = await atender()
                    switch(menu2) {
                        case 1: // Crear un nuevo paciente
                        let id: number
                            id = parseInt(await leerTeclado("Identificador del nuevo paciente"))
                            nombre = await leerTeclado("Nombre")
                            apellido1 = await leerTeclado("Primer apellido")
                            apellido2 = await leerTeclado("Segundo apellido")
                            edad = parseInt(await leerTeclado("Edad del paciente"))
                            dni = await leerTeclado("DNI: ")
                            asegurado = Boolean(await leerTeclado("¿Tiene seguro medico?(true or false)"))
                            telefono = parseInt(await leerTeclado("Teléfono"))
                            dolencia = await leerTeclado("¿Qué le ocurre?")
                            tipo = await leerTeclado("¿Qué tipo de paciente es?")
                            prueba = await leerTeclado("¿Qué prueba se le va a realizar?")
                            test = await leerTeclado("¿Qué tipo de test quiere hacerse?")
                            preciobase = parseInt(await leerTeclado("Cuanto le costara la consulta"))
                            newpaci = new Paciente (id, nombre, apellido1, apellido2, edad, dni, asegurado, telefono, dolencia, tipo, preciobase)
                            newpurgen = new Urgencias (id, nombre, apellido1, apellido2, edad, dni, asegurado, telefono, dolencia, tipo, prueba, preciobase)
                            newcovid = new Covid (id, nombre, apellido1, apellido2, edad, dni, asegurado, telefono, dolencia, tipo, test, preciobase)
                        break
                        case 2:
                            await db.conectarBD()//Guardar un paciente de Urgencias
                            const urgen ={
                                _id: newpaci.id,
                                _nombre: newpaci.nombre,
                                _apellido1: newpaci.apellido1,
                                _apellido2: newpaci.apellido2,
                                _edad: newpaci.edad,
                                _dni: newpaci.dni,
                                _seguro: newpaci.seguro,
                                _telefono: newpaci.telefono,
                                _dolencia: newpaci.dolencia,
                                _prueba: newpurgen.prueba,
                                _test: newcovid.test,
                                _preciobase: newpaci.preciobase
                            }
                            const urg = new Atendidos(urgen)
                            await urg.save()
                            .then((doc: any)=> console.log('El paciente se ha guardado correctamente' + doc))
                            .catch((err:any)=> console.log(err))
                            await db.desconectarBD()
                        break
                        case 3:
                            await db.conectarBD()
                            let query: any = await Atendidos.find({})
                                console.log(query)
                                await db.desconectarBD()
                        break
                        case 4:
                            await db.conectarBD()
                            let borrar = parseInt(await leerTeclado('Ponga el ID del paciente que quiere eliminar'))
                            await Atendidos.findOneAndDelete(
                                {
                                    _id: borrar
                                },
                                (err:any, doc: string | null) => {
                                    if(err){
                                        console.log(err)
                                    }else{
                                        if(doc == null)console.log(`No se ha encontrado dicho paciente`)
                                        else console.log(`Documento Borrado`+ doc)
                                    }
                                })
                            await db.desconectarBD()
                        break
                    }
                } while (menu2!=5)
                case 2:
                let nombremp:string, apellido:string, contacto: number
                let salarioBase: number, especialidad: string, segundoIdioma: string
                let newmedi: any, newemp: any, newadmin: any
                do{
                    menu3 = await emplear()
                    switch(menu3) {
                        case 1:
                            let id:number
                            id = parseInt(await leerTeclado("Cual es el Id del empleado"))
                            nombremp = await leerTeclado("Nombre del empleado ")
                            apellido = await leerTeclado("Primer apellido del empleado ")
                            contacto = parseInt(await leerTeclado("Teléfono del empleado  "))
                            especialidad = await leerTeclado("En que se especializa el empleado ")
                            segundoIdioma = await leerTeclado("¿Cual es su segundo idioma ?")
                            salarioBase = parseInt(await leerTeclado("¿Cuanto cobra?: "))
                            newemp = new Empleado (id, nombremp, apellido, contacto, salarioBase)
                            newmedi = new Medico (id, nombremp, apellido, contacto, especialidad, [], salarioBase)
                            newadmin = new Administrativo (id, nombremp, apellido, contacto, segundoIdioma, salarioBase)
                        break
                        case 2:
                            await db.conectarBD()//Guardar un Medico
                            const medi ={
                                _id: newemp.id,
                                _nombremp: newemp.nombremp,
                                _apellido: newemp.apellido,
                                _contacto: newemp.contacto,
                                _especialidad: newmedi.especialidad,
                                _pacientes: newmedi.pacientes,
                                _segundoIdioma: newadmin.segundoIdioma,
                                _salarioBase: newemp.salarioBase
                            }
                            const med = new Trabajadores(medi)
                            await med.save()
                            .then((doc: any)=> console.log('El empleado se ha guardado correctamente' + doc))
                            .catch((err:any)=> console.log(err))
                            await db.desconectarBD()
                        break
                        case 3:
                            await db.conectarBD()
                            let query: any = await Trabajadores.find({})
                                console.log(query)
                                await db.desconectarBD()
                        break
                        case 4:
                            await db.conectarBD()
                            let borrar = parseInt(await leerTeclado('Ponga el ID del paciente que quiere eliminar'))
                            await Trabajadores.findOneAndDelete(
                                {
                                    _id: borrar
                                },
                                (err:any, doc: string | null) => {
                                    if(err){
                                        console.log(err)
                                    }else{
                                        if(doc == null)console.log(`No se ha encontrado dicho paciente`)
                                        else console.log(`Documento Borrado`+ doc)
                                    }
                                })
                            await db.desconectarBD()
                        break
                    }
                }while (menu3!=5)
            break
        }
    } while(menu1!=4)}
main()