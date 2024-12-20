<?php 
// Configuración de conexión a la base de datos
$servidor = 'localhost';
$usuario = 'patricio';
$contrasena = 'Sav6934';
$base_datos = 'gestion';

try {
    // Creando la conexión utilizando PDO
    $conexion = new PDO("mysql:host=$servidor;dbname=$base_datos;charset=utf8", $usuario, $contrasena);
    // Configurando el modo de error a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}

// Definiciones constantes para uso en el código
define('TEXTO_ERROR', '<em class="error_campo_texto">El campo es inválido</em> <br />');
define('EDITORIALES', ['AY' => 'Anaya', 'ST' => 'Santillana']);
define('LIMITE_SCROLL', '5');

$html_salida = '';
$oper = $_REQUEST['oper'] ?? '';
$errores = [];

// Control de operaciones CRUD
switch($oper) {
    case 'create':
        if (!empty($_POST['paso'])) {
            $errores = validar_campos();
            if (count($errores) == 0) {
                insertar();
            }
        }
        $html_salida .= cabecera('alta');
        $html_salida .= formulario($oper, $errores);
        break;

    case 'update':
        if (empty($_POST['paso'])) {
            recuperar();
        } else {
            $errores = validar_campos();
            if (count($errores) == 0) {
                actualizar();
            }
        }
        $html_salida .= cabecera('actualizar');
        $html_salida .= formulario($oper, $errores);
        break;

    case 'delete':
        eliminar();
        header("location: /biblioteca_pdo.php");
        exit(0);
        break;

    default:
        $html_salida .= cabecera();
        $html_salida .= resultados_busqueda();
        break;
}

// Función para validar campos del formulario
function validar_campos() {
    $errores = [];
    $campos = ['nombre', 'descripcion', 'autor', 'editorial'];

    foreach ($campos as $campo) {
        if (empty($_POST[$campo])) {
            $errores[$campo]['error'] = true;
            $errores[$campo]['desc_error'] = TEXTO_ERROR;
            $errores[$campo]['class_error'] = 'error_campo_texto';
        }
    }
    return $errores;
}

// Función para generar la cabecera de la página
function cabecera($titulo_seccion = '') {
    $breadcrumb = empty($titulo_seccion) ? "<li class=\"breadcrumb-item\">biblioteca</li>" :
        "<li class=\"breadcrumb-item\"><a href=\"/biblioteca_pdo.php\">biblioteca</a></li>
        <li class=\"breadcrumb-item active\" aria-current=\"page\">{$titulo_seccion}</li>";
    
    return "
        <nav aria-label=\"breadcrumb\">
            <ol class=\"breadcrumb\">
                <li class=\"breadcrumb-item\"><a href=\"/\">Patricio</a></li>
                {$breadcrumb}
            </ol>
        </nav>
    ";
}

// Función para construir el formulario
function formulario($oper, $errores = []) {
    $id = $_REQUEST['id'] ?? '';
    $mensaje_exito = $botones_extra = $disabled = '';

    if ($_POST['paso'] && count($errores) == 0) {
        $mensaje_exito = '<div class="exito">Operación realizada con éxito</div>';
        $disabled = 'disabled';
        $botones_extra = '<a href="/biblioteca_pdo.php?oper=create" class="btn btn-primary">Nuevo Libro</a>';
        
        if ($oper == 'update') {
            $botones_extra .= ' <a href="/biblioteca_pdo.php?oper=update&id=' . $id . '" class="btn btn-primary">Editar</a>';
        }
    }

    $value_editoriales = '';
    foreach (EDITORIALES as $cod_editorial => $texto_editorial) {
        $value_editoriales .= "<option value=\"{$cod_editorial}\">{$texto_editorial}</option>";
    }

    return "
        <form method=\"POST\" action=\"biblioteca_pdo.php\">
            <input type=\"hidden\" name=\"paso\" value=\"1\" />
            <input type=\"hidden\" name=\"oper\" value=\"{$oper}\" />
            <input type=\"hidden\" name=\"id\" value=\"{$id}\" />

            {$mensaje_exito}
            <label class=\"". $errores['nombre']['class_error'] ." form-label\" for=\"nombre\">Nombre:</label>
            <input {$disabled} class=\"form-control\" type=\"text\" id=\"nombre\" name=\"nombre\" value=\"{$_POST['nombre']}\" placeholder=\"Nombre del libro...\">
            ". $errores['nombre']['desc_error'] ."
            <br />

            <label class=\"". $errores['descripcion']['class_error'] ." form-label\" for=\"descripcion\">Descripción:</label>
            <textarea {$disabled} class=\"form-control\" id=\"descripcion\" name=\"descripcion\" placeholder=\"Descripción del libro...\">{$_POST['descripcion']}</textarea>
            ". $errores['descripcion']['desc_error'] ."
            <br />

            <label class=\"". $errores['autor']['class_error'] ." form-label\" for=\"autor\">Autor:</label>
            <input {$disabled} class=\"form-control\" type=\"text\" id=\"autor\" name=\"autor\" value=\"{$_POST['autor']}\" placeholder=\"Autor del libro...\">
            ". $errores['autor']['desc_error'] ."
            <br />

            <label class=\"". $errores['editorial']['class_error'] ." form-label\" for=\"editorial\">Editorial:</label>
            <select {$disabled} class=\"form-control form-select\" id=\"editorial\" name=\"editorial\">
                {$value_editoriales}
            </select>
            ". $errores['editorial']['desc_error'] ."
            <br />

            <div style=\"text-align:right\">
                {$botones_extra}
                <input {$disabled} type=\"submit\" class=\"btn btn-primary\" value=\"Enviar\" />
            </div>
        </form>
    ";
}

// Función para eliminar un libro
function eliminar() {
    global $conexion;

    if (!empty($_GET['id'])) {
        $sql = "DELETE FROM libros WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $_GET['id']);
        $stmt->execute();
    }
}

// Función para recuperar datos de un libro
function recuperar() {
    global $conexion;

    $id = $_REQUEST['id'];
    $sql = "SELECT * FROM libros WHERE id = :id";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $fila = $stmt->fetch(PDO::FETCH_ASSOC);

    $_POST['nombre']      = $fila['nombre'];
    $_POST['descripcion'] = $fila['descripcion'];
    $_POST['autor']       = $fila['autor'];
    $_POST['editorial']   = $fila['editorial'];
}

// Función para actualizar un libro
function actualizar() {
    global $conexion;

    if (!empty($_POST['id'])) {
        $sql = "UPDATE libros SET 
            nombre = :nombre,
            descripcion = :descripcion,
            autor = :autor,
            editorial = :editorial,
            ip_ult_mod = :ip_ult_mod
            WHERE id = :id";

        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $_POST['nombre']);
        $stmt->bindParam(':descripcion', $_POST['descripcion']);
        $stmt->bindParam(':autor', $_POST['autor']);
        $stmt->bindParam(':editorial', $_POST['editorial']);
        $stmt->bindParam(':ip_ult_mod', $_SERVER['REMOTE_ADDR']);
        $stmt->bindParam(':id', $_POST['id']);
        $stmt->execute();
    }
}

