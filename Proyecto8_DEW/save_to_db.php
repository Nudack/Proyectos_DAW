<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "patricio";
$password = "Sav6934";
$dbname = "usuarios";

$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "INSERT INTO usuarios (nombre, apellidos, dni, fechaNacimiento, codigoPostal, email, telefonoFijo, telefonoMovil, iban, tarjetaCredito, password) 
                VALUES (:nombre, :apellidos, :dni, :fechaNacimiento, :codigoPostal, :email, :telefonoFijo, :telefonoMovil, :iban, :tarjetaCredito, :password)
                ON DUPLICATE KEY UPDATE
                nombre = :nombre, apellidos = :apellidos, fechaNacimiento = :fechaNacimiento, 
                codigoPostal = :codigoPostal, email = :email, telefonoFijo = :telefonoFijo, 
                telefonoMovil = :telefonoMovil, iban = :iban, tarjetaCredito = :tarjetaCredito, 
                password = :password";
        
        $hashedPassword = password_hash($input["password"], PASSWORD_DEFAULT);

        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':nombre', $input['nombre']);
        $stmt->bindParam(':apellidos', $input['apellidos']);
        $stmt->bindParam(':dni', $input['dni']);
        $stmt->bindParam(':fechaNacimiento', $input['fechaNacimiento']);
        $stmt->bindParam(':codigoPostal', $input['codigoPostal']);
        $stmt->bindParam(':email', $input['email']);
        $stmt->bindParam(':telefonoFijo', $input['telefonoFijo']);
        $stmt->bindParam(':telefonoMovil', $input['telefonoMovil']);
        $stmt->bindParam(':iban', $input['iban']);
        $stmt->bindParam(':tarjetaCredito', $input['tarjetaCredito']);
        $stmt->bindParam(':password', $hashedPassword);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Datos guardados en la base de datos correctamente']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar los datos: ' . $e->getMessage()]);
    }
    
    $conn = null;
} else {
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
}
