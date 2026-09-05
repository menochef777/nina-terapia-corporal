/**
 * NINA · TERAPIA CORPORAL VALENCIA
 * Interactive Engine: GlareHover, MagicBento, Carousel Motion, PixelSwap, Map & WhatsApp Modal (+12894722644)
 */

const WHATSAPP_PHONE = '12894722644';

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHeader();
  initMobileDrawer();
  initInteractiveDiscovery();
  initTestimonialsCarousel();
  initGalleryLightbox();
  initMagicBento();
  initGlareHover();
  initInteractiveMap();
  initBookingModal();
  initFramerScrollReveals();
  initHeroParallax();
  initCurrentYear();
});

/* ==========================================================================
   GLOBAL ACTIVE SESSION STATE
   ========================================================================== */
let activeSession = {
  key: 'soltar',
  name: 'Paquete 1 — Enfoque Problemáticas',
  kickerTitle: 'SOLTAR · Tensión y cansancio',
  time: '70 MIN',
  price: '40',
  desc: '70 min · Cuerpo entero con enfoque en zonas problemáticas y contracturas.',
  whatsappMsg: 'Hola Nina, siento la necesidad de SOLTAR tensión y cansancio acumulado. Me gustaría reservar el Paquete 1 (70 min - 40€) de Terapia Corporal en Valencia.'
};

/* ==========================================================================
   1. FLOATING MINIMAL HEADER
   ========================================================================== */
function initFloatingHeader() {
  const header = document.getElementById('floating-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .btn-drawer-whatsapp');

  if (!menuBtn || !drawer) return;

  function toggleDrawer() {
    const isOpen = drawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', toggleDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. SELETOR DE NECESIDAD & RESUMO DINÂMICO ("VOS SELECCIONASTE")
   ========================================================================== */
const discoveryMap = {
  soltar: {
    key: 'soltar',
    kickerTitle: 'SOLTAR · Tensión y cansancio',
    name: 'Paquete 1 — Enfoque Problemáticas',
    heading: 'Una sesión enfocada en soltar tensiones.',
    desc: 'Trabajo específico en las fascias donde más se acumula el estrés cotidiano: trapecios, columna y caderas para liberar rigidez profunda.',
    time: '70 MIN',
    price: '40',
    benefits: [
      '✓ Descompresión fascial profunda',
      '✓ Liberación en trapecios y cuello',
      '✓ Aceites botánicos templados'
    ],
    whatsappMsg: 'Hola Nina, siento la necesidad de SOLTAR tensión y cansancio acumulado. Me gustaría reservar el Paquete 1 (70 min - 40€) de Terapia Corporal en Valencia.'
  },
  desconectar: {
    key: 'desconectar',
    kickerTitle: 'DESCONECTAR · Silenciar la mente',
    name: 'Paquete 2 — Sesión Profunda',
    heading: 'Una experiencia para parar y silenciar la mente.',
    desc: 'Sesión profunda de 100 minutos para inducir una respuesta parasimpática que desactive el estado de alerta constante y recupere tu ritmo.',
    time: '1 H 40 MIN',
    price: '55',
    benefits: [
      '✓ Recorrido fascial de pies a cabeza',
      '✓ Apaciguamiento del sistema nervioso',
      '✓ Tiempo extendido para meditación somática',
      '✓ Aromaterapia botánica inmersiva'
    ],
    whatsappMsg: 'Hola Nina, necesito DESCONECTAR y silenciar la mente. Me gustaría reservar el Paquete 2 (1h 40 min - 55€) de Terapia Corporal en Valencia.'
  },
  reconocer: {
    key: 'reconocer',
    kickerTitle: 'RECONOCER · Habitar el cuerpo',
    name: 'Paquete 3 — Experiencia Completa',
    heading: 'Inmersión integral para habitar tu cuerpo en paz.',
    desc: 'Contacto pausado y profundo que libera la respiración, desbloquea la angustia acumulada y estimula la oxitocina y presencia corporal.',
    time: '2 H 30 MIN',
    price: '100',
    benefits: [
      '✓ Máxima dedicación y trabajo minucioso',
      '✓ Desbloqueo de angustia y memorias somáticas',
      '✓ Espacio sagrado de respiración y presencia',
      '✓ Sensación sublime de ligereza corporal'
    ],
    whatsappMsg: 'Hola Nina, deseo una sesión para RECONOCER y volver a sentir mi cuerpo. Me gustaría reservar el Paquete 3 (2h 30 min - 100€) de Terapia Corporal en Valencia.'
  }
};

function initInteractiveDiscovery() {
  const choices = document.querySelectorAll('.choice-sculpture-item');
  const frame = document.getElementById('recommendation-frame');
  const titleBadge = document.getElementById('summary-choice-title');
  const heading = document.getElementById('summary-heading');
  const desc = document.getElementById('summary-desc');
  const benefitsContainer = document.getElementById('summary-benefits');
  const time = document.getElementById('summary-time');
  const price = document.getElementById('summary-price');

  if (!choices.length || !frame) return;

  function selectChoice(key) {
    const data = discoveryMap[key];
    if (!data) return;

    activeSession = {
      key: data.key,
      name: data.name,
      kickerTitle: data.kickerTitle,
      time: data.time,
      price: data.price,
      desc: data.desc,
      whatsappMsg: data.whatsappMsg
    };

    choices.forEach(btn => {
      const isSelected = btn.getAttribute('data-choice') === key;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      
      const statusSpan = btn.querySelector('.choice-status-text');
      if (statusSpan) {
        statusSpan.textContent = isSelected ? 'Seleccionado' : 'Elegir';
      }
    });

    frame.style.opacity = '0.4';
    frame.style.transform = 'translateY(6px)';

    setTimeout(() => {
      if (titleBadge) titleBadge.textContent = data.kickerTitle;
      if (heading) heading.textContent = data.heading;
      if (desc) desc.textContent = data.desc;
      if (time) time.textContent = data.time;
      
      if (price) {
        price.textContent = data.price;
        price.style.transform = 'scale(1.15)';
        setTimeout(() => { price.style.transform = 'scale(1)'; }, 180);
      }

      if (benefitsContainer) {
        benefitsContainer.innerHTML = data.benefits
          .map(b => `<span class="benefit-tag">${b}</span>`)
          .join('');
      }

      frame.style.opacity = '1';
      frame.style.transform = 'translateY(0)';
    }, 150);
  }

  choices.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-choice');
      selectChoice(choice);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const choice = btn.getAttribute('data-choice');
        selectChoice(choice);
      }
    });
  });

  selectChoice('soltar');
}

