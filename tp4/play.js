import {Carta} from './carta.js'

export class Juego{
    constructor(){
        this.letters=[] //cartas
        this.seleccionadas=[]
        this.size=10;
        this.pares=0; //pares encontrados
        this.segundos=0; //timer
        this.intervalo=null; //para el timer
        this.errores=0
    }
    start(){
        // Los declaro para poder volverlos a reiniciar 
        this.pares=0;
        this.segundos=0;
        this.errores=0;
        document.getElementById("errores").textContent="Errores:0"   
        this.detenerTimer();
        document.getElementById("mensaje").textContent="";
        document.getElementById("timer").textContent="Tiempo: 0s";

        document.getElementById("btnReiniciar").onclick=()=>this.start(); //boton reinicio

        const emojis=[
        "😀","😁","😂","🤣","😃","😄","😎","😋","😊","😉",
        "😆","😅","😍","😘","🥰","😗","😙","🥲","🤔","🤩",
        "🤗","🙂","☺️","😚","🫡","🤨","😐","😑","😶","🫥",
        "😮","😥","😣","😏","🙄","😶‍🌫️","🤐","😯","😪","😫",
        "🥱","😴","😒","🤤","😝","😜","😛","😌","😓","😔"]
        const pares=[...emojis,...emojis]

        this.letters=pares.map(e=>new Carta (e))
        this.toMix();
        this.render();
    }

    toMix(){
     //mezclar   
     this.letters.sort(()=>Math.random()-0.5)
    }

    render(){
        //visualizar
        const container = document.getElementById("table-container");
        container.innerHTML = "";

        const table = document.createElement("table");

        let index = 0;

        for (let fila = 0; fila < this.size; fila++) {
            const tr = document.createElement("tr");
            for (let col = 0; col < this.size; col++) {
                const td = document.createElement("td");
                const carta = this.letters[index];

                td.textContent = "❓";

                td.addEventListener("click", () => {
                    this.voltearCarta(carta, td);
                });

                tr.appendChild(td);
                index++;
            }

            table.appendChild(tr);
        }

        container.appendChild(table);
    }

    iniciarTimer(){
        if(this.intervalo) return; //evita que arranque dos veces
        this.intervalo=setInterval(()=>{
            this.segundos++;
            document.getElementById("timer").textContent=`Tiempo: ${this.segundos}s`;
        },1000);
    }

    detenerTimer(){
        clearInterval(this.intervalo);
        this.intervalo=null;
    }

    voltearCarta(carta, td) {
        if (carta.estado !== "oculta" || this.seleccionadas.length === 2) return;
        //el if para que no se puedan seleccionar cartas que ya estan dadas vueltas
        this.iniciarTimer(); //arranca al primer click
        carta.mostrar();
        td.classList.add("girada");
        td.textContent = carta.emoji;

        this.seleccionadas.push({ carta, td });

        if (this.seleccionadas.length === 2) {
            this.verificar();
        }
    }
    
    Resultado(){
        for(let i=0; i<this.letters.length; i++){
            if(this.letters[i].estado !== 'encontrada') return;
        }
        //si el for termino sin salir, todas estan encontradas
        this.detenerTimer();
        document.getElementById("mensaje").textContent=
            `Se termino el juego, Terminaste en ${this.segundos} segundos.`;
    }

    verificar() {
        const [a, b] = this.seleccionadas;

        if (a.carta.emoji === b.carta.emoji) {
            a.carta.encontrada();
            b.carta.encontrada();
            this.pares++; //suma par encontrado
            
        } else {
            this.errores++
            document.getElementById("errores").textContent=`Errores ${this.errores}`
            setTimeout(() => {
                a.carta.ocultar();
                b.carta.ocultar();
                a.td.textContent = "❓";
                b.td.textContent = "❓";
                a.td.classList.remove("girada")
                b.td.classList.remove("girada")
            }, 800);
        }

        this.seleccionadas = [];
        this.Resultado();
    }
}
    
