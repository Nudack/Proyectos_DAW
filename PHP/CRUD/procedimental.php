<?php 
    $servidor = 'localhost';
    $usuario = 'patricio';
    $contrasena = 'Sav6934';
    $base_datos = 'gestion';


    $conexion = new mysqli_connect($servidor, $usuario, $contrasena, $base_datos);

    if(!$conexion){
        die("Conexión fallida: " . mysqli_connect_error());
    }
    echo "Conexión exitosa";
?>