/**
 * main.js
 * Navbar · Menú móvil · Scroll reveal · Contadores · Nav activo
 */
(function () {
    'use strict';

    /* ═══════════════════════════════
       PRELOADER – ocultar al cargar
    ═══════════════════════════════ */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hidePreloader = function () {
            preloader.classList.add('hidden');
            /* Quitarlo del flujo tras la transición */
            setTimeout(function () { preloader.remove(); }, 700);
        };
        window.addEventListener('load', function () {
            setTimeout(hidePreloader, 450);   /* breve respiro para ver el pez */
        });
        /* Salvavidas: si 'load' no dispara, ocultar igualmente */
        setTimeout(hidePreloader, 4000);
    }

    /* ═══════════════════════════════
       BARRA DE PROGRESO DE SCROLL
    ═══════════════════════════════ */
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        const updateProgress = function () {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
            progressBar.style.width = pct + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* ═══════════════════════════════
       NAVBAR – efecto al hacer scroll
    ═══════════════════════════════ */
    const navbar = document.getElementById('navbar');

    function updateNavbar() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();


    /* ═══════════════════════════════
       MENÚ MÓVIL
    ═══════════════════════════════ */
    const navToggle  = document.getElementById('navToggle');
    const navLinks   = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        navLinks.classList.add('open');
        navOverlay.classList.add('open');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
        navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });


    /* ═══════════════════════════════
       SCROLL REVEAL (IntersectionObserver)
    ═══════════════════════════════ */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        /* Fallback: mostrar todo de golpe */
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }


    /* ═══════════════════════════════
       CONTADORES ANIMADOS
    ═══════════════════════════════ */
    const counters = document.querySelectorAll('.stat-number[data-target]');

    function animateCounter(el) {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start    = performance.now();

        function tick(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            /* ease-out cubic */
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }

        requestAnimationFrame(tick);
    }

    /* Barras de stat */
    function animateBars(card) {
        card.querySelectorAll('.stat-bar-fill').forEach(function (bar) {
            bar.classList.add('animate');
        });
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const num  = card.querySelector('.stat-number[data-target]');
                    if (num) animateCounter(num);
                    animateBars(card);
                    counterObserver.unobserve(card);
                }
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('.stat-card').forEach(function (card) {
            counterObserver.observe(card);
        });
    }


    /* ═══════════════════════════════
       HIGHLIGHT NAV LINK ACTIVO
    ═══════════════════════════════ */
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navItems = document.querySelectorAll('.nav-link[href^="#"]');

    function setActiveLink() {
        const scrollY = window.scrollY + 120;
        let current = '';

        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop) {
                current = section.id;
            }
        });

        navItems.forEach(function (link) {
            const isActive = link.getAttribute('href') === '#' + current;
            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();

}());
