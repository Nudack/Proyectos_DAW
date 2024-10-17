<?php
    $dsn = 'mysql:host=localhost;dbname=gestion';
    $usuario = 'patricio';
    $contrasena = 'Sav6934';

    try{
        $conexion = new PDO($dsn, $usuario, $contrasena);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Conexión exitosa";
    } catch(PDOException $e) {
        echo "Error en la conexión: " . $e->getMessage();
    }
?>