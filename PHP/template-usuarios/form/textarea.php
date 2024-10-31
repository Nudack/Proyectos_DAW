<?php



    class Textarea extends Elemento
    {

        public function pintar()
        {
            $this->previo_pintar();
            return "
                <label class=\"". $this->error['class_error'] ." form-label\" for=\"{$this->nombre}\">{$this->lit[$this->nombre]}:</label>
                <textarea {$this->prev_disabled} class=\"form-control\" id=\"id{$this->nombre}\" name=\"{$this->nombre}\" {$this->prev_placeholder}>{$this->value}</textarea>
                ". $this->error['desc_error'] ."
                <br />
            ";
        }


    }