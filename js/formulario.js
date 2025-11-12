// js/formulario.js

class FormularioContacto {
    constructor() {
        this.form = document.getElementById('formulario-contacto');
        this.campos = {
            nombre: document.getElementById('nombre'),
            email: document.getElementById('email'),
            telefono: document.getElementById('telefono'),
            asunto: document.getElementById('asunto'),
            mensaje: document.getElementById('mensaje'),
            privacidad: document.getElementById('privacidad')
        };
        this.contadorCaracteres = document.getElementById('contador-caracteres');
        this.botonEnviar = document.querySelector('.submit-btn');
        this.spinner = this.botonEnviar.querySelector('.spinner-border');
        
        this.inicializarEventos();
        this.inicializarContador();
        this.inicializarPreloader();
        this.inicializarBackToTop();
    }

    inicializarEventos() {
        // Evento de envío del formulario
        this.form.addEventListener('submit', (e) => this.manejarEnvio(e));

        // Eventos de validación en tiempo real
        Object.values(this.campos).forEach(campo => {
            campo.addEventListener('blur', () => this.validarCampo(campo));
            campo.addEventListener('input', () => this.limpiarValidacion(campo));
        });

        // Evento especial para el textarea
        this.campos.mensaje.addEventListener('input', () => this.actualizarContador());

        // Evento para el checkbox de privacidad
        this.campos.privacidad.addEventListener('change', () => this.validarCheckbox());

        // Formateo automático de teléfono
        this.campos.telefono.addEventListener('input', (e) => this.formatearTelefono(e));
    }

    inicializarContador() {
        this.actualizarContador();
    }

    inicializarPreloader() {
        // Ocultar preloader cuando la página cargue
        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.querySelector('.preloader');
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1000);
        });
    }

    inicializarBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    actualizarContador() {
        const longitud = this.campos.mensaje.value.length;
        this.contadorCaracteres.textContent = longitud;

        // Cambiar color según la longitud
        if (longitud < 50) {
            this.contadorCaracteres.className = 'text-danger';
        } else if (longitud >= 50 && longitud < 800) {
            this.contadorCaracteres.className = 'text-success';
        } else if (longitud >= 800 && longitud < 950) {
            this.contadorCaracteres.className = 'text-warning';
        } else {
            this.contadorCaracteres.className = 'text-danger';
        }
    }

    formatearTelefono(event) {
        let valor = event.target.value.replace(/\D/g, '');
        
        if (valor.startsWith('34')) {
            valor = valor.substring(2);
        }
        
        if (valor.length > 0) {
            valor = '+34 ' + valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        
        event.target.value = valor;
    }

    validarCampo(campo) {
        const valor = campo.value.trim();
        let esValido = true;
        let mensajeError = '';

        switch (campo.name) {
            case 'nombre':
                esValido = this.validarNombre(valor);
                mensajeError = 'Por favor, ingrese un nombre válido (mínimo 2 caracteres)';
                break;

            case 'email':
                esValido = this.validarEmail(valor);
                mensajeError = 'Por favor, ingrese un correo electrónico válido';
                break;

            case 'telefono':
                esValido = this.validarTelefono(valor);
                mensajeError = 'Por favor, ingrese un número de teléfono español válido';
                break;

            case 'asunto':
                esValido = this.validarSelect(valor);
                mensajeError = 'Por favor, seleccione un asunto para su consulta';
                break;

            case 'mensaje':
                esValido = this.validarMensaje(valor);
                mensajeError = 'Por favor, escriba un mensaje con al menos 50 caracteres';
                break;
        }

        this.mostrarValidacion(campo, esValido, mensajeError);
        return esValido;
    }

    validarCheckbox() {
        const esValido = this.campos.privacidad.checked;
        this.mostrarValidacion(this.campos.privacidad, esValido, 'Debe aceptar la política de privacidad');
        return esValido;
    }

    validarNombre(nombre) {
        return nombre.length >= 2 && nombre.length <= 100 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/.test(nombre);
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validarTelefono(telefono) {
        const regex = /^(\+34|0034|34)?[ -]*(6|7|8|9)[ -]*([0-9][ -]*){8}$/;
        return regex.test(telefono.replace(/\s/g, ''));
    }

    validarSelect(valor) {
        return valor !== '';
    }

    validarMensaje(mensaje) {
        return mensaje.length >= 50 && mensaje.length <= 1000;
    }

    mostrarValidacion(campo, esValido, mensajeError) {
        // Limpiar clases anteriores
        campo.classList.remove('is-valid', 'is-invalid');
        
        if (esValido) {
            campo.classList.add('is-valid');
        } else {
            campo.classList.add('is-invalid');
            // Mostrar mensaje de error específico
            const feedback = campo.nextElementSibling?.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = mensajeError;
            }
        }
    }

    limpiarValidacion(campo) {
        campo.classList.remove('is-valid', 'is-invalid');
    }

    validarFormularioCompleto() {
        let esValido = true;

        // Validar todos los campos
        Object.values(this.campos).forEach(campo => {
            if (campo.type !== 'checkbox') {
                if (!this.validarCampo(campo)) {
                    esValido = false;
                }
            }
        });

        // Validar checkbox
        if (!this.validarCheckbox()) {
            esValido = false;
        }

        return esValido;
    }

    async manejarEnvio(evento) {
        evento.preventDefault();

        if (!this.validarFormularioCompleto()) {
            this.mostrarError('Por favor, complete todos los campos requeridos correctamente.');
            return;
        }

        // Mostrar loading
        this.mostrarLoading(true);

        try {
            // Simular envío a servidor
            await this.enviarDatos();
            
            // Mostrar éxito
            this.mostrarExito();
            
            // Resetear formulario
            this.resetearFormulario();

        } catch (error) {
            this.mostrarError('Ha ocurrido un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
        } finally {
            this.mostrarLoading(false);
        }
    }

    mostrarLoading(mostrar) {
        if (mostrar) {
            this.botonEnviar.disabled = true;
            this.spinner.classList.remove('d-none');
            this.botonEnviar.querySelector('i').classList.add('d-none');
        } else {
            this.botonEnviar.disabled = false;
            this.spinner.classList.add('d-none');
            this.botonEnviar.querySelector('i').classList.remove('d-none');
        }
    }

    async enviarDatos() {
        // Simular envío a servidor
        const datosFormulario = new FormData(this.form);
        const datos = Object.fromEntries(datosFormulario);

        console.log('Datos del formulario:', datos);

        // Aquí iría la llamada real a tu API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular éxito (90%) o error (10%)
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });
    }

    mostrarExito() {
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
    }

    mostrarError(mensaje) {
        // Crear toast de error
        const toast = document.createElement('div');
        toast.className = 'alert alert-danger alert-dismissible fade show position-fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '1060';
        toast.style.minWidth = '300px';
        toast.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }

    resetearFormulario() {
        this.form.reset();
        this.actualizarContador();
        
        // Limpiar validaciones
        Object.values(this.campos).forEach(campo => {
            this.limpiarValidacion(campo);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FormularioContacto();
});

// Manejar navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});