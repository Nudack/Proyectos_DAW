<?php
    session_start();
    if (!empty($_GET['paso'])) {
        setcookie("idioma", $_GET['idioma'], time()+ 60*60*24*7);

        header("location: /bienvenida.php");
        exit();
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Idioma</title>
</head>
<body>
    <div>
        <form action="/configuracion_idioma.php" method="GET">
            <input type="hidden" name="paso" value="1" />

            <div>
                <label for="idioma">Seleciona el idioma</label>

                <select class="form-control" name="idioma">
                    <option value="ES">Español</option>
                    <option value="EN">Inglés</option>
                    <option value="DE">Alemán</option>
                    <option value="FR">Francés</option>
                </select>
            </div>

            <button type="submit">Cambio idioma</button>
        </form>

        <a href="/login.php">Login</a><br /><br />
        <a href="/logout.php">Salir</a>
    </div>
</body>
</html>