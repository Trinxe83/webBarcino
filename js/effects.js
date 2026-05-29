/**
 * effects.js — Efectes vistosos opcionals
 *   1) Banc de peixos flotant (parallax) a les seccions fosques
 *   2) Targetes 3D amb brillantor que segueix el cursor
 *
 * Tot es desactiva si l'usuari prefereix moviment reduït. El tilt 3D
 * només s'activa amb punter fi (ratolí/trackpad), no en tàctil.
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer  = window.matchMedia('(any-pointer: fine)').matches;

    /* ════════════════════════════════════════
       1) BANC DE PEIXOS FLOTANT
    ════════════════════════════════════════ */
    function fishSVG() {
        return '<svg viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M31,13 C31,13 25,3 13,3 C5,3 1,8 1,13 C1,18 5,23 13,23 C25,23 31,13 31,13 Z" fill="rgba(77,182,198,0.55)"/>' +
            '<path d="M31,13 L45,5 L42,13 L45,21 Z" fill="rgba(77,182,198,0.5)"/>' +
            '<circle cx="11" cy="10.5" r="2.4" fill="rgba(255,255,255,0.85)"/>' +
            '<circle cx="11" cy="10.5" r="1.1" fill="#001a2c"/>' +
            '</svg>';
    }

    function spawnFishSchool() {
        const sections = document.querySelectorAll('[data-fish]');
        const rand = (a, b) => a + Math.random() * (b - a);

        sections.forEach(function (section) {
            const layer = document.createElement('div');
            layer.className = 'fish-layer';
            layer.setAttribute('aria-hidden', 'true');

            const count = parseInt(section.getAttribute('data-fish'), 10) || 5;

            for (let i = 0; i < count; i++) {
                const fish    = document.createElement('div');
                fish.className = 'swim-fish';

                /* Profunditat: més petit = més lluny = més lent i transparent */
                const depth   = rand(0.35, 1);          /* 0.35 (lluny) … 1 (prop) */
                const size    = 26 + depth * 46;        /* 36 … 72 px d'ample */
                const toRight = Math.random() > 0.5;    /* direcció de natació */

                fish.style.top        = rand(8, 88) + '%';
                fish.style.width       = size + 'px';
                fish.style.opacity     = (0.12 + depth * 0.3).toFixed(2);
                fish.style.filter       = 'blur(' + ((1 - depth) * 1.6).toFixed(1) + 'px)';
                fish.style.animationDuration  = (rand(16, 26) + (1 - depth) * 22) + 's';
                fish.style.animationDelay     = '-' + rand(0, 26) + 's';
                /* normal = neda d'esquerra a dreta; reverse = de dreta a esquerra */
                fish.style.animationDirection = toRight ? 'normal' : 'reverse';
                /* El morro del SVG mira a l'esquerra; si neda cap a la dreta, voltegem */
                fish.style.setProperty('--flip', toRight ? '-1' : '1');

                fish.innerHTML = '<div class="swim-fish-inner">' + fishSVG() + '</div>';
                layer.appendChild(fish);
            }

            section.appendChild(layer);
        });
    }

    /* ════════════════════════════════════════
       2) TARGETES 3D AMB BRILLANTOR
    ════════════════════════════════════════ */
    function setupTilt() {
        const cards = document.querySelectorAll('.service-card, .gallery-item, .stat-card, .contact-card');
        const MAX   = 9;   /* graus màxims d'inclinació */

        cards.forEach(function (card) {
            card.classList.add('tilt-3d');

            /* Capa de brillantor que segueix el cursor */
            const glow = document.createElement('span');
            glow.className = 'tilt-glow';
            glow.setAttribute('aria-hidden', 'true');
            card.appendChild(glow);

            let raf = null;

            function onMove(e) {
                const r  = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;   /* 0 … 1 */
                const py = (e.clientY - r.top)  / r.height;  /* 0 … 1 */

                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(function () {
                    const rx = (0.5 - py) * MAX * 2;   /* rotateX */
                    const ry = (px - 0.5) * MAX * 2;   /* rotateY */
                    card.style.transform =
                        'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' +
                        ry.toFixed(2) + 'deg) translateY(-6px)';
                    glow.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
                    glow.style.setProperty('--my', (py * 100).toFixed(1) + '%');
                });
            }

            function onLeave() {
                if (raf) cancelAnimationFrame(raf);
                /* Retorn suau a la posició de repòs */
                card.style.transition = 'transform .5s var(--ease)';
                card.style.transform  = '';
                glow.style.opacity    = '';
            }

            function onEnter() {
                /* Sense transició mentre seguim el cursor: tilt immediat */
                card.style.transition = 'transform .05s linear';
                glow.style.opacity    = '1';
            }

            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mousemove',  onMove);
            card.addEventListener('mouseleave', onLeave);
        });
    }

    /* ════════════════════════════════════════
       INICIALITZACIÓ
    ════════════════════════════════════════ */
    if (reduceMotion) return;          /* respecta la preferència del sistema */

    spawnFishSchool();
    if (finePointer) setupTilt();      /* el tilt només té sentit amb ratolí */

}());
