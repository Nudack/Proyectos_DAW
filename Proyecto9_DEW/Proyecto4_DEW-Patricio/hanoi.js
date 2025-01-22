class JuegoHanoi {
    constructor() {
        this.torres = [[], [], []];
        this.movimientos = 0;
        this.temporizador = null;
        this.segundos = 0;
        this.mejorTiempo = localStorage.getItem('mejorTiempo') || '-';
        this.juegoEnPausa = true;
    }

    iniciarJuego() {
        // Reiniciar torres, movimientos y temporizador
        this.torres = [[3, 2, 1], [], []];
        this.movimientos = 0;
        this.segundos = 0;
        this.juegoEnPausa = false;

        // Detener cualquier temporizador previo antes de iniciar uno nuevo
        if (this.temporizador) clearInterval(this.temporizador);

        // Iniciar el temporizador y actualizar la vista
        this.iniciarTemporizador();
        this.actualizarVista();

        // Restablecer la interfaz
        document.getElementById("movimientos").textContent = this.movimientos;
        document.getElementById("mejorTiempo").textContent = this.mejorTiempo;
        document.getElementById("mensajes").textContent = "";
    }

    iniciarTemporizador() {
        if (!this.juegoEnPausa) {
            this.temporizador = setInterval(() => {
                this.segundos++;
                this.actualizarTiempo();
            }, 1000);
        }
    }

    actualizarTiempo() {
        const minutos = Math.floor(this.segundos / 60).toString().padStart(2, "0");
        const segundos = (this.segundos % 60).toString().padStart(2, "0");
        document.getElementById("tiempo").textContent = `${minutos}:${segundos}`;
    }

    moverDisco(origen, destino) {
        // Verificar si el movimiento es válido antes de mover el disco
        if (this.torres[origen].length === 0) {
            document.getElementById("mensajes").textContent = "No hay discos en la torre de origen.";
            return;
        }
        
        if (this.torres[destino].length === 0 || this.torres[origen][this.torres[origen].length - 1] < this.torres[destino][this.torres[destino].length - 1]) {
            // Mover el disco
            this.torres[destino].push(this.torres[origen].pop());
            this.movimientos++;
            document.getElementById("movimientos").textContent = this.movimientos;
            this.actualizarVista();
            this.comprobarVictoria();
        } else {
            document.getElementById("mensajes").textContent = "Movimiento no permitido";
        }
    }

    actualizarVista() {
        for (let i = 0; i < 3; i++) {
            const torre = document.getElementById(`torre${i + 1}`);
            torre.innerHTML = ''; // Limpiar la torre
            this.torres[i].forEach((disco) => {
                const divDisco = document.createElement("div");
                divDisco.className = `disco disco${disco}`;
                torre.appendChild(divDisco);
            });
        }
    }

    comprobarVictoria() {
        if (this.torres[2].length === 3) {
            clearInterval(this.temporizador);
            this.juegoEnPausa = true; // Pausa el juego al ganar
            document.getElementById("mensajes").textContent = `¡Ganaste en ${this.movimientos} movimientos y en ${document.getElementById("tiempo").textContent} minutos!`;
            
            if (this.mejorTiempo === "-" || this.segundos < localStorage.getItem("mejorTiempo")) {
                localStorage.setItem("mejorTiempo", this.segundos);
                document.getElementById("mejorTiempo").textContent = `${Math.floor(this.segundos / 60)}:${this.segundos % 60}`;
            }
        }
    }

    guardarJuego() {
        clearInterval(this.temporizador);
        this.juegoEnPausa = true;
        const estadoJuego = {
            torres: this.torres,
            movimientos: this.movimientos,
            segundos: this.segundos
        };
        localStorage.setItem("estadoJuego", JSON.stringify(estadoJuego));
        document.getElementById("mensajes").textContent = "Juego guardado y pausado.";
    }

    restaurarJuego() {
        const estadoGuardado = JSON.parse(localStorage.getItem("estadoJuego"));
        if (estadoGuardado) {
            this.torres = estadoGuardado.torres;
            this.movimientos = estadoGuardado.movimientos;
            this.segundos = estadoGuardado.segundos;
            this.juegoEnPausa = false;
            this.actualizarVista();
            this.actualizarTiempo();
            this.iniciarTemporizador();
            document.getElementById("mensajes").textContent = "Juego restaurado. ¡Continúa!";
        }
    }
}

// Inicializa el juego y configura los eventos
const juego = new JuegoHanoi();

document.getElementById("iniciarBtn").addEventListener("click", () => juego.iniciarJuego());
document.getElementById("guardarBtn").addEventListener("click", () => juego.guardarJuego());
document.getElementById("restaurarBtn").addEventListener("click", () => juego.restaurarJuego());

// Agregar eventos de clic a las torres
document.querySelectorAll('.torre').forEach((torre, index) => {
    torre.addEventListener('click', () => {
        if (juego.juegoEnPausa) {
            document.getElementById("mensajes").textContent = "¡Comienza el juego!";
            return;
        }
        if (juego.origen === undefined) {
            // Guardar la torre de origen
            juego.origen = index;
            document.getElementById("mensajes").textContent = `Seleccionaste la torre ${index + 1}. Haz clic en la torre de destino.`;
        } else {
            // Intentar mover el disco
            juego.moverDisco(juego.origen, index);
            juego.origen = undefined; // Reiniciar la selección de origen
        }
    });
});

$document.ready(function(){

});