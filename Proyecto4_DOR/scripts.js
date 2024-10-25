// Textos en español
const texts_es = {
    title: "Encuentra las Mejores Ofertas de Viajes",
    subtitle: "Compara precios de hoteles, vuelos y paquetes turísticos en segundos",
    "menu-inicio": "Inicio",
    "menu-hoteles": "Hoteles",
    "menu-vuelos": "Vuelos",
    "menu-paquetes": "Paquetes",
    "menu-contacto": "Contacto",
    "inicio-title": "Bienvenido a Tu Página de Viajes",
    "inicio-description": "Explora nuestras mejores ofertas en hoteles, vuelos y paquetes vacacionales. Tu aventura comienza aquí.",
    "hoteles-title": "Hoteles",
    "hotel-1-name": "Hotel Playa Paraíso",
    "hotel-1-location": "Ubicación: Cancún, México",
    "hotel-1-price": "Precio desde: $120 por noche",
    "hotel-2-name": "Hotel Costa Azul",
    "hotel-2-location": "Ubicación: Barcelona, España",
    "hotel-2-price": "Precio desde: €150 por noche",
    "vuelos-title": "Vuelos",
    "vuelo-1-name": "Vuelo Económico a Nueva York",
    "vuelo-1-price": "Desde: $300 (ida y vuelta)",
    "vuelo-2-name": "Vuelo a París en Clase Ejecutiva",
    "vuelo-2-price": "Desde: €1200 (ida y vuelta)",
    "paquetes-title": "Paquetes Especiales",
    "paquete-1-name": "Paquete de Luna de Miel",
    "paquete-1-info": "5 noches en habitación con vista al mar, cena romántica y spa incluido.",
    "paquete-1-precio": "Precio: €1,200",
    "paquete-2-name": "Paquete Aventura",
    "paquete-2-info": "Un día de kayak + snorkeling + almuerzo en la playa.",
    "paquete-2-precio": "Precio: €300",
    "contacto-title": "Contacto",
    "contact-address": "Dirección: Avenida de los Viajes, 123, Ciudad del Turismo, País de Aventuras",
    "contact-phone": "Teléfono: +123 456 7890",
    "contact-email": "Correo: contacto@paginadeviajes.com",
    "map-title": "Ubicación:",
    "footer-text": "© 2024 Tu Página de Viajes. Todos los derechos reservados."
};

// Textos en inglés
const texts_en = {
    title: "Find the Best Travel Deals",
    subtitle: "Compare hotel, flight, and vacation package prices in seconds",
    "menu-inicio": "Home",
    "menu-hoteles": "Hotels",
    "menu-vuelos": "Flights",
    "menu-paquetes": "Packages",
    "menu-contacto": "Contact",
    "inicio-title": "Welcome to Your Travel Page",
    "inicio-description": "Explore our best offers on hotels, flights, and vacation packages. Your adventure starts here.",
    "hoteles-title": "Hotels",
    "hotel-1-name": "Playa Paraíso Hotel",
    "hotel-1-location": "Location: Cancun, Mexico",
    "hotel-1-price": "From: $120 per night",
    "hotel-2-name": "Costa Azul Hotel",
    "hotel-2-location": "Location: Barcelona, Spain",
    "hotel-2-price": "From: €150 per night",
    "vuelos-title": "Flights",
    "vuelo-1-name": "Economy Flight to New York",
    "vuelo-1-price": "From: $300 (round trip)",
    "vuelo-2-name": "Business Class Flight to Paris",
    "vuelo-2-price": "From: €1200 (round trip)",
    "paquetes-title": "Paquetes Especiales",
    "paquete-1-name": "Honeymoon Package",
    "paquete-1-info": "5 nights in a sea view room, romantic dinner, and spa included.",
    "paquete-1-precio": "Price: €1,200",
    "paquete-2-name": "Adventure Package",
    "paquete-2-info": "A day of kayaking + snorkeling + lunch on the beach.",
    "paquete-2-precio": "Price: €300",
    "contacto-title": "Contact",
    "contact-address": "Address: Travel Avenue, 123, Adventure City, Travel Country",
    "contact-phone": "Phone: +123 456 7890",
    "contact-email": "Email: contact@travelpage.com",
    "map-title": "Location:",
    "footer-text": "© 2024 Your Travel Page. All rights reserved."
};

// Función para cambiar el idioma
function changeLanguage(language) {
    const texts = language === "es" ? texts_es : texts_en;
    for (const [key, value] of Object.entries(texts)) {
        document.getElementById(key).textContent = value;
    }
}

// Asignar eventos a los botones
document.getElementById('btn-es').addEventListener('click', () => changeLanguage('es'));
document.getElementById('btn-en').addEventListener('click', () => changeLanguage('en'));
