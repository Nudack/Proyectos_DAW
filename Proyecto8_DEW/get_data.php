<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "patricio";
$password = "Sav6934";
$dbname = "usuarios";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("SELECT * FROM usuarios ORDER BY RAND() LIMIT 1");
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        // Eliminamos la contraseña por seguridad
        unset($result['password']);
        echo json_encode($result);
    } else {
        echo json_encode(['error' => 'No se encontraron datos']);
    }
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
}

$conn = null;
