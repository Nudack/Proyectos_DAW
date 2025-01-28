$(document).ready(() => {
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
                const password = $("password").value
                return valor === password
            },
            mensaje: "Las contraseñas deben ser iguales"
        }
    }
  
    function validarCampo($campo) {
      const valor = $campo.val()
      const id = $campo.attr("id")
      const validacion = validaciones[id]
      const $errorElement = $(`#${id}Error`)
  
      if (validacion && validacion.test(valor)) {
        $campo.removeClass("invalid").addClass("valid")
        $errorElement.text("").slideUp()
        return true
      } else {
        $campo.removeClass("valid").addClass("invalid")
        $errorElement.text(validacion ? validacion.mensaje : "Campo inválido").slideDown()
        return false
      }
    }
  
    function validarFormulario() {
      let esValido = true
      $("input").each(function () {
        if (!validarCampo($(this))) {
          esValido = false
          return false // break the loop
        }
      })
      return esValido
    }
  
    function getFormData() {
      const formData = {}
      $("input")
        .not("#repeatPassword")
        .each(function () {
          formData[$(this).attr("id")] = $(this).val()
        })
      return formData
    }
  
    function setFormData(data) {
      $("input").each(function () {
        const $campo = $(this)
        const id = $campo.attr("id")
        if (id !== "repeatPassword" && data[id]) {
          $campo.val(data[id])
          validarCampo($campo)
        }
      })
    }
  
    function clearFormData() {
      $("input").val("").removeClass("valid invalid")
      $(".error-message").text("").hide()
    }
  
    async function getJson() {
      try {
        const data = await $.getJSON("datos.json")
        setFormData(data)
      } catch (error) {
        console.error("Error al obtener datos JSON:", error)
        alert("Error al obtener datos JSON")
      }
    }
  
    async function postPhp() {
      if (validarFormulario()) {
        try {
          const result = await $.ajax({
            url: "post_php.php",
            method: "POST",
            data: getFormData(),
          })
          alert(result.message)
          clearFormData()
        } catch (error) {
          console.error("Error al publicar datos en PHP:", error)
          alert("Error al publicar datos en PHP")
        }
      } else {
        alert("Por favor, corrige los errores en el formulario antes de enviar")
      }
    }
  
    async function getPhp() {
      try {
        const data = await $.getJSON("post_php.php")
        setFormData(data)
      } catch (error) {
        console.error("Error al obtener datos de PHP:", error)
        alert("Error al obtener datos de PHP")
      }
    }
  
    async function postDb() {
      if (validarFormulario()) {
        try {
          const result = await $.ajax({
            url: "post_db.php",
            method: "POST",
            data: getFormData(),
          })
          if (result.error) {
            throw new Error(result.error)
          }
          alert(result.message)
          clearFormData()
        } catch (error) {
          console.error("Error al publicar datos en la base de datos:", error)
          alert("Error al publicar datos en la base de datos: " + error.message)
        }
      } else {
        alert("Por favor, corrige los errores en el formulario antes de enviar")
      }
    }
  
    async function getDb() {
      const dni = $("#dniDB").val()
      if (!dni) {
        alert("Por favor, ingrese un DNI para buscar")
        return
      }
  
      try {
        const data = await $.getJSON(`get_db.php?dni=${encodeURIComponent(dni)}`)
        if (data.error) {
          alert(data.error)
        } else {
          setFormData(data)
        }
      } catch (error) {
        console.error("Error al obtener datos de la base de datos:", error)
        alert("Error al obtener datos de la base de datos")
      }
    }
  
    $("input").on("blur", function () {
      validarCampo($(this))
    })
  
    $("#getJsonBtn").on("click", getJson)
    $("#postPhpBtn").on("click", postPhp)
    $("#getPhpBtn").on("click", getPhp)
    $("#postDbBtn").on("click", postDb)
    $("#getDbBtn").on("click", getDb)
  
    // Add some jQuery effects
    $("button").hover(
      function () {
        $(this).animate({ opacity: 0.8 }, 200)
      },
      function () {
        $(this).animate({ opacity: 1 }, 200)
      },
    )
  
    $(".form-group")
      .hide()
      .each(function (index) {
        $(this)
          .delay(100 * index)
          .fadeIn(500)
      })
  })
  
  