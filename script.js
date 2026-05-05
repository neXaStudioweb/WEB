/* ═══════════════════════════════════════════════
   NEXA STUDIO v2 — Interactions
   ═══════════════════════════════════════════════ */

// ── NAV SCROLL ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE NAV ────────────────────────────────────
const burger  = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const opening = !navLinks.classList.contains('nav__links--open');
  if (opening) {
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  navLinks.classList.toggle('nav__links--open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
  });
});

// ── SCROLL REVEAL ─────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

reveals.forEach(el => revealObs.observe(el));

// ── SELECTOR ──────────────────────────────────────
const sectorData = {
  clinica: {
    title: 'Tu clínica, al nivel de tu trabajo.',
    text:  'Tus tratamientos son premium. Tu web debería serlo también. Una presencia digital que transmite confianza desde la primera visita y convierte visitas en citas.',
    benefits: [
      'Sistema de reservas online integrado',
      'Galería de tratamientos y resultados',
      'Diseño que transmite confianza médica'
    ]
  },
  barberia: {
    title: 'Tu barbería tiene personalidad. Tu web también.',
    text:  'Un espacio con carácter necesita una web que lo refleje. Mostramos lo que haces, cómo lo haces y dónde estás, para que tus clientes lleguen seguros.',
    benefits: [
      'Galería de cortes y estilos actualizable',
      'WhatsApp directo y botón de cita',
      'Ubicación, horarios y reseñas integradas'
    ]
  },
  gimnasio: {
    title: 'Más socios. Menos fricción digital.',
    text:  'Una web que explica tus clases, muestra tu espacio y convierte visitas en altas. Sin complicaciones, sin excusas.',
    benefits: [
      'Horario de clases claro y actualizable',
      'Página de tarifas y membresías',
      'Formulario para trial gratuito o contacto'
    ]
  },
  restaurante: {
    title: 'Que se noten las ganas de ir.',
    text:  'Tu restaurante merece una web que transmita la misma experiencia que vives en sala. Con carta, reservas y toda la información que necesita un cliente antes de elegirte.',
    benefits: [
      'Carta online visual y actualizable',
      'Sistema de reservas o enlace a TheFork',
      'Fotos del local, equipo y ambiente'
    ]
  },
  academia: {
    title: 'Tus cursos. Mejor explicados. Mejor vendidos.',
    text:  'Una web clara que muestra lo que enseñas, a quién va dirigido y por qué merece la pena. Con espacio para testimonios, temario y formulario de inscripción.',
    benefits: [
      'Landing page por curso o formación',
      'Testimonios y prueba social integrada',
      'Formulario de inscripción o captación'
    ]
  },
  independiente: {
    title: 'Tu imagen profesional, actualizada.',
    text:  'Seas fotógrafo, consultor, coach o diseñador: una web limpia que explica lo que haces, cómo lo haces y cómo pueden contratarte.',
    benefits: [
      'Portfolio de proyectos o trabajos',
      'Sección de servicios y tarifas',
      'Formulario de contacto y WhatsApp'
    ]
  }
};

const pills      = document.querySelectorAll('.pill');
const msgEl      = document.getElementById('selectorMessage');
const titleEl    = document.getElementById('selectorTitle');
const textEl     = document.getElementById('selectorText');
const benefitsEl = document.getElementById('selectorBenefits');

function updateSelector(sector) {
  const data = sectorData[sector];
  if (!data) return;

  msgEl.classList.add('fading');

  setTimeout(() => {
    titleEl.textContent = data.title;
    textEl.textContent  = data.text;
    benefitsEl.innerHTML = data.benefits.map((b, i) => `
      <div class="benefit">
        <div class="benefit__num">0${i + 1}</div>
        <div class="benefit__text">${b}</div>
      </div>
    `).join('');
    msgEl.classList.remove('fading');
  }, 270);
}

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('pill--active'));
    pill.classList.add('pill--active');
    updateSelector(pill.dataset.sector);
  });
});

// ── FAQ ACCORDION ─────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

// ── PROCESS LINE ──────────────────────────────────
const stepsEl  = document.getElementById('procesoSteps');
const fillEl   = document.getElementById('procesoFill');
const pasoEls  = document.querySelectorAll('.paso');

if (stepsEl && fillEl) {
  window.addEventListener('scroll', () => {
    const rect     = stepsEl.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      (-rect.top + window.innerHeight * 0.55) / stepsEl.offsetHeight
    ));
    fillEl.style.height = (progress * 100) + '%';

    pasoEls.forEach(paso => {
      const pr = paso.getBoundingClientRect();
      paso.classList.toggle('active', pr.top < window.innerHeight * 0.58);
    });
  }, { passive: true });
}

// ── CONTACT FORM ──────────────────────────────────
const contactForm  = document.getElementById('contactForm');
const formSubmit   = document.getElementById('formSubmit');
const formFeedback = document.getElementById('formFeedback');

function setFeedback(msg, ok) {
  formFeedback.textContent = msg;
  formFeedback.className   = 'form-feedback ' + (ok ? 'form-feedback--ok' : 'form-feedback--err');
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
      setFeedback('Por favor, rellena todos los campos.', false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback('Introduce un email válido.', false);
      return;
    }

    formSubmit.disabled      = true;
    formSubmit.textContent   = 'Enviando…';
    formFeedback.className   = 'form-feedback';
    formFeedback.textContent = '';

    // FormData recoge automáticamente access_key, subject y todos los campos
    const formData = new FormData(contactForm);

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body:   formData
        // Sin Content-Type manual: el navegador lo pone con el boundary correcto
      });

      const data = await res.json();

      if (data.success) {
        setFeedback('Mensaje enviado correctamente.', true);
        contactForm.reset();
      } else {
        setFeedback('No se ha podido enviar: ' + (data.message || 'inténtalo de nuevo.'), false);
      }
    } catch (err) {
      setFeedback('No se ha podido enviar. Inténtalo de nuevo.', false);
    } finally {
      formSubmit.disabled    = false;
      formSubmit.textContent = 'Enviar mensaje';
    }
  });
}
