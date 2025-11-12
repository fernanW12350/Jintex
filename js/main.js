// js/main.js

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initPreloader();
    initNavbar();
    initAnimations();
    initCarousel();
    initProductFilter();
    initSmoothScroll();
    initBackToTop();
    initProductInteractions();
    initFormHandlers();
    initPerformanceOptimizations();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader .progress-bar');
    
    if (!preloader || !progressBar) return;
    
    // Simular progreso de carga
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Completar carga
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Iniciar animaciones después del preloader
                    document.body.classList.add('loaded');
                }, 500);
            }, 300);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (!navbar) return;
    
    // Efecto scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlaces activos basados en scroll
        updateActiveNavLink();
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Efecto hover en logo
    const logoIcon = document.querySelector('.navbar-brand .logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', () => {
            logoIcon.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        logoIcon.addEventListener('mouseleave', () => {
            logoIcon.style.transform = 'rotate(0) scale(1)';
        });
    }
}

// Actualizar enlace activo basado en scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}` || 
            (currentSection === '' && link.getAttribute('href') === 'jintex.html')) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMACIONES =====
function initAnimations() {
    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
    
    // Animaciones personalizadas para elementos específicos
    animateFloatingCards();
    animateHeroElements();
}

function animateFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Retraso escalonado para las animaciones
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function animateHeroElements() {
    const heroImage = document.querySelector('.hero-image');
    const heroButtons = document.querySelectorAll('.hero-btn');
    
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
    }
    
    // Efectos para botones del hero
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== CAROUSEL MEJORADO =====
function initCarousel() {
    const carousel = document.getElementById('categoriesCarousel');
    
    if (!carousel) return;
    
    // Configuración personalizada del carousel
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 6000,
        wrap: true,
        touch: true,
        pause: 'hover'
    });
    
    // Efectos adicionales para el carousel
    carousel.addEventListener('slide.bs.carousel', function(e) {
        // Animación de entrada para el slide activo
        const nextSlide = e.relatedTarget;
        setTimeout(() => {
            nextSlide.classList.add('aos-animate');
        }, 50);
    });
    
    // Pausar el carousel cuando el mouse está sobre él
    carousel.addEventListener('mouseenter', function() {
        carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', function() {
        carouselInstance.cycle();
    });
    
    // Efecto parallax para las imágenes del carousel (solo desktop)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleCarouselParallax);
    }
    
    // Precargar imágenes del carousel
    preloadCarouselImages();
}

function handleCarouselParallax() {
    const carouselImages = document.querySelectorAll('.category-image img');
    const scrollY = window.scrollY;
    
    carouselImages.forEach((img) => {
        const speed = 0.2;
        const yPos = -(scrollY * speed);
        img.style.transform = `translateY(${yPos}px) scale(1.05)`;
    });
}

function preloadCarouselImages() {
    const carouselImages = document.querySelectorAll('.category-image img');
    
    carouselImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = function() {
            img.style.opacity = '1';
        };
    });
}

// ===== FILTRO DE PRODUCTOS =====
function initProductFilter() {
    const filterButtons = document.querySelectorAll('#product-filters [data-filter]');
    const products = document.querySelectorAll('.producto');
    
    if (filterButtons.length === 0 || products.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar productos con animación
            filterProducts(products, filterValue);
        });
    });
}

function filterProducts(products, filterValue) {
    let visibleCount = 0;
    
    products.forEach((product, index) => {
        const productCategory = product.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || productCategory === filterValue;
        
        if (shouldShow) {
            visibleCount++;
            // Animación de entrada
            setTimeout(() => {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 50);
            }, index * 100);
        } else {
            // Animación de salida
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
    
    // Mostrar mensaje si no hay productos
    showNoProductsMessage(visibleCount === 0);
}

function showNoProductsMessage(show) {
    let message = document.getElementById('no-products-message');
    
    if (show && !message) {
        message = document.createElement('div');
        message.id = 'no-products-message';
        message.className = 'col-12 text-center py-5';
        message.innerHTML = `
            <div class="text-muted">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h4>No se encontraron productos</h4>
                <p>Intenta con otra categoría o filtro.</p>
            </div>
        `;
        document.getElementById('productos-container').appendChild(message);
    } else if (!show && message) {
        message.remove();
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const navbarToggler = document.querySelector('.navbar-toggler');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
}

// ===== BOTÓN VOLVER ARRIBA =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// ===== INTERACCIONES DE PRODUCTOS =====
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Efectos hover para tarjetas de productos
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const image = this.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const image = this.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Funcionalidad "Añadir al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.h5').textContent;
            
            // Animación de confirmación
            const originalText = this.innerHTML;
            const originalClass = this.className;
            
            this.innerHTML = '<i class="fas fa-check me-1"></i>Añadido';
            this.className = 'btn btn-success btn-sm rounded-pill add-to-cart';
            
            // Mostrar notificación
            showCartNotification(productName);
            
            // Restaurar estado después de 2 segundos
            setTimeout(() => {
                this.innerHTML = originalText;
                this.className = originalClass;
            }, 2000);
            
            // Aquí iría la lógica real para añadir al carrito
            console.log(`Producto añadido: ${productName} - ${productPrice}`);
        });
    });
}

function showCartNotification(productName) {
    // Crear notificación toast
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header bg-success text-white">
                <i class="fas fa-check-circle me-2"></i>
                <strong class="me-auto">Producto añadido</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${productName} ha sido añadido al carrito.
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== MANEJADORES DE FORMULARIOS =====
function initFormHandlers() {
    // Aquí se pueden agregar manejadores para formularios de contacto
    // Por ahora, solo un ejemplo básico
    
    const contactLinks = document.querySelectorAll('a[href="#contacto"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Podría abrir un modal de contacto o scroll a la sección
            console.log('Navegando a contacto...');
        });
    });
}

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
function initPerformanceOptimizations() {
    // Lazy loading para imágenes
    initLazyLoading();
    
    // Debounce para eventos de scroll
    initScrollDebounce();
    
    // Prefetch para enlaces importantes
    initLinkPrefetch();
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

function initScrollDebounce() {
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Operaciones que requieren procesamiento después del scroll
            updateActiveNavLink();
        }, 100);
    });
}

function initLinkPrefetch() {
    // Prefetch para páginas importantes
    const importantLinks = [
        'red.html',
        'maquinaria.html', 
        'licencias.html',
        'formulation.html'
    ];
    
    importantLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link;
        document.head.appendChild(prefetchLink);
    });
}

// ===== MANEJADOR DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
});

// ===== COMPATIBILIDAD =====
// Polyfill para smooth scroll en Safari
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js')
        .then(module => {
            module.polyfill();
        });
}

// ===== UTILIDADES ADICIONALES =====
// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Exportar funciones para uso global (si es necesario)
window.Jintex = {
    formatPrice,
    isValidEmail,
    updateActiveNavLink
};