$(document).ready(() => {
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
        const products = JSON.parse(response)
        let productsHtml = ""
        products.forEach((product) => {
          productsHtml += `
                        <div class="product-card">
                            <img src="${product.imagen}" alt="${product.nombre}">
                            <h3>${product.nombre}</h3>
                            <p>${product.descripcion}</p>
                            <p>Precio: ${product.precio}€</p>
                            <p>Categoría: ${product.categoria}</p>
                            <p>Disponibilidad: ${product.disponibilidad}</p>
                            <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                        </div>
                    `
        })
        $("#productos-lista").html(productsHtml)
      },
      error: () => {
        $("#productos-lista").html("<p>Error al cargar los productos.</p>")
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

  // Manejo de clic en "Añadir al carrito"
  $(document).on("click", ".add-to-cart", function () {
    const productId = $(this).data("id")
    // Aquí iría la lógica para añadir el producto al carrito
    console.log("Producto añadido al carrito. ID: " + productId)
  })

  // Cambio de idioma
  $("#idioma").change(function () {
    const lang = $(this).val()
    // Aquí iría la lógica para cambiar el idioma
    console.log("Cambiando idioma a: " + lang)
  })

  // Finalizar compra
  $("#finalizar-compra").click(() => {
    // Aquí iría la lógica para finalizar la compra
    console.log("Finalizando compra")
  })
})

