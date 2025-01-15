<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "patricio";
$password = "Sav6934";
$dbname = "usuarios";

$dni = $_GET['dni'] ?? '';

if ($dni) {
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE dni = :dni");
        $stmt->bindParam(':dni', $dni);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result) {
            // Eliminamos la contraseña por seguridad
            unset($result['password']);
            echo json_encode($result);
        } else {
            echo json_encode(['error' => 'No se encontraron datos para el DNI proporcionado']);
        }
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
    }
    
    $conn = null;
} else {
    echo json_encode(['error' => 'DNI no proporcionado']);
}