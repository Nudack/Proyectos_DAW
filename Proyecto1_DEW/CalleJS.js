function llenarCalle() {

    // Variables
    let numTiendas = "prueba";
    let numPuerta = "prueba";
    let numCoche = "prueba";
    let hora = "prueba"
    const carteles = [];
    const ofertas = [];


    // Loop que comprueba que la variable numTiendas sea un número entero
    while (isNaN(numTiendas)){
        numTiendas = prompt("¿Cuantas tiendas hay?");

        if(isNaN(numTiendas)){
            alert("Error.\nEl valor ingresado debe ser un número entero.");
        }
    }

    // Loop para recojer el nombre de las tiendas
    for(i = 0; i < numTiendas; i++){
        let nomTienda = prompt("¿Cual es el nombre de la "+ (i+1) +"º tienda?");
        carteles.push(nomTienda);
    }

    // Loop para recojer la oferta de la tienda
    for(i = 0; i < numTiendas; i++){
        let oferta = prompt("¿Cual es la oferta de la "+ (i+1) +"º tienda?");
        ofertas.push(oferta);
    }
    
    // Loop para recoer el numero de puerta de la primera tienda
    while (isNaN(numPuerta)){
        numPuerta = prompt("¿Cual es el número de la primera tienda?");

        if(isNaN(numPuerta)){
            alert("Error.\nEl valor ingresado debe ser un número entero.");
        }
    }

    // Loop para recojer el número de coches    
    while (isNaN(numCoche)){
        numCoche = prompt("¿Cuantos coches hay?");

        if(isNaN(numCoche)){
            alert("Error.\nEl valor ingresado debe ser un número entero.");
        }
    }

    // Loop para recojer la hora del día  
    while (isNaN(hora)){
        hora = prompt("¿Que hora es?");

        if(isNaN(hora)){
            alert("Error.\nEl valor ingresado debe ser un número entero en formato de 24H solo horas en punto.");
        }
    }


}