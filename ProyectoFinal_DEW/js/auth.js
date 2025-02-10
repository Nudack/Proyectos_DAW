const $ = JQuery

$(document).ready(() => {
    // Manejo del formulario de inicio de sesión
    $("#login-form").submit(function (e) {
      e.preventDefault()
      const formData = $(this).serialize()
      $.ajax({
        url: "../server.php",
        method: "POST",
        data: formData + "&action=login",
        success: (response) => {
          const result = JSON.parse(response)
          if (result.success) {
            alert("Inicio de sesión exitoso")
            window.location.href = "../index.html"
          } else {
            alert("Error en el inicio de sesión: " + result.message)
          }
        },
      })
    })
  
    // Manejo del formulario de registro
    $("#registro-form").submit(function (e) {
      e.preventDefault()
      const formData = $(this).serialize()
      $.ajax({
        url: "../server.php",
        method: "POST",
        data: formData + "&action=register",
        success: (response) => {
          const result = JSON.parse(response)
          if (result.success) {
            alert("Registro exitoso")
            window.location.href = "login.html"
          } else {
            alert("Error en el registro: " + result.message)
          }
        },
      })
    })
  
    // Validación del formulario con expresiones regulares
    const validations = {
      id: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i,
      nombre: /^[a-zA-Z\s]{2,30}$/,
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "cuenta-bancaria": /^[0-9]{20}$/,
      telefono: /^[0-9]{9}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Al menos 8 caracteres, una letra y un número
    }
  
    $("#registro-form input").on("input", function () {
      const field = $(this).attr("id")
      const value = $(this).val()
      if (validations[field] && validations[field].test(value)) {
        $(this).css("border-color", "green")
      } else {
        $(this).css("border-color", "red")
      }
    })
  })
  
  

