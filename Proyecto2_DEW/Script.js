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

    liberarAsiento(fila, columna) {
        if (!this.asientos[fila][columna]) {
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
            const disponible = avion.asientos[i][j];
            const color = disponible ? "green" : "red";
            const eventoClic = disponible ? `onclick="reservar(${i},${j})"` : ''; // Solo si está libre
            tablaHtml += `<td style="background-color:${color}; cursor: pointer;" ${eventoClic}>${disponible ? 'Libre' : 'Ocupado'}</td>`;
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
        `;
    } else if (categoria === 'economica') {
        complementosHtml += `
            <input type="checkbox" id="maleta25kg" onchange="actualizarPrecio()"> Maleta 25kg (+45€)<br>
            <input type="checkbox" id="menu" onchange="actualizarPrecio()"> Menú a bordo (+20€)<br>
        `;
    } else if (categoria === 'business') {
        complementosHtml += `
            <input type="checkbox" id="menu" onchange="actualizarPrecio()"> Menú a bordo (+20€)<br>
        `;
    }

    // Insertar los complementos en el DOM
    document.getElementById('complementos').innerHTML = complementosHtml;
}

// Función para reservar un asiento
function reservar(fila, columna) {
    const categoria = document.getElementById('categoria').value;
    let avion = obtenerAvionSeleccionado();

    if (avion.asientos[fila][columna]) {
        avion.reservarAsiento(fila, columna);
    } else {
        avion.liberarAsiento(fila, columna);
    }

    // Actualizar la tabla de asientos después de reservar
    mostrarAsientos();
}

// Función para actualizar el precio total según la selección de asientos y complementos
function actualizarPrecio() {
    const categoria = document.getElementById('categoria').value;
    let avion = obtenerAvionSeleccionado();
    let total = avion.precios[categoria]; // Precio base de la categoría

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


/*

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

    liberarAsiento(fila, columna) {
        if (!this.asientos[fila][columna]){
            this.asientos[fila][columna] = true;
        }
    }
}

// Definir los aviones
const avionBlanco = new Avion('Avión Blanco', 10, 4, { business: 300, economica: 200, lowCost: 70 });
const avionAzul = new Avion('Avión Azul', 18, 6, { business: 250, economica: 175, lowCost: 60 });
const avionAmarillo = new Avion('Avión Amarillo', 24, 6, { business: 200, economica: 125, lowCost: 50 });
const avionBlanco = new Avion('Avión Blanco', 10, 4, { business: 250, economica: 175, lowCost: 70 });
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
        if(confirm(`¿Quieres reservar el asiento en fila ${fila + 1}, columna ${columna + 1} en categoría ${categoria}.?`)){
            avion.reservarAsiento(fila, columna);
            mostrarFormularioFinal(categoria, fila, columna);
        }
        else{
            avion.liberarAsiento(fila, columna)
            mostrarFormularioFinal(categoria, fila, columna);
        }

    } else {
        alert('Este asiento ya está ocupado.');
    }

    // Actualizar la tabla de asientos después de reservar
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
    

    let formularioHtml = document.createElement('div')
    formularioHtml.innerHTML = `<h2>Formulario de complementos para categoría: ${categoria.toUpperCase()}</h2>`;

    // Residente (para aplicar descuento)
    formularioHtml += `
    formularioHtml.innerHTML += `
        <label for="residente">¿Eres residente? (75% de descuento)</label>
        <input type="checkbox" id="residente"><br><br>
    `;

    // Complementos según la categoría
    if (categoria == "lowCost") {
        formularioHtml += `
        formularioHtml.innerHTML += `
            <label></label><input type="checkbox" id="asiento" disabled checked> Pagar por elección de asiento (Fila ${fila + 1}, Columna ${columna + 1}, +5€)<br>
            <label><input type="checkbox" id="maleta10kg"> Maleta de 10Kg (+30€)</label><br>
            <label><input type="checkbox" id="maleta25kg"> Maleta de 25Kg (+45€)</label><br>
            <label><input type="checkbox" id="embarque"> Embarque prioritario (+10€)</label><br>
            <label><input type="checkbox" id="menu"> Menú a bordo (+20€)</label><br>
        `;
    } else if (categoria == "economica") {
        formularioHtml += `
        formularioHtml.innerHTML += `
            <label><input type="checkbox" id="asiento"> Pagar por elección de asiento (Fila ${fila + 1}, Columna ${columna + 1}, +5€)</label><br>
            <label><input type="checkbox" id="maleta25kg"> Maleta de 25Kg (+45€)</label><br>
            <label><input type="checkbox" id="menu"> Menú a bordo (+20€)</label><br>
        `;
    } else if (categoria == "business") {
        formularioHtml += `
            <label><input type="checkbox" id="asiento"> Elección de asiento (Fila ${fila + 1}, Columna ${columna + 1})</`
        formularioHtml.innerHTML += `<label><input type="checkbox" id="asiento"> Elección de asiento (Fila ${fila + 1}, Columna ${columna + 1})</`
    }

    formularioHtml.innerHTML += '<input type="submit">'
    document.body.appendChild(formularioHtml);
} 
    */