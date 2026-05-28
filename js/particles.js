/**
 * particles.js
 * Burbujas animadas en canvas para el hero.
 */
(function () {
    'use strict';

    const canvas = document.getElementById('bubblesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let rafId;

    /* ─── tamaño ─── */
    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    /* ─── crear partícula ─── */
    function newParticle(randomY) {
        const r = Math.random() * 3.5 + 1;
        return {
            x:    Math.random() * canvas.width,
            y:    randomY ? Math.random() * canvas.height : canvas.height + r + Math.random() * 60,
            r:    r,
            vy:   Math.random() * 0.55 + 0.25,
            vx:   (Math.random() - .5) * 0.25,
            osc:  Math.random() * Math.PI * 2,
            alpha: Math.random() * 0.35 + 0.08,
        };
    }

    /* ─── init ─── */
    function init() {
        resize();
        const count = Math.min(Math.floor(canvas.width / 18), 80);
        particles = Array.from({ length: count }, () => newParticle(true));
    }

    /* ─── dibujar burbuja ─── */
    function drawBubble(p) {
        ctx.save();

        /* cuerpo */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(77,182,198,${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        /* reflejo interno */
        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, p.r * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.7})`;
        ctx.fill();

        ctx.restore();
    }

    /* ─── loop ─── */
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.osc += 0.012;
            p.x   += Math.sin(p.osc) * 0.45 + p.vx;
            p.y   -= p.vy;

            drawBubble(p);

            if (p.y < -p.r * 2) {
                particles[i] = newParticle(false);
            }
        }

        rafId = requestAnimationFrame(loop);
    }

    /* ─── resize debounced ─── */
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            cancelAnimationFrame(rafId);
            init();
            loop();
        }, 200);
    });

    /* ─── pausa si la pestaña está oculta ─── */
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            loop();
        }
    });

    init();
    loop();
}());
