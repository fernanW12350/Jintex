// ===== JAVASCRIPT ESPECÍFICO PARA PÁGINA DE PRODUCTOS =====

// Datos de productos (simulados)
const productosData = [
    {
        id: 1,
        nombre: "Dell OptiPlex 7070",
        categoria: "equipos",
        descripcion: "Intel Core i5, 8GB RAM, 256GB SSD",
        precio: 449,
        precioTexto: "449€",
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.5,
        stock: 15,
        especificaciones: {
            "Procesador": "Intel Core i5",
            "RAM": "8GB DDR4",
            "Almacenamiento": "256GB SSD",
            "Sistema Operativo": "Windows 11 Pro"
        },
        badge: "Nuevo",
        badgeColor: "primary"
    },
    {
        id: 2,
        nombre: "HP EliteBook 840 G5",
        categoria: "equipos",
        descripcion: "Intel Core i7, 16GB RAM, 512GB SSD",
        precio: 699,
        precioTexto: "699€",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.2,
        stock: 8,
        especificaciones: {
            "Procesador": "Intel Core i7",
            "RAM": "16GB DDR4",
            "Almacenamiento": "512GB SSD",
            "Pantalla": "14\" FHD"
        },
        badge: "Reacondicionado",
        badgeColor: "success"
    },
    {
        id: 3,
        nombre: "Cisco Catalyst 2960",
        categoria: "red",
        descripcion: "Switch 24 puertos Gigabit",
        precio: 350,
        precioTexto: "350€",
        imagen: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.8,
        stock: 12,
        especificaciones: {
            "Puertos": "24 x Gigabit Ethernet",
            "Velocidad": "10/100/1000 Mbps",
            "Gestión": "Web, CLI",
            "Rack": "1U"
        },
        badge: "Networking",
        badgeColor: "info"
    },
    {
        id: 4,
        nombre: "Dell PowerEdge R740",
        categoria: "servidores",
        descripcion: "Servidor rack 2U, Xeon Silver",
        precio: 1899,
        precioTexto: "1.899€",
        imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.7,
        stock: 5,
        especificaciones: {
            "Procesador": "Xeon Silver 4210",
            "RAM": "32GB DDR4",
            "Almacenamiento": "2x 1TB HDD",
            "Bahías": "8 x 2.5\""
        },
        badge: "Servidor",
        badgeColor: "warning"
    },
    {
        id: 5,
        nombre: "HP ProDesk 600 G4",
        categoria: "reacondicionados",
        descripcion: "Intel Core i5, 8GB RAM, 256GB SSD",
        precio: 299,
        precioTexto: "299€",
        imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.3,
        stock: 20,
        especificaciones: {
            "Procesador": "Intel Core i5",
            "RAM": "8GB DDR4",
            "Almacenamiento": "256GB SSD",
            "Garantía": "1 año"
        },
        badge: "Reacondicionado",
        badgeColor: "success"
    },
    {
        id: 6,
        nombre: "Monitor Dell UltraSharp 27\"",
        categoria: "perifericos",
        descripcion: "4K UHD, USB-C, IPS",
        precio: 429,
        precioTexto: "429€",
        imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.6,
        stock: 18,
        especificaciones: {
            "Tamaño": "27 pulgadas",
            "Resolución": "4K UHD (3840x2160)",
            "Panel": "IPS",
            "Conectividad": "USB-C, HDMI, DisplayPort"
        },
        badge: "Monitor",
        badgeColor: "info"
    },
    {
        id: 7,
        nombre: "HP LaserJet Pro M404",
        categoria: "perifericos",
        descripcion: "Impresora láser monocromo",
        precio: 199,
        precioTexto: "199€",
        imagen: "https://images.unsplash.com/photo-1499363536502-87642509e31b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.1,
        stock: 25,
        especificaciones: {
            "Tecnología": "Láser monocromo",
            "Velocidad": "40 ppm",
            "Resolución": "1200 x 1200 dpi",
            "Conectividad": "WiFi, Ethernet, USB"
        },
        badge: "Impresora",
        badgeColor: "secondary"
    },
    {
        id: 8,
        nombre: "Ubiquiti UniFi Switch 24",
        categoria: "red",
        descripcion: "Switch gestionable 24 puertos",
        precio: 299,
        precioTexto: "299€",
        imagen: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.4,
        stock: 10,
        especificaciones: {
            "Puertos": "24 x Gigabit Ethernet",
            "POE": "16 puertos POE+",
            "Gestión": "UniFi Controller",
            "Rack": "1U"
        },
        badge: "Networking",
        badgeColor: "info"
    },
    {
        id: 9,
        nombre: "Lenovo ThinkCentre M720",
        categoria: "reacondicionados",
        descripcion: "Intel Core i5, 8GB RAM, 512GB SSD",
        precio: 329,
        precioTexto: "329€",
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.0,
        stock: 15,
        especificaciones: {
            "Procesador": "Intel Core i5",
            "RAM": "8GB DDR4",
            "Almacenamiento": "512GB SSD",
            "Garantía": "1 año"
        },
        badge: "Reacondicionado",
        badgeColor: "success"
    },
    {
        id: 10,
        nombre: "Dell Precision 3440",
        categoria: "equipos",
        descripcion: "Workstation Intel Xeon, Quadro P620",
        precio: 1299,
        precioTexto: "1.299€",
        imagen: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.9,
        stock: 6,
        especificaciones: {
            "Procesador": "Intel Xeon E-2224",
            "RAM": "16GB ECC DDR4",
            "GPU": "NVIDIA Quadro P620",
            "Almacenamiento": "512GB SSD"
        },
        badge: "Workstation",
        badgeColor: "primary"
    },
    {
        id: 11,
        nombre: "HP ProLiant DL380",
        categoria: "servidores",
        descripcion: "Servidor rack 2U, Xeon Gold",
        precio: 2499,
        precioTexto: "2.499€",
        imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.8,
        stock: 3,
        especificaciones: {
            "Procesador": "Xeon Gold 5218",
            "RAM": "64GB DDR4",
            "Almacenamiento": "4x 1TB SAS",
            "Bahías": "8 x 2.5\""
        },
        badge: "Servidor",
        badgeColor: "warning"
    },
    {
        id: 12,
        nombre: "Teclado Microsoft Sculpt",
        categoria: "perifericos",
        descripcion: "Teclado ergonómico inalámbrico",
        precio: 89,
        precioTexto: "89€",
        imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.2,
        stock: 30,
        especificaciones: {
            "Tipo": "Ergonómico",
            "Conectividad": "Wireless 2.4GHz",
            "Batería": "2x AA (incluidas)",
            "Compatibilidad": "Windows"
        },
        badge: "Periférico",
        badgeColor: "secondary"
    }
];

