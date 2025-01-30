$(document).ready(() => {
  let asientosSeleccionados = []

  class Avion {
    constructor(nombre, filas, columnas, precios) {
      this.nombre = nombre
      this.filas = filas
      this.columnas = columnas
      this.precios = precios
      this.asientos = this.generarAsientosAleatorios(filas, columnas)
    }

    generarAsientosAleatorios(filas, columnas, probabilidadOcupado = 0.45) {
      return Array.from({ length: filas }, () =>
        Array.from({ length: columnas }, () => (Math.random() < probabilidadOcupado ? false : true)),
      )
    }

    reservarAsiento(fila, columna) {
      if (this.asientos[fila][columna]) {
        this.asientos[fila][columna] = false
      }
    }

    liberarAsiento(fila, columna) {
      if (!this.asientos[fila][columna]) {
        this.asientos[fila][columna] = true
      }
    }

    obtenerCategoria(fila) {
      const totalFilas = this.filas
      if (fila < totalFilas * 0.2) return "business"
      if (fila < totalFilas * 0.6) return "economica"
      return "lowCost"
    }
  }

  const avionBlanco = new Avion("Avión Blanco", 10, 4, { business: 225, economica: 175, lowCost: 70 })
  const avionAzul = new Avion("Avión Azul", 18, 6, { business: 200, economica: 150, lowCost: 60 })
  const avionAmarillo = new Avion("Avión Amarillo", 24, 6, { business: 175, economica: 125, lowCost: 50 })

  function generarTablaAsientos(avion) {
    let tablaHtml = "<table>"
    for (let i = 0; i < avion.filas; i++) {
      tablaHtml += "<tr>"
      for (let j = 0; j < avion.columnas; j++) {
        const disponible = avion.asientos[i][j]
        const seleccionado = asientosSeleccionados.some((asiento) => asiento.fila === i && asiento.columna === j)
        const categoria = avion.obtenerCategoria(i)
        const color = seleccionado ? "yellow" : disponible ? "green" : "red"
        const eventoClic = disponible ? `data-fila="${i}" data-columna="${j}"` : ""
        tablaHtml += `<td style="background-color:${color}; cursor: ${disponible ? "pointer" : "default"};" ${eventoClic} title="${categoria.toUpperCase()}">${disponible || seleccionado ? "Libre" : "Ocupado"}</td>`
      }
      tablaHtml += "</tr>"
    }
    tablaHtml += "</table>"
    return tablaHtml
  }

  function obtenerAvionSeleccionado() {
    if (window.location.href.includes("avionBlanco")) return avionBlanco
    if (window.location.href.includes("avionAzul")) return avionAzul
    if (window.location.href.includes("avionAmarillo")) return avionAmarillo
  }

  function mostrarAsientos() {
    const avion = obtenerAvionSeleccionado()
    $("#tablaAsientos").html(generarTablaAsientos(avion))
    actualizarPrecio()

    $("#tablaAsientos td[data-fila]").on("click", function () {
      const fila = $(this).data("fila")
      const columna = $(this).data("columna")
      seleccionarAsiento(fila, columna)
    })
  }

  function mostrarComplementos() {
    const complementosHtml = `
            <input type="checkbox" id="maleta10kg"> Maleta 10kg (+30€ por asiento)<br>
            <input type="checkbox" id="maleta25kg"> Maleta 25kg (+45€ por asiento)<br>
            <input type="checkbox" id="embarque"> Embarque prioritario (+10€ por asiento)<br>
            <input type="checkbox" id="menu"> Menú a bordo (+20€ por asiento)<br>
            <button id="pagarBtn">Pagar</button>
        `

    $("#complementos").html(complementosHtml)
    $('#complementos input[type="checkbox"]').on("change", actualizarPrecio)
    $("#pagarBtn").on("click", confirmarReserva)
  }

  function actualizarPrecio() {
    const avion = obtenerAvionSeleccionado()
    let total = asientosSeleccionados.reduce((sum, asiento) => {
      const categoria = avion.obtenerCategoria(asiento.fila)
      return sum + avion.precios[categoria]
    }, 0)

    const numAsientos = asientosSeleccionados.length

    if ($("#maleta10kg").is(":checked")) total += 30 * numAsientos
    if ($("#maleta25kg").is(":checked")) total += 45 * numAsientos
    if ($("#embarque").is(":checked")) total += 10 * numAsientos
    if ($("#menu").is(":checked")) total += 20 * numAsientos

    if ($("#residente").is(":checked")) {
      total *= 0.25
    }

    $("#precioTotal").text(`Precio total: ${total.toFixed(2)}€`)
  }

  function seleccionarAsiento(fila, columna) {
    const avion = obtenerAvionSeleccionado()
    const asiento = { fila, columna }

    const index = asientosSeleccionados.findIndex((a) => a.fila === fila && a.columna === columna)
    if (index !== -1) {
      asientosSeleccionados.splice(index, 1)
    } else {
      asientosSeleccionados.push(asiento)
    }

    mostrarAsientos()
  }

  function confirmarReserva() {
    const avion = obtenerAvionSeleccionado()

    if (asientosSeleccionados.length === 0) {
      alert("Error: Debes seleccionar al menos un asiento antes de proceder al pago.")
      return
    }

    asientosSeleccionados.forEach((asiento) => {
      avion.reservarAsiento(asiento.fila, asiento.columna)
    })

    asientosSeleccionados = []
    mostrarAsientos()

    alert("Reserva confirmada. Los asientos seleccionados ahora están ocupados.")
  }

  $("#residente").on("change", actualizarPrecio)

  mostrarAsientos()
  mostrarComplementos()
})


  