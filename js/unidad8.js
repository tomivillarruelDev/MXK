document.addEventListener("DOMContentLoaded", () => {
    const modalEdadEl = document.getElementById('modalEdad');
    const btnEdadSi = document.getElementById('btnEdadSi');
    const btnEdadNo = document.getElementById('btnEdadNo');
    const mostrarmenucompleto = document.getElementById('section2-contenedor-imagenes2');
    const modalEdadPregunta = document.getElementById('modalEdadPregunta');
    const modalEdadDenegado = document.getElementById('modalEdadDenegado');

    // Restablecer el estado del modal cada vez que se abre
    if (modalEdadEl) {
        modalEdadEl.addEventListener('show.bs.modal', () => {
            if (modalEdadPregunta) modalEdadPregunta.style.display = 'block';
            if (modalEdadDenegado) modalEdadDenegado.style.display = 'none';
        });
    }

    // Verificar si ya se aceptó la mayoría de edad anteriormente
    if (localStorage.getItem('esMayorEdad') === 'true') {
        if (mostrarmenucompleto) {
            mostrarmenucompleto.style.display = 'flex';
            mostrarmenucompleto.classList.add('fade-in-visible');
        }
    }

    // Configurar botones del modal de edad
    if (btnEdadSi) {
        btnEdadSi.addEventListener('click', () => {
            localStorage.setItem('esMayorEdad', 'true');
            if (mostrarmenucompleto) {
                mostrarmenucompleto.style.display = 'flex';
                // Añadimos una pequeña demora para que la transición CSS se note
                setTimeout(() => {
                    mostrarmenucompleto.classList.add('fade-in-visible');
                }, 50);
            }
            
            // Hacer scroll suave hacia las bebidas
            setTimeout(() => {
                mostrarmenucompleto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 400);
        });
    }

    if (btnEdadNo) {
        btnEdadNo.addEventListener('click', () => {
            // Cambiar la vista dentro del modal de forma integrada, evitando alerts que traben el hilo de Bootstrap
            if (modalEdadPregunta) modalEdadPregunta.style.display = 'none';
            if (modalEdadDenegado) modalEdadDenegado.style.display = 'block';
        });
    }

    // Scroll Reveal con Intersection Observer
    const sectionsToReveal = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejamos de observar una vez revelado
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    });

    sectionsToReveal.forEach(section => {
        revealOnScroll.observe(section);
    });
});

// Función que se llama desde el botón "Ver menú completo" en el HTML
function menu() {
    const mostrarmenucompleto = document.getElementById('section2-contenedor-imagenes2');
    const modalEdadEl = document.getElementById('modalEdad');
    
    if (localStorage.getItem('esMayorEdad') === 'true') {
        if (mostrarmenucompleto) {
            mostrarmenucompleto.style.display = 'flex';
            mostrarmenucompleto.classList.add('fade-in-visible');
            mostrarmenucompleto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } else {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEdadEl);
        modalInstance.show();
    }
}
