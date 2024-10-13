<?php 
    sesion_start();

    $idioma = $_SESSION['idioma'];

    switch($idioma)
    {
        case 'ES':
            $texto_idioma = 'Español';
        break;
        case 'DE':
            $texto_idioma = 'Alemán';
        break;
        case 'FR':
            $texto_idioma = 'Francés';
        break;
        default:
            $texto_idioma = 'Inglés';
        break;
    }
?>  

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Bienvenida</title>
</head>
<body>
    <div>
        <nav>
            <ol>
                <li><a href="#"><?php echo $_SESSION['nombre_usuario']; ?></a></li>
                <li><?php echo $texto_idioma; ?></li>
            </ol>
        </nav>
    </div>
</body>
</html>