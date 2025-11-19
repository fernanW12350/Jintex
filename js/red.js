// js/red.js

// ===== CONFIGURACIÓN INICIAL ESPECÍFICA PARA RED =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades específicas de red hola
    initRedPreloader();
    initRedAnimations();
    initRedProductFilter();
    initRedServiceInteractions();
    initNetworkVisualizations();
    initRedFormHandlers();
    initRedPerformance();
});

// ===== PRELOADER ESPECIALIZADO PARA RED =====
function initRedPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    // Precargar imágenes específicas de red
    preloadRedImages();
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }, 3000);
}

function preloadRedImages() {
    const redImages = [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ];
    
    redImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===== ANIMACIONES ESPECÍFICAS PARA RED =====
function initRedAnimations() {
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
    
    // Animaciones de iconos de red
    animateNetworkIcons();
    animateProcessSteps();
    initNetworkParticles();
}

function animateNetworkIcons() {
    const networkIcons = document.querySelectorAll('.network-icon, .icon-container');
    
    networkIcons.forEach((icon, index) => {
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

function animateProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Animación secuencial
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'scale(1)';
        }, index * 300);
        
        // Efecto de pulso en hover
        step.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

function initNetworkParticles() {
    const heroParticles = document.querySelector('.red-hero-particles');
    if (!heroParticles) return;
    
    // Efecto de partículas dinámicas
    setInterval(() => {
        createNetworkParticle(heroParticles);
    }, 1000);
}

function createNetworkParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
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
        { opacity: 0, transform: 'scale(0)' },
        { opacity: 0.8, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0)' }
    ], {
        duration: 2000,
        easing: 'ease-out'
    });
    
    // Eliminar después de la animación
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// ===== FILTRO DE PRODUCTOS DE RED =====
function initRedProductFilter() {
    const filterButtons = document.querySelectorAll('#red-filters [data-filter]');
    const products = document.querySelectorAll('.producto-red');
    const productosContainer = document.getElementById('red-productos-container');
    
    if (filterButtons.length === 0 || products.length === 0) return;
    
    // Precargar imágenes de productos de red
    preloadRedProductImages();
    
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
            filterRedProducts(products, filterValue, productosContainer);
        });
    });
}

function filterRedProducts(products, filterValue, container) {
    let visibleCount = 0;
    const animationDuration = 300;
    
    // Ocultar mensaje anterior si existe
    hideNoRedProductsMessage();
    
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
            showNoRedProductsMessage(container);
        }
    }, products.length * 80 + animationDuration);
}

function showNoRedProductsMessage(container) {
    let message = document.getElementById('no-red-products-message');
    
    if (!message) {
        message = document.createElement('div');
        message.id = 'no-red-products-message';
        message.className = 'col-12 text-center py-5';
        message.innerHTML = `
            <div class="text-muted" data-aos="fade-up">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h4 class="mb-3">No se encontraron productos</h4>
                <p class="mb-4">No tenemos productos disponibles en esta categoría actualmente.</p>
                <button class="btn btn-primary" onclick="resetRedProductFilter()">
                    <i class="fas fa-redo me-2"></i>Mostrar Todos
                </button>
            </div>
        `;
        container.appendChild(message);
    }
}

function hideNoRedProductsMessage() {
    const message = document.getElementById('no-red-products-message');
    if (message) {
        message.remove();
    }
}

function resetRedProductFilter() {
    const allButton = document.querySelector('#red-filters [data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
}

function preloadRedProductImages() {
    const productImages = document.querySelectorAll('.producto-red .product-image');
    
    productImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
        
        tempImg.onload = function() {
            img.classList.add('loaded');
            img.style.opacity = '1';
        };
        
        tempImg.onerror = function() {
            console.warn('Error cargando imagen del producto de red:', img.src);
            img.style.opacity = '1';
            img.alt = 'Imagen no disponible';
        };
    });
}

// ===== INTERACCIONES DE SERVICIOS =====
function initRedServiceInteractions() {
    const serviceCards = document.querySelectorAll('.hover-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Efectos hover mejorados para tarjetas de servicios
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
                showServiceDetails(serviceTitle);
            }
        });
    });
    
    // Funcionalidad "Consultar" mejorada para productos de red
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productCategory = productCard.closest('.producto-red').getAttribute('data-category');
            
            // Animación de confirmación mejorada
            animateRedProductConsult(this, productName, productCategory);
        });
    });
}

