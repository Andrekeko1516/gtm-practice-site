# OE Tagging Sandbox

Sitio de práctica (no oficial) inspirado en el producto de Open English, pensado
para **aprender y practicar Google Tag Manager (GTM)** contra un sitio realista:
tiene formularios, video, galería de imágenes, CTAs repetidos, comentarios,
countdown de urgencia, pricing tipo ecommerce y un acordeón de FAQ.

No usa ningún asset oficial de Open English (logo, fotos reales, copy de
producto) — es un diseño *inspirado* en el estilo de una plataforma de
aprendizaje de idiomas, con banners que dejan claro que es un sandbox interno.

## Estructura

```
gtm-practice-site/
├── index.html            → Home: hero, video YouTube, galería, features, testimonios, comentarios
├── landing-promo.html    → Landing de urgencia: countdown, formulario de lead, sticky CTA
├── landing-pricing.html  → Landing de precios: 3 planes, tabla comparativa, FAQ (acordeón)
├── gracias.html          → Página de conversión / thank you (lee ?tipo= &plan= de la URL)
├── assets/css/style.css  → Estilos compartidos
├── assets/js/main.js     → Interactividad (sin dataLayer.push automáticos, a propósito)
└── README.md             → Esta guía
```

Cada archivo trae en el `<head>` y justo después de `<body>` el snippet
estándar de GTM con el ID de ejemplo `GTM-XXXXXXX`. **Reemplázalo por tu propio
Container ID** en los 4 archivos antes de usarlo (busca `GTM-XXXXXXX`).

## Cómo publicarlo

### Opción recomendada para empezar: GitHub Pages
Es lo más simple si ya vas a subir el proyecto a GitHub (que es justo lo que
pediste) y no necesitas nada más que un sitio estático accesible por URL.

1. Crea un repo en GitHub y sube esta carpeta (`git init`, `git add .`,
   `git commit`, `git push`).
2. Ve a **Settings → Pages** del repo.
3. En "Source" elige la rama `main` y la carpeta `/root`.
4. Guarda: en 1-2 minutos tu sitio queda publicado en
   `https://<tu-usuario>.github.io/<tu-repo>/`.
5. Cada vez que hagas `git push`, GitHub Pages redeploya automáticamente.

Limitación a tener en cuenta: GitHub Pages es 100% estático, así que el
formulario de "lead" y el de "comentarios" solo funcionan en el navegador
(no llegan a ningún servidor) — que es exactamente lo que necesitas para
practicar el trigger **Form Submission** de GTM sin montar un backend.

### Alternativa con más funciones: Netlify
Si más adelante quieres que el formulario de verdad "envíe" datos a algún
lado (útil para practicar conversiones más realistas) o quieres *deploy
previews* automáticos por rama/PR antes de publicar (un flujo parecido al de
Workspace → Publicar de GTM), conecta el mismo repo de GitHub a Netlify:

1. Crea una cuenta gratis en netlify.com y elige "Import from Git".
2. Selecciona el repo — Netlify detecta que es estático y lo publica solo.
3. (Opcional) Agrega el atributo `netlify` al `<form>` de `landing-promo.html`
   para activar **Netlify Forms** y que las respuestas queden guardadas de
   verdad en un panel, sin backend propio.
4. Netlify también te da un dominio gratis tipo `tu-sitio.netlify.app` con
   HTTPS automático, igual que GitHub Pages.

En resumen: **GitHub Pages** para lo más simple (y es justo lo que pediste),
**Netlify** si quieres formularios "reales" o previews por rama. Cloudflare
Pages y Vercel son otras alternativas gratuitas equivalentes en velocidad y
dominio/HTTPS, pero no tienen manejo de formularios sin backend como Netlify.

## Cheat sheet de tagging

Usa esta tabla como guía de qué trigger/tag de GTM probar contra cada
elemento del sitio.

| Elemento en el sitio | Dónde está | Trigger sugerido en GTM | Variable útil |
|---|---|---|---|
| Botón "Prueba gratis" del header | Todas las páginas | Click - Just Links / All Elements, filtrado por `Click ID` = `cta-header-trial` | Click Element, Click Text |
| Botón CTA del Hero | `index.html` | Click - All Elements, `Click ID` = `cta-hero-trial` | Click URL |
| Video demo | `index.html`, `landing-promo.html` | **YouTube Video** (Start / Progress / Complete) | Video Title, Video Percent, Video Current Time |
| Imágenes de la galería | `index.html` | Click - All Elements, filtrado por `data-gallery-item` (Click Element → CSS Selector) | Click Element |
| Formulario de comentarios | `index.html` (#comentarios) | **Form Submission** en `#form-comments` | Form ID, Form Classes |
| Newsletter del footer | Todas las páginas | Form Submission en `#form-newsletter` | Form ID |
| Countdown de urgencia | `landing-promo.html` | Element Visibility sobre `.countdown-bar` | Percent Visible |
| Formulario de lead | `landing-promo.html` | Form Submission en `#form-lead-promo` (o Click en `#btn-submit-lead`) | Form ID |
| Sticky CTA móvil | `landing-promo.html` | Element Visibility sobre `.sticky-cta` + Click en `[data-cta="sticky-cta-trial"]` | Percent Visible |
| Botones "Seleccionar plan" | `landing-pricing.html` | Click - All Elements, filtrado por atributo `data-plan-select` (existe) | Click Element → dataset (via Custom JS variable) |
| Acordeón de FAQ | `landing-pricing.html` | Click - All Elements, CSS Selector `.accordion-trigger` | Click Text |
| Página de conversión | `gracias.html` | **Page View**, Page Path igual a `/gracias.html` | Page Path, Query params (`tipo`, `plan`) |
| Links a redes sociales | Footer de todas las páginas | Click - Just Links, Click URL no contiene tu propio dominio | Click URL |
| Scroll general | Cualquier página larga (ej. `index.html`) | **Scroll Depth** (25/50/75/90%) | Scroll Depth Threshold |

### Tip de flujo de trabajo
1. Activa el **modo Vista previa** de GTM apuntando a la URL publicada
   (GitHub Pages o Netlify).
2. Prueba cada fila de la tabla una por una y confirma en el panel de debug
   que el trigger dispara donde y cuando esperas.
3. Publica una versión de GTM con nombre descriptivo (ej. "v1 - tags de
   formularios y CTAs") para practicar también el versionado.
