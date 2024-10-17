// Array para almacenar los asientos seleccionados
let asientosSeleccionados = [];

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
        if (this.asientos[fila][columna]) {  // Si el asiento está libre
            this.asientos[fila][columna] = false; // Marcar como ocupado
        }
    }

    liberarAsiento(fila, columna) {
        if (!this.asientos[fila][columna]) {  // Si el asiento está ocupado
            this.asientos[fila][columna] = true; // Liberar asiento
        }
    }
}

// Definir los aviones
const avionBlanco = new Avion('Avión Blanco', 10, 4, { business: 225, economica: 175, lowCost: 70 });
const avionAzul = new Avion('Avión Azul', 18, 6, { business: 200, economica: 150, lowCost: 60 });
const avionAmarillo = new Avion('Avión Amarillo', 24, 6, { business: 175, economica: 125, lowCost: 50 });

// Función para generar asientos aleatoriamente ocupados o libres
function generarAsientosAleatorios(filas, columnas, probabilidadOcupado = 0.45) {
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
            const disponible = avion.asientos[i][j];  // true = libre, false = ocupado
            // Revisar si el asiento está seleccionado
            const seleccionado = asientosSeleccionados.some(asiento => asiento.fila === i && asiento.columna === j);
            const color = seleccionado ? "yellow" : (disponible ? "green" : "red");
            const eventoClic = disponible ? `onclick="seleccionarAsiento(${i},${j})"` : '';  // Solo asientos libres son clicables
            tablaHtml += `<td style="background-color:${color}; cursor: ${disponible ? 'pointer' : 'default'};" ${eventoClic}>${disponible || seleccionado ? 'Libre' : 'Ocupado'}</td>`;
        }
        tablaHtml += "</tr>";
    }
    return tablaHtml;
}

// Función para obtener el avión seleccionado
function obtenerAvionSeleccionado() {
    if (window.location.href.includes('avionBlanco')) {
        return avionBlanco;
    } else if (window.location.href.includes('avionAzul')) {
        return avionAzul;
    } else if (window.location.href.includes('avionAmarillo')) {
        return avionAmarillo;
    }
}

// Función para mostrar los asientos y los complementos
function mostrarAsientos() {
    const categoria = document.getElementById('categoria').value;
    let avion = obtenerAvionSeleccionado();

    // Mostrar la tabla de asientos
    const tabla = document.createElement('table');
    tabla.innerHTML = generarTablaAsientos(avion, categoria);
    document.getElementById('tablaAsientos').innerHTML = "";
    document.getElementById('tablaAsientos').appendChild(tabla);

    // Mostrar complementos basados en la categoría seleccionada
    mostrarComplementos(categoria);

    // Actualizar el precio al mostrar los asientos
    actualizarPrecio();
}

// Función para mostrar los complementos según la categoría
function mostrarComplementos(categoria) {
    let complementosHtml = '';

    if (categoria === 'lowCost') {
        complementosHtml += `
            <input type="checkbox" id="maleta10kg" onchange="actualizarPrecio()"> Maleta 10kg (+30€)<br>
            <input type="checkbox" id="maleta25kg" onchange="actualizarPrecio()"> Maleta 25kg (+45€)<br>
            <input type="checkbox" id="embarque" onchange="actualizarPrecio()"> Embarque prioritario (+10€)<br>
            <input type="checkbox" id="menu" onchange="actualizarPrecio()"> Menú a bordo (+20€)<br>
            <input type="submit" name="Submit" value="Pagar" onclick="confirmarReserva()">
        `;
    } else if (categoria === 'economica') {
        complementosHtml += `
            <input type="checkbox" id="maleta25kg" onchange="actualizarPrecio()"> Maleta 25kg (+45€)<br>
            <input type="checkbox" id="menu" onchange="actualizarPrecio()"> Menú a bordo (+20€)<br>
            <input type="submit" name="Submit" value="Pagar" onclick="confirmarReserva()">
        `;
    } else if (categoria === 'business') {
        complementosHtml += `
            <input type="checkbox" id="menu" onchange="actualizarPrecio()"> Menú a bordo (+20€)<br>
            <input type="submit" name="Submit" value="Pagar" onclick="confirmarReserva()">
        `;
    }

    // Insertar los complementos en el DOM
    document.getElementById('complementos').innerHTML = complementosHtml;
}

// Función para actualizar el precio total según la selección de asientos y complementos
function actualizarPrecio() {
    const categoria = document.getElementById('categoria').value;
    let avion = obtenerAvionSeleccionado();
    let total = avion.precios[categoria]; // Precio base de la categoría

    // Sumar el precio de todos los asientos seleccionados
    asientosSeleccionados.forEach(asiento => {
        total += avion.precios[categoria]; // Sumar el precio de cada asiento
    });

    // Agregar el precio de los complementos seleccionados
    if (categoria === 'lowCost') {
        if (document.getElementById('maleta10kg') && document.getElementById('maleta10kg').checked) total += 30;
        if (document.getElementById('maleta25kg') && document.getElementById('maleta25kg').checked) total += 45;
        if (document.getElementById('embarque') && document.getElementById('embarque').checked) total += 10;
        if (document.getElementById('menu') && document.getElementById('menu').checked) total += 20;
    } else if (categoria === 'economica') {
        if (document.getElementById('maleta25kg') && document.getElementById('maleta25kg').checked) total += 45;
        if (document.getElementById('menu') && document.getElementById('menu').checked) total += 20;
    } else if (categoria === 'business') {
        if (document.getElementById('menu') && document.getElementById('menu').checked) total += 20;
    }

    // Aplicar descuento por residente si está marcado
    const residente = document.getElementById('residente').checked;
    if (residente) {
        total *= 0.25; // 75% de descuento
    }

    // Actualizar el precio en el DOM
    document.getElementById('precioTotal').textContent = `Precio total: ${total.toFixed(2)}€`;
}

// Función para seleccionar un asiento
function seleccionarAsiento(fila, columna) {
    let avion = obtenerAvionSeleccionado();

    const asiento = { fila, columna };

    // Verificar si el asiento está libre
    if (avion.asientos[fila][columna]) {
        // Añadir el asiento seleccionado a la lista
        asientosSeleccionados.push(asiento);
    } else {
        alert('Este asiento ya está ocupado.');
        return;
    }

    // Actualizar la tabla de asientos después de la selección
    mostrarAsientos();

    // Actualizar el precio después de cada cambio
    actualizarPrecio();
}

// Función para confirmar la reserva al hacer clic en "Submit"
function confirmarReserva() {
    let avion = obtenerAvionSeleccionado();

    // Verificar si se han seleccionado asientos
    if (asientosSeleccionados.length === 0) {
        alert('Error: Debes seleccionar al menos un asiento antes de proceder al pago.');
        return; // Detener la ejecución si no hay asientos seleccionados
    }

    // Marcar todos los asientos seleccionados como ocupados
    asientosSeleccionados.forEach(asiento => {
        avion.reservarAsiento(asiento.fila, asiento.columna);
    });

    // Limpiar la lista de asientos seleccionados después de la confirmación
    asientosSeleccionados = [];

    // Actualizar la tabla de asientos para reflejar los cambios
    mostrarAsientos();

    alert('Reserva confirmada. Los asientos seleccionados ahora están ocupados.');
}
