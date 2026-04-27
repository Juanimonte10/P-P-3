export class Carta{
    constructor(emoji){
        this.emoji=emoji
        this.estado='oculta'
    }
    mostrar(){
        this.estado='visible'
    }
    ocultar(){
        this.estado='oculta'
    }
    encontrada(){
        this.estado='encontrada'
    }
}