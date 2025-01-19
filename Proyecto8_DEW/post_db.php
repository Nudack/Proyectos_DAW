<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "usuarios";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
    }

    $dni = $_POST['dni'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $fechaNacimiento = $_POST['fechaNacimiento'];
    $codigoPostal = $_POST['codigoPostal'];
    $email = $_POST['email'];
    $telefonoFijo = $_POST['telefonoFijo'];
    $telefonoMovil = $_POST['telefonoMovil'];
    $iban = $_POST['iban'];
    $tarjetaCredito = $_POST['tarjetaCredito'];
    $password = $_POST['password']; 

    $sql = "INSERT INTO usuarios (dni, nombre, apellidos, fechaNacimiento, codigoPostal, email, telefonoFijo, telefonoMovil, iban, tarjetaCredito, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            nombre = VALUES(nombre), 
            apellidos = VALUES(apellidos), 
            fechaNacimiento = VALUES(fechaNacimiento), 
            codigoPostal = VALUES(codigoPostal), 
            email = VALUES(email), 
            telefonoFijo = VALUES(telefonoFijo), 
            telefonoMovil = VALUES(telefonoMovil), 
            iban = VALUES(iban), 
            tarjetaCredito = VALUES(tarjetaCredito), 
            password = ?";
            
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssss", $dni, $nombre, $apellidos, $fechaNacimiento, $codigoPostal, $email, $telefonoFijo, $telefonoMovil, $iban, $tarjetaCredito, $password, $password);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Datos guardados correctamente"]);
    } else {
        echo json_encode(["error" => "Error al guardar los datos: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();