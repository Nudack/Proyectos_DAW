// Objeto con expresiones regulares y métodos de validación
const validaciones = {
    nombre: {
        regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "El nombre debe comenzar con mayúscula y contener solo letras."
    },
    apellidos: {
        regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Los apellidos deben ser dos, separados por un espacio y cada uno comenzando con mayúscula."
    },
    dni: {
        regex: /^(?:(?:[XYZ][0-9]{7}[A-Z])|(?:[0-9]{8}[A-Z]))$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "El DNI/NIE debe tener 8 números seguidos de una letra válida."
    },
    fechaNacimiento: {
        regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-2][0-4])$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "La fecha debe estar en formato DD/MM/AAAA."
    },
    codigoPostal: {
        regex: /^[0-4][0-9]{4}|5[0-2][0-9]{3}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "El código postal debe ser un número de 5 dígitos válido en España."
    },
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un email válido."
    },
    telefonoFijo: {
        regex: /^9[0-9]{8}|8[0-9]{8}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un número de teléfono fijo español válido.(Que empiece con 8 o 9)"
    },
    telefonoMovil: {
        regex: /^[67][0-9]{8}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un número de teléfono móvil español válido.(Que empiece con 6 o 7)"
    },
    iban: {
        regex: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un IBAN español válido.(Dos letras iniciales, dos dígitos y entre 1 y 30 caracteres alfanuméricos.)"
    },
    tarjetaCredito: {
        regex: /^([0-9]{4}[- ]?){3}[0-9]{4}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un número de tarjeta de crédito válido.(Cuatro grupos de 4 dígitos separados por espacios o guiones opcionales.)"
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{12,}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "La contraseña debe tener al menos 12 caracteres, una minúscula, una mayúscula, un número y un carácter especial."
    }
};

// Objeto para almacenar los datos del formulario
let datosFormulario = {};

// Función para validar un campo
function validarCampo(campo) {
    const valor = campo.value;
    const id = campo.id;
    const validacion = validaciones[id];
    const errorElement = document.getElementById(`${id}Error`);

    if (validacion && validacion.test(valor)) {
        campo.classList.remove('invalid');
        campo.classList.add('valid');
        errorElement.textContent = '';
        return true;
    } else {
        campo.classList.remove('valid');
        campo.classList.add('invalid');
        errorElement.textContent = validacion ? validacion.mensaje : 'Campo inválido';
        return false;
    }
}

// Función para validar todos los campos
function validarFormulario() {
    let esValido = true;
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        if (campo.id !== 'repeatPassword') {
            if (!validarCampo(campo)) {
                esValido = false;
            }
        }
    });

    // Validar que las contraseñas coincidan
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');
    const repeatPasswordError = document.getElementById('repeatPasswordError');

    if (password.value !== repeatPassword.value) {
        repeatPassword.classList.remove('valid');
        repeatPassword.classList.add('invalid');
        repeatPasswordError.textContent = 'Las contraseñas no coinciden';
        esValido = false;
    } else {
        repeatPassword.classList.remove('invalid');
        repeatPassword.classList.add('valid');
        repeatPasswordError.textContent = '';
    }

    return esValido;
}

// Función para guardar los datos
function guardarDatos() {
    if (validarFormulario()) {
        const campos = document.querySelectorAll('input');
        campos.forEach(campo => {
            if (campo.id !== 'repeatPassword') {
                datosFormulario[campo.id] = campo.value;
            }
        });
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
        alert('Datos guardados correctamente');
    } else {
        alert('Por favor, corrige los errores en el formulario antes de guardar');
    }
}

// Función para recuperar los datos
function recuperarDatos() {
    try {
        const datosGuardados = localStorage.getItem('datosFormulario');
        if (datosGuardados) {
            datosFormulario = JSON.parse(datosGuardados);
            const campos = document.querySelectorAll('input');
            campos.forEach(campo => {
                if (campo.id !== 'repeatPassword' && datosFormulario[campo.id]) {
                    campo.value = datosFormulario[campo.id];
                    validarCampo(campo);
                }
            });
            alert('Datos recuperados correctamente');
        } else {
            alert('No hay datos guardados para recuperar');
        }
    } catch (error) {
        console.error('Error al recuperar los datos:', error);
        alert('Hubo un error al recuperar los datos');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        campo.addEventListener('blur', () => validarCampo(campo));
    });

    document.getElementById('guardarBtn').addEventListener('click', guardarDatos);
    document.getElementById('recuperarBtn').addEventListener('click', recuperarDatos);
});

