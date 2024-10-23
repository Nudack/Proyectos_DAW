<?php 
    session_start();

    $error = '';

    if(!empty($_POST("formulario"))) {
        if(empty($_POST["nombre"])) {
            $error = '<span class="error">¡Error! No se ha enviado un nombre de usuario</span>';
        } else if(empty($_POST["email"])) {
            $error = '<span class="error">¡Error! No se ha enviado un email</span>';
        } else if(!preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/", $_POST["email"])) {
            $error = '<span class="error">¡Error! El email no es valido</span>';
        } else if(empty($_POST["edad"])) {
            $error = '<span class="error">¡Error! No se ha enviado la edad del usuario</span>';
        } else if(empty($_POST["pais"])) {
            $error = '<span class="error">¡Error! No se ha enviado el pais del usuario</span>';
        } else {
            $_SESSION["nombre"] = $_POST["nombre"];
            $_SESSION["email"] = $_POST["email"];
            $_SESSION["edad"] = $_POST["edad"];
            $_SESSION["pais"] = $_POST["pais"];
        }
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
    <form action="POST">
        <?php echo $error; ?>
        <br>
        <input type="hidden" value="1" name="formulario">

        <label for="nombre">Nombre del Usuario</label>
        <input type="text">

        <br>

        <label for="email">Email del Usuario</label>
        <input type="email">

        <br>

        <label for="edad">Edad del Usuario</label>
        <input type="number"> 

        <br>

        <label for="pais">Pais del Usuario</label>
        <select name="pais">
            <option value="España">España</option>
            <option value="Francia">Francia</option>
            <option value="Inglaterra">Inglaterra</option>
            <option value="Italia">Italia</option>
            <option value="Alemania">Alemania</option>
            <option value="Estados Unidos">Estados Unidos</option>
        </select>

        <br>

        <input type="submit">
    </form>
</body>
</html>