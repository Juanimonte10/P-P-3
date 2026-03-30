/*
setInterval ejecuta algo repetidamente cada cierto tiempo
clearInterval sirve para deternerlo
setTimeout se ejecuta una sola vez despues de cierto tiempo (esperar y ejecutar, mas para animaciones) 
*/

const results=document.getElementById("result")
const numero=document.getElementById("number")// mi h1 en el html que va a permitir mostrar
const input=document.getElementById("input") // para verificar nuestra respuesta??

let numeros=[]
let acumulador=0 // lo voy a usar como mi suma
let index=0 //para poder recorrer mi array de numeros
let cantidad = 3// los numeros que voy a querer mostrar
let time
function generarAleatorio(){
   do{
    numeros=[]
    acumulador=0
    for(let i=0;i<cantidad;i++){
        let num=Math.floor(Math.random()*31)-10 
        while(num===0 || num ===numeros[i-1]) { 
        num=Math.floor(Math.random()*31)-10  
        }
    
    numeros.push(num)
    acumulador+=num

} 
}while(acumulador<=0)

    // verifico si funciona por consola
     console.log("numeros:",numeros)
    console.log("acumulador/suma:",acumulador)
}


//do while , primero ejecuta y luego verifica
//while , verifica la condicion y si es falsa nunca entra

let pausa=null // actua como un intervcalo (puede ser cualquier nombre mientras entendamos), null para que no se repitan
function mostrarNumeros(){
    index=0
    //para limpiarlo
    if(pausa){
        clearInterval(pausa)
    }
    pausa=setInterval(()=>{
        if(index<numeros.length){
            console.log("valores",numeros[index]) //verifico en consola
            numero.textContent=numeros[index] + " " // permite ingresar texto plano en el html 
            index++ // agrege "" para que haya espacio entre los numeros
        }else{
            clearInterval(pausa)
            numero.textContent="?"
        }
    } ,1500) // actua como segundo 
}

let timePau=null

function iniciarTime(){
      if(timePau){
        clearInterval(timePau)
    }
    time=10
    timePau=setInterval(()=>{
        results.textContent=`Tiempo restante ${time}`
        if(time<=0){
            results.textContent=`Se acabo el tiempo, la respuesta era ${acumulador}`
    }
        time--
    },1000)
}
function checkeo(){
    
    clearInterval(timePau)
    let usuario= Number(input.value)// verifica si la respuesta es number  , tambien podria hacer if con isNaN
    if(isNaN(usuario)){
        results.innerHTML="Ingrese un numero valido"
        return
    }
    if(usuario===acumulador){
        results.textContent="La respuesta es correcta"
    } else{
        results.textContent=`La respuesta es incorrecta , es ${acumulador}. Intenta otra vez`
    }
}

document.getElementById("start").addEventListener("click",()=>{
    generarAleatorio()
    mostrarNumeros()
    results.textContent="" // para limpiar
    input.value=""
    console.clear()
    iniciarTime()
})
document.getElementById("checkeo").addEventListener("click",()=>{
    checkeo()
})