// Variables globales
let productosFiltrados = [...productosData];
let vistaActual = 'grid';
let productosPorPagina = 8;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded', function() {
    initProductosPage();
});

function initProductosPage() {
    initFiltros();
    initBusqueda();
    initVistas();
    initOrdenacion();
    initProductosInteractions();
    renderizarProductos();
    actualizarContador();
    initPaginacion();
}

// ===== FILTROS =====
function initFiltros() {
    const filterButtons = document.querySelectorAll('#product-filters [data-filter]');
    
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
            
            // Filtrar productos
            filtrarProductos(filterValue);
            
            // Reiniciar paginación
            paginaActual = 1;
            renderizarProductos();
            initPaginacion();
        });
    });
}

function filtrarProductos(categoria) {
    if (categoria === 'all') {
        productosFiltrados = [...productosData];
    } else {
        productosFiltrados = productosData.filter(producto => 
            producto.categoria === categoria
        );
    }
    actualizarContador();
}

// ===== BÚSQUEDA =====
function initBusqueda() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            productosFiltrados = [...productosData];
        } else {
            productosFiltrados = productosData.filter(producto => 
                producto.nombre.toLowerCase().includes(searchTerm) ||
                producto.descripcion.toLowerCase().includes(searchTerm) ||
                producto.categoria.toLowerCase().includes(searchTerm)
            );
        }
        
        // Reiniciar paginación
        paginaActual = 1;
        renderizarProductos();
        initPaginacion();
        actualizarContador();
    });
}

// ===== VISTAS (Grid/Lista) =====
function initVistas() {
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const productosContainer = document.getElementById('productos-container');
    
    gridView.addEventListener('click', function() {
        if (vistaActual !== 'grid') {
            vistaActual = 'grid';
            gridView.classList.add('active');
            listView.classList.remove('active');
            productosContainer.classList.remove('list-view');
            renderizarProductos();
        }
    });
    
    listView.addEventListener('click', function() {
        if (vistaActual !== 'list') {
            vistaActual = 'list';
            listView.classList.add('active');
            gridView.classList.remove('active');
            productosContainer.classList.add('list-view');
            renderizarProductos();
        }
    });
}

