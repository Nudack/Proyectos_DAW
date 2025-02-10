<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "autodb";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Función para obtener productos de la base de datos
function getProducts($category = null) {
    global $conn;
    $sql = "SELECT * FROM productos";
    if ($category) {
        $category = $conn->real_escape_string($category);
        $sql .= " WHERE categoria = '$category'";
    }
    $result = $conn->query($sql);
    $products = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }
    return json_encode($products);
}

// Función para registrar un nuevo usuario
function registerUser($data) {
    global $conn;
    $id = $conn->real_escape_string($data['id']);
    $nombre = $conn->real_escape_string($data['nombre']);
    $email = $conn->real_escape_string($data['email']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $cuenta_bancaria = $conn->real_escape_string($data['cuenta-bancaria']);
    $telefono = $conn->real_escape_string($data['telefono']);

    $sql = "INSERT INTO clientes (id, nombre, email, password, cuenta_bancaria, telefono) 
            VALUES ('$id', '$nombre', '$email', '$password', '$cuenta_bancaria', '$telefono')";

    if ($conn->query($sql) === TRUE) {
        return json_encode(['success' => true, 'message' => 'Usuario registrado con éxito']);
    } else {
        return json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
}

// Función para iniciar sesión
function loginUser($data) {
    global $conn;
    $id = $conn->real_escape_string($data['id']);
    $password = $data['password'];

    $sql = "SELECT * FROM clientes WHERE id = '$id'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Inicio de sesión exitoso
            return json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso']);
        }
    }
    
    return json_encode(['success' => false, 'message' => 'ID o contraseña incorrectos']);
}

// Manejo de peticiones
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getProducts':
                $category = isset($_GET['category']) ? $_GET['category'] : null;
                echo getProducts($category);
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Acción no reconocida']);
        }
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'register':
                echo registerUser($_POST);
                break;
            case 'login':
                echo loginUser($_POST);
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Acción no reconocida']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No se especificó ninguna acción']);
    }
}

$conn->close();

