<?php

    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $correo = $_POST['correo'];
    $errores = '';

    if (empty($_POST['nombre'])){
        $errores = "<span class=\"error\">¡ERROR! No se ha enviado ningún nombre.<br /></span>";
    }
    else if(strlen($_POST['nombre']) < 5){
        $errores = "<span class=\"error\">¡ERROR! El número de caracteres de nombre, es menor a 5.<br /></span>";
    }
    else if(!is_numeric($_POST['edad'])){
        $errores = "<span class=\"error\">¡ERROR! No se ha enviado un número entero<br /></span>";
    }
    else if(empty($_POST['correo'])){
        $errores = "<span class=\"error\">¡ERROR! No se ha enviado ninguna dirección de correos.<br /></span>";
    }
    else{
        
    }