// ===== ORDENACIÓN =====
function initOrdenacion() {
    const sortSelect = document.getElementById('sortSelect');
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        
        switch(sortValue) {
            case 'price-asc':
                productosFiltrados.sort((a, b) => a.precio - b.precio);
                break;
            case 'price-desc':
                productosFiltrados.sort((a, b) => b.precio - a.precio);
                break;
            case 'name-asc':
                productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'name-desc':
                productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            case 'rating':
                productosFiltrados.sort((a, b) => b.rating - a.rating);
                break;
            default:
                productosFiltrados = [...productosData];
        }
        
        renderizarProductos();
    });
}

// ===== RENDERIZADO DE PRODUCTOS =====
function renderizarProductos() {
    const productosContainer = document.getElementById('productos-container');
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);
    
    productosContainer.innerHTML = '';
    
    if (productosPagina.length === 0) {
        mostrarMensajeNoProductos();
        return;
    }
    
    productosPagina.forEach((producto, index) => {
        const productoHTML = crearProductoHTML(producto, index);
        productosContainer.innerHTML += productoHTML;
    });
    
    // Reiniciar interacciones para los nuevos productos
    initProductosInteractions();
}

function crearProductoHTML(producto, index) {
    const ratingStars = generarRatingStars(producto.rating);
    const especificacionesHTML = generarEspecificacionesHTML(producto.especificaciones);
    
    if (vistaActual === 'grid') {
        return `
            <div class="col-md-6 col-lg-4 col-xl-3 producto" data-aos="fade-up" data-aos-delay="${(index % 4) * 100}">
                <div class="card h-100 border-0 shadow-sm product-card">
                    <div class="card-img-top bg-light text-center p-4 position-relative">
                        <span class="badge bg-${producto.badgeColor} position-absolute top-0 start-0 m-3">${producto.badge}</span>
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid product-image">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${producto.nombre}</h5>
                        <p class="card-text text-muted small">${producto.descripcion}</p>
                        
                        <div class="product-specs">
                            ${especificacionesHTML}
                        </div>
                        
                        <div class="product-rating mb-2">
                            ${ratingStars}
                            <small class="text-muted ms-1">(${producto.rating})</small>
                        </div>
                        
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="h5 mb-0 text-primary fw-bold">${producto.precioTexto}</span>
                                <button class="btn btn-primary btn-sm rounded-pill add-to-cart" data-product-id="${producto.id}">
                                    <i class="fas fa-shopping-cart me-1"></i>Consultar
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted">Stock: ${producto.stock} unidades</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Vista de lista
        return `
            <div class="col-12 producto list-view" data-aos="fade-up" data-aos-delay="${(index % 4) * 100}">
                <div class="card h-100 border-0 shadow-sm product-card">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <div class="card-img-top bg-light text-center p-4 h-100 position-relative">
                                <span class="badge bg-${producto.badgeColor} position-absolute top-0 start-0 m-3">${producto.badge}</span>
                                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid product-image">
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="card-body d-flex flex-column h-100">
                                <div class="product-details">
                                    <div class="product-info">
                                        <h5 class="card-title fw-bold">${producto.nombre}</h5>
                                        <p class="card-text text-muted">${producto.descripcion}</p>
                                        
                                        <div class="product-specs">
                                            ${especificacionesHTML}
                                        </div>
                                        
                                        <div class="product-rating mb-2">
                                            ${ratingStars}
                                            <small class="text-muted ms-1">(${producto.rating})</small>
                                        </div>
                                    </div>
                                    <div class="product-actions">
                                        <span class="h4 mb-0 text-primary fw-bold">${producto.precioTexto}</span>
                                        <button class="btn btn-primary rounded-pill add-to-cart" data-product-id="${producto.id}">
                                            <i class="fas fa-shopping-cart me-1"></i>Consultar
                                        </button>
                                        <div class="mt-2">
                                            <small class="text-muted">Stock: ${producto.stock} unidades</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function generarRatingStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars.push('<i class="fas fa-star text-warning"></i>');
    }
    
    if (hasHalfStar) {
        stars.push('<i class="fas fa-star-half-alt text-warning"></i>');
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push('<i class="far fa-star text-warning"></i>');
    }
    
    return stars.join('');
}

