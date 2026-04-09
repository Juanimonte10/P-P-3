let dataGlobal          // Guarda todos los datos del JSON cargado
let gameQuestions = []  // Las 5 preguntas seleccionadas para la partida actual
let index = 0           // Índice de la pregunta actual
let correct = 0         // Contador de respuestas correctas
let incorrect = 0       // Contador de respuestas incorrectas
let unanswered = 0      // Contador de preguntas no respondidas (tiempo agotado)
let timer               // Referencia al intervalo del temporizador
let tiempoRestante      // Segundos restantes en el timer actual
let preguntasUsadas = new Set() // Índices de preguntas ya mostradas (para no repetir)

async function cargarInfo() {
    try {
        const response = await fetch("./trivia_realista_240.json")
        if (!response.ok) throw new Error("No se pudo cargar el JSON")
        const data = await response.json()
        dataGlobal = data  // Guarda los datos para usarlos después
    } catch (error) {
        document.getElementById("cargar").innerHTML = "Error al cargar los datos"
        console.error(error)
    }
}

cargarInfo() 
document.getElementById("category").addEventListener("change", iniciarJuego)

function iniciarJuego() {
    if (!dataGlobal) return // Si el JSON no cargó todavía, no hace nada

   
    const categorySelect = document.getElementById("category").value
    const category = dataGlobal.categorias.find(c => c.nombre === categorySelect)
    const questions = category.preguntas

    // Filtra las preguntas que todavía no se usaron en esta sesión
    const disponibles = questions.filter((_, i) => !preguntasUsadas.has(`${categorySelect}-${i}`))

    // Si ya se usaron todas, limpia el Set de esa categoría y vuelve a usar todas
    if (disponibles.length < 5) {
        questions.forEach((_, i) => preguntasUsadas.delete(`${categorySelect}-${i}`))
        disponibles.push(...questions.filter((_, i) => !preguntasUsadas.has(`${categorySelect}-${i}`)))
    }

    // Mezcla las disponibles y toma solo 5
    const mezcla = [...disponibles].sort(() => Math.random() - 0.10)
    gameQuestions = mezcla.slice(0, 10)

    // Guarda los índices usados con la clave "categoria-indice" para no mezclar entre categorías
    gameQuestions.forEach(q => {
        const i = questions.indexOf(q)
        preguntasUsadas.add(`${categorySelect}-${i}`)
    })

  
    index = 0
    correct = 0
    incorrect = 0
    unanswered = 0

    mostrarPreguntas(index) 
}

function mostrarPreguntas(i) {
    const pregunta = gameQuestions[i]

    // Mezcla las opciones (3 incorrectas + 1 correcta) para que no siempre estén en el mismo orden
    const opcions = [...pregunta.incorrectas, pregunta.correcta].sort(() => Math.random() - 0.5)

    // Muestra el texto de la pregunta
    document.getElementById("pregunta-texto").innerHTML = pregunta.pregunta

    // Asigna cada opción a su botón correspondiente y los habilita
    opcions.forEach((opcion, j) => {
        const btn = document.getElementById(`btn${j + 1}`)
        btn.textContent = opcion
        btn.disabled = false
        btn.className = "" // Limpia clases de colores de la pregunta anterior
    })

    document.getElementById("input").textContent = `Pregunta ${i + 1} de 10`
    iniciarTimer() // Arranca el contador regresivo
}

function iniciarTimer() {
    clearInterval(timer) // Cancela cualquier timer anterior que pueda estar corriendo
    tiempoRestante = 7
    document.getElementById("timer").textContent = ` Tiempo para responder ${tiempoRestante}s`

    // Crea un intervalo que se ejecuta cada 1 segundo
    timer = setInterval(() => {
        tiempoRestante--
        document.getElementById("timer").textContent = ` ${tiempoRestante}s`

        // Agrega clase CSS "urgente" cuando quedan 2 segundos o menos
        if (tiempoRestante <= 2) {
            document.getElementById("timer").classList.add("urgente")
        } else {
            document.getElementById("timer").classList.remove("urgente")
        }

        // Cuando llega a 0: cuenta como no respondida y pasa a la siguiente
        if (tiempoRestante <= 0) {
            clearInterval(timer)
            unanswered++
            deshabilitarBotones()
            siguientePregunta()
        }
    }, 1000)
}

function evaluarRespuesta(opcionElegida) {
    clearInterval(timer) // Detiene el timer al responder

    const pregunta = gameQuestions[index]
    const esCorrecta = opcionElegida === pregunta.correcta

    // Incrementa el contador según si acertó o no
    if (esCorrecta) {
        correct++
    } else {
        incorrect++
    }

    // Recorre los 4 botones y les pone color verde o rojo según corresponda
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`btn${i}`)
        if (btn.textContent === pregunta.correcta) {
            btn.className = "correcta"    // Siempre marca la correcta en verde
        } else if (btn.textContent === opcionElegida) {
            btn.className = "incorrecta"  // Marca en rojo la que eligió (si fue incorrecta)
        }
    }

    deshabilitarBotones()
    siguientePregunta()
}

// Deshabilita los 4 botones para que no se pueda responder dos veces
function deshabilitarBotones() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`btn${i}`).disabled = true
    }
}

function siguientePregunta() {
    // Espera 1 segundo (para ver el color de la respuesta) antes de avanzar
    setTimeout(() => {
        index++
        if (index < gameQuestions.length) {
            mostrarPreguntas(index) // Hay más preguntas: muestra la siguiente
        } else {
            mostrarResultado()      // Se acabaron: muestra el resultado final
        }
    }, 1000)
}


function resetJuego() {
    index = 0
    correct = 0
    incorrect = 0
    unanswered = 0
    gameQuestions = []
    clearInterval(timer)
    preguntasUsadas.clear() // Limpia el historial de preguntas usadas

    
    document.getElementById("pregunta-texto").innerHTML = ""
    document.getElementById("timer").textContent = ""
    document.getElementById("timer").classList.remove("urgente")
    document.getElementById("input").textContent = ""
    document.getElementById("btn-reset").style.display = "none"
    document.getElementById("category").value = ""

    // Vacía y deshabilita los botones de respuesta
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`btn${i}`)
        btn.textContent = ""
        btn.disabled = true
        btn.className = ""
    }
}


function mostrarResultado() {
    document.getElementById("pregunta-texto").innerHTML = `
        <h2>Resultado final</h2>
        <p class="green"> Correctas: ${correct}</p>
        <p class ="red"> Incorrectas: ${incorrect}</p>
        <p class ="yellow"> No respondidas: ${unanswered}</p>
    `
    deshabilitarBotones()
    document.getElementById("timer").textContent = ""
    document.getElementById("input").textContent = ""
    document.getElementById("btn-reset").style.display = "block" // Muestra el botón de reinicio
}