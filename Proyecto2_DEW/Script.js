// Creación de los aviones con su información
class Avion {
    constructor(nombre, filas, columnas, precios) {
        this.nombre = nombre;
        this.filas = filas;
        this.columnas = columnas;
        this.precios = precios;
        this.asientos = generarAsientosAleatorios(filas, columnas);
    }

    reservarAsiento(fila, columna) {
        if (this.asientos[fila][columna]) {
            this.asientos[fila][columna] = false; // Marcar como ocupado
        }
    }
}

// Definir los aviones
const avionBlanco = new Avion('Avión Blanco', 6, 4, { business: 200, economica: 125, lowCost: 50 });
const avionAzul = new Avion('Avión Azul', 8, 6, { business: 250, economica: 175, lowCost: 60 });
const avionAmarillo = new Avion('Avión Amarillo', 10, 8, { business: 300, economica: 200, lowCost: 70 });

// Función para generar asientos aleatoriamente ocupados o libres
function generarAsientosAleatorios(filas, columnas, probabilidadOcupado = 0.3) {
    return Array.from({ length: filas }, () =>
        Array.from({ length: columnas }, () => Math.random() < probabilidadOcupado ? false : true)
    );
}

// Función para mostrar los asientos y permitir la selección
function generarTablaAsientos(avion, categoria) {
    let tablaHtml = `<tr><th colspan="${avion.columnas}">${categoria.toUpperCase()} - Precio: ${avion.precios[categoria]}€</th></tr>`;
    for (let i = 0; i < avion.filas; i++) {
        tablaHtml += "<tr>";
        for (let j = 0; j < avion.columnas; j++) {
            const disponible = avion.asientos[i][j];
            const color = disponible ? "green" : "red";
            const eventoClic = disponible ? `onclick="reservar(${i},${j})"` : ''; // Solo si está libre
            tablaHtml += `<td style="background-color:${color}; cursor: pointer;" ${eventoClic}>${disponible ? 'Libre' : 'Ocupado'}</td>`;
        }
        tablaHtml += "</tr>";
    }
    return tablaHtml;
}

// Función para reservar un asiento
function reservar(fila, columna) {
    const categoria = document.getElementById('categoria').value;
    let avion;

    if (window.location.href.includes('avionBlanco')) {
        avion = avionBlanco;
    } else if (window.location.href.includes('avionAzul')) {
        avion = avionAzul;
    } else if (window.location.href.includes('avionAmarillo')) {
        avion = avionAmarillo;
    }

    if (avion.asientos[fila][columna]) {
        // Reservar asiento
        avion.reservarAsiento(fila, columna);
        alert(`Has reservado el asiento en fila ${fila + 1}, columna ${columna + 1} en categoría ${categoria}.`);
        
        // Mostrar el formulario final con los complementos
        mostrarFormularioFinal(categoria, fila, columna);
    } else {
        alert('Este asiento ya está ocupado.');
    }

    // Actualizar la tabla de asientos después de reservar
    mostrarAsientos();
}

// Función para mostrar los asientos según el avión y la categoría seleccionada
function mostrarAsientos() {
    const categoria = document.getElementById('categoria').value;
    let avion;

    if (window.location.href.includes('avionBlanco')) {
        avion = avionBlanco;
    } else if (window.location.href.includes('avionAzul')) {
        avion = avionAzul;
    } else if (window.location.href.includes('avionAmarillo')) {
        avion = avionAmarillo;
    }

    const tabla = document.createElement('table');
    tabla.innerHTML = generarTablaAsientos(avion, categoria);
    document.getElementById('tablaAsientos').innerHTML = "";
    document.getElementById('tablaAsientos').appendChild(tabla);
}

// Función para mostrar el formulario de complementos basado en la categoría
function mostrarFormularioFinal(categoria, fila, columna) {
    let formularioHtml = `<h2>Formulario de complementos para categoría: ${categoria.toUpperCase()}</h2>`;
    
    // Residente (para aplicar descuento)
    formularioHtml += `
        <label for="residente">¿Eres residente? (75% de descuento)</label>
        <input type="checkbox" id="residente"><br><br>
    `;

    // Complementos según la categoría
    if (categoria === "business") {
        formularioHtml += `
            <label><input type="checkbox" id="asiento" disabled checked> Elección de asiento gratuita (Fila ${fila + 1}, Columna ${columna + 1})</label><br>
            <label><input type="checkbox" id="maleta10kg"> Maleta de 10Kg (+30€)</label><br>
            <label><input type="checkbox" id="maleta25kg"> Maleta de 25Kg (+45€)</label><br>
            <label><input type="checkbox" id="embarque"> Embarque prioritario (+10€)</label><br>
            <label><input type="checkbox" id="menu"> Menú a bordo (+20€)</label><br>
        `;
    } else if (categoria === "economica") {
        formularioHtml += `
            <label><input type="checkbox" id="asiento"> Pagar por elección de asiento (Fila ${fila + 1}, Columna ${columna + 1}, +5€)</label><br>
            <label><input type="checkbox" id="maleta25kg"> Maleta de 25Kg (+45€)</label><br>
            <label><input type="checkbox" id="menu"> Menú a bordo (+20€)</label><br>
        `;
    } else if (categoria === "low-cost") {
        formularioHtml += `
            <label><input type="checkbox" id="asiento"> Pagar por elección de asiento (Fila ${fila + 1}, Columna ${columna + 1}, +5€)</`
    }
}