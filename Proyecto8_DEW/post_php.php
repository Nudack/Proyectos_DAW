<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET");
    header("Access-Control-Allow-Headers: Content-Type");

    session_start(); 

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        $_SESSION['datos'] = [
            "nombre" => $_POST['nombre'] ?? '',
            "apellidos" => $_POST['apellidos'] ?? '',
            "dni" => $_POST['dni'] ?? '',
            "fechaNacimiento" => $_POST['fechaNacimiento'] ?? '',
            "codigoPostal" => $_POST['codigoPostal'] ?? '',
            "email" => $_POST['email'] ?? '',
            "telefonoFijo" => $_POST['telefonoFijo'] ?? '',
            "telefonoMovil" => $_POST['telefonoMovil'] ?? '',
            "iban" => $_POST['iban'] ?? '',
            "tarjetaCredito" => $_POST['tarjetaCredito'] ?? '',
            "password" => $_POST['password'] ?? '',
            "repeatPassword" => $_POST['password'] ?? ''
        ];

        echo json_encode(["message" => "Datos guardados correctamente"]);
    } elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $datos = $_SESSION['datos'] ?? [];
        echo json_encode($datos);
    }
