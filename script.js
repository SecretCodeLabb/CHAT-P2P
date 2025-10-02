// Gallery animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

function initializeAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
        
        // Reset animation state
        item.classList.remove('animate');
    });
}

// Navigation between pages
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current nav item based on pageId
    const currentNavLink = Array.from(navLinks).find(link => 
        link.textContent.toLowerCase().includes(pageId === 'home' ? 'inicio' : pageId)
    );
    if (currentNavLink) {
        currentNavLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Reinitialize animations for the new page
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

// Gallery item click handler with detailed modal content
function handleItemClick(item) {
    const itemId = item.dataset.id;
    const title = item.querySelector('.item-info h3').textContent;
    const description = item.querySelector('.item-info p').textContent;
    const image = item.querySelector('.item-image');
    const video = item.querySelector('.item-video');
    const tag = item.querySelector('.item-tag').textContent;
    
    // Create detailed content based on item type and ID
    let modalContent = `<h2>${title}</h2><div style="margin: 20px 0;">`;
    
    if (image) {
        modalContent += `<img src="${image.src}" style="width: 100%; height: auto; margin-bottom: 20px; border-radius: 8px;">`;
    }
    
    if (video) {
        modalContent += `<video controls style="width: 100%; height: auto; margin-bottom: 20px; border-radius: 8px;">
            <source src="${video.querySelector('source').src}" type="video/mp4">
        </video>`;
    }
    
    modalContent += `</div>
        <span style="display: inline-block; background: #e74c3c; color: white; padding: 6px 12px; border-radius: 4px; font-size: 0.9rem; margin-bottom: 15px;">${tag}</span>
        <p style="line-height: 1.6; font-size: 1.1rem; margin-bottom: 20px;">${description}</p>`;
    
    // Add specific content based on item ID
    switch(itemId) {
        case '1':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Proceso de Desarrollo</h3>
                <p style="line-height: 1.6; margin-bottom: 15px;">Este proyecto involucró un proceso de investigación profunda sobre las tendencias actuales en arte digital, seguido de múltiples iteraciones de diseño y prototipado.</p>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Tecnologías Utilizadas</h3>
                <ul style="line-height: 1.6; margin-left: 20px;">
                    <li>Adobe Creative Suite</li>
                    <li>Cinema 4D</li>
                    <li>TouchDesigner</li>
                    <li>Unity 3D</li>
                </ul>`;
            break;
        case '2':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Concepto Narrativo</h3>
                <p style="line-height: 1.6; margin-bottom: 15px;">El cortometraje explora temas de identidad y transformación a través de un lenguaje visual único que combina técnicas tradicionales de animación con elementos digitales modernos.</p>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Premios y Reconocimientos</h3>
                <p style="line-height: 1.6;">Seleccionado en el Festival Internacional de Animación Digital 2024 y ganador del premio "Mejor Innovación Visual".</p>`;
            break;
        case '3':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Estrategia de Marca</h3>
                <p style="line-height: 1.6; margin-bottom: 15px;">Desarrollo integral que incluye investigación de mercado, arquitectura de marca, diseño de identidad visual y implementación en múltiples touchpoints.</p>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Elementos Entregables</h3>
                <ul style="line-height: 1.6; margin-left: 20px;">
                    <li>Manual de identidad corporativa</li>
                    <li>Sistema de aplicaciones</li>
                    <li>Guías de uso digital</li>
                    <li>Papelería corporativa</li>
                </ul>`;
            break;
        case '4':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Experiencia Interactiva</h3>
                <p style="line-height: 1.6; margin-bottom: 15px;">Una instalación que utiliza sensores de movimiento y proyección mapping para crear un espacio inmersivo donde los visitantes pueden influir directamente en la narrativa visual.</p>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Especificaciones Técnicas</h3>
                <p style="line-height: 1.6;">Proyección 4K, sistema de tracking por infrarrojos, audio espacial 7.1 y control en tiempo real vía OSC.</p>`;
            break;
        case '5':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Arquitectura de Información</h3>
                <p style="line-height: 1.6; margin-bottom: 15px;">Diseño centrado en el usuario que prioriza la accesibilidad, la velocidad de carga y la experiencia móvil, implementado con las últimas tecnologías web.</p>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Métricas de Rendimiento</h3>
                <p style="line-height: 1.6;">Tiempo de carga < 3 segundos, puntuación Lighthouse > 95, compatible con WCAG 2.1 AA.</p>`;
            break;
        // Workshop items
        case 'w1':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Contenido del Taller</h3>
                <ul style="line-height: 1.6; margin-left: 20px; margin-bottom: 15px;">
                    <li>Fundamentos de modelado 3D</li>
                    <li>Rigging y control de personajes</li>
                    <li>Técnicas avanzadas de animación</li>
                    <li>Renderizado y post-producción</li>
                </ul>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Información Práctica</h3>
                <p style="line-height: 1.6;"><strong>Duración:</strong> 8 semanas (32 horas)<br>
                <strong>Modalidad:</strong> Presencial<br>
                <strong>Precio:</strong> $599 USD<br>
                <strong>Próximo inicio:</strong> 15 de Octubre</p>`;
            break;
        case 'w2':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Programa de Estudios</h3>
                <ul style="line-height: 1.6; margin-left: 20px; margin-bottom: 15px;">
                    <li>Principios de motion graphics</li>
                    <li>Animación de texto y formas</li>
                    <li>Compositing avanzado</li>
                    <li>Integración con video en vivo</li>
                </ul>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Información Práctica</h3>
                <p style="line-height: 1.6;"><strong>Duración:</strong> 6 semanas (24 horas)<br>
                <strong>Modalidad:</strong> Online en vivo<br>
                <strong>Precio:</strong> $399 USD<br>
                <strong>Próximo inicio:</strong> 1 de Noviembre</p>`;
            break;
        case 'w3':
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Metodología</h3>
                <ul style="line-height: 1.6; margin-left: 20px; margin-bottom: 15px;">
                    <li>Design thinking</li>
                    <li>Prototipado rápido</li>
                    <li>Testing con usuarios reales</li>
                    <li>Implementación responsiva</li>
                </ul>
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Información Práctica</h3>
                <p style="line-height: 1.6;"><strong>Duración:</strong> 4 semanas (16 horas)<br>
                <strong>Modalidad:</strong> Híbrida<br>
                <strong>Precio:</strong> $299 USD<br>
                <strong>Próximo inicio:</strong> 8 de Noviembre</p>`;
            break;
        default:
            modalContent += `
                <h3 style="color: #e74c3c; margin: 25px 0 15px 0;">Detalles del Proyecto</h3>
                <p style="line-height: 1.6;">Este proyecto representa una exploración profunda en ${tag.toLowerCase()}, combinando técnicas innovadoras con narrativa visual para crear una experiencia única. El proceso de desarrollo involucró múltiples fases de conceptualización, prototipado y refinamiento hasta alcanzar el resultado final.</p>`;
    }
    
    document.getElementById('modal-body').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Video hover effects
function handleVideoHover() {
    const videos = document.querySelectorAll('.item-video');
    videos.forEach(video => {
        const item = video.closest('.gallery-item');
        
        item.addEventListener('mouseenter', () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });
        
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// Smooth scrolling for internal navigation
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle navigation clicks with smooth transitions
// Handle navigation clicks with smooth transitions (multi-page + SPA)
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '#';
      const linkText = link.textContent.toLowerCase();

      // Si es un enlace real a otra página, no interceptar
      if (href !== '#' && href.endsWith('.html')) {
        return; // dejar que el navegador navegue
      }

      // SPA fallback (href="#")
      e.preventDefault();

      // Quitar/poner active visual
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Determinar "pageId" para SPA
      let pageId = 'home';
      if (linkText.includes('taller')) pageId = 'talleres';
      else if (linkText.includes('about')) pageId = 'about';

      showPage(pageId);
    });
  });
}

