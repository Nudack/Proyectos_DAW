<?php
    class Form
    {
        //instancia única
        private static $instance;
        public $elementos = [];
        public $cantidad_errores;
        public $disabled;

        function __construct()
        {
            $this->val = Campo::getInstance()->val;

            $this->cantidad_errores = 0;

            $this->disabled = False;
        }

        public function accion($ruta)
        {
            $this->accion = $ruta;
        }

        public function cargar($elemento)
        {
            $this->elementos[$elemento->nombre] = $elemento;
        }

        public function activeDisable()
        {
            $this->disabled = True;
            foreach($this->elementos as $ind => $elemento)
            {
                $elemento->disabled = True;
            }
        }

        static public function getInstance()
        {

            if (empty(self::$instance))
            {
                self::$instance = new self();
            }

            return self::$instance;
        }

        public function validar()
        {
            $this->errores = [];

            foreach($this->elementos as $ind => $elemento)
            {
                $this->errores[$elemento->nombre] = $elemento->validar();

                if($this->errores[$elemento->nombre]['error'])
                    $this->cantidad_errores++;

            }

            return $this->errores;
        }

        public function pintar($opt=[])
        {
            $botones_extra = $opt['botones_extra'];
            $disabled      = $this->disabled ? ' disabled="disabled" ' : '';


            $mensaje_exito = $opt['exito']? '<div class="exito">Operación realizada con éxito</div>' : '';

            $texto_enviar = Literal::getInstance()->lit['enviar'];

            $html_elementos = '';
            foreach($this->elementos as $ind => $elemento)
            {
                $html_elementos .= $elemento->pintar();
            }

            return "
                <form method=\"POST\" action=\"{$this->accion}\">
                    {$mensaje_exito}
                    {$html_elementos}
                    
                    <div style=\"text-align:right\">
                        {$botones_extra}
                        <input {$disabled} type=\"submit\" class=\"btn btn-primary\" value=\"{$texto_enviar}\" />
                    </div>
                </form>
            ";
        }
    }