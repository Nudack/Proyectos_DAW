<?php
    $errores = '';

    if (empty($_POST['nombre'])){
        $errores = "<span>¡ERROR! No se ha enviado ningún nombre.<br /></span>";
    }
    else if(strlen($_POST['nombre']) < 5){
        $errores = "<span>¡ERROR! El número de caracteres de nombre, es menor a 5.<br /></span>";
    }
    else{
        $hola_nombre = "<span>Hola {$_POST['nombre']}</span>";
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario</title>
</head>
<body>
    <form action="formulario.php" method="POST">
        <?php echo $errores; ?>
        <label for="nombre">Nombre: </label>
        <input type="text" id="nombre" name="nombre" placeholder="Nombre de la persona...">
        <br>
        <input type="submit">
    </form>

    <?php echo $hola_nombre; ?>
</body>
</html>