// Logo: respetar navegación real si apunta a .html
(function setupLogoNavigation() {
  const logo = document.querySelector('.logo');
  if (!logo) return;
  const href = logo.getAttribute('href') || '#';
  if (href === '#') {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('home');
    });
  }
})();


// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Add loading states
function addLoadingStates() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('.item-image');
        const video = item.querySelector('.item-video');
        
        if (img) {
            img.addEventListener('load', () => {
                item.classList.add('loaded');
            });
        }
        
        if (video) {
            video.addEventListener('loadeddata', () => {
                item.classList.add('loaded');
            });
        }
    });
}

// Keyboard navigation support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            closeModal();
        }
        
        // Navigate between pages with arrow keys (when modal is not open)
        if (!document.getElementById('modal').style.display || document.getElementById('modal').style.display === 'none') {
            const currentPage = document.querySelector('.page.active').id;
            const pages = ['home', 'talleres', 'about'];
            const currentIndex = pages.indexOf(currentPage);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                showPage(pages[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
                showPage(pages[currentIndex + 1]);
            }
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(() => {
            // Add scroll-based effects here if needed
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main functionality
    initializeAnimations();
    handleVideoHover();
    setupNavigation();
    setupLazyLoading();
    addLoadingStates();
    setupKeyboardNavigation();
    optimizePerformance();
    
    // Add click handlers to gallery items
    document.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem && !e.target.closest('.modal')) {
            handleItemClick(galleryItem);
        }
    });
    
    // Close modal when clicking outside
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });
    
    // Handle logo click
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('home');
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause all videos when page is hidden
        document.querySelectorAll('video').forEach(video => {
            video.pause();
        });
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Reinitialize animations on resize
    setTimeout(() => {
        initializeAnimations();
    }, 100);
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
/* ====== Carousel básico autoplay ====== */
function initCarousel(rootId, { interval = 4500 } = {}) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const track = root.querySelector('.carousel-track');
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const start = () => { stop(); timer = setInterval(() => goTo(index + 1), interval); };
  const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };

  // controlar visibilidad (pausa cuando se cambia de pestaña)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  // pausa al pasar el mouse
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  // swipe básico en móvil
  let startX = null;
  root.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, {passive:true});
  root.addEventListener('touchend', (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX = null; start();
  });

  // iniciar
  goTo(0);
  start();
}

// Llama a esto dentro de tu DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', () => {
  // ...todo lo tuyo...
  initCarousel('heroCarousel', { interval: 5000 });
});