function animateRedProductConsult(button, productName, category) {
    const originalText = button.innerHTML;
    const originalClass = button.className;
    
    // Animación de éxito
    button.innerHTML = '<i class="fas fa-check me-1"></i>Consultado';
    button.className = 'btn btn-success btn-sm rounded-pill add-to-cart';
    button.style.transform = 'scale(0.95)';
    
    // Mostrar notificación mejorada
    showRedProductNotification(productName, category);
    
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

function showRedProductNotification(productName, category) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.style.marginTop = '80px';
    
    const categoryColors = {
        'switches': 'primary',
        'routers': 'success',
        'wireless': 'warning',
        'cableado': 'info'
    };
    
    const badgeColor = categoryColors[category] || 'primary';
    
    toast.innerHTML = `
        <div class="toast show" role="alert" style="min-width: 300px;">
            <div class="toast-header bg-${badgeColor} text-white">
                <i class="fas fa-network-wired me-2"></i>
                <strong class="me-auto">Producto consultado</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close btn-close-white" onclick="this.closest('.toast').remove()"></button>
            </div>
            <div class="toast-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1">${productName}</h6>
                        <p class="mb-1 text-muted small">Producto de red</p>
                    </div>
                    <span class="badge bg-${badgeColor}">${category}</span>
                </div>
                <div class="mt-2 pt-2 border-top">
                    <small class="text-muted">Nuestro equipo de redes te contactará pronto</small>
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

function showServiceDetails(serviceName) {
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

// ===== VISUALIZACIONES DE RED =====
function initNetworkVisualizations() {
    // Podrías agregar aquí visualizaciones SVG de redes
    createNetworkDiagram();
}

function createNetworkDiagram() {
    // Ejemplo básico de diagrama de red
    const networkContainer = document.createElement('div');
    networkContainer.className = 'network-diagram';
    networkContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 200px;
        height: 150px;
        opacity: 0.1;
        pointer-events: none;
        z-index: -1;
    `;
    
    networkContainer.innerHTML = `
        <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <!-- Nodos de red -->
            <circle cx="50" cy="50" r="8" fill="var(--primary)" class="network-node"/>
            <circle cx="150" cy="50" r="8" fill="var(--success)" class="network-node"/>
            <circle cx="100" cy="100" r="8" fill="var(--warning)" class="network-node"/>
            
            <!-- Conexiones -->
            <line x1="50" y1="50" x2="100" y2="100" stroke="var(--primary)" stroke-width="2" class="network-connection"/>
            <line x1="150" y1="50" x2="100" y2="100" stroke="var(--success)" stroke-width="2" class="network-connection"/>
            <line x1="50" y1="50" x2="150" y2="50" stroke="var(--info)" stroke-width="2" class="network-connection"/>
        </svg>
    `;
    
    document.body.appendChild(networkContainer);
    
    // Animación de parpadeo en nodos
    setInterval(() => {
        const nodes = document.querySelectorAll('.network-node');
        nodes.forEach(node => {
            node.style.opacity = Math.random() > 0.5 ? '1' : '0.5';
        });
    }, 1000);
}

// ===== MANEJADORES DE FORMULARIOS ESPECÍFICOS =====
function initRedFormHandlers() {
    // Manejar enlaces de presupuesto
    const budgetLinks = document.querySelectorAll('a[href="formulario.html"]');
    budgetLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Podrías agregar parámetros específicos para red
            console.log('Navegando a formulario de presupuesto para servicios de red');
        });
    });
}

// ===== OPTIMIZACIONES DE RENDIMIENTO ESPECÍFICAS =====
function initRedPerformance() {
    // Lazy loading para imágenes de productos de red
    initRedLazyLoading();
    
    // Prefetch para páginas relacionadas
    initRedLinkPrefetch();
}

function initRedLazyLoading() {
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

function initRedLinkPrefetch() {
    // Prefetch para páginas relacionadas con red
    const relatedPages = [
        'maquinaria.html',
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

// ===== UTILIDADES ESPECÍFICAS PARA RED =====
// Función para calcular presupuestos de cableado
function calculateCablingBudget(squareMeters, points, complexity = 'medium') {
    const baseRate = 15; // € por punto
    const complexityMultipliers = {
        'low': 0.8,
        'medium': 1,
        'high': 1.3
    };
    
    const multiplier = complexityMultipliers[complexity] || 1;
    return Math.round(points * baseRate * multiplier);
}

// Función para validar direcciones IP
function isValidIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    
    const parts = ip.split('.');
    return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
    });
}

// Exportar funciones para uso global
window.RedServices = {
    calculateCablingBudget,
    isValidIP,
    resetRedProductFilter
};

// Animación de vibración para CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes vibrate {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);