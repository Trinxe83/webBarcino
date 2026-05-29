/**
 * cursor.js  —  Punto preciso + pez que sigue al ratón
 *
 * Arquitectura de dos capas:
 *   #c-dot   → punto turquesa exacto en la posición del ratón (0 lag)
 *   #c-fish  → pez que sigue al punto con retraso natural (lerp 0.09)
 *
 * El pez siempre orienta su morro hacia el cursor, se voltea
 * horizontalmente al cambiar de dirección y se inclina según
 * el componente vertical de la velocidad.
 */
(function () {
    'use strict';

    /* ── Solo con puntero fino (ratón/trackpad) ──
       Antes se desactivaba ante cualquier pantalla táctil, lo que ocultaba
       el efecto en portátiles táctiles aunque usaran ratón. Ahora basta con
       que exista un puntero fino disponible (p. ej. ratón en monitor externo).
    */
    if (!window.matchMedia('(any-pointer: fine)').matches) return;

    /* ════════════════════════════════════════
       ESTILOS
    ════════════════════════════════════════ */
    const style = document.createElement('style');
    style.textContent = `
        html, body, a, button, input, select,
        label, [role="button"], [tabindex] {
            cursor: none !important;
        }

        /* ── Punto preciso ── */
        #c-dot {
            position:    fixed;
            top:         0;
            left:        0;
            width:       8px;
            height:      8px;
            border-radius: 50%;
            background:  rgba(100,224,238,.95);
            box-shadow:  0 0 0 2px rgba(13,143,163,.3),
                         0 0 10px rgba(13,143,163,.8);
            pointer-events: none;
            z-index:     100000;
            will-change: transform;
            /* Solo transicionamos tamaño y color, nunca la posición */
            transition:  width .18s ease, height .18s ease,
                         background .18s ease, box-shadow .18s ease;
        }
        body.csr-hover #c-dot {
            width:      12px;
            height:     12px;
            background: rgba(77,182,198,1);
            box-shadow: 0 0 0 3px rgba(77,182,198,.3),
                        0 0 16px rgba(13,143,163,1);
        }
        body.csr-hidden #c-dot,
        body.csr-hidden #c-fish { opacity: 0; }

        /* ── Pez ── */
        #c-fish {
            position:       fixed;
            top:            0;
            left:           0;
            pointer-events: none;
            z-index:        99999;
            will-change:    transform;
        }
        #c-fish-inner {
            transform-origin: center;
            will-change:      transform;
            filter:           drop-shadow(0 0 5px rgba(13,143,163,.65));
            transition:       filter .2s ease;
        }
        body.csr-hover #c-fish-inner {
            filter: drop-shadow(0 0 10px rgba(77,182,198,.95));
        }

        /* Cola del pez: se anima más rápido cuando se mueve */
        @keyframes fishWiggle {
            0%,100% { transform: rotate(0deg); }
            30%      { transform: rotate(4deg); }
            70%      { transform: rotate(-4deg); }
        }
        #c-fish-inner svg {
            animation: fishWiggle .55s ease-in-out infinite;
        }
        #c-fish.swimming #c-fish-inner svg {
            animation-duration: .32s;
        }

        /* ── Onda de clic ── */
        .c-ripple {
            position:  fixed;
            top:       0; left: 0;
            width:     4px; height: 4px;
            border:    1.5px solid rgba(77,182,198,.9);
            border-radius: 50%;
            pointer-events: none;
            z-index:   99998;
            transform-origin: center;
            animation: cRipple .6s cubic-bezier(.2,.7,.3,1) forwards;
        }
        @keyframes cRipple {
            from { transform: translate(-50%,-50%) scale(0);   opacity: 1; }
            to   { transform: translate(-50%,-50%) scale(7.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    /* ════════════════════════════════════════
       ELEMENTOS DOM
    ════════════════════════════════════════ */
    const dot = document.createElement('div');
    dot.id = 'c-dot';
    document.body.appendChild(dot);

    const fish = document.createElement('div');
    fish.id = 'c-fish';
    /* El SVG tiene el morro a la IZQUIERDA (x≈1) y la cola a la DERECHA (x≈45) */
    fish.innerHTML = `<div id="c-fish-inner">
        <svg width="46" height="26" viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Cuerpo -->
            <path d="M31,13 C31,13 25,3 13,3 C5,3 1,8 1,13 C1,18 5,23 13,23 C25,23 31,13 31,13 Z"
                  fill="rgba(13,143,163,0.92)"/>
            <!-- Reflejo vientre -->
            <path d="M31,13 C25,6.5 13,5.5 7,6 C3.5,9 4,13 4,13"
                  fill="rgba(77,182,198,0.4)"/>
            <!-- Cola -->
            <path d="M31,13 L45,5 L42,13 L45,21 Z"
                  fill="rgba(13,143,163,0.88)"/>
            <!-- Aleta pectoral -->
            <path d="M21,13 C19,9.5 17,8.5 18,13 C17,16.5 19,16 21,13 Z"
                  fill="rgba(77,182,198,0.5)"/>
            <!-- Ojo -->
            <circle cx="11"  cy="10.5" r="3.2" fill="white"   opacity=".95"/>
            <circle cx="11"  cy="10.5" r="1.6" fill="#001a2c"/>
            <circle cx="9.8" cy="9.3"  r="1"   fill="white"   opacity=".7"/>
            <!-- Escamas sugeridas -->
            <path d="M18,8 Q22,11 18,14"   stroke="rgba(77,182,198,0.22)" stroke-width="1" fill="none"/>
            <path d="M23,7.5 Q27,11 23,15" stroke="rgba(77,182,198,0.16)" stroke-width="1" fill="none"/>
        </svg>
    </div>`;
    document.body.appendChild(fish);

    const fishInner = document.getElementById('c-fish-inner');

    /* ════════════════════════════════════════
       ESTADO
    ════════════════════════════════════════ */
    const FW = 46, FH = 26;          /* dimensiones del pez */
    let mouseX  = window.innerWidth  / 2;
    let mouseY  = window.innerHeight / 2;
    let fishX   = mouseX;
    let fishY   = mouseY;
    let prevFX  = fishX;
    let prevFY  = fishY;
    let tilt    = 0;                  /* inclinación vertical del morro */
    let facingLeft = true;            /* morro a la izq. = estado natural del SVG */

    /* ════════════════════════════════════════
       EVENTOS
    ════════════════════════════════════════ */

    /* Posición del ratón → dot instantáneo */
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        /* Transform sin transición en posición: el dot va exacto */
        dot.style.transform =
            'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';
    });

    /* Hover sobre elementos interactivos */
    document.addEventListener('mouseover', function (e) {
        const interactive = e.target.closest('a, button, [role="button"], input, select, label');
        document.body.classList.toggle('csr-hover', !!interactive);
    });

    /* Ondas al hacer clic */
    document.addEventListener('click', function (e) {
        const r       = document.createElement('div');
        r.className   = 'c-ripple';
        r.style.left  = e.clientX + 'px';
        r.style.top   = e.clientY + 'px';
        document.body.appendChild(r);
        setTimeout(function () { r.remove(); }, 650);
    });

    /* Ocultar al salir de la ventana */
    document.addEventListener('mouseleave', function () {
        document.body.classList.add('csr-hidden');
    });
    document.addEventListener('mouseenter', function () {
        document.body.classList.remove('csr-hidden');
    });

    /* ════════════════════════════════════════
       UTILIDADES
    ════════════════════════════════════════ */
    function lerp(a, b, t) { return a + (b - a) * t; }

    /* ════════════════════════════════════════
       BUCLE DE ANIMACIÓN
    ════════════════════════════════════════ */
    function animate() {
        prevFX = fishX;
        prevFY = fishY;

        /* El pez sigue al cursor con retraso natural */
        fishX = lerp(fishX, mouseX, 0.09);
        fishY = lerp(fishY, mouseY, 0.09);

        /* Velocidad de desplazamiento real del pez */
        const vx    = fishX - prevFX;
        const vy    = fishY - prevFY;
        const speed = Math.sqrt(vx * vx + vy * vy);

        /* Vector: desde el pez hasta el cursor */
        const dx = mouseX - fishX;
        const dy = mouseY - fishY;

        /* ── Dirección horizontal (flip) ──
           El morro apunta hacia el cursor:
           - cursor a la derecha → fish morro-derecha → scaleX(-1)
           - cursor a la izquierda → fish morro-izquierda → scaleX(1)
        */
        if (Math.abs(dx) > 2) {
            facingLeft = dx < 0;
        }

        /* ── Inclinación vertical del morro ──
           Positivo = morro abajo  /  Negativo = morro arriba
           Usamos la velocidad real (vy) para que la inclinación sea
           suave y no salte con cambios bruscos de dx/dy.
        */
        const targetTilt = speed > 0.15
            ? Math.max(-32, Math.min(32, (vy / Math.max(speed, 0.1)) * 32))
            : 0;
        tilt = lerp(tilt, targetTilt, 0.08);

        /* ── Velocidad del aleteo ── */
        fish.classList.toggle('swimming', speed > 1.2);

        /* ── Posición: centrar el pez en fishX, fishY ── */
        fish.style.transform =
            'translate(' + (fishX - FW / 2) + 'px, ' + (fishY - FH / 2) + 'px)';

        /* ── Rotación + volteo ──
           rotate(tilt): inclina el morro (positivo=abajo, negativo=arriba)
           scaleX(±1):   voltea el pez horizontalmente si mira a la derecha
           El orden CSS "rotate → scaleX" produce el comportamiento correcto
           en ambas direcciones (verificado analíticamente).
        */
        fishInner.style.transform =
            'rotate(' + tilt + 'deg) scaleX(' + (facingLeft ? 1 : -1) + ')';

        requestAnimationFrame(animate);
    }

    /* Iniciar en posición del ratón (evita salto inicial) */
    dot.style.transform =
        'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';

    animate();
}());
