// Seleccionamos los elementos de la interfaz
const pantalla = document.getElementById("pantalla");
const teclado = document.querySelector(".teclado");

// Variables para el temporizador y control de pulsaciones
let ultimaTecla = "";
let contadorPulsaciones = 0;
let temporizador;
let tiempoExpirado = true;

// Mapeo de teclas con sus valores alternativos
const teclasMap = {
    "2": ["2", "A", "B", "C"],
    "3": ["3", "D", "E", "F"],
    "4": ["4", "G", "H", "I"],
    "5": ["5", "J", "K", "L"],
    "6": ["6", "M", "N", "O"],
    "7": ["7", "P", "Q", "R", "S"],
    "8": ["8", "T", "U", "V"],
    "9": ["9", "W", "X", "Y", "Z"]
};

// Evento de click para detectar la pulsación de teclas
teclado.addEventListener("click", (e) => {
    if (e.target.classList.contains("tecla")) {
        manejarPulsacion(e.target.dataset.valor);
    }
});

// Evento de teclado para la pulsación física
document.addEventListener("keyup", (e) => {
    if (/^[0-9#]$/.test(e.key)) {
        manejarPulsacion(e.key);
    }
});

// Función para manejar la pulsación de teclas
function manejarPulsacion(valor) {
    if (valor === "borrar") {
        pantalla.value = "";
        actualizarColorPantalla();
        return;
    }
    if (valor === "llamar") {
        if (validarNumero(pantalla.value)) {
            guardarNumeroEnHistorial(pantalla.value);
            alert("Llamando a " + pantalla.value);
        }
        return;
    }

    if (teclasMap[valor]) {
        if (ultimaTecla === valor && !tiempoExpirado) {
            contadorPulsaciones = (contadorPulsaciones + 1) % teclasMap[valor].length;
            let pantallaTexto = pantalla.value;
            pantalla.value = pantallaTexto.slice(0, -1) + teclasMap[valor][contadorPulsaciones];
        } else {
            pantalla.value += teclasMap[valor][0];
            contadorPulsaciones = 0;
            tiempoExpirado = false;
        }
        ultimaTecla = valor;
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            tiempoExpirado = true;
        }, 2000);
    } else {
        pantalla.value += valor;
    }
    actualizarColorPantalla();
}

// Función para validar el número ingresado
function validarNumero(numero) {
    // Expresión regular para validar números de teléfono españoles y extensiones
    const regex = /^(?:([6789]\d{8})|(#\d{3})|([6789]\d{8}#\d{3}))$/;
    return regex.test(numero);
}

// Función para cambiar el color de la pantalla según la validez del número
function actualizarColorPantalla() {
    pantalla.style.color = validarNumero(pantalla.value) ? "green" : "red";
}

// Función para guardar los números en localStorage
function guardarNumeroEnHistorial(numero) {
    let historial = JSON.parse(localStorage.getItem("historialLlamadas")) || [];
    historial.push(numero);
    localStorage.setItem("historialLlamadas", JSON.stringify(historial));
}