function generarEspecificacionesHTML(especificaciones) {
    let html = '';
    let count = 0;
    
    for (const [key, value] of Object.entries(especificaciones)) {
        if (count < 3) { // Mostrar solo 3 especificaciones
            html += `<div class="product-spec"><span>${key}:</span> <span>${value}</span></div>`;
            count++;
        }
    }
    
    return html;
}

function mostrarMensajeNoProductos() {
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = `
        <div class="col-12 text-center py-5" id="no-products-message">
            <div class="text-muted" data-aos="fade-up">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h4 class="mb-3">No se encontraron productos</h4>
                <p class="mb-4">Intenta con otros filtros o términos de búsqueda.</p>
                <button class="btn btn-primary" onclick="resetFiltros()">
                    <i class="fas fa-redo me-2"></i>Mostrar Todos
                </button>
            </div>
        </div>
    `;
}

// ===== INTERACCIONES DE PRODUCTOS =====
function initProductosInteractions() {
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
    
    // Funcionalidad "Consultar"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-product-id');
            const producto = productosData.find(p => p.id == productId);
            
            if (producto) {
                animateAddToCart(this, producto);
            }
        });
    });
}

function animateAddToCart(button, producto) {
    const originalText = button.innerHTML;
    const originalClass = button.className;
    
    // Animación de éxito
    button.innerHTML = '<i class="fas fa-check me-1"></i>Consultado';
    button.className = 'btn btn-success btn-sm rounded-pill add-to-cart';
    button.style.transform = 'scale(0.95)';
    
    // Mostrar notificación
    showProductNotification(producto);
    
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

function showProductNotification(producto) {
    // Crear notificación toast
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.style.marginTop = '80px';
    
    const categoryColors = {
        'equipos': 'primary',
        'red': 'info',
        'servidores': 'warning',
        'reacondicionados': 'success',
        'perifericos': 'secondary'
    };
    
    const badgeColor = categoryColors[producto.categoria] || 'primary';
    
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
                        <h6 class="mb-1">${producto.nombre}</h6>
                        <p class="mb-1 text-muted small">${producto.precioTexto}</p>
                    </div>
                    <span class="badge bg-${badgeColor}">${producto.categoria}</span>
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

// ===== PAGINACIÓN =====
function initPaginacion() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = '';
    
    if (totalPaginas <= 1) return;
    
    // Botón anterior
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${paginaActual === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Anterior" ${paginaActual === 1 ? 'tabindex="-1" aria-disabled="true"' : ''}>
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    if (paginaActual > 1) {
        prevLi.querySelector('.page-link').addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPagina(paginaActual - 1);
        });
    }
    pagination.appendChild(prevLi);
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        
        li.querySelector('.page-link').addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPagina(i);
        });
        
        pagination.appendChild(li);
    }
    
    // Botón siguiente
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`;
    nextLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Siguiente" ${paginaActual === totalPaginas ? 'tabindex="-1" aria-disabled="true"' : ''}>
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    if (paginaActual < totalPaginas) {
        nextLi.querySelector('.page-link').addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPagina(paginaActual + 1);
        });
    }
    pagination.appendChild(nextLi);
}

function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarProductos();
    initPaginacion();
    window.scrollTo({
        top: document.getElementById('catalogo').offsetTop - 100,
        behavior: 'smooth'
    });
}

// ===== UTILIDADES =====
function actualizarContador() {
    const visibleCount = document.getElementById('visibleCount');
    const totalCount = document.getElementById('totalCount');
    
    const productosVisibles = Math.min(productosFiltrados.length, productosPorPagina);
    
    visibleCount.textContent = productosVisibles;
    totalCount.textContent = productosFiltrados.length;
}

function resetFiltros() {
    // Restablecer filtros
    const allButton = document.querySelector('#product-filters [data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
    
    // Limpiar búsqueda
    document.getElementById('searchInput').value = '';
    
    // Restablecer ordenación
    document.getElementById('sortSelect').value = 'default';
    
    // Restablecer vista a grid
    if (vistaActual !== 'grid') {
        document.getElementById('gridView').click();
    }
}

// ===== ANIMACIONES ESPECÍFICAS =====
// Agregar animación de vibración al CSS si no existe
if (!document.querySelector('style[data-productos-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-productos-animations', 'true');
    style.textContent = `
        @keyframes vibrate {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
    `;
    document.head.appendChild(style);
}

// ===== INICIALIZACIÓN ADICIONAL =====
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
window.Productos = {
    initProductosPage,
    resetFiltros,
    showProductNotification
};