<?php
    session_start();

    if (!empty($_GET['paso']))
    {
        $_SESSION['nombre_usuario'] = $_GET['nombre'];

        header("location: /bienvenida.php");
        exit();
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
    <?php echo $errores; ?>
    <form method="POST">
        <input type="hidden" name="paso" value="1" />
        <label for="usuario">Usuario</label>
        <input type="text" name="usuario" placeholder="Introducca el nombre">
        <input type="submit">
    </form>

    <a href="/configuracion_idioma">Cambiar de idioma</a>
    <a href="/logout.php">Salir</a>
</body>
</html>