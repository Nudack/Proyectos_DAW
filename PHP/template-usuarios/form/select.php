<?php

    class Select extends Elemento
    {


        public function __construct($nombre,$opciones,$opt=[])
        {
            parent::__construct($nombre,$opt);

            $this->options = $opciones;

        }

        public function pintar()
        {
            $this->previo_pintar();


            $html_options = '';
            foreach ($this->options as $code => $valor)
            {
                $html_options .= "<option value=\"{$code}\">{$valor}</option>";
            }


            return "
                <label class=\"". $this->error['class_error'] ." form-label\" for=\"{$this->nombre}\">{$this->lit[$this->nombre]}:</label>
                <select {$this->pre_disabled}  class=\"form-control form-select\"  id=\"id{$this->nombre}\" name=\"{$this->nombre}\"> 
                    {$html_options}
                </select>
                <br />
            ";
        }


    }