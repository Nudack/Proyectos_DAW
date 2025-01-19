<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type");

    session_start();

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        // Datos estáticos adicionales
        $datosEstaticos = [
            "nombre" => "Patricio",
            "apellidos" => "Soria Benitez", 
            "dni" => "47544712D", 
            "fechaNacimiento" => "05/06/2004", 
            "codigoPostal" => "35500", 
            "email"  => "patricio@gmail.com",
            "telefonoFijo" => "923645539",
            "telefonoMovil" => "692628303", 
            "tarjetaCredito" => "4485739123456789", 
            "iban" => "ES9121000418450200051332", 
            "password" => "G7x@#nW8rLz!29",
        ];


        echo json_encode($datosEstaticos);
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }
