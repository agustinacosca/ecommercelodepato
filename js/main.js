

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
fetch('aromasproductos.html')
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
 /* .catch(error => {
    console.error('Hubo un problema con la solicitud:', error);
    container.innerHTML = "<p>Hubo un error al cargar los productos. Intenta nuevamente más tarde.</p>";
  });*/

