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

// ===== PRELOADER MEJORADO =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    // Para videos MP4 - esperar a que cargue el video
    const video = preloader.querySelector('video');
    if (video) {
        video.addEventListener('loadeddata', function() {
            // El video está listo, ocultar preloader después de 3 segundos
            setTimeout(hidePreloader, 3000);
        });
        
        // En caso de error del video, usar fallback
        video.addEventListener('error', function() {
            console.log('Error cargando video, usando imagen de fallback');
            setTimeout(hidePreloader, 2000);
        });
    } else {
        // Para imágenes/GIFs - ocultar después de 3 segundos
        setTimeout(hidePreloader, 3000);
    }
    
    function hidePreloader() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }
}

// ===== NAVBAR MEJORADO =====
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
    
    // Efecto hover en logo del navbar
    const navbarLogo = document.querySelector('.navbar-logo');
    if (navbarLogo) {
        navbarLogo.addEventListener('mouseenter', () => {
            navbarLogo.style.transform = 'scale(1.05)';
        });
        
        navbarLogo.addEventListener('mouseleave', () => {
            navbarLogo.style.transform = 'scale(1)';
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
        
        // Reiniciar efecto de zoom en cambio de slide
        resetCarouselImages();
    });
    
    carousel.addEventListener('slid.bs.carousel', function() {
        // Aplicar efecto de zoom solo al slide activo
        applyActiveSlideEffects();
    });
    
    // Pausar el carousel cuando el mouse está sobre él
    carousel.addEventListener('mouseenter', function() {
        carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', function() {
        carouselInstance.cycle();
    });
    
    // Precargar imágenes del carousel
    preloadCarouselImages();
    
    // Aplicar efectos iniciales
    applyActiveSlideEffects();
}

// Aplicar efectos solo al slide activo
function applyActiveSlideEffects() {
    const activeSlide = document.querySelector('#categoriesCarousel .carousel-item.active');
    if (activeSlide) {
        const activeImage = activeSlide.querySelector('.category-image img');
        if (activeImage) {
            activeImage.style.transform = 'scale(1.02)';
        }
    }
}

// Reiniciar efectos de imágenes
function resetCarouselImages() {
    const carouselImages = document.querySelectorAll('#categoriesCarousel .category-image img');
    carouselImages.forEach(img => {
        img.style.transform = 'scale(1)';
    });
}

// Precargar imágenes del carousel
function preloadCarouselImages() {
    const carouselImages = document.querySelectorAll('.category-image img');
    
    carouselImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = function() {
            img.style.opacity = '1';
        };
        
        // Manejar errores de carga
        tempImg.onerror = function() {
            console.warn('Error cargando imagen del carousel:', img.src);
            img.style.opacity = '1'; // Mostrar igualmente
        };
    });
}

// Inicializar carousel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

// Re-inicializar carousel en redimensionamiento de ventana
window.addEventListener('resize', function() {
    // Solo re-aplicar efectos, no reinicializar completamente
    applyActiveSlideEffects();
});

// ===== FILTRO DE PRODUCTOS MEJORADO =====
function initProductFilter() {
    const filterButtons = document.querySelectorAll('#product-filters [data-filter]');
    const products = document.querySelectorAll('.producto');
    const productosContainer = document.getElementById('productos-container');
    
    if (filterButtons.length === 0 || products.length === 0) return;
    
    // Precargar imágenes de productos
    preloadProductImages();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'translateY(0)';
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            this.style.transform = 'translateY(-2px)';
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar productos con animación mejorada
            filterProducts(products, filterValue, productosContainer);
        });
    });
}

function filterProducts(products, filterValue, container) {
    let visibleCount = 0;
    const animationDuration = 300;
    
    // Ocultar mensaje anterior si existe
    hideNoProductsMessage();
    
    products.forEach((product, index) => {
        const productCategory = product.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || productCategory === filterValue;
        
        if (shouldShow) {
            visibleCount++;
            // Mostrar producto con animación escalonada
            setTimeout(() => {
                product.classList.remove('hidden', 'hiding');
                product.classList.add('showing');
                product.style.display = 'block';
            }, index * 80);
        } else {
            // Ocultar producto con animación
            product.classList.add('hiding');
            product.classList.remove('showing');
            
            setTimeout(() => {
                product.classList.add('hidden');
                product.style.display = 'none';
            }, animationDuration);
        }
    });
    
    // Mostrar mensaje si no hay productos después de las animaciones
    setTimeout(() => {
        if (visibleCount === 0) {
            showNoProductsMessage(container);
        }
    }, products.length * 80 + animationDuration);
    
    // Actualizar contador de productos visibles
    updateProductCount(visibleCount, products.length);
}