/* ==========================================================================
   4. GLARE HOVER EFFECT (Real-time dynamic cursor coordinates)
   ========================================================================== */
function initGlareHover() {
  if (window.innerWidth < 1024) return;

  const glareCards = document.querySelectorAll('.glare-card');

  glareCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--glare-x', `${x}px`);
      card.style.setProperty('--glare-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   5. MAGIC BENTO SPOTLIGHT & 3D TILT
   ========================================================================== */
function initMagicBento() {
  const cards = document.querySelectorAll('.magic-bento-card');
  if (!cards.length || window.innerWidth < 1024) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   6. TESTIMONIOS (MOTION CAROUSEL WITH TOUCH SWIPE & AUTOPLAY)
   ========================================================================== */
function initTestimonialsCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const wrapper = document.getElementById('testimonials-carousel');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Ir a testimonio ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoplay();
  }, { passive: true });

  startAutoplay();
}

/* ==========================================================================
   7. GALERÍA EDITORIAL & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!galleryItems.length || !lightbox) return;

  const galleryData = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('.caption-title')?.textContent || '';
    const tag = item.querySelector('.caption-tag')?.textContent || '';
    return {
      src: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || '',
      caption: `${tag ? tag + ' · ' : ''}${title}`
    };
  });

  let currentGalleryIndex = 0;

  function openLightbox(index) {
    currentGalleryIndex = index;
    const item = galleryData[currentGalleryIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrev() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   8. INTERACTIVE MAP (LEAFLET / PATRAIX, VALENCIA)
   ========================================================================== */
