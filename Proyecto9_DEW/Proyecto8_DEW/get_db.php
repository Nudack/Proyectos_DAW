<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Function to handle errors and return them as JSON
function handleError($errno, $errstr, $errfile, $errline) {
    $error = array(
        'error' => $errstr,
        'file' => $errfile,
        'line' => $errline
    );
    echo json_encode($error);
    exit;
}

// Set the error handler
set_error_handler("handleError");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Conexión fallida: " . $conn->connect_error);
    }

    $dni = isset($_GET['dni']) ? $_GET['dni'] : '';

    if (empty($dni)) {
        throw new Exception("DNI no proporcionado");
    }

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
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

