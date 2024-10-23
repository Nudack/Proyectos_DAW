<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información</title>
</head>
<body>
    <h2>Información formulario</h2>
    <ol>
        <li>Nombre: <?php echo $_SESSION["nombre"] ?></li>
        <li>Email: <?php echo $_SESSION["email"] ?></li>
        <li>Edad: <?php echo $_SESSION["edad"] ?></li>
        <li>País: <?php echo $_SESSION["pais"] ?></li>
    </ol>
</body>
</html>