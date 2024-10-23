<?php
    $servidor = 'localhost';
    $usuario = 'patricio';
    $contrasena = 'Sav6934';
    $base_datos = 'gestion';


    $conexion = new mysqli($servidor, $usuario, $contraseña, $base_datos);

    if ($conexion->connect_error) 
    {
        die("Conexión fallida: " . $conexion->connect_error);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    
</body>
</html>