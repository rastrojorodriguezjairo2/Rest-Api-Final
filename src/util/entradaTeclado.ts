// https://nodejs.org/dist./v4.8.3/docs/doc/api/readline.html
import readline from 'readline'
let readlineI: readline.Interface

let leelinea = (prompt: string) => {
    readlineI = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise<string>( (resuelta: any, rechazada: any) =>{
        readlineI.question(`${prompt}:`, (cadenaEntrada: string) => {
            resuelta (cadenaEntrada)
        }
    )
    
})}

export let leerTeclado = async (prompt: string) => {
    let valor:string
    valor = await leelinea(prompt)
    readlineI.close()
    return valor
}