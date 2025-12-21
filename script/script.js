// ===================================
// SCRIPT OPTIMIZADO Y CORREGIDO
// Details Barras - Bartender
// ===================================

// 1. PRELOADER
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 1500);
    }
});

// Fallback por si falla el load
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    }
}, 5000);

// ===================================
// 2. MENÚ HAMBURGUESA
// ===================================
(function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) {
        console.warn('⚠️ Elementos del menú no encontrados');
        return;
    }

    // Toggle menú
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        console.log('🍔 Menú:', isActive ? 'Cerrado' : 'Abierto');
    });

    // Cerrar al hacer clic en un link
    navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    console.log('✅ Menú inicializado');
})();

// ===================================
// 3. SMOOTH SCROLL
// ===================================
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
});

// ===================================
// 4. FAQ ACCORDION
// ===================================
(function initFAQ() {
    const faqList = document.querySelector('.faq-list');
    if (!faqList) return;

    faqList.addEventListener('click', (e) => {
        const question = e.target.closest('.faq-question');
        if (!question) return;

        const item = question.closest('.faq-item');
        if (!item) return;

        const isActive = item.classList.contains('active');

        // Cerrar todos los demás
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
            }
        });

        // Toggle el actual
        item.classList.toggle('active');
    });

    console.log('✅ FAQ inicializado');
})();

// ===================================
// 5. VIDEO HERO
// ===================================
(function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;

    // Detectar conexión lenta
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' || 
        connection.saveData === true
    );

    if (isSlowConnection) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.preload = 'none';
        console.log('📶 Conexión lenta: Video en modo poster');
        return;
    }

    heroVideo.addEventListener('loadeddata', () => {
        console.log('✅ Video hero cargado');
    }, { once: true });

    heroVideo.addEventListener('error', () => {
        console.warn('⚠️ Error al cargar video hero');
        heroVideo.style.display = 'none';
    }, { once: true });
})();

// ===================================
// 6. VIDEO DE SERVICIO
// ===================================
(function initServicioVideo() {
    const playButton = document.getElementById('playButton');
    const servicioVideo = document.querySelector('.servicio-video');
    const videoContainer = document.querySelector('.video-container');

    if (!playButton || !servicioVideo || !videoContainer) return;

    // Play/Pause
    playButton.addEventListener('click', () => {
        if (servicioVideo.paused) {
            servicioVideo.play().catch(err => {
                console.warn('⚠️ Error al reproducir:', err);
            });
        } else {
            servicioVideo.pause();
        }
    });

    // Estados del video
    servicioVideo.addEventListener('play', () => {
        videoContainer.classList.add('playing');
    });

    servicioVideo.addEventListener('pause', () => {
        videoContainer.classList.remove('playing');
    });

    servicioVideo.addEventListener('ended', () => {
        videoContainer.classList.remove('playing');
    });

    // Lazy load con IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    servicioVideo.preload = 'metadata';
                    observer.disconnect(); // ✅ IMPORTANTE: Desconectar después de usarlo
                }
            });
        }, { rootMargin: '200px' });

        observer.observe(servicioVideo);
    }

    console.log('✅ Video de servicio inicializado');
})();

