$(document).ready(() => {
    class JuegoHanoi {
      constructor() {
        this.torres = [[], [], []]
        this.movimientos = 0
        this.temporizador = null
        this.segundos = 0
        this.mejorTiempo = localStorage.getItem("mejorTiempo") || "-"
        this.juegoEnPausa = true
        this.origen = undefined
      }
  
      iniciarJuego() {
        // Reiniciar torres, movimientos y temporizador
        this.torres = [[3, 2, 1], [], []]
        this.movimientos = 0
        this.segundos = 0
        this.juegoEnPausa = false
  
        // Detener cualquier temporizador previo antes de iniciar uno nuevo
        if (this.temporizador) clearInterval(this.temporizador)
  
        // Iniciar el temporizador y actualizar la vista
        this.iniciarTemporizador()
        this.actualizarVista()
  
        // Restablecer la interfaz
        $("#movimientos").text(this.movimientos)
        $("#mejorTiempo").text(this.mejorTiempo)
        $("#mensajes").text("").hide().fadeIn(500)
      }
  
      iniciarTemporizador() {
        if (!this.juegoEnPausa) {
          this.temporizador = setInterval(() => {
            this.segundos++
            this.actualizarTiempo()
          }, 1000)
        }
      }
  
      actualizarTiempo() {
        const minutos = Math.floor(this.segundos / 60)
          .toString()
          .padStart(1, "0")
        const segundos = (this.segundos % 60).toString().padStart(1, "0")
        $("#tiempo").text(`${minutos}:${segundos}`)
      }
  
      moverDisco(origen, destino) {
        // Verificar si el movimiento es válido antes de mover el disco
        if (this.torres[origen].length === 0) {
          $("#mensajes").text("No hay discos en la torre de origen.").hide().fadeIn(500)
          return
        }
  
        if (
          this.torres[destino].length === 0 ||
          this.torres[origen][this.torres[origen].length - 1] < this.torres[destino][this.torres[destino].length - 1]
        ) {
          // Mover el disco
          this.torres[destino].push(this.torres[origen].pop())
          this.movimientos++
          $("#movimientos").text(this.movimientos)
          this.actualizarVista()
          this.comprobarVictoria()
        } else {
          $("#mensajes").text("Movimiento no permitido").hide().fadeIn(500)
        }
      }
  
      actualizarVista() {
        $(".torre").each((i, torre) => {
          $(torre).empty()
          this.torres[i].forEach((disco) => {
            $("<div>").addClass(`disco disco${disco}`).appendTo(torre).hide().fadeIn(300)
          })
        })
      }
  
      comprobarVictoria() {
        if (this.torres[2].length === 3) {
          clearInterval(this.temporizador)
          this.juegoEnPausa = true // Pausa el juego al ganar
          $("#mensajes")
            .text(`¡Ganaste en ${this.movimientos} movimientos y en ${$("#tiempo").text()} minutos!`)
            .hide()
            .fadeIn(500)
  
          if (this.mejorTiempo === "-" || this.segundos < localStorage.getItem("mejorTiempo")) {
            localStorage.setItem("mejorTiempo", this.segundos)
            $("#mejorTiempo").text(`${Math.floor(this.segundos / 60)}:${this.segundos % 60}`)
          }
        }
      }
  
      guardarJuego() {
        clearInterval(this.temporizador)
        this.juegoEnPausa = true
        const estadoJuego = {
          torres: this.torres,
          movimientos: this.movimientos,
          segundos: this.segundos,
        }
        localStorage.setItem("estadoJuego", JSON.stringify(estadoJuego))
        $("#mensajes").text("Juego guardado y pausado.").hide().fadeIn(500)
      }
  
      restaurarJuego() {
        const estadoGuardado = JSON.parse(localStorage.getItem("estadoJuego"))
        if (estadoGuardado) {
          this.torres = estadoGuardado.torres
          this.movimientos = estadoGuardado.movimientos
          this.segundos = estadoGuardado.segundos
          this.juegoEnPausa = false
          this.actualizarVista()
          this.actualizarTiempo()
          this.iniciarTemporizador()
          $("#mensajes").text("Juego restaurado. ¡Continúa!").hide().fadeIn(500)
        }
      }
    }
  
    // Inicializa el juego y configura los eventos
    const juego = new JuegoHanoi()
  
    $("#iniciarBtn").on("click", () => juego.iniciarJuego())
    $("#guardarBtn").on("click", () => juego.guardarJuego())
    $("#restaurarBtn").on("click", () => juego.restaurarJuego())
  
    // Agregar eventos de clic a las torres
    $(".torre").on("click", function () {
      if (juego.juegoEnPausa) {
        $("#mensajes").text("¡Comienza el juego!").hide().fadeIn(500)
        return
      }
      const index = $(".torre").index(this)
      if (juego.origen === undefined) {
        // Guardar la torre de origen
        juego.origen = index
        $("#mensajes")
          .text(`Seleccionaste la torre ${index + 1}. Haz clic en la torre de destino.`)
          .hide()
          .fadeIn(500)
        $(this).addClass("seleccionado")
      } else {
        // Intentar mover el disco
        juego.moverDisco(juego.origen, index)
        $(".torre").removeClass("seleccionado")
        juego.origen = undefined // Reiniciar la selección de origen
      }
    })
  
    // efectos de jQuery
    $("button").hover(
      function () {
        $(this).animate({ opacity: 0.8 }, 200)
      },
      function () {
        $(this).animate({ opacity: 1 }, 200)
      },
    )
})
  