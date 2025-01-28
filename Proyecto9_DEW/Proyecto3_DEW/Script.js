$(document).ready(() => {
    // Array para almacenar los asientos seleccionados
    let asientosSeleccionados = []
  
    // Creación de los aviones con su información
    class Avion {
      constructor(nombre, filas, columnas, precios, categoria) {
        this.nombre = nombre
        this.filas = filas
        this.columnas = columnas
        this.precios = precios
        this.asientos = this.generarAsientosAleatorios(filas, columnas)
        this.categoria = categoria
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
    }
  
    // Definir los aviones
    const avionBlanco = new Avion("Avión Blanco", 10, 4, { business: 225, economica: 175, lowCost: 70 })
    const avionAzul = new Avion("Avión Azul", 18, 6, { business: 200, economica: 150, lowCost: 60 })
    const avionAmarillo = new Avion("Avión Amarillo", 24, 6, { business: 175, economica: 125, lowCost: 50 })
  
    // Función para generar la tabla de asientos
    function generarTablaAsientos(avion, categoria) {
      let tablaHtml = `<tr><th colspan="${avion.columnas}">${categoria.toUpperCase()} - Precio: ${avion.precios[categoria]}€</th></tr>`
      for (let i = 0; i < avion.filas; i++) {
        tablaHtml += "<tr>"
        for (let j = 0; j < avion.columnas; j++) {
          const disponible = avion.asientos[i][j]
          const seleccionado = asientosSeleccionados.some((asiento) => asiento.fila === i && asiento.columna === j)
          const color = seleccionado ? "yellow" : disponible ? "green" : "red"
          const eventoClic = disponible ? `data-fila="${i}" data-columna="${j}"` : ""
          tablaHtml += `<td style="background-color:${color}; cursor: ${disponible ? "pointer" : "default"};" ${eventoClic}>${disponible || seleccionado ? "Libre" : "Ocupado"}</td>`
        }
        tablaHtml += "</tr>"
      }
      return tablaHtml
    }
  
    // Función para obtener el avión seleccionado
    function obtenerAvionSeleccionado() {
      if (window.location.href.includes("avionBlanco")) {
        return avionBlanco
      } else if (window.location.href.includes("avionAzul")) {
        return avionAzul
      } else if (window.location.href.includes("avionAmarillo")) {
        return avionAmarillo
      }
    }
  
    // Función para mostrar los asientos y los complementos
    function mostrarAsientos() {
      const categoria = $("#categoria").val()
      const avion = obtenerAvionSeleccionado()
  
      // Mostrar la tabla de asientos
      const tabla = $("<table>").html(generarTablaAsientos(avion, categoria))
      $("#tablaAsientos").empty().append(tabla)
  
      // Mostrar complementos basados en la categoría seleccionada
      mostrarComplementos(categoria)
  
      // Actualizar el precio al mostrar los asientos
      actualizarPrecio()
  
      // Agregar evento de clic a los asientos disponibles
      $("#tablaAsientos td[data-fila]").on("click", function () {
        const fila = $(this).data("fila")
        const columna = $(this).data("columna")
        seleccionarAsiento(fila, columna)
      })
    }
  
    // Función para mostrar los complementos según la categoría
    function mostrarComplementos(categoria) {
      let complementosHtml = ""
  
      if (categoria === "lowCost") {
        complementosHtml += `
                  <input type="checkbox" id="maleta10kg"> Maleta 10kg (+30€)<br>
                  <input type="checkbox" id="maleta25kg"> Maleta 25kg (+45€)<br>
                  <input type="checkbox" id="embarque"> Embarque prioritario (+10€)<br>
                  <input type="checkbox" id="menu"> Menú a bordo (+20€)<br>
              `
      } else if (categoria === "economica") {
        complementosHtml += `
                  <input type="checkbox" id="maleta25kg"> Maleta 25kg (+45€)<br>
                  <input type="checkbox" id="menu"> Menú a bordo (+20€)<br>
              `
      } else if (categoria === "business") {
        complementosHtml += `
                  <input type="checkbox" id="menu"> Menú a bordo (+20€)<br>
              `
      }
  
      complementosHtml += '<button id="pagarBtn">Pagar</button>'
  
      // Insertar los complementos en el DOM
      $("#complementos").html(complementosHtml)
  
      // Agregar eventos a los complementos y botón de pago
      $('#complementos input[type="checkbox"]').on("change", actualizarPrecio)
      $("#pagarBtn").on("click", confirmarReserva)
    }
  
    // Función para actualizar el precio total
    function actualizarPrecio() {
      const categoria = $("#categoria").val()
      const avion = obtenerAvionSeleccionado()
      let total = avion.precios[categoria] * asientosSeleccionados.length
  
      // Agregar el precio de los complementos seleccionados
      if ($("#maleta10kg").is(":checked")) total += 30
      if ($("#maleta25kg").is(":checked")) total += 45
      if ($("#embarque").is(":checked")) total += 10
      if ($("#menu").is(":checked")) total += 20
  
      // Aplicar descuento por residente si está marcado
      if ($("#residente").is(":checked")) {
        total *= 0.25
      }
  
      // Actualizar el precio en el DOM
      $("#precioTotal").text(`Precio total: ${total.toFixed(2)}€`)
    }
  
    // Función para seleccionar un asiento
    function seleccionarAsiento(fila, columna) {
      const avion = obtenerAvionSeleccionado()
      const asiento = { fila, columna }
  
      // Verificar si el asiento ya está seleccionado
      const index = asientosSeleccionados.findIndex((a) => a.fila === fila && a.columna === columna)
      if (index !== -1) {
        // Si ya está seleccionado, lo quitamos
        asientosSeleccionados.splice(index, 1)
      } else {
        // Si no está seleccionado, lo añadimos
        asientosSeleccionados.push(asiento)
      }
  
      // Actualizar la tabla de asientos después de la selección
      mostrarAsientos()
    }
  
    // Función para confirmar la reserva
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
  
    // Event listeners
    $("#categoria").on("change", mostrarAsientos)
    $("#residente").on("change", actualizarPrecio)
  
    // Inicializar la página
    mostrarAsientos()
  })
  
  