// ===================================
// 7. GALERÍA Y LIGHTBOX
// ===================================
(function initGaleria() {
    const EVENTOS_DATA = [
        {
		
		 title: 'Cumpleaños',
            subtitle: '',
            description: '',
            location: 'Villa Urquiza, Buenos Aires',
            guests: '25 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542667/9._cumplea%C3%B1os-villa-urquiza-bartender-details_iik72j.webp'
           
        },
        {
		
		 title: 'Aniversario',
            subtitle: 'para Bardoteca 2025',
            description: '',
            location: 'San Telmo, Buenos Aires',
            guests: '100 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542666/8._aniversario-para-bardoteca-san-telmo-bartender-details_xv11a4.webp'
           
        },
        {
		    title: 'Cumpleaños',
            subtitle: '',
            description: '',
            location: 'Villa Devoto, Buenos Aires',
            guests: '40 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542666/7._cumplea%C3%B1os-villa-devoto-bartender-details_htkuwh.webp'
 
        },
        {
		   title: 'Cumpleaños',
            subtitle: '',
            description: '',
            location: 'Rincón de Milberg, Buenos Aires',
            guests: '50 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542666/6._cumplea%C3%B1os-rincon-de-milberg-bartender-details_snmqiw.webp'
           
        },
        {
            title: 'Activación',
            subtitle: 'para Fullescabio',
            description: '',
            location: 'San Telmo, Buenos Aires',
            guests: '60 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542666/5._activacion-para-fullescabio-san-telmo-bartender-details_ctcn4a.webp'
        },
        {
		  title: 'Activación',
            subtitle: 'para Yagmour',
            description: '',
            location: 'Unicenter, Buenos Aires',
            guests: '40 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542665/4._activaci%C3%B3n-para-yagmour-unicenter-bartender-details_badntx.webp'

        },
		  {
		    title: 'After Office',
            subtitle: ' para Bardoteca',
            description: '',
            location: 'San Telmo, Buenos Aires',
            guests: '80 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542665/3._after-office-para-bardoteca-san-telmo-bartender-details_k8jlyw.webp'
		  
         
        },
		  {
            title: 'Activación',
            subtitle: 'para Ginebra Llave',
            description: '',
            location: 'Recoleta, Buenos Aires',
            guests: '100 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542665/2._activacion-activaci%C3%B3n-para-ginebra-llave-recoleta-bartender-details_g1f7bw.webp'
        },
		  {
           title: 'Empresarial',
            subtitle: 'para Luxo',
            description: '',
            location: 'Palermo Soho, Buenos Aires',
            guests: '50 invitados',
            image: 'https://res.cloudinary.com/dliredzt9/image/upload/v1762542666/1._empresarial-para-luxo-palermo-soho-bartender-details_oztlnl.webp'
        }
    ];

    let currentIndex = 0;

    // Elementos
    const galeriaGrid = document.querySelector('.galeria-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxSubtitle = document.getElementById('lightboxSubtitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxGuests = document.getElementById('lightboxGuests');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');

    if (!galeriaGrid || !lightbox) {
        console.warn('⚠️ Galería no encontrada');
        return;
    }

    // Actualizar contenido del lightbox
    function updateLightboxContent(evento) {
        lightboxImage.src = evento.image;
        lightboxImage.alt = evento.title;
        lightboxTitle.textContent = evento.title;
        lightboxSubtitle.textContent = evento.subtitle;
        lightboxDescription.textContent = evento.description;
        lightboxLocation.textContent = evento.location;
        lightboxGuests.textContent = evento.guests;
    }

    // Abrir lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent(EVENTOS_DATA[index]);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('📸 Lightbox abierto:', EVENTOS_DATA[index].title);
    }

    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            lightboxImage.src = ''; // Limpiar imagen
        }, 300);
    }

    // Navegar
    function navigateLightbox(direction) {
        const length = EVENTOS_DATA.length;
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % length;
        } else {
            currentIndex = (currentIndex - 1 + length) % length;
        }
        updateLightboxContent(EVENTOS_DATA[currentIndex]);
    }

    // Event: Click en "Ver más"
    galeriaGrid.addEventListener('click', (e) => {
        const btnVerMas = e.target.closest('.btn-ver-mas');
        if (!btnVerMas) return;

        e.preventDefault();
        
        const item = btnVerMas.closest('.galeria-item');
        const index = parseInt(item.dataset.index);
        
        if (!isNaN(index)) {
            openLightbox(index);
        }
    });

    // Event: Cerrar
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    // Event: Navegación
    if (prevImageBtn) {
        prevImageBtn.addEventListener('click', () => navigateLightbox('prev'));
    }

    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', () => navigateLightbox('next'));
    }

    // Event: Click fuera del contenido
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Event: Teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                navigateLightbox('next');
                break;
        }
    });

    console.log('✅ Galería inicializada');
})();

// ===================================
// 8. FORMULARIO DE CONTACTO
// ===================================
(function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {
            nombre: formData.get('name'),
            email: formData.get('email'),
            telefono: formData.get('phone'),
            mensaje: formData.get('message')
        };

        const texto = `Hola Caro de DETAIL BARRAS! Me contacto desde tu sitio web:\n\n*Nombre:* ${data.nombre}\n*Email:* ${data.email}\n*Teléfono:* ${data.telefono}\n*Mensaje:* ${data.mensaje}`;

        const url = `https://wa.me/5491134597788?text=${encodeURIComponent(texto)}`;
        
        window.open(url, '_blank', 'noopener,noreferrer');
        
        console.log('📱 Formulario enviado a WhatsApp');
    });

    console.log('✅ Formulario inicializado');
})();

// ===================================
// 9. AÑO ACTUAL EN FOOTER
// ===================================
(function initFooter() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
})();

// ===================================
// 10. LAZY LOADING DE IMÁGENES
// ===================================
(function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    console.log('✅ Lazy loading inicializado');
})();

// ===================================
// FIN DEL SCRIPT
// ===================================
console.log('Script completamente cargado y optimizado');
console.log('Estado de componentes:');
console.log('- Preloader:', document.getElementById('preloader') ? '✅' : '❌');
console.log('- Menú:', document.querySelector('.menu-toggle') ? '✅' : '❌');
console.log('- FAQ:', document.querySelector('.faq-list') ? '✅' : '❌');
console.log('- Galería:', document.querySelector('.galeria-grid') ? '✅' : '❌');
console.log('- Lightbox:', document.getElementById('lightbox') ? '✅' : '❌');