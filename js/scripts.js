// ===== Menu mobile =====
(function() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

// ===== Filtros de projetos =====
(function() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = (filter === 'all' || filter === cat);
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

// ===== Lazy loading para <img class="lazy" data-src="..."> =====
(function() {
  const lazyImgs = document.querySelectorAll('img.lazy[data-src]');
  if (!('IntersectionObserver' in window) || !lazyImgs.length) {
    lazyImgs.forEach(img => { if (img.dataset.src) img.src = img.dataset.src; });
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  lazyImgs.forEach(img => io.observe(img));
})();

// ===== Form: Newsletter =====
(function() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!email) return alert('Informe seu e-mail.');
    alert('Obrigado! Você será avisado sobre novos artigos.');
    form.reset();
  });
})();

// ===== Form: Contato + EmailJS (se disponível) =====
(function() {
  const form = document.getElementById('contato-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = form.nome?.value.trim();
    const email = form.email?.value.trim();
    const mensagem = form.mensagem?.value.trim();
    if (!nome || !email || !mensagem) {
      alert('Preencha todos os campos.');
      return;
    }
    if (window.emailjs && typeof emailjs.sendForm === 'function') {
      emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', '#contato-form')
        .then(() => { alert('Mensagem enviada!'); form.reset(); })
        .catch(err => { alert('Erro no envio: ' + (err?.text || JSON.stringify(err))); });
    } else {
      alert('Mensagem enviada (simulação). Configure EmailJS para envio real.');
      form.reset();
    }
  });
})();

// ===== Analytics: evento em CTA (.btn) =====
(function() {
  const ctAs = document.querySelectorAll('.btn');
  if (!ctAs.length) return;
  ctAs.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.gtag) {
        window.gtag('event', 'cta_click', {
          event_category: 'Engajamento',
          event_label: btn.textContent?.trim() || 'btn'
        });
      }
    });
  });
})();