function showNoProductsMessage(container) {
    let message = document.getElementById('no-products-message');
    
    if (!message) {
        message = document.createElement('div');
        message.id = 'no-products-message';
        message.className = 'col-12 text-center py-5';
        message.innerHTML = `
            <div class="text-muted" data-aos="fade-up">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h4 class="mb-3">No se encontraron productos</h4>
                <p class="mb-4">Intenta con otra categoría o filtro.</p>
                <button class="btn btn-primary" onclick="resetProductFilter()">
                    <i class="fas fa-redo me-2"></i>Mostrar Todos
                </button>
            </div>
        `;
        container.appendChild(message);
        
        // Animar la aparición del mensaje
        setTimeout(() => {
            message.querySelector('div').style.opacity = '1';
        }, 50);
    }
}

function hideNoProductsMessage() {
    const message = document.getElementById('no-products-message');
    if (message) {
        message.style.opacity = '0';
        setTimeout(() => {
            message.remove();
        }, 300);
    }
}

function resetProductFilter() {
    const allButton = document.querySelector('#product-filters [data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
}

function updateProductCount(visible, total) {
    // Podrías mostrar un contador si lo deseas
    console.log(`Mostrando ${visible} de ${total} productos`);
}

// ===== PRECARGA DE IMÁGENES DE PRODUCTOS =====
function preloadProductImages() {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(img => {
        // Crear imagen fantasma para precarga
        const tempImg = new Image();
        tempImg.src = img.src;
        
        tempImg.onload = function() {
            // Marcar imagen como cargada
            img.classList.add('loaded');
            img.style.opacity = '1';
        };
        
        tempImg.onerror = function() {
            console.warn('Error cargando imagen del producto:', img.src);
            img.style.opacity = '1'; // Mostrar igualmente
            img.alt = 'Imagen no disponible';
        };
    });
}

// ===== INTERACCIONES DE PRODUCTOS MEJORADAS =====
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Efectos hover mejorados para tarjetas de productos
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const image = this.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1.08)';
            }
            
            // Efecto de brillo en el badge
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const image = this.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            // Restaurar badge
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.style.boxShadow = 'var(--shadow-sm)';
            }
        });
        
        // Click en la tarjeta (opcional - podría abrir detalles)
        card.addEventListener('click', function(e) {
            // Evitar que se active cuando se hace click en el botón de carrito
            if (!e.target.closest('.add-to-cart')) {
                console.log('Abrir detalles del producto');
                // Aquí podrías abrir un modal o redirigir a página de detalles
            }
        });
    });
    
    // Funcionalidad "Consultar" mejorada
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar que se propague al card
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.h5').textContent;
            const productCategory = productCard.closest('.producto').getAttribute('data-category');
            
            // Animación de confirmación mejorada
            animateAddToCart(this, productName, productPrice, productCategory);
        });
    });
}

function animateAddToCart(button, productName, productPrice, category) {
    const originalText = button.innerHTML;
    const originalClass = button.className;
    
    // Animación de éxito
    button.innerHTML = '<i class="fas fa-check me-1"></i>Consultado';
    button.className = 'btn btn-success btn-sm rounded-pill add-to-cart';
    button.style.transform = 'scale(0.95)';
    
    // Mostrar notificación mejorada
    showProductNotification(productName, productPrice, category);
    
    // Efecto de vibración en la tarjeta
    const productCard = button.closest('.product-card');
    productCard.style.animation = 'vibrate 0.3s ease';
    
    setTimeout(() => {
        productCard.style.animation = '';
    }, 300);
    
    // Restaurar estado después de 2 segundos
    setTimeout(() => {
        button.innerHTML = originalText;
        button.className = originalClass;
        button.style.transform = '';
    }, 2000);
}

function showProductNotification(productName, productPrice, category) {
    // Crear notificación toast mejorada
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.style.marginTop = '80px'; // Debajo del navbar
    
    const categoryColors = {
        'originales': 'primary',
        'reacondicionados': 'success',
        'red': 'info',
        'licencias': 'warning'
    };
    
    const badgeColor = categoryColors[category] || 'primary';
    
    toast.innerHTML = `
        <div class="toast show" role="alert" style="min-width: 300px;">
            <div class="toast-header bg-${badgeColor} text-white">
                <i class="fas fa-info-circle me-2"></i>
                <strong class="me-auto">Producto consultado</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close btn-close-white" onclick="this.closest('.toast').remove()"></button>
            </div>
            <div class="toast-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1">${productName}</h6>
                        <p class="mb-1 text-muted small">${productPrice}</p>
                    </div>
                    <span class="badge bg-${badgeColor}">${category}</span>
                </div>
                <div class="mt-2 pt-2 border-top">
                    <small class="text-muted">Te contactaremos pronto con más información</small>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, 4000);
}

// Animación de vibración para CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes vibrate {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
`;
document.head.appendChild(style);
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