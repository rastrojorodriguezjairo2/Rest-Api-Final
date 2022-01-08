import { leerTeclado } from "./entradaTeclado";
export let menu = async () => {
    let menu1: number  
    console.log('1.-Gestionar Pacientes')
    console.log('2.-Gestionar Empleados')
    console.log('3.-Calculos')
    console.log('4.-Salir')
    menu1 = parseInt( await leerTeclado('Opción: '))
    return menu1
}
export let atender = async () => {
    let menu2: number
    console.log('1.-Nuevo paciente')
    console.log('2.-Guardar paciente')
    console.log('3.-Listado de pacientes')
    console.log('4.-Eliminar paciente')
    console.log('5.-Salir')
    menu2 = parseInt(await leerTeclado('Opción: '))
    return menu2
}
export let emplear = async () => {
    let menu3: number
    console.log('1.-Nuevo empleado')
    console.log('2.-Guardar empleado')
    console.log('3.-Listado de empleados')
    console.log('4.-Eliminar empleado')
    console.log('5.-Salir')
    menu3 = parseInt(await leerTeclado('Opción: '))
    return menu3
}
export let calcular = async () => {
    let menu4: number
    console.log('1.-Coste de Salario')
    console.log('2.-Ganancias')
    console.log('3.-Ganancias de doctor')
    console.log('4.-Salir')
    menu4 = parseInt(await leerTeclado('Opción: '))
    return menu4
}