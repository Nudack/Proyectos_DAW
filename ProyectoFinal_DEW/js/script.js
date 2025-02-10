// Declare jQuery variable if not already included globally
const $ = jQuery || window.$

// Asegúrate de que jQuery esté disponible antes de usarlo
if (typeof jQuery === "undefined") {
  console.error("jQuery no está cargado. Verifica la inclusión de la biblioteca.")
}
// Usa jQuery de manera segura
;(($) => {
  if (typeof $ === "undefined") {
    console.error("jQuery no está disponible en este contexto.")
    return
  }

  let cart = []
  let currentLanguage = "es"
  let translationsLoaded = false
  let translationQueue = []

  $(document).ready(() => {
    loadTranslations()
    updateCartDisplay()

    // Función para cargar productos
    function loadProducts(category = null) {
      $.ajax({
        url: "server.php",
        method: "GET",
        data: {
          action: "getProducts",
          category: category,
        },
        success: (response) => {
          console.log("Respuesta del servidor:", response)
          const products = JSON.parse(response)
          let productsHtml = ""
          products.forEach((product) => {
            productsHtml += `
              <div class="product-card">
                <img src="imagenes/${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p class="price">${translate("price")}: ${product.precio}€</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precio}">${translate("addToCart")}</button>
              </div>
            `
          })
          $("#productos-lista").html(productsHtml)
        },
        error: (xhr, status, error) => {
          console.error("Error al cargar productos:", error)
          $("#productos-lista").html(`<p>${translate("errorLoadingProducts")}</p>`)
        },
      })
    }

    // Función para cargar productos destacados en el carrusel
    function loadFeaturedProducts() {
      $.ajax({
        url: "server.php",
        method: "GET",
        data: {
          action: "getFeaturedProducts",
        },
        success: (response) => {
          const products = JSON.parse(response)
          let productsHtml = ""
          products.forEach((product) => {
            productsHtml += `
              <div class="product-card">
                <img src="imagenes/${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${translate("price")}: ${product.precio}€</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precio}">${translate("addToCart")}</button>
              </div>
            `
          })
          $(".carousel").html(productsHtml)

          // Inicializar el carrusel
          $(".carousel").slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ],
          })
        },
        error: () => {
          $(".carousel").html(`<p>${translate("errorLoadingProducts")}</p>`)
        },
      })
    }

    // Cargar productos en la página de categoría
    if (window.location.pathname.includes("categoria.html")) {
      loadProducts()

      // Manejo de clics en categorías de productos
      $("#categorias button").click(function () {
        const category = $(this).data("category")
        $("#categoria-titulo").text(category)
        loadProducts(category)
      })
    }

    // En la función document ready, añade esta línea para cargar los productos destacados en la página principal
    if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
      loadFeaturedProducts()
    }

    // Manejo de clic en "Añadir al carrito"
    $(document).on("click", ".add-to-cart", function () {
      const productId = $(this).data("id")
      const productName = $(this).data("name")
      const productPrice = $(this).data("price")
      addToCart(productId, productName, productPrice)
    })

    // Cambio de idioma
    $("#idioma").change(function () {
      currentLanguage = $(this).val()
      console.log("Idioma cambiado a:", currentLanguage)
      loadTranslations()
      updateCartDisplay()
      // Actualizar solo los textos traducibles
      $("[data-translate]").each(function () {
        const key = $(this).data("translate")
        const translatedText = translate(key)
        console.log(`Traduciendo "${key}" a "${translatedText}"`)
        $(this).text(translatedText)
      })
      // Recargar los productos destacados para actualizar los botones
      if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
        loadFeaturedProducts()
      }
    })

    // Finalizar compra
    $("#finalizar-compra").click(() => {
      $.ajax({
        url: "server.php",
        method: "POST",
        data: {
          action: "finalizePurchase",
          cart: JSON.stringify(cart),
        },
        success: (response) => {
          const result = JSON.parse(response)
          if (result.success) {
            alert(translate("purchaseSuccess"))
            cart = []
            updateCartDisplay()
          } else {
            alert(translate("purchaseError") + ": " + result.message)
          }
        },
        error: () => {
          alert(translate("purchaseError"))
        },
      })
    })
  })

  // Funciones fuera del document.ready
  function addToCart(id, name, price) {
    const existingItem = cart.find((item) => item.id === id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.push({ id, name, price, quantity: 1 })
    }
    updateCartDisplay()
  }

  function updateCartDisplay() {
    if (!translationsLoaded) {
      translationQueue.push(updateCartDisplay)
      return
    }

    let cartHtml = `<h2>${translate("yourCart")}</h2>`
    let total = 0
    cart.forEach((item) => {
      cartHtml += `
        <div class="cart-item">
          <span>${item.name} x ${item.quantity}</span>
          <span>${item.price * item.quantity}€</span>
          <button class="remove-from-cart" data-id="${item.id}">${translate("remove")}</button>
        </div>
      `
      total += item.price * item.quantity
    })
    cartHtml += `<div class="cart-total">${translate("total")}: ${total}€</div>`
    $("#carrito-contenido").html(cartHtml)
  }

  function loadTranslations() {
    $.getJSON(`translations_${currentLanguage}.json`, (data) => {
      console.log("Traducciones cargadas:", data)
      window.translations = data
      translationsLoaded = true
      translationQueue.forEach((fn) => fn())
      translationQueue = []
    }).fail((jqxhr, textStatus, error) => {
      console.error("Error al cargar traducciones:", error)
      translationsLoaded = true // Set to true even on error to prevent infinite loop
      translationQueue.forEach((fn) => fn())
      translationQueue = []
    })
  }

  function translate(key) {
    if (!translationsLoaded) {
      return key // Return the key itself if translations are not loaded yet
    }
    const translation = window.translations[key] || key
    console.log(`Traducción de "${key}": "${translation}"`)
    return translation
  }

  // Evento para remover items del carrito
  $(document).on("click", ".remove-from-cart", function () {
    const id = $(this).data("id")
    cart = cart.filter((item) => item.id !== id)
    updateCartDisplay()
  })
})(jQuery)
