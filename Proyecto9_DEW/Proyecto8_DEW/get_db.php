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

    $dni = $_GET['dni'];

    $sql = "SELECT * FROM usuarios WHERE dni = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $dni);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $row['repeatPassword'] = $row['password'];
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "No se encontró ningún usuario con el DNI proporcionado"]);
    }

    $stmt->close();
    $conn->close();