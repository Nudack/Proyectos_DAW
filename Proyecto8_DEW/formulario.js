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
        regex: /^[6798][0-9]{8}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un número de teléfono móvil español válido.(Que empiece con 6 o 7)"
    },
    iban: {
        regex: /^[A-Z]{2}[0-9]{22}$/,
        test: function(valor) {
            return this.regex.test(valor);
        },
        mensaje: "Introduce un IBAN español válido.(Dos letras iniciales y 22 digitos.)"
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
    },
    repeatPassword: {

        test: function(valor) {
            const password = document.getElementById("password").value
            return valor === password
        },
        mensaje: "Las contraseñas deben ser iguales"
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
        if(errorElement) {
            errorElement.textContent = "";
        }
        return true;
    } else {
        campo.classList.remove('valid');
        campo.classList.add('invalid');
        if(errorElement) {
            errorElement.textContent = validacion ? validacion.mensaje : "Campo inválido";
        }
        return false;
    }
}

// Función para validar todos los campos
function validarFormulario() {
    let esValido = true;
    for (const campo in validaciones) {
        const valor = document.getElementById(campo).value
        if(!validaciones[campo].test(valor)){
            esValido = false;
            alert(validaciones[campo].mensaje);
            break;
        }
    }
    return esValido;
}

// Función para obtener los datos del formulario como un objeto
function getFormData() {
    const formData = {};
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        if (campo.id !== 'repeatPassword') {
            formData[campo.id] = campo.value;
        }
    });
    return formData;
}

// Función para establecer los datos del formulario desde un objeto
function setFormData(data) {
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        if (campo.id !== 'repeatPassword' && data[campo.id]) {
            campo.value = data[campo.id];
            validarCampo(campo);
        }
    });
}

// Función para limpiar los datos del formulario
function clearFormData() {
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        campo.value = '';
        campo.classList.remove('valid', 'invalid');
        const errorElement = document.getElementById(`${campo.id}Error`);
        if(errorElement) {
            errorElement.textContent = "";
        }
    });
}


// Función para obtener datos desde un archivo JSON
async function getJson() {
    try {
        const response = await fetch('datos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormData(data);
    } catch (error) {
        console.error('Error al obtener datos JSON:', error);
        alert('Error al obtener datos JSON');
    }
}

// Función para publicar datos en PHP
async function postPhp() {
    if (validarFormulario()) {
        const formData = new FormData();
        Object.entries(getFormData()).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch('post_php.php', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            alert(result.message);
            clearFormData();
        } catch (error) {
            console.error('Error al publicar datos en PHP:', error);
            alert('Error al publicar datos en PHP');
        }
    } else {
        alert('Por favor, corrige los errores en el formulario antes de enviar');
    }
}

// Función para obtener datos desde PHP
async function getPhp() {
    try {
        const response = await fetch('post_php.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormData(data);
    } catch (error) {
        console.error('Error al obtener datos de PHP:', error);
        alert('Error al obtener datos de PHP');
    }
}

// Función para publicar datos en la base de datos
async function postDb() {
    if (validarFormulario()) {
        const formData = new FormData();
        Object.entries(getFormData()).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch('post_db.php', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.error) {
                throw new Error(result.error)
            }
            alert(result.message);
            clearFormData();
        } catch (error) {
            console.error('Error al publicar datos en la base de datos:', error);
            alert('Error al publicar datos en la base de datos: ' + error.message);
        }
    } else {
        alert('Por favor, corrige los errores en el formulario antes de enviar');
    }
}

// Función para obtener datos desde la base de datos
async function getDb() {
    const dni = document.getElementById('dniDB').value;
    if (!dni) {
        alert('Por favor, ingrese un DNI para buscar');
        return;
    }

    try {
        const response = await fetch(`get_db.php?dni=${encodeURIComponent(dni)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            setFormData(data);
        }
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        alert('Error al obtener datos de la base de datos');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        campo.addEventListener('blur', () => validarCampo(campo));
    });
    
    document.getElementById('getJsonBtn').addEventListener('click', getJson);
    document.getElementById('postPhpBtn').addEventListener('click', postPhp);
    document.getElementById('getPhpBtn').addEventListener('click', getPhp);
    document.getElementById('postDbBtn').addEventListener('click', postDb);
    document.getElementById('getDbBtn').addEventListener('click', getDb);
});