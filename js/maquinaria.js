// ===== CONFIGURACIÓN INICIAL ESPECÍFICA PARA MAQUINARIA =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades específicas de maquinaria
    initMaquinariaPreloader();
    initMaquinariaAnimations();
    initMaquinariaProductFilter();
    initHardwareInteractions();
    initStarRatingSystem();
    initMaquinariaFormHandlers();
    initMaquinariaPerformance();
});

// ===== PRELOADER ESPECIALIZADO PARA MAQUINARIA =====
function initMaquinariaPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    // Precargar imágenes específicas de hardware
    preloadHardwareImages();
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }, 3000);
}

function preloadHardwareImages() {
    const hardwareImages = [
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ];
    
    hardwareImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===== ANIMACIONES ESPECÍFICAS PARA HARDWARE =====
function initMaquinariaAnimations() {
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
    
    // Animaciones de iconos de hardware
    animateHardwareIcons();
    animateTechFeatures();
    initHardwareParticles();
}

function animateHardwareIcons() {
    const hardwareIcons = document.querySelectorAll('.hardware-icon, .icon-container');
    
    hardwareIcons.forEach((icon, index) => {
        // Retraso escalonado para las animaciones
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, index * 200);
        
        // Efecto hover mejorado
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(58, 134, 255, 0.3)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function animateTechFeatures() {
    const techFeatures = document.querySelectorAll('.tech-feature');
    
    techFeatures.forEach((feature, index) => {
        // Animación secuencial
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'scale(1)';
        }, index * 300);
        
        // Efecto de pulso en hover
        feature.addEventListener('mouseenter', function() {
            this.style.animation = 'hardwarePulse 1s infinite';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

function initHardwareParticles() {
    const heroParticles = document.querySelector('.maquinaria-hero-particles');
    if (!heroParticles) return;
    
    // Efecto de partículas dinámicas para hardware
    setInterval(() => {
        createHardwareParticle(heroParticles);
    }, 800);
}

function createHardwareParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
    `;
    
    // Posición aleatoria
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    container.appendChild(particle);
    
    // Animación
    particle.animate([
        { opacity: 0, transform: 'scale(0) rotate(0deg)' },
        { opacity: 0.8, transform: 'scale(1) rotate(180deg)' },
        { opacity: 0, transform: 'scale(0) rotate(360deg)' }
    ], {
        duration: 3000,
        easing: 'ease-out'
    });
    
    // Eliminar después de la animación
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// ===== FILTRO DE PRODUCTOS DE MAQUINARIA =====
function initMaquinariaProductFilter() {
    const filterButtons = document.querySelectorAll('#maquinaria-filters [data-filter]');
    const products = document.querySelectorAll('.producto-maquinaria');
    const productosContainer = document.getElementById('maquinaria-productos-container');
    
    if (filterButtons.length === 0 || products.length === 0) return;
    
    // Precargar imágenes de productos de hardware
    preloadHardwareProductImages();
    
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
            filterMaquinariaProducts(products, filterValue, productosContainer);
        });
    });
}

function filterMaquinariaProducts(products, filterValue, container) {
    let visibleCount = 0;
    const animationDuration = 300;
    
    // Ocultar mensaje anterior si existe
    hideNoMaquinariaProductsMessage();
    
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
            showNoMaquinariaProductsMessage(container);
        }
    }, products.length * 80 + animationDuration);
}

function showNoMaquinariaProductsMessage(container) {
    let message = document.getElementById('no-maquinaria-products-message');
    
    if (!message) {
        message = document.createElement('div');
        message.id = 'no-maquinaria-products-message';
        message.className = 'col-12 text-center py-5';
        message.innerHTML = `
            <div class="text-muted" data-aos="fade-up">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h4 class="mb-3">No se encontraron productos</h4>
                <p class="mb-4">No tenemos productos disponibles en esta categoría actualmente.</p>
                <button class="btn btn-primary" onclick="resetMaquinariaProductFilter()">
                    <i class="fas fa-redo me-2"></i>Mostrar Todos
                </button>
            </div>
        `;
        container.appendChild(message);
    }
}

function hideNoMaquinariaProductsMessage() {
    const message = document.getElementById('no-maquinaria-products-message');
    if (message) {
        message.remove();
    }
}

function resetMaquinariaProductFilter() {
    const allButton = document.querySelector('#maquinaria-filters [data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
}

function preloadHardwareProductImages() {
    const productImages = document.querySelectorAll('.producto-maquinaria .product-image');
    
    productImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
        
        tempImg.onload = function() {
            img.classList.add('loaded');
            img.style.opacity = '1';
        };
        
        tempImg.onerror = function() {
            console.warn('Error cargando imagen del producto de hardware:', img.src);
            img.style.opacity = '1';
            img.alt = 'Imagen no disponible';
        };
    });
}

// ===== SISTEMA DE ESTRELLAS =====
function initStarRatingSystem() {
    // Este sistema es para mostrar las valoraciones, no para que los usuarios califiquen
    // En una implementación real, estas valoraciones vendrían de una base de datos
    
    const productCards = document.querySelectorAll('.producto-maquinaria');
    
    productCards.forEach(card => {
        const ratingElement = card.querySelector('.product-rating');
        if (ratingElement) {
            // En una implementación real, aquí obtendrías la valoración de una base de datos
            // Por ahora, usamos valores estáticos definidos en el HTML
            animateStars(ratingElement);
        }
    });
}

function animateStars(ratingElement) {
    const stars = ratingElement.querySelectorAll('.stars i');
    
    stars.forEach((star, index) => {
        // Animación escalonada para las estrellas
        setTimeout(() => {
            star.style.opacity = '1';
            star.style.transform = 'scale(1)';
        }, index * 200);
    });
}

// ===== INTERACCIONES DE HARDWARE =====
function initHardwareInteractions() {
    const serviceCards = document.querySelectorAll('.hover-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Efectos hover mejorados para tarjetas de hardware
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const icon = this.querySelector('.icon-container');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const icon = this.querySelector('.icon-container');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        // Click para más información
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.add-to-cart')) {
                const serviceTitle = this.querySelector('.card-title').textContent;
                showHardwareDetails(serviceTitle);
            }
        });
    });
    
    // Funcionalidad "Consultar" mejorada para productos de hardware
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.h5').textContent;
            const productCategory = productCard.closest('.producto-maquinaria').getAttribute('data-category');
            
            // Animación de confirmación mejorada
            animateHardwareProductConsult(this, productName, productPrice, productCategory);
        });
    });
}

function animateHardwareProductConsult(button, productName, productPrice, category) {
    const originalText = button.innerHTML;
    const originalClass = button.className;
    
    // Animación de éxito
    button.innerHTML = '<i class="fas fa-check me-1"></i>Consultado';
    button.className = 'btn btn-success btn-sm rounded-pill add-to-cart';
    button.style.transform = 'scale(0.95)';
    
    // Mostrar notificación mejorada
    showHardwareProductNotification(productName, productPrice, category);
    
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

function showHardwareProductNotification(productName, productPrice, category) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.style.marginTop = '80px';
    
    const categoryColors = {
        'cpus': 'primary',
        'gpus': 'success',
        'ram': 'info',
        'placas': 'warning',
        'fuentes': 'secondary',
        'torres': 'dark',
        'workstations': 'primary',
        'servidores': 'success'
    };
    
    const badgeColor = categoryColors[category] || 'primary';
    
    toast.innerHTML = `
        <div class="toast show" role="alert" style="min-width: 300px;">
            <div class="toast-header bg-${badgeColor} text-white">
                <i class="fas fa-microchip me-2"></i>
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
                    <small class="text-muted">Nuestro equipo de hardware te contactará pronto</small>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
}

function showHardwareDetails(serviceName) {
    // Aquí podrías abrir un modal con detalles del servicio
    console.log(`Mostrando detalles del servicio: ${serviceName}`);
    
    // Ejemplo básico de notificación
    const notification = document.createElement('div');
    notification.className = 'position-fixed bottom-0 start-0 m-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <div class="alert alert-info alert-dismissible fade show">
            <i class="fas fa-info-circle me-2"></i>
            <strong>${serviceName}</strong> - Próximamente más detalles
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// ===== MANEJADORES DE FORMULARIOS ESPECÍFICOS =====
function initMaquinariaFormHandlers() {
    // Manejar enlaces de catálogo
    const catalogLinks = document.querySelectorAll('a[href="formulario.html"]');
    catalogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Podrías agregar parámetros específicos para maquinaria
            console.log('Navegando a formulario de catálogo para hardware');
        });
    });
}

// ===== OPTIMIZACIONES DE RENDIMIENTO ESPECÍFICAS =====
function initMaquinariaPerformance() {
    // Lazy loading para imágenes de productos de hardware
    initMaquinariaLazyLoading();
    
    // Prefetch para páginas relacionadas
    initMaquinariaLinkPrefetch();
}

function initMaquinariaLazyLoading() {
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

function initMaquinariaLinkPrefetch() {
    // Prefetch para páginas relacionadas con maquinaria
    const relatedPages = [
        'red.html',
        'licencias.html',
        'formulario.html'
    ];
    
    relatedPages.forEach(page => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = page;
        document.head.appendChild(prefetchLink);
    });
}

// ===== UTILIDADES ESPECÍFICAS PARA HARDWARE =====
// Función para calcular configuraciones personalizadas
function calculateCustomConfiguration(basePrice, upgrades) {
    let total = basePrice;
    
    upgrades.forEach(upgrade => {
        total += upgrade.price;
    });
    
    return {
        total: total,
        savings: basePrice * 0.1, // 10% de descuento en configuraciones personalizadas
        finalPrice: total * 0.9
    };
}

// Función para comparar especificaciones
function compareSpecs(product1, product2) {
    const comparisons = [];
    
    // Comparar CPU
    if (product1.cpu !== product2.cpu) {
        comparisons.push(`CPU: ${product1.cpu} vs ${product2.cpu}`);
    }
    
    // Comparar RAM
    if (product1.ram !== product2.ram) {
        comparisons.push(`RAM: ${product1.ram} vs ${product2.ram}`);
    }
    
    // Comparar almacenamiento
    if (product1.storage !== product2.storage) {
        comparisons.push(`Almacenamiento: ${product1.storage} vs ${product2.storage}`);
    }
    
    return comparisons;
}

// Exportar funciones para uso global
window.HardwareServices = {
    calculateCustomConfiguration,
    compareSpecs,
    resetMaquinariaProductFilter
};

// Animación de vibración para CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes vibrate {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
    
    @keyframes hardwarePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);