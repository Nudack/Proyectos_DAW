<?php

    class Literal
    {
        //instancia única
        private static $instance;


        public function __construct($idioma='ES')
        {

            switch($idioma)
            {
                case 'ES':
                    $this->lit = [
                        'id'        => 'id'
                       ,'nombre' => 'nombre'
                       ,'email'       => 'email'
                       ,'edad'   => 'edad'   
                    ];
                break;
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
    }