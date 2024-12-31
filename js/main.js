
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

  function volverACarrito(){
     window.location.href = 'carrito.html'; // Redirige a carrito.html
  }
  
    /*Carrousel*/
/*
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
  */  

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




  /*PRODUCTOS*/
// Array para almacenar los productos en el carrito
let productos = [
  { nombre: "Porta cepillo", precio: 7400, imagen: "img/baño/portacepillo.jpeg"},
  { nombre: "Set antideslizante", precio: 5500, imagen: "img/baño/setantideslizante.jpeg" }
];

// Función para renderizar el producto en la tabla
function renderizarProductos() {
  const prodItems = document.getElementById("prod-items");
 prodItems.innerHTML = ""; 

  console.log('renderizando');

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



/*CARRITO*/

// Array para almacenar los productos en el carrito
let carrito = [
  { nombre: "Producto 1", precio: 10, cantidad: 1 },
  { nombre: "Producto 2", precio: 20, cantidad: 2 }
];

function obtenerCarrito(){
  let carrito = localStorage.getItem('carrito');
  if (carrito)
      return JSON.parse(carrito);
  else{
      return [];
  }
}

function agregarAlCarrito(producto){
  let carrito = obtenerCarrito();
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));

  volverACarrito();
}



carrito = obtenerCarrito();

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
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
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
  carrito.splice(index, 1); // Eliminar el producto del carrito
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar en localStorage
  renderizarCarrito(); // Renderizar de nuevo el carrito
}


// Función para iniciar sesion
function iniciarsesion() {
  window.location.href = "index.html"; // Cambia esta URL según sea necesario
}

// Función para seguir comprando
function seguirComprando() {
  window.location.href = "productos.html"; // Cambia esta URL según sea necesario
}

// Función volver al carrito


// Función para ir a pagar
    function irAPagar() {
        window.location.href = 'pago.html'; // Redirige a pago.html
    }


// Renderizar el carrito al cargar la página
// deka
 // renderizarCarrito();

// Inicializar el total en cero
let total = 0;

// Función para agregar al carrito y actualizar el total
/*
function agregarAlCarrito(precio) {
  // Sumar el precio del producto al total
  let total = document.getElementById('total');
  total += precio;
  // Mostrar el total actualizado en el elemento con id "total"


  document.getElementById('total').textContent = total.toFixed(2);

}
  */