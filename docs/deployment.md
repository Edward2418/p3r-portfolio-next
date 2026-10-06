# Publicación en Vercel

## Estado

Preparación local completada; aún no hay URL pública confirmada. El repositorio es `Edward2418/p3r-portfolio-next` y la rama de producción es `main`. Las cuatro fichas Social Link sin imágenes no bloquean la publicación. System incluye correo y GitHub; no se ofrecen CV ni LinkedIn.

## Primera publicación

1. Crear una cuenta en https://vercel.com/signup usando **Continue with GitHub** con la cuenta de Edward. Para este portafolio personal, elegir Hobby si el uso cumple las condiciones actuales del plan. Revisar sus límites durante el registro.
2. Elegir **Add New → Project**, conectar GitHub e importar `Edward2418/p3r-portfolio-next`.
3. Mantener el directorio raíz del repositorio y el preset **Next.js**. Usar `npm ci` para instalar y `npm run build` para compilar; mantener la salida predeterminada del preset. Seleccionar Node.js 24.x, compatible con las pruebas de este proyecto.
4. Elegir el nombre del proyecto y publicar. No se necesitan bases de datos ni claves externas.
5. Confirmar el dominio de producción asignado por Vercel. En **Settings → Environment Variables**, definir `SITE_URL` con esa URL HTTPS completa en el entorno **Production**, por ejemplo `https://nombre-elegido.vercel.app` (sustituir por el dominio real).
6. Hacer **Redeploy** para regenerar los metadatos con la URL definitiva. Cuando `SITE_URL` está ausente, el código usa `VERCEL_PROJECT_PRODUCTION_URL` si Vercel lo proporciona.

No se ha creado un dominio ni un proyecto remoto automáticamente. El propietario debe conectar su cuenta y elegir el nombre definitivo.

## Verificación pública

- `/`: respuesta correcta, título de Edward, descripción y URL canónica con el dominio de producción.
- `/robots.txt`: referencia al sitemap del dominio correcto.
- `/sitemap.xml`: una única entrada para `/`; los botones del menú no son rutas independientes.
- `/opengraph-image`, `/icon.svg` y `/favicon.ico`: accesibles. Confirmar que `og:image` y `twitter:image` usan URLs públicas y revisar la tarjeta real al compartir.
- Splash, las seis secciones, galería de Proyectos y regreso mediante teclado.
- System: correo institucional y GitHub, sin enlaces provisionales.
- Oguri: video sin audio, transparencia, pausa, repetición y póster con movimiento reducido. Revisar especialmente Safari/iOS, todavía no validado.
- Repetir Lighthouse con la URL pública; los informes locales están en `performance.md`.

## Actualizaciones

Tras la importación, Vercel puede desplegar automáticamente los commits de `main`. Revisar cada despliegue antes de considerarlo publicado correctamente. Si cambia el dominio, actualizar `SITE_URL` y recompilar. Si hay una regresión, restaurar desde Vercel un despliegue anterior funcional y corregir el código en un nuevo commit.

## Contenido acordado con Edward

Se retiraron de Timeline las referencias a Kotlin, JFlex y primeros proyectos reales por solicitud del autor. La entrada actual describe el desarrollo de este portafolio y el refuerzo de sus conocimientos. No añadir proyectos ni experiencia no aportados por el autor. La única ficha de proyecto actual corresponde a este portafolio.
