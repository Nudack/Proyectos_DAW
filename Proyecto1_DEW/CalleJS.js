
console.log("Solicitando datos al usuario");

// Variables
let numEscaparates = "prueba";
let numPuerta = "prueba";
let puertas = "prueba";
let numCoche = "prueba";
let hora = "prueba";
let numCarteles = "prueba";
let color = "prueba";
const ofertas = [];
const carteles = [];
let i = true;


// Loop para recojer el número de carteles
while (isNaN(numCarteles)){
    numCarteles = prompt("¿Cuantos carteles hay?");

    if(isNaN(numCarteles)){
        alert("Error.\nEl valor ingresado debe ser un número entero.");
    }
}

// Loop para recojer lo que esta escrito en lso carteles
for(let i = 0; i < numCarteles; i++){
    let nombre = prompt("¿Que pone en el "+ (i+1) +"º cartel?");
    carteles.push(nombre);
}

// Loop para recoer el numero de puertas
while (isNaN(puertas)){
    puertas = prompt("¿Cuantas puertas hay?");

    if(isNaN(puertas)){
        alert("Error.\nEl valor ingresado debe ser un número entero.");
    }
}

// Loop para recoer el numero de puerta de la primera puerta
while (isNaN(numPuerta)){
    numPuerta = prompt("¿Cual es el número de la primera puerta?");

    if(isNaN(numPuerta)){
        alert("Error.\nEl valor ingresado debe ser un número entero.");
    }
}

// Loop para recojer el número de escaparates
while (isNaN(numEscaparates)){
    numEscaparates = prompt("¿Cuantos escaparates hay?");

    if(isNaN(numEscaparates)){
        alert("Error.\nEl valor ingresado debe ser un número entero.");
    }
}

// Loop para recojer la oferta de la tienda
for(let i = 0; i < numEscaparates; i++){
    let oferta = prompt("¿Cual es la oferta del "+ (i+1) +"º escaparate?");
    if(isNaN(oferta)){
        alert("Error.\nEl valor ingresado debe ser un número entero.");
        i--;
    }else{
    ofertas.push(oferta);
    }
}

// Loop para recojer la hora del día 
hora = parseInt(prompt("¿Qué hora es?")); 

hora = Number(hora);

while (!Number.isInteger(hora) || hora < 1 || hora > 24) {
    alert("Número inválido. Debes ingresar un entero entre 1 y 24.");
    hora = Number(prompt("¿Qué hora es? (1-24)"));
}


// Loop para recojer el color del semáforo
while (i){
    color = prompt("¿De que color esta el semáforo?")

    switch(color){
        case "verde":
            i = false;
            break;
        case "amarillo":
            i = false;
            break;
        case "rojo":
            i = false;
            break;
        default:
        alert("Error.\nEl color debe ser verde, amarillo o rojo");
        break;
    }
}

// Loop para recojer el número de coches    
while (isNaN(numCoche)){
    numCoche = prompt("¿Cuantos coches hay?");

    if(isNaN(numCoche)){
        alert("Error.\nEl valor ingresado debe ser un número entero.");
    }
}


console.log("Rellenando la calle");

// Escribiendo sobre div para colocar los datos recogidos de antes

// El primer div sobre los carteles
document.write('<div id="carteles">');
for(let i = 0; i < numCarteles; i++){
    document.write('<p>'+ carteles[i] + '</p>');
}
document.write('</div>');

// El segundo div para colocar la puerta y su número
document.write('<div id="puertas">');
for(let i = 0; i < puertas; i++){
    numPuerta = Number(numPuerta)
    document.write('<img src="Imagenes/puelta.png" class="max"> <p>' + numPuerta +'</p>');
    numPuerta = numPuerta + 2;
}
document.write('</div>');

// El tercer div para los escaparates y sus ofertas
document.write('<div id="escaparateOfertas">');
for(let i = 0; i < numEscaparates; i++){
    document.write('<img src="Imagenes/escaparate.png" class="max"> <p>' + ofertas[i] +'%</p>');
}
document.write('</div>')

// el cuarto div para el reloj y el semaforo con su color elegido
document.write('<div id="relojSemaforo">');
switch (hora){         // Dependiendo del numero escrito entre 1 y 24, aparecerá una imagen distinta
    case 1:
    case 13:
        document.write('<img src="Imagenes/Reloj1.png" class="max">');
        break;
    case 2:
    case 14:
        document.write('<img src="Imagenes/Reloj2.png" class="max">');
        break;
    case 3:
    case 15:
        document.write('<img src="Imagenes/Reloj3.png" class="max">');
        break;
    case 4: 
    case 16:
        document.write('<img src="Imagenes/Reloj4.png" class="max">');
        break;
    case 5:
    case 17:
        document.write('<img src="Imagenes/Reloj5.png" class="max">');
        break;
    case 6:
    case 18:
        document.write('<img src="Imagenes/Reloj6.png" class="max">');
        break;
    case 7:
    case 19:
        document.write('<img src="Imagenes/Reloj7.png" class="max">');
        break;
    case 8:
    case 20:
        document.write('<img src="Imagenes/Reloj8.png" class="max">');
        break;
    case 9:
    case 21:
        document.write('<img src="Imagenes/Reloj9.png" class="max">');
        break;
    case 10:
    case 22:
        document.write('<img src="Imagenes/Reloj10.png" class="max">');
        break;
    case 11:
    case 23:
        document.write('<img src="Imagenes/Reloj11.png" class="max">');
        break;
    case 12:
    case 24:
        document.write('<img src="Imagenes/Reloj12.png" class="max">');
}

// Eligiendo el color del semaforo
switch(color){
    case "verde":
        document.write('<img src="Imagenes/verde.png" class="max">')
        break;
    case "amarillo":
        document.write('<img src="Imagenes/amarillo.png" class="max">')
        break;
    case "rojo":
        document.write('<img src="Imagenes/rojo.png" class="max">')
        break;
}
document.write('</div>')

// El quinto div para los coches
document.write('<div id="coches">');
for(let i = 0; i < numCoche; i++){
    document.write('<img src="Imagenes/coche.jpg" class="max">');
}
document.write('</div>')
