async function api() {
    const response = await fetch(`https://dolarapi.com/v1/dolares`)
    const data = await response.json()
    return data
}

function formatearNumero(n) {
    if (n === null || n === undefined) return "-"
    return Number(n).toLocaleString("es-AR")
}

async function mostrarDatos() {
    const data = await api()
    const tbody = document.getElementById("tbody")

    tbody.innerHTML = ""

    data.forEach(m => {
        tbody.innerHTML += `
        <tr>
            <td>${m.casa}</td>
            <td>${m.nombre}</td>
            <td>${formatearNumero(m.compra)}</td>
            <td>${formatearNumero(m.venta)}</td>
        </tr>
        `
    })
}

mostrarDatos()

document.getElementById("input").addEventListener("input", function () {
    const cursorPos = this.selectionStart
    const valorPrevio = this.value

    // Separo parte entera y decimal (por si escribió coma)
    const partes = this.value.replace(/\./g, "").split(",")
    let entera = partes[0].replace(/\D/g, "")
    const decimal = partes[1] !== undefined ? partes[1].replace(/\D/g, "") : null

    // Formateo la parte entera con puntos
    if (entera !== "") {
        entera = Number(entera).toLocaleString("es-AR")
    }

    // Reconstruyo el valor
    this.value = decimal !== null ? `${entera},${decimal}` : entera

    // Corrijo cursor (los puntos que se agregan desplazan la posición)
    const diff = this.value.length - valorPrevio.length
    this.setSelectionRange(cursorPos + diff, cursorPos + diff)
})

async function cambio() {
    const input = document.getElementById("input")
    const rawInput = input.value.replace(/\./g, "").replace(",", ".")
    const numero = Number(rawInput)

    if (numero <= 0 || isNaN(numero)) {
        alert("ingresar numero")
        return
    }

    const type = document.getElementById("tipoDolar").value
    const data = await api()
    const dolar = data.find(d => d.casa === type)
    const results = document.getElementById("results")
    const modo = document.getElementById("modo").value
    let resultado

    if (modo === "pesosUSD") {
        resultado = numero / dolar.venta
        results.textContent = `La cantidad es: ${formatearNumero(resultado)}`
    } else {
        resultado = numero * dolar.compra
        results.textContent = `La cantidad de pesos es: ${formatearNumero(resultado)}`
    }
}

document.getElementById("cambio").addEventListener("click", cambio)