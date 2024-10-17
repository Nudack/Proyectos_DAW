<?php 
    $servidor = 'localhost';
    $usuario = 'patricio';
    $contrasena = 'Sav6934';
    $base_datos = 'gestion';


    $conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);

    if($conexion->connect_error){
        die("Conexión fallida: " . $conexion->connect_error);
    }
    echo "Conexión exitosa";
?>