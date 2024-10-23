<?php
// Definimos el array de películas
$peliculas = [
    [
        "titulo" => "El Señor de los Anillos: La Comunidad del Anillo",
        "director" => "Peter Jackson",
        "anio" => 2001,
        "genero" => "Fantasía",
        "poster" => "imagenes/lotr1.jpg"
    ],
    [
        "titulo" => "Inception",
        "director" => "Christopher Nolan",
        "anio" => 2010,
        "genero" => "Ciencia Ficción",
        "poster" => "imagenes/inception.jpg"
    ],
    [
        "titulo" => "The Matrix",
        "director" => "Lana y Lilly Wachowski",
        "anio" => 1999,
        "genero" => "Ciencia Ficción",
        "poster" => "imagenes/matrix.jpg"
    ],
    [
        "titulo" => "El Padrino",
        "director" => "Francis Ford Coppola",
        "anio" => 1972,
        "genero" => "Drama",
        "poster" => "imagenes/godfather.jpg"
    ],
    [
        "titulo" => "Jurassic Park",
        "director" => "Steven Spielberg",
        "anio" => 1993,
        "genero" => "Aventura",
        "poster" => "imagenes/jurassicpark.jpg"
    ]
];

// Obtener el género seleccionado del formulario
$generoSeleccionado = isset($_GET['genero']) ? $_GET['genero'] : '';

// Filtrar las películas por género si se selecciona uno
$peliculasFiltradas = [];

if ($generoSeleccionado == '') {
    $peliculasFiltradas = $peliculas;
} else {
    foreach ($peliculas as $pelicula) {
        if ($pelicula['genero'] == $generoSeleccionado) {
            $peliculasFiltradas[] = $pelicula;
        }
    }
}

// Obtener todos los géneros únicos para el formulario
$generos = [];
foreach ($peliculas as $pelicula) {
    if (!in_array($pelicula['genero'], $generos)) {
        $generos[] = $pelicula['genero'];
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Películas</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Catálogo de Películas</h1>

    <!-- Formulario para filtrar por género -->
    <form method="get" action="catalogo.php">
        <label for="genero">Filtrar por género:</label>
        <select name="genero" id="genero">
            <option value="">Todos</option>
            <?php foreach ($generos as $genero): ?>
                <option value="<?php echo $genero; ?>" <?php if ($genero == $generoSeleccionado) echo 'selected'; ?>>
                    <?php echo $genero; ?>
                </option>
            <?php endforeach; ?>
        </select>
        <input type="submit" value="Filtrar">
    </form>

    <!-- Mostrar las películas filtradas -->
    <div class="peliculas">
        <?php if (count($peliculasFiltradas) > 0): ?>
            <?php foreach ($peliculasFiltradas as $pelicula): ?>
                <div class="pelicula">
                    <h2><?php echo $pelicula['titulo']; ?></h2>
                    <img src="<?php echo $pelicula['poster']; ?>" alt="<?php echo $pelicula['titulo']; ?>">
                    <p><strong>Director:</strong> <?php echo $pelicula['director']; ?></p>
                    <p><strong>Año:</strong> <?php echo $pelicula['anio']; ?></p>
                    <p><strong>Género:</strong> <?php echo $pelicula['genero']; ?></p>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No se encontraron películas para el género seleccionado.</p>
        <?php endif; ?>
    </div>
</body>
</html>
