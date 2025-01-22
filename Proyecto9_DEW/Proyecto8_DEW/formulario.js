$(document).ready(function() {
    // Objeto con expresiones regulares y métodos de validación
    const validaciones = {
        nombre: {
            regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
            mensaje: "El nombre debe comenzar con mayúscula y contener solo letras."
        },
        apellidos: {
            regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/,
            mensaje: "Los apellidos deben ser dos, separados por un espacio y cada uno comenzando con mayúscula."
        },
        dni: {
            regex: /^(?:(?:[XYZ][0-9]{7}[A-Z])|(?:[0-9]{8}[A-Z]))$/,
            mensaje: "El DNI/NIE debe tener 8 números seguidos de una letra válida."
        },
        fechaNacimiento: {
            regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-2][0-4])$/,
            mensaje: "La fecha debe estar en formato DD/MM/AAAA."
        },
        codigoPostal: {
            regex: /^[0-4][0-9]{4}|5[0-2][0-9]{3}$/,
            mensaje: "El código postal debe ser un número de 5 dígitos válido en España."
        },
        email: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            mensaje: "Introduce un email válido."
        },
        telefonoFijo: {
            regex: /^9[0-9]{8}|8[0-9]{8}$/,
            mensaje: "Introduce un número de teléfono fijo español válido.(Que empiece con 8 o 9)"
        },
        telefonoMovil: {
            regex: /^[6798][0-9]{8}$/,
            mensaje: "Introduce un número de teléfono móvil español válido.(Que empiece con 6 o 7)"
        },
        iban: {
            regex: /^[A-Z]{2}[0-9]{22}$/,
            mensaje: "Introduce un IBAN español válido.(Dos letras iniciales y 22 digitos.)"
        },
        tarjetaCredito: {
            regex: /^([0-9]{4}[- ]?){3}[0-9]{4}$/,
            mensaje: "Introduce un número de tarjeta de crédito válido.(Cuatro grupos de 4 dígitos separados por espacios o guiones opcionales.)"
        },
        password: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{12,}$/,
            mensaje: "La contraseña debe tener al menos 12 caracteres, una minúscula, una mayúscula, un número y un carácter especial."
        }
    };

    // Función para validar un campo
    function validarCampo($campo) {
        const valor = $campo.val();
        const id = $campo.attr('id');
        const validacion = validaciones[id];
        const $errorElement = $(`#${id}Error`);

        if (validacion && validacion.regex.test(valor)) {
            $campo.removeClass('invalid').addClass('valid');
            $errorElement.text('').hide();
            return true;
        } else {
            $campo.removeClass('valid').addClass('invalid');
            $errorElement.text(validacion ? validacion.mensaje : 'Campo inválido').show();
            return false;
        }
    }

    // Función para validar todos los campos
    function validarFormulario() {
        let esValido = true;
        $('input').each(function() {
            if ($(this).attr('id') !== 'repeatPassword' && !validarCampo($(this))) {
                esValido = false;
            }
        });

        // Validar que las contraseñas coincidan
        const $password = $('#password');
        const $repeatPassword = $('#repeatPassword');
        const $repeatPasswordError = $('#repeatPasswordError');

        if ($password.val() !== $repeatPassword.val()) {
            $repeatPassword.removeClass('valid').addClass('invalid');
            $repeatPasswordError.text('Las contraseñas no coinciden').show();
            esValido = false;
        } else {
            $repeatPassword.removeClass('invalid').addClass('valid');
            $repeatPasswordError.text('').hide();
        }

        return esValido;
    }

    // Función para obtener los datos del formulario como un objeto
    function getFormData() {
        const formData = {};
        $('input').each(function() {
            if ($(this).attr('id') !== 'repeatPassword') {
                formData[$(this).attr('id')] = $(this).val();
            }
        });
        return formData;
    }

    // Función para establecer los datos del formulario desde un objeto
    function setFormData(data) {
        $.each(data, function(key, value) {
            $(`#${key}`).val(value).trigger('blur');
        });
    }

    // Función para limpiar los datos del formulario
    function clearFormData() {
        $('input').val('').removeClass('valid invalid');
        $('.error-message').text('').hide();
    }

    // Función para obtener datos desde un archivo JSON
    function getJson() {
        $.getJSON('datos.json')
            .done(function(data) {
                setFormData(data);
            })
            .fail(function(jqxhr, textStatus, error) {
                console.error('Error al obtener datos JSON:', error);
                alert('Error al obtener datos JSON');
            });
    }

    // Función para publicar datos en PHP
    function postPhp() {
        if (validarFormulario()) {
            $.ajax({
                url: 'post_php.php',
                method: 'POST',
                data: getFormData(),
                dataType: 'json'
            })
            .done(function(result) {
                alert(result.message);
                clearFormData();
            })
            .fail(function(jqxhr, textStatus, error) {
                console.error('Error al publicar datos en PHP:', error);
                alert('Error al publicar datos en PHP');
            });
        } else {
            alert('Por favor, corrige los errores en el formulario antes de enviar');
        }
    }

    // Función para obtener datos desde PHP
    function getPhp() {
        $.ajax({
            url: 'post_php.php',
            method: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            setFormData(data);
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error('Error al obtener datos de PHP:', error);
            alert('Error al obtener datos de PHP');
        });
    }

    // Función para publicar datos en la base de datos
    function postDb() {
        if (validarFormulario()) {
            $.ajax({
                url: 'post_db.php',
                method: 'POST',
                data: getFormData(),
                dataType: 'json'
            })
            .done(function(result) {
                alert(result.message);
                clearFormData();
            })
            .fail(function(jqxhr, textStatus, error) {
                console.error('Error al publicar datos en la base de datos:', error);
                alert('Error al publicar datos en la base de datos');
            });
        } else {
            alert('Por favor, corrige los errores en el formulario antes de enviar');
        }
    }

    // Función para obtener datos desde la base de datos
    function getDb() {
        const dni = $('#dniDB').val();
        if (!dni) {
            alert('Por favor, ingrese un DNI para buscar');
            return;
        }

        $.ajax({
            url: 'get_db.php',
            method: 'GET',
            data: { dni: dni },
            dataType: 'json'
        })
        .done(function(data) {
            if (data.error) {
                alert(data.error);
            } else {
                setFormData(data);
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error('Error al obtener datos de la base de datos:', error);
            alert('Error al obtener datos de la base de datos');
        });
    }

    // Event listeners
    $('input').on('blur', function() {
        validarCampo($(this));
    });
    
    $('#getJsonBtn').on('click', getJson);
    $('#postPhpBtn').on('click', postPhp);
    $('#getPhpBtn').on('click', getPhp);
    $('#postDbBtn').on('click', postDb);
    $('#getDbBtn').on('click', getDb);

    // Efectos y animaciones
    $('input').on('focus', function() {
        $(this).animate({ backgroundColor: "#f0f0f0" }, 200);
    }).on('blur', function() {
        $(this).animate({ backgroundColor: "#ffffff" }, 200);
    });

    $('.button-group button').hover(
        function() { $(this).fadeOut(100).fadeIn(100); },
        function() { $(this).stop(true, true).fadeIn(100); }
    );

    $('form').on('submit', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            $(this).effect("shake", { times: 2, distance: 5}, 500);
            alert("Formulario enviado con éxito!");
        } else {
            $(this).effect("shake", { times: 3, distance: 10}, 500);
        }
    });
});