
// main.js
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(error => console.log('Error al cargar el header:', error));

fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(error => console.log('Error al cargar el footer:', error));


  //Back to top button

  window.onscroll = function() {
    const backToTopButton = document.querySelector(".back-to-top");
    if (document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };

  // Función para volver al inicio
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

    /*Carrousel*/

    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;
    
    function moveCarousel() {
      // Calcular el ancho de cada imagen (incluyendo el margen)
      const imageWidth = images[0].clientWidth + 20; // imagen + margen
    
      // Aumentar el índice de la imagen actual
      currentIndex++;
    
      // Revisar si llegamos al final de la primera serie de imágenes
      if (currentIndex >= images.length / 2) {
        // Reiniciar el índice a 0 con un salto instantáneo y sin transición
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(0px)`;
        currentIndex = 1;
    
        // Forzar un reflujo para que la siguiente transición aplique correctamente
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            carousel.style.transition = 'transform 2s ease';
            carousel.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
          });
        });
      } else {
        // Aplicar la transición normal para desplazar a la siguiente imagen
        carousel.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
      }
    }
    
    // Ejecutar la función cada 2 segundos
    setInterval(moveCarousel, 2000);
    

    /*Aromasproductos*/

   // Selecciona el contenedor en aromas.html donde se insertará el contenido
const container = document.getElementById('productos-container');

// Función para cargar el archivo aromasproductos.html
/* fetch('aromasproductos.html')
  .then(response => {
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Error al cargar el archivo aromasproductos.html');
    }
    return response.text(); // Devuelve el contenido como texto HTML
  })
  .then(data => {
    container.innerHTML = data; // Inserta el contenido en el contenedor
  })
 .catch(error => {
    console.error('Hubo un problema con la solicitud:', error);
    container.innerHTML = "<p>Hubo un error al cargar los productos. Intenta nuevamente más tarde.</p>";
  });*/

/*CARRITO*/

// Array para almacenar los productos en el carrito
let carrito = [
  { nombre: "Producto 1", precio: 10, cantidad: 1 },
  { nombre: "Producto 2", precio: 20, cantidad: 2 }
];

// Función para renderizar el carrito en la tabla
function renderizarCarrito() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = ""; // Limpiar el contenido previo

  let total = 0;
  carrito.forEach((producto, index) => {
      const subtotal = producto.precio * producto.cantidad;
      total += subtotal;

      // Crear fila para cada producto
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${producto.nombre}</td>
          <td>$${producto.precio.toFixed(2)}</td>
          <td>
              <input type="number" value="${producto.cantidad}" min="1" class="form-control cantidad-input" onchange="actualizarCantidad(${index}, this.value)">
          </td>
          <td>$${subtotal.toFixed(2)}</td>
          <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
          </td>
      `;
      cartItems.appendChild(row);
  });

  // Actualizar total
  document.getElementById("total").innerText = total.toFixed(2);
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(index, nuevaCantidad) {
  carrito[index].cantidad = parseInt(nuevaCantidad);
  renderizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}

// Función para seguir comprando
function seguirComprando() {
  window.location.href = "productos.html"; // Cambia esta URL según sea necesario
}

// Función para ir a pagar
function irAPagar() {
  alert("Redirigiendo a la página de pago...");
  window.location.href = "pago.html"; // Cambia esta URL según sea necesario
}

// Renderizar el carrito al cargar la página
renderizarCarrito();
