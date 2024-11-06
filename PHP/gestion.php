<?php
    require_once "general.php";
    ob_start();
    $form = Form::getInstance();
    echo Plantilla::header();
    define('LIMITE_SCROLL', '5');
    $html_salida = '';
    $oper = $_REQUEST['oper'];
    $errores = [];

    switch($oper)
    {
        case 'create':
            inicializar();

            if (!empty($form->val['paso']))
            {
                $errores = $form->validar();
                if(!$form->cantidad_errores)
                {
                    insertar();
                    $form->activeDisable();
                }
            }
            $html_salida .= cabecera('alta');
            $html_salida .= formulario($oper,$errores);

        break;
        case 'update':
            inicializar();

            if (empty($form->val['paso']))
            {
                //Cargar los datos
                recuperar();
            }
            else
            {
                $errores = $form->validar();
                if(!$form->cantidad_errores)
                {
                    actualizar();
                    $form->activeDisable();
                }
            }
            $html_salida .= cabecera('actualizar');
            $html_salida .= formulario($oper,$errores);

        break;
        case 'delete':
            eliminar();
            ob_clean();
            header("location: /gestion.php");
            exit(0);
        break;
        default:
            $html_salida .= cabecera();
            $html_salida .= resultados_busqueda();
        break;
    }

    function inicializar()
    {
        $form = Form::getInstance();

        $form->accion('gestion.php');

        $paso        = new Hidden('paso'); 
        $paso->value = 1;

        $oper        = new Hidden('oper'); 
        $id          = new Hidden('id');        

        $nombre     = new Input   ('nombre'    ,['placeholder' => 'Nombre del libro...'     , 'validar' => True, 'ereg' => EREG_TEXTO_100_OBLIGATORIO  ]);
        $email      = new Textarea('email'     ,['placeholder' => 'Descripción del libro...', 'validar' => True ]);
        $edad       = new Input   ('edad'      ,['placeholder' => 'Autor del libro...'      , 'validar' => True, 'ereg' => EREG_TEXTO_150_OBLIGATORIO  ]);

        $form->cargar($paso);
        $form->cargar($oper);
        $form->cargar($id);

        $form->cargar($nombre);
        $form->cargar($email);
        $form->cargar($edad);
    }



    function cabecera($titulo_seccion='')
    {
        if(empty($titulo_seccion))
        {
            $breadcrumb = "<li class=\"breadcrumb-item\">gestion</li>";
        }
        else
        {
            $breadcrumb = "
                <li class=\"breadcrumb-item\"><a href=\"/gestion.php\">gestion</a></li>
                <li class=\"breadcrumb-item active\" aria-current=\"page\">{$titulo_seccion}</li>
            ";
        }
        return "
            <nav aria-label=\"breadcrumb\">
                <ol class=\"breadcrumb\">
                    <li class=\"breadcrumb-item\"><a href=\"/\">Zonzamas</a></li>
                    {$breadcrumb}
                </ol>
            </nav>
        ";
    }


    function formulario($oper,$errores = [])
    {
        $form = Form::getInstance();
        $id = $form->val['id'];
        $botones_extra = '';
        $mensaje_exito = False;

        if($form->val['paso'] && $form->cantidad_errores == 0)
        {
            $mensaje_exito = True;
            $botones_extra = '<a href="/gestion.php?oper=create" class="btn btn-primary">Nuevo Usuario</a>';

            if($oper == 'update')
                $botones_extra .= ' <a href="/gestion.php?oper=update&id='. $id .'" class="btn btn-primary">Editar</a>';
        }
        $html_formulario = $form->pintar(['botones_extra' => $botones_extra,'exito' =>  $mensaje_exito]);
        return $html_formulario;
    }

    function eliminar()
    {

        if (!empty($form->val['id']))
        {
            $sql = "
                DELETE FROM libros
                WHERE id = '{$form->val['id']}'
            ";
            $resultado = BBDD::query($sql);
        }
    }

    function recuperar()
    {
        $form = Form::getInstance();
        $id =  $form->val['id'];
        $sql = "
            SELECT * 
            FROM   libros
            WHERE  id = '{$id}'
        ";

        $resultado = BBDD::query($sql);
        $fila = $resultado->fetch_assoc();

        $form->elementos['nombre']->value        = $fila['nombre'];
        $form->elementos['email']->value         = $fila['email'];
        $form->elementos['edad']->value          = $fila['edad'];
    }

    function actualizar()
    {
        if (!empty($_POST['id']))
        {
            $sql = "
                UPDATE libros

                SET  nombre     = '{$form->val['nombre']}'
                    ,email      = '{$form->val['email']}'
                    ,edad       = '{$form->val['edad']}'

                    ,ip_ult_mod   = '{$_SERVER['REMOTE_ADDR']}'
                    ,fecha_ult_mod = CURRENT_TIMESTAMP

                WHERE id = '{$form->val['id']}'

            ";
            $resultado = BBDD::query($sql);
        }
    }


    function insertar()
    {
        $sql = "
            INSERT INTO libros
            (
                nombre
               ,email
               ,edad
               ,ip_alta
            )
            VALUES
            (   
                 '". $form->val['nombre'] ."'
                ,'". $form->val['email'] ."'
                ,'". $form->val['edad'] ."'

                ,'". $_SERVER['REMOTE_ADDR'] ."'
            );
        ";

        $resultado = BBDD::query($sql);
    }



    function resultados_busqueda()
    {
        $listado_libros = '
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Edad</th>
                </tr>
            </thead>
            <tbody>
        
        ';
        $limite = LIMITE_SCROLL;
        $pagina = $form->val['pagina'];
        $offset = $pagina * $limite;
        $sql = "SELECT * FROM libros LIMIT {$limite} OFFSET {$offset}";
        $resultado = BBDD::query($sql);

        if ($resultado->num_rows > 0) 
        {
            while ($fila = $resultado->fetch_assoc()) 
            {
                $listado_libros .= "
                    <tr>
                        <th scope=\"row\">
                            <a href=\"/gestion.php?oper=update&id={$fila['id']}\" class=\"btn btn-primary\">Actualizar</a>
                            <a onclick=\"if(confirm('Cuidado, estás tratando de eliminar el libro: {$fila['nombre']}')) location.href = '/gestion.php?oper=delete&id={$fila['id']}';\" class=\"btn btn-danger\">Eliminar</a>
                        </th>
                        <td>{$fila['nombre']}</td>
                        <td>{$fila['descripcion']}</td>
                        <td>{$fila['autor']}</td>
                        <td>". EDITORIALES[$fila['editorial']] ."</td>
                    </tr>
                ";
            }
        } 
        else 
        {
            $listado_libros = '<tr><td colspan="5">No hay resultados</td></tr>';
        }
        if($pagina)
            $pagina_anterior = '<li class="page-item"><a class="page-link" href="/gestion.php?pagina='. ($pagina - 1) .'"">Anterior</a></li>';

        $listado_libros .= '
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    '. $pagina_anterior .'
                    <li class="page-item"><a class="page-link" href="/gestion.php?pagina='. ($pagina + 1) .'">Siguiente</a></li>
                </ul>
            </nav>
            <div class="alta">
                <a href="/gestion.php?oper=create" class="btn btn-success">Alta de libro</a>
            </div>
        ';

        return $listado_libros;
    }
?>

    <div class="container">

    <?php echo $html_salida; ?>

    </div>
    <br />
<?php
    echo Plantilla::footer();
?>