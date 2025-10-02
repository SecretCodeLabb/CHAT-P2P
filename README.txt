THE LINE STUDIO — Portafolio + Talleres
=======================================

Descripción
- Sitio web estático para presentar el estudio THE LINE, su trabajo (portafolio) y una sección de talleres.
- Implementado con HTML, CSS y JavaScript puro (sin dependencias externas ni build).
- Navegación multipágina: `index.html` (inicio), `talleres.html` (talleres) y `about.html` (nosotros).

Estructura del proyecto
- `index.html`: Página principal con héroe, galería de proyectos y carrusel con texto superpuesto.
- `talleres.html`: Listado de próximos talleres con tarjetas similares a la galería.
- `about.html`: Historia, misión y equipo del estudio.
- `styles.css`: Estilos globales (header fijo, hero, galería, overlays, modal, etc.).
- `script.js`: Interactividad (animaciones en scroll, modal de detalle, hover de video, navegación básica).
- `talleres iamgenes/`: Carpeta de activos locales (imágenes y videos) usada por la galería y el carrusel.
  - `talleres iamgenes/carrusel/`: Imágenes mostradas en el carrusel del home.

Principales funcionalidades
- Header fijo con menú de navegación y estado activo por página.
- Galería de proyectos/talleres con tarjetas responsivas y overlay al hover.
- Animaciones en scroll usando `IntersectionObserver` (clase `animate` aplicada al entrar en viewport).
- Modal de detalle: al hacer clic en una tarjeta se abre un modal con contenido dinámico según `data-id`.
- Videos en tarjetas: reproducción al hover y reinicio al salir del área.
- Carrusel héroe en `index.html` con texto fijo superpuesto (estructura HTML lista; estilos en CSS).

Cómo ejecutar localmente
- Opción rápida: abrir `index.html` directamente en el navegador.
- Recomendado (servidor local) para rutas y videos:
  1) Si tienes Python: `python -m http.server 8000` y abrir `http://localhost:8000/`.
  2) Con cualquier servidor estático (p. ej. Live Server en VS Code).

Personalización y edición
- Contenido del heroe y textos: editar en cada HTML dentro de sus secciones principales.
- Galería (proyectos y talleres): duplicar un bloque `.gallery-item`, actualizar imagen/video, títulos, descripciones y `data-id` único.
- Modal de detalle: en `script.js`, buscar el `switch(itemId)` y añadir/editar el caso correspondiente para el nuevo `data-id`.
- Navegación: las páginas ya enlazan entre sí con `.html`. El script tiene soporte básico para SPA si se usaran enlaces con `href="#"`.
- Estilos: ajustar variables visuales y tamaños en `styles.css` (hero, tarjetas, overlays, tamaños `.size-*`).

Requisitos
- Navegador moderno con soporte para `IntersectionObserver` (Chrome, Edge, Firefox, Safari recientes).
- No requiere instalación ni dependencias.

Accesibilidad y SEO (sugerencias)
- Completar/ajustar `alt` de imágenes y `title` por página.
- Revisar contrastes y tamaños de fuente en `styles.css`.
- Añadir `meta` de descripción y etiquetas Open Graph si se va a publicar.

Problemas conocidos y mejoras sugeridas
1) Codificación de caracteres: se observan tildes/ñ/comillas mal renderizadas (�, A�, etc.).
   - Guardar todos los archivos `.html`, `.css` y `.js` en UTF-8 (sin BOM) y mantener `<meta charset="UTF-8">`.
2) Carpeta de activos con espacio en el nombre: `talleres iamgenes`.
   - Espacios y acentos pueden causar problemas en rutas. Sugerido renombrar a `talleres_imagenes/` y actualizar todas las referencias.
3) Ruta de fondo en CSS posiblemente rota:
   - En `styles.css` hay `background-image: url("talleres iamgenes/IMG_1023.JP");` (extensión `.JP`). Verificar archivo real (probable `.JPG`) o ajustar la ruta.
4) Títulos de página con caracteres extraños (comillas/acentos en `<title>`).
   - Tras corregir la codificación, revisar manualmente los `<title>` en cada HTML.
5) Carrusel del héroe:
   - La estructura HTML/CSS existe; no hay lógica JS dedicada para auto-slide. Si se requiere animación o controles, agregar un pequeño script.

Convenciones de código
- HTML semántico básico y clases BEM-like descriptivas.
- JS modular simple en un único archivo (`script.js`), sin dependencias.
- CSS organizado por secciones (reset/base, header, hero, galería, modal, footer).

Despliegue
- Al ser un sitio estático, puede publicarse en:
  - GitHub Pages, Netlify, Vercel, o cualquier hosting estático.
- Asegurarse de subir también la carpeta de activos (`talleres iamgenes` o el nuevo nombre sugerido).

Autores y derechos
- © 2024 THE LINE STUDIO. Todos los derechos reservados.
- Propietario del contenido visual: THE LINE STUDIO (verificar permisos/licencias de imágenes y videos).

Contacto
- Agregar correo/redes del estudio en el footer o una sección de contacto si se desea.



ideas para implementar en la pagina y cosas por mejorar
-el background puede ser un video animado o texturas animadas
-agregar audio ambiental mientras se este en la apgina(puede apagarse para no molestar)
-cambiar estetica de las tarjetas y desplegables
-agregar timeline de las actividades que se han realizado
-hacer lo del mapa y que cada parte tenga un boton y muestra informacion de la obra que se realizo en ese lugar
-agregar bloque de las redes sociales
-tipografia diferente
-poner texturas superpuestas para darle aspecto de archivo fisico(no en todas partes)
-