// Función para insertar un libro
function insertar() {
    global $conexion;

    $sql = "INSERT INTO libros (nombre, descripcion, autor, editorial, ip_alta) 
            VALUES (:nombre, :descripcion, :autor, :editorial, :ip_alta)";
    $stmt = $conexion->prepare($sql);
    
    $stmt->bindParam(':nombre', $_POST['nombre']);
    $stmt->bindParam(':descripcion', $_POST['descripcion']);
    $stmt->bindParam(':autor', $_POST['autor']);
    $stmt->bindParam(':editorial', $_POST['editorial']);
    $stmt->bindParam(':ip_alta', $_SERVER['REMOTE_ADDR']);
    
    $stmt->execute();
}

// Función para mostrar resultados de búsqueda
function resultados_busqueda() {
    global $conexion;

    $listado_libros = '
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Autor</th>
                <th scope="col">Editorial</th>
            </tr>
        </thead>
        <tbody>
    ';

    $limite = LIMITE_SCROLL;
    $pagina = $_GET['pagina'] ?? 0;
    $offset = $pagina * $limite;

    $sql = "SELECT * FROM libros LIMIT :limite OFFSET :offset";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':limite', $limite, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $listado_libros .= "
                <tr>
                    <th scope=\"row\">
                        <a href=\"/biblioteca_pdo.php?oper=update&id={$fila['id']}\" class=\"btn btn-primary\">Actualizar</a>
                        <a onclick=\"if(confirm('Cuidado, estás tratando de eliminar el libro: {$fila['nombre']}')) location.href = '/biblioteca_pdo.php?oper=delete&id={$fila['id']}';\" class=\"btn btn-danger\">Eliminar</a>
                    </th>
                    <td>{$fila['nombre']}</td>
                    <td>{$fila['descripcion']}</td>
                    <td>{$fila['autor']}</td>
                    <td>" . EDITORIALES[$fila['editorial']] . "</td>
                </tr>
            ";
        }
    } else {
        $listado_libros .= '<tr><td colspan="5">No hay resultados</td></tr>';
    }

    $pagina_anterior = $pagina ? '<li class="page-item"><a class="page-link" href="/biblioteca_pdo.php?pagina='. ($pagina - 1) .'">Anterior</a></li>' : '';

    $listado_libros .= '
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                '. $pagina_anterior .'
                <li class="page-item"><a class="page-link" href="/biblioteca_pdo.php?pagina='. ($pagina + 1) .'">Siguiente</a></li>
            </ul>
        </nav>

        <div class="alta">
            <a href="/biblioteca_pdo.php?oper=create" class="btn btn-success">Alta de libro</a>
        </div>
    ';

    return $listado_libros;
}

// Cerrar la conexión
$conexion = null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link type="text/css" href="/css/styles.css" rel="stylesheet" />
    <title>Biblioteca</title>
</head>
<body>
    <div class="container">
        <?php echo $html_salida;?>
    </div>
</body>
</html>
