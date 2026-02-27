// Espera a que todo el DOM cargue antes de ejecutar
document.addEventListener("DOMContentLoaded", () => {

    /* ======== MENÚ HAMBURGUESA ======== */
    const nav = document.querySelector('nav'); // selecciona el nav
    const menuToggle = document.createElement('div'); // crea el div del icono
    menuToggle.classList.add('menu-toggle'); 
    menuToggle.innerHTML = `<span></span><span></span><span></span>`; // 3 barras
    nav.appendChild(menuToggle); // lo agrega al nav

    const ul = nav.querySelector('ul'); // selecciona la lista de enlaces

    // Al hacer click en la hamburguesa
    menuToggle.addEventListener('click', () => {
        ul.classList.toggle('show'); // muestra/oculta menú
        menuToggle.classList.toggle('active'); // cambia el icono
    });

    /* ======== SCROLL SUAVE ======== */
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // evita el salto instantáneo
            const target = document.querySelector(link.getAttribute('href')); 
            target.scrollIntoView({ behavior: 'smooth' }); // scroll suave

            // Cierra menú en móviles
            if (ul.classList.contains('show')) {
                ul.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        });
    });

    /* ======== ANIMACIÓN EN PROYECTOS ======== */
    const proyectos = document.querySelectorAll('.proyecto');

    proyectos.forEach(proyecto => {
        proyecto.addEventListener('mouseenter', () => {
            proyecto.style.transform = "scale(1.05)"; // zoom al pasar mouse
        });
        proyecto.addEventListener('mouseleave', () => {
            proyecto.style.transform = "scale(1)"; // vuelve al tamaño original
        });
    });

});