// ===== JAVASCRIPT ESPECÍFICO PARA PÁGINA DE LICENCIAS ===== hola

document.addEventListener('DOMContentLoaded', function() {
    initLicensePage();
});

function initLicensePage() {
    initLicenseFilters();
    initLicenseInteractions();
    initFAQAccordion();
    initPricingCards();
}

// ===== FILTROS DE LICENCIAS =====
function initLicenseFilters() {
    const filterButtons = document.querySelectorAll('#license-filters [data-filter]');
    const licenseCategories = document.querySelectorAll('.license-category');
    
    if (filterButtons.length === 0 || licenseCategories.length === 0) return;
    
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
            
            // Filtrar categorías de licencias
            filterLicenseCategories(licenseCategories, filterValue);
        });
    });
}

function filterLicenseCategories(categories, filterValue) {
    categories.forEach(category => {
        const categoryType = getCategoryType(category);
        const shouldShow = filterValue === 'all' || categoryType === filterValue;
        
        if (shouldShow) {
            category.style.display = 'block';
            // Animar la aparición
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // Animar la desaparición
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            setTimeout(() => {
                category.style.display = 'none';
            }, 300);
        }
    });
}

function getCategoryType(category) {
    // Determinar el tipo de categoría basado en su contenido
    const header = category.querySelector('.category-header h3');
    if (!header) return 'all';
    
    const headerText = header.textContent.toLowerCase();
    
    if (headerText.includes('sistema') || headerText.includes('windows')) {
        return 'sistemas';
    } else if (headerText.includes('ofimática') || headerText.includes('office')) {
        return 'ofimatica';
    } else if (headerText.includes('seguridad') || headerText.includes('antivirus')) {
        return 'seguridad';
    } else if (headerText.includes('desarrollo')) {
        return 'desarrollo';
    }
    
    return 'all';
}

// ===== INTERACCIONES DE LICENCIAS =====
function initLicenseInteractions() {
    const licenseCards = document.querySelectorAll('.license-card');
    const consultButtons = document.querySelectorAll('.add-to-cart');
    
    // Efectos hover para tarjetas de licencias
    licenseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const icon = this.querySelector('.license-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const icon = this.querySelector('.license-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Funcionalidad para botones "Consultar"
    consultButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const licenseCard = this.closest('.license-card');
            const licenseName = licenseCard.querySelector('.card-title').textContent;
            const licenseType = getLicenseType(licenseCard);
            
            // Animación de confirmación
            animateConsultButton(this, licenseName, licenseType);
        });
    });
}

function getLicenseType(licenseCard) {
    const categoryHeader = licenseCard.closest('.license-category').querySelector('.category-header h3');
    return categoryHeader ? categoryHeader.textContent : 'Software';
}

function animateConsultButton(button, licenseName, licenseType) {
    const originalText = button.innerHTML;
    const originalClass = button.className;
    
    // Animación de éxito
    button.innerHTML = '<i class="fas fa-check me-1"></i>Consultado';
    button.className = 'btn btn-success rounded-pill add-to-cart';
    button.style.transform = 'scale(0.95)';
    
    // Mostrar notificación
    showLicenseNotification(licenseName, licenseType);
    
    // Efecto de vibración en la tarjeta
    const licenseCard = button.closest('.license-card');
    licenseCard.style.animation = 'vibrate 0.3s ease';
    
    setTimeout(() => {
        licenseCard.style.animation = '';
    }, 300);
    
    // Restaurar estado después de 2 segundos
    setTimeout(() => {
        button.innerHTML = originalText;
        button.className = originalClass;
        button.style.transform = '';
    }, 2000);
}

function showLicenseNotification(licenseName, licenseType) {
    // Crear notificación toast
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.style.marginTop = '80px';
    
    const typeColors = {
        'Sistemas Operativos': 'primary',
        'Software de Ofimática': 'success', 
        'Software de Seguridad': 'warning',
        'Software': 'info'
    };
    
    const badgeColor = typeColors[licenseType] || 'primary';
    
    toast.innerHTML = `
        <div class="toast show" role="alert" style="min-width: 300px;">
            <div class="toast-header bg-${badgeColor} text-white">
                <i class="fas fa-info-circle me-2"></i>
                <strong class="me-auto">Licencia consultada</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close btn-close-white" onclick="this.closest('.toast').remove()"></button>
            </div>
            <div class="toast-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1">${licenseName}</h6>
                        <p class="mb-1 text-muted small">${licenseType}</p>
                    </div>
                    <span class="badge bg-${badgeColor}">${licenseType.split(' ')[0]}</span>
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

// ===== ACORDEÓN DE PREGUNTAS FRECUENTES =====
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isExpanded = icon.classList.contains('fa-chevron-up');
            
            // Cerrar todos los acordeones primero
            faqQuestions.forEach(q => {
                const qIcon = q.querySelector('i');
                const qAnswer = q.nextElementSibling;
                
                if (q !== this) {
                    qIcon.classList.remove('fa-chevron-up');
                    qIcon.classList.add('fa-chevron-down');
                    qAnswer.classList.remove('show');
                }
            });
            
            // Alternar estado del acordeón clickeado
            if (isExpanded) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

// ===== TARJETAS DE PRECIOS =====
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    
    // Efectos hover para tarjetas de precios
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Funcionalidad para botones de precios
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pricingCard = this.closest('.pricing-card');
            const planName = pricingCard.querySelector('.pricing-header h4').textContent;
            const planDescription = pricingCard.querySelector('.pricing-header p').textContent;
            
            // Animación del botón
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...';
            this.disabled = true;
            
            // Simular procesamiento
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Mostrar modal de contacto
                showPricingContactModal(planName, planDescription);
            }, 1500);
        });
    });
}

function showPricingContactModal(planName, planDescription) {
    // Crear modal dinámico para contacto
    const modalHTML = `
        <div class="modal fade" id="pricingContactModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Solicitar información - ${planName}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Estás interesado en el plan <strong>${planName}</strong>: ${planDescription}</p>
                        <p>Por favor, contáctanos para obtener información detallada sobre precios y condiciones.</p>
                        <div class="contact-info mt-4">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-phone text-primary me-2"></i>
                                <span>+34 900 000 000</span>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-envelope text-primary me-2"></i>
                                <span>info@jintex.com</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-clock text-primary me-2"></i>
                                <span>Lunes a Viernes: 9:00 - 18:00</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <a href="formulario.html?plan=${encodeURIComponent(planName)}" class="btn btn-primary">Enviar formulario</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('pricingContactModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('pricingContactModal'));
    modal.show();
}

// ===== ANIMACIONES ESPECÍFICAS =====
// Agregar animación de vibración al CSS si no existe
if (!document.querySelector('style[data-license-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-license-animations', 'true');
    style.textContent = `
        @keyframes vibrate {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
    `;
    document.head.appendChild(style);
}

// ===== INICIALIZACIÓN ADICIONAL CUANDO EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que AOS se inicialice si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
});

// Exportar funciones para uso global si es necesario
window.Licencias = {
    initLicensePage,
    showLicenseNotification,
    showPricingContactModal
};