function initInteractiveMap() {
  const mapContainer = document.getElementById('interactive-patraix-map');
  if (!mapContainer || typeof L === 'undefined') return;

  const lat = 39.4624;
  const lng = -0.3905;

  try {
    const map = L.map('interactive-patraix-map', {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="
        width: 22px; 
        height: 22px; 
        background: #D48B54; 
        border: 3px solid #FAF6F0; 
        border-radius: 50%; 
        box-shadow: 0 4px 14px rgba(0,0,0,0.5);
      "></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #2A1E17; padding: 4px;">
        <strong style="font-family: 'Cormorant Garamond', serif; font-size: 17px; display: block; margin-bottom: 2px;">NINA</strong>
        <span>Calle Dr. Pérez Feliu</span><br>
        <small style="color: #736155;">Barrio Patraix · Valencia</small>
      </div>
    `).openPopup();

  } catch (err) {
    console.warn('Map could not be initialized:', err);
  }
}

/* ==========================================================================
   9. WHATSAPP CONFIRMATION MODAL (+1 289 472 2644)
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalName = document.getElementById('modal-session-name');
  const modalPrice = document.getElementById('modal-session-price');
  const modalDesc = document.getElementById('modal-session-desc');
  const daySelect = document.getElementById('modal-pref-day');
  const timeSelect = document.getElementById('modal-pref-time');
  const confirmBtn = document.getElementById('modal-whatsapp-action');
  const triggers = document.querySelectorAll('.btn-open-booking-modal');

  if (!modal) return;

  function updateModalWhatsAppUrl() {
    let sessionText = activeSession.name;
    let timeText = activeSession.time;
    let priceText = activeSession.price;

    let msg = `Hola Nina, me gustaría reservar una sesión de Terapia Corporal en Valencia:\n\n` +
      `• Sesión: ${sessionText}\n` +
      `• Duración: ${timeText}\n` +
      `• Tarifa: ${priceText}€\n`;

    if (daySelect && timeSelect) {
      msg += `• Preferencia: ${daySelect.value} (${timeSelect.value})\n`;
    }

    msg += `\n¿Qué disponibilidad tienes en Patraix? ¡Muchas gracias!`;

    const encoded = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    if (confirmBtn) {
      confirmBtn.setAttribute('href', encoded);
    }
  }

  function openModal(customData = null) {
    if (customData && customData.name) {
      if (modalName) modalName.textContent = customData.name;
      if (modalPrice) modalPrice.textContent = `${customData.price} €`;
      if (modalDesc) modalDesc.textContent = `${customData.time} · Sesión individual en Patraix.`;
    } else {
      if (modalName) modalName.textContent = activeSession.name;
      if (modalPrice) modalPrice.textContent = `${activeSession.price} €`;
      if (modalDesc) modalDesc.textContent = `${activeSession.time} · ${activeSession.desc}`;
    }

    updateModalWhatsAppUrl();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-package-name');
      const pkgPrice = btn.getAttribute('data-package-price');
      const pkgTime = btn.getAttribute('data-package-time');

      if (pkgName) {
        openModal({
          name: pkgName,
          price: pkgPrice.replace('€', ''),
          time: pkgTime
        });
      } else {
        openModal();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (daySelect) daySelect.addEventListener('change', updateModalWhatsAppUrl);
  if (timeSelect) timeSelect.addEventListener('change', updateModalWhatsAppUrl);
}

/* ==========================================================================
   10. FRAMER-STYLE SCROLL REVEALS
   ========================================================================== */
function initFramerScrollReveals() {
  const elements = document.querySelectorAll('.reveal-anim, .scroll-card');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || 0, 10);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.06
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11. SUBTLE HERO PARALLAX
   ========================================================================== */
function initHeroParallax() {
  const heroPhoto = document.getElementById('hero-bg-photo');
  if (!heroPhoto || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroPhoto.style.transform = `scale(1.02) translateY(${scrollY * 0.07}px)`;
    }
  }, { passive: true });
}

/* ==========================================================================
   12. DYNAMIC YEAR
   ========================================================================== */
function initCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
