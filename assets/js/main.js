/* ==========================================================================
   OE Tagging Sandbox — lógica compartida del sitio
   Nada de esto empuja eventos a dataLayer a propósito: la idea es que
   practiques creando triggers de GTM (clicks, form submits, YouTube,
   scroll, visibilidad, etc.) contra elementos reales del DOM, tal como
   pasaría en un sitio de producción que no fue instrumentado a mano.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Nav móvil -------------------------------------------------------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('is-open');
    });
  }

  /* ---- Acordeón FAQ ------------------------------------------------------ */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---- Lightbox de galería ------------------------------------------------ */
  var lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lightboxImg.src = btn.querySelector('img').src;
        lightboxImg.alt = btn.querySelector('img').alt;
        lightbox.classList.add('is-open');
      });
    });
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click', function () {
      lightbox.classList.remove('is-open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('is-open');
    });
  }

  /* ---- Countdown de urgencia ---------------------------------------------- */
  var countdownEl = document.querySelector('[data-countdown]');
  if (countdownEl) {
    // Cuenta regresiva de 48h desde que se carga la página (demo).
    var deadline = new Date().getTime() + (48 * 60 * 60 * 1000);
    var hEl = countdownEl.querySelector('[data-cd-hours]');
    var mEl = countdownEl.querySelector('[data-cd-minutes]');
    var sEl = countdownEl.querySelector('[data-cd-seconds]');
    var timer = setInterval(function () {
      var diff = deadline - new Date().getTime();
      if (diff <= 0) { clearInterval(timer); diff = 0; }
      var h = Math.floor(diff / (1000 * 60 * 60));
      var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((diff % (1000 * 60)) / 1000);
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  /* ---- Sticky CTA al hacer scroll ------------------------------------------ */
  var stickyCta = document.querySelector('[data-sticky-cta]');
  if (stickyCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    });
  }

  /* ---- Formulario de comentarios (Home) ------------------------------------ */
  var commentForm = document.querySelector('[data-comment-form]');
  if (commentForm) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = commentForm.querySelector('[name="name"]').value.trim() || 'Estudiante anónimo';
      var comment = commentForm.querySelector('[name="comment"]').value.trim();
      if (!comment) return;

      var list = document.querySelector('[data-comment-list]');
      var item = document.createElement('li');
      item.className = 'comment-item';
      item.setAttribute('data-comment-item', 'new');
      item.innerHTML =
        '<img class="avatar" src="https://i.pravatar.cc/100?img=' + (Math.floor(Math.random() * 60) + 1) + '" alt="Avatar de ' + name + '">' +
        '<div class="comment-body">' +
        '<div class="comment-meta"><span class="comment-name">' + name + '</span><span class="comment-date">Justo ahora</span></div>' +
        '<div class="stars">★★★★★</div>' +
        '<p>' + comment + '</p>' +
        '</div>';
      list.prepend(item);
      commentForm.reset();

      var success = document.querySelector('[data-comment-success]');
      if (success) {
        success.classList.add('is-visible');
        setTimeout(function () { success.classList.remove('is-visible'); }, 4000);
      }
    });
  }

  /* ---- Formulario de lead (landing-promo) ----------------------------------- */
 

  /* ---- Newsletter (footer) -------------------------------------------------- */
  var newsletterForm = document.querySelector('[data-newsletter-form]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button');
      var original = btn.textContent;
      btn.textContent = '¡Listo! ✓';
      setTimeout(function () { btn.textContent = original; }, 2500);
      newsletterForm.reset();
    });
  }

  /* ---- Selección de plan (landing-pricing) ------------------------------------ */
  document.querySelectorAll('[data-plan-select]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var plan = btn.getAttribute('data-plan-select');
      var price = btn.getAttribute('data-plan-price');
      window.location.href = 'gracias.html?tipo=plan&plan=' + encodeURIComponent(plan) + '&precio=' + encodeURIComponent(price);
    });
  });

});
