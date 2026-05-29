/**
 * i18n.js — Motor de traducció multilingüe
 * Idiomes: Català (CA) · Castellà (ES) · Anglès (EN)
 * Predeterminat: Català
 *
 * Atributs HTML:
 *   data-i18n="clau"       → textContent
 *   data-i18n-html="clau"  → innerHTML  (per a <strong>, <br>, etc.)
 */
(function () {
    'use strict';

    const SUPPORTED = ['ca', 'es', 'en'];
    const DEFAULT   = 'ca';
    const LS_KEY    = 'barcino-lang';

    /* ════════════════════════════════════════════════════
       TRADUCCIONS
    ════════════════════════════════════════════════════ */
    const T = {

        /* ─── CATALÀ ─── */
        ca: {
            meta: {
                title: 'Barcino Consignacions SL | Majoristes de Peix Fresc · Mercabarna',
                description: 'Barcino Consignacions SL – Majoristes de peix i marisc fresc al Mercat del Peix de Mercabarna, Barcelona. Consignació, venda a l\'engròs, importació i exportació.'
            },
            nav: {
                home: 'Inici', about: 'Nosaltres', products: 'Producte',
                services: 'Serveis', stats: 'Xifres', contact: 'Contacte'
            },
            gallery: {
                tag:   'El nostre producte',
                title: 'Frescor de la llotja cada matí',
                g1: 'Llobarro', g2: 'Gamba vermella', g3: 'Pop',
                g4: 'Rap', g5: 'Tonyina', g6: 'Cloïsses'
            },
            hero: {
                title:    'Majoristes de Peix Fresc',
                subtitle: 'Consignació · Venda · Importació · Exportació',
                badge:    'Mercat del Peix · Mercabarna · Barcelona',
                cta:      'Contactar ara',
                scroll:   'Descobreix més'
            },
            about: {
                tag:   'Qui som',
                title: 'Tradició i excel·lència<br>al cor de Mercabarna',
                p1:    'Som una empresa majorista especialitzada en la <strong>consignació i comercialització de peix i marisc fresc</strong>, amb seu al Mercat del Peix de Mercabarna, el major centre de distribució alimentària del sud d\'Europa.',
                p2:    'Des de la nostra fundació el 2014, ens hem consolidat com un referent del sector amb <strong>7 parades pròpies al mercat</strong>, cosa que ens permet oferir la major varietat i qualitat directament des de la llotja cada matí.',
                p3:    'Treballem amb peixateries, restaurants, supermercats i distribuïdors de tot Espanya i Europa, garantint sempre la <strong>màxima frescor i traçabilitat</strong> del producte.',
                badge1: 'Parades 11, 12, 13',
                badge2: 'Parades 22, 67, 75, 76',
                badge3: 'Membres GMP Mercabarna',
                badge4: 'Fundada el 2014',
                visualText:    'Mercat Central del Peix',
                visualSubtext: 'Barcelona · Espanya'
            },
            services: {
                tag:   'El que fem',
                title: 'Els nostres serveis',
                s1t: 'Consignació',
                s1d: 'Gestionem la venda del teu peix al mercat amb total transparència. Liquidacions diàries i accés directe a compradors majoristes.',
                s2t: 'Venda Majorista',
                s2d: 'Subministrament diari a peixateries, restaurants, supermercats i hostaleria. Producte fresc garantit cada matí des de la llotja.',
                s3t: 'Importació',
                s3d: 'Accés a les millors espècies del món. Col·laborem amb els millors proveïdors internacionals per oferir-te varietat sense límits.',
                s4t: 'Exportació',
                s4d: 'Portem el millor peix mediterrani als mercats europeus i internacionals amb tota la logística gestionada per nosaltres.'
            },
            stats: {
                tag:    'En xifres',
                title:  'Barcino en xifres',
                label1: 'Anys al mercat',
                label2: 'Parades a Mercabarna',
                label3: 'Dies a l\'any operatius',
                label4: 'Producte fresc diari'
            },
            contact: {
                tag:    'Som aquí',
                title:  'Contacta amb nosaltres',
                c1h3:   'Telèfon',
                c2h3:   'Correu electrònic',
                c3h3:   'Adreça',
                c3val:  'C/ Mercat del Peix, 13<br>Zona Franca · Mercabarna<br>08040 Barcelona',
                c4h3:   'Horari',
                c4val:  'Dilluns a Dissabte<br>Obertura a la matinada<br>Segons calendari Mercabarna'
            },
            footer: {
                copy:    '© 2025 Barcino Consignacions SL · CIF B66284555',
                address: 'Mercat del Peix · Mercabarna · 08040 Barcelona',
                home: 'Inici', about: 'Nosaltres', products: 'Producte',
                services: 'Serveis', contact: 'Contacte'
            }
        },

        /* ─── CASTELLÀ ─── */
        es: {
            meta: {
                title: 'Barcino Consignacions SL | Mayoristas de Pescado Fresco · Mercabarna',
                description: 'Barcino Consignacions SL – Mayoristas de pescado y marisco fresco en el Mercat del Peix de Mercabarna, Barcelona. Consignación, venta al mayor, importación y exportación.'
            },
            nav: {
                home: 'Inicio', about: 'Nosotros', products: 'Producto',
                services: 'Servicios', stats: 'Cifras', contact: 'Contacto'
            },
            gallery: {
                tag:   'Nuestro producto',
                title: 'Frescura de la lonja cada mañana',
                g1: 'Lubina', g2: 'Gamba roja', g3: 'Pulpo',
                g4: 'Rape', g5: 'Atún', g6: 'Almejas'
            },
            hero: {
                title:    'Mayoristas de Pescado Fresco',
                subtitle: 'Consignación · Venta · Importación · Exportación',
                badge:    'Mercat del Peix · Mercabarna · Barcelona',
                cta:      'Contactar ahora',
                scroll:   'Conoce más'
            },
            about: {
                tag:   'Quiénes somos',
                title: 'Tradición y excelencia<br>en el corazón de Mercabarna',
                p1:    'Somos una empresa mayorista especializada en la <strong>consignación y comercialización de pescado y marisco fresco</strong>, con sede en el Mercat del Peix de Mercabarna, el mayor centro de distribución alimentaria del sur de Europa.',
                p2:    'Desde nuestra fundación en 2014, nos hemos consolidado como un referente del sector con <strong>7 puestos propios en el mercado</strong>, lo que nos permite ofrecer la mayor variedad y calidad directamente desde la lonja cada mañana.',
                p3:    'Trabajamos con pescaderías, restaurantes, supermercados y distribuidores de toda España y Europa, garantizando siempre la <strong>máxima frescura y trazabilidad</strong> del producto.',
                badge1: 'Puestos 11, 12, 13',
                badge2: 'Puestos 22, 67, 75, 76',
                badge3: 'Miembros GMP Mercabarna',
                badge4: 'Fundada en 2014',
                visualText:    'Mercado Central del Pescado',
                visualSubtext: 'Barcelona · España'
            },
            services: {
                tag:   'Lo que hacemos',
                title: 'Nuestros servicios',
                s1t: 'Consignación',
                s1d: 'Gestionamos la venta de tu pescado en el mercado con total transparencia. Liquidaciones diarias y acceso directo a compradores mayoristas.',
                s2t: 'Venta Mayorista',
                s2d: 'Suministro diario a pescaderías, restaurantes, supermercados y hostelería. Producto fresco garantizado cada mañana desde la lonja.',
                s3t: 'Importación',
                s3d: 'Acceso a las mejores especies del mundo. Colaboramos con los mejores proveedores internacionales para ofrecerte variedad sin límites.',
                s4t: 'Exportación',
                s4d: 'Llevamos el mejor pescado mediterráneo a los mercados europeos e internacionales con toda la logística gestionada por nosotros.'
            },
            stats: {
                tag:    'En números',
                title:  'Barcino en cifras',
                label1: 'Años en el mercado',
                label2: 'Puestos en Mercabarna',
                label3: 'Días al año operativos',
                label4: 'Producto fresco diario'
            },
            contact: {
                tag:    'Estamos aquí',
                title:  'Contacta con nosotros',
                c1h3:   'Teléfono',
                c2h3:   'Email',
                c3h3:   'Dirección',
                c3val:  'C/ Mercat del Peix, 13<br>Zona Franca · Mercabarna<br>08040 Barcelona',
                c4h3:   'Horario',
                c4val:  'Lunes a Sábado<br>Apertura en madrugada<br>Según calendario Mercabarna'
            },
            footer: {
                copy:    '© 2025 Barcino Consignacions SL · CIF B66284555',
                address: 'Mercat del Peix · Mercabarna · 08040 Barcelona',
                home: 'Inicio', about: 'Nosotros', products: 'Producto',
                services: 'Servicios', contact: 'Contacto'
            }
        },

        /* ─── ANGLÈS ─── */
        en: {
            meta: {
                title: 'Barcino Consignacions SL | Fresh Fish Wholesalers · Mercabarna',
                description: 'Barcino Consignacions SL – Fresh fish and seafood wholesalers at Mercat del Peix, Mercabarna, Barcelona. Consignment, wholesale sales, import and export.'
            },
            nav: {
                home: 'Home', about: 'About', products: 'Products',
                services: 'Services', stats: 'Figures', contact: 'Contact'
            },
            gallery: {
                tag:   'Our product',
                title: 'Fresh from the market every morning',
                g1: 'Sea bass', g2: 'Red prawn', g3: 'Octopus',
                g4: 'Monkfish', g5: 'Tuna', g6: 'Clams'
            },
            hero: {
                title:    'Fresh Fish Wholesalers',
                subtitle: 'Consignment · Sales · Import · Export',
                badge:    'Mercat del Peix · Mercabarna · Barcelona',
                cta:      'Get in touch',
                scroll:   'Discover more'
            },
            about: {
                tag:   'Who we are',
                title: 'Tradition and excellence<br>at the heart of Mercabarna',
                p1:    'We are a wholesale company specialised in the <strong>consignment and marketing of fresh fish and seafood</strong>, based at the Mercat del Peix in Mercabarna, the largest food distribution centre in Southern Europe.',
                p2:    'Since our founding in 2014, we have established ourselves as a benchmark in the sector with <strong>7 of our own market stalls</strong>, allowing us to offer the greatest variety and quality directly from the fish market every morning.',
                p3:    'We work with fishmongers, restaurants, supermarkets and distributors throughout Spain and Europe, always guaranteeing the <strong>highest freshness and traceability</strong> of the product.',
                badge1: 'Stalls 11, 12, 13',
                badge2: 'Stalls 22, 67, 75, 76',
                badge3: 'GMP Mercabarna Members',
                badge4: 'Founded in 2014',
                visualText:    'Central Fish Market',
                visualSubtext: 'Barcelona · Spain'
            },
            services: {
                tag:   'What we do',
                title: 'Our services',
                s1t: 'Consignment',
                s1d: 'We manage the sale of your fish at the market with full transparency. Daily settlements and direct access to wholesale buyers.',
                s2t: 'Wholesale Sales',
                s2d: 'Daily supply to fishmongers, restaurants, supermarkets and hospitality businesses. Fresh produce guaranteed every morning from the market.',
                s3t: 'Import',
                s3d: 'Access to the finest species from around the world. We collaborate with top international suppliers to offer you unlimited variety.',
                s4t: 'Export',
                s4d: 'We bring the best Mediterranean fish to European and international markets, with all logistics fully managed by us.'
            },
            stats: {
                tag:    'In figures',
                title:  'Barcino in figures',
                label1: 'Years in the market',
                label2: 'Stalls at Mercabarna',
                label3: 'Operating days per year',
                label4: 'Fresh produce daily'
            },
            contact: {
                tag:    'We\'re here',
                title:  'Get in touch',
                c1h3:   'Phone',
                c2h3:   'Email',
                c3h3:   'Address',
                c3val:  'Mercat del Peix St., 13<br>Zona Franca · Mercabarna<br>08040 Barcelona',
                c4h3:   'Opening hours',
                c4val:  'Monday to Saturday<br>Early morning opening<br>According to Mercabarna calendar'
            },
            footer: {
                copy:    '© 2025 Barcino Consignacions SL · VAT B66284555',
                address: 'Fish Market · Mercabarna · 08040 Barcelona',
                home: 'Home', about: 'About', products: 'Products',
                services: 'Services', contact: 'Contact'
            }
        }
    };

    /* ════════════════════════════════════════════════════
       MOTOR
    ════════════════════════════════════════════════════ */

    /** Accés a clau en notació de punts: "about.p1" → T[lang].about.p1 */
    function get(lang, key) {
        return key.split('.').reduce(function (o, k) {
            return o != null ? o[k] : undefined;
        }, T[lang]);
    }

    function apply(lang) {
        if (!SUPPORTED.includes(lang)) lang = DEFAULT;

        /* lang attribute */
        document.documentElement.lang = lang;

        /* <title> i meta description */
        var meta = T[lang].meta || {};
        if (meta.title)       document.title = meta.title;
        if (meta.description) {
            var m = document.querySelector('meta[name="description"]');
            if (m) m.setAttribute('content', meta.description);
        }

        /* Contingut de text */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var val = get(lang, el.getAttribute('data-i18n'));
            if (val != null) el.textContent = val;
        });

        /* Contingut HTML (elements amb <strong>, <br>, etc.) */
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var val = get(lang, el.getAttribute('data-i18n-html'));
            if (val != null) el.innerHTML = val;
        });

        /* Botons actius */
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            var active = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        /* Desar preferència */
        try { localStorage.setItem(LS_KEY, lang); } catch (e) { /* silenci */ }
    }

    /* Delegació de clic per als botons de llengua */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.lang-btn');
        if (btn) apply(btn.getAttribute('data-lang'));
    });

    /* Inicialització */
    var saved;
    try { saved = localStorage.getItem(LS_KEY); } catch (e) { saved = null; }
    apply(SUPPORTED.includes(saved) ? saved : DEFAULT);

}());
