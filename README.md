# P3R Portfolio — Edward Negrete

Portafolio personal inspirado en el menú de **Persona 3 Reload**. Proyecto de aprendizaje construido con Next.js 16, React 19, TypeScript y Tailwind CSS 4, con diseño personalizado en CSS.

## Desarrollo local

Requiere Node.js 20.9 o superior y npm.

```sh
npm ci
npm run dev
```

Abre la URL indicada en la terminal (normalmente http://localhost:3000).

Durante el diseño usa `npm run dev`: actualiza los cambios automáticamente. `npm start` sirve la compilación de producción y debe reiniciarse después de una nueva compilación.

```sh
npm run lint   # ESLint
npm run build  # Compilación y validación de TypeScript
npm test       # Pruebas de transiciones (Node.js 22.18+ o 24+)
npm start     # Servir la compilación de producción
```

## Organización

- `app/page.tsx`: composición de la interfaz y estado de navegación.
- `components/MainMenu.tsx`: pantalla principal con Oguri, selección por flechas/Home/End y apertura de las seis secciones. Volver restaura el foco en la última sección elegida.
- `app/layout.tsx`: fuentes, idioma y metadatos.
- `app/data/site.ts`: título, descripción y URL base del sitio.
- `app/opengraph-image.tsx`: tarjeta PNG para compartir (1200 × 630), generada desde el perfil.
- `app/icon.svg` y `app/favicon.ico`: identidad ED en formato vectorial y favicon compatible.
- `app/data/profile.ts`: perfil, avance académico y estadísticas decorativas.
- `app/data/portfolio.ts`: habilidades, intereses y trayectoria.
- `app/data/projects.ts`: proyectos reales, tecnologías y enlaces; los filtros se generan desde estos datos.
- `app/data/systemActions.ts`: acciones de contacto y estado de cada recurso (disponible o pendiente).
- `components/Sidebar.tsx`: navegación por clic, teclado y menú móvil.
- `components/SectionTransition.tsx`: transición entre secciones basada en eventos CSS.
- `components/ProgressBar.tsx`: barras reutilizables con valores accesibles y animación CSS.
- `components/ProjectDialog.tsx`: detalle de proyecto con diálogo nativo, Escape y restauración de foco.
- `components/SoundControls.tsx`: precarga de audio y botón de silencio de la interfaz.
- `components/SplashScreen.tsx`: bienvenida modal nativa una vez por sesión, con botón de entrada y foco dirigido al menú al terminar.
- `components/CustomCursor.tsx`: cursor propio (anillo con retardo + punto) activo solo con puntero fino; el nativo queda oculto en `app/globals.css`.
- `components/OguriPortrait.tsx`: ilustración animada exclusiva de la ficha de Oguri en Social Link, con pausa, detección de visibilidad y movimiento reducido.
- `public/img/`: imágenes del sitio (ilustración de Oguri Cap).
- `lib/sounds.ts`: efectos de sonido tipados, estado de silencio persistente y reproducción tolerante a fallos.
- `public/audio/`: efectos de interfaz extraídos de Persona 3 Reload (CueSheet) y convertidos a MP3.
- `components/sections/`: componentes de cada pantalla.
- `app/globals.css`: estilos organizados en capas, responsive y movimiento reducido.

El progreso académico se calcula desde los **semestres completados**, no desde el semestre en curso. Las habilidades de About y Skills comparten sus valores. HP/SP son elementos decorativos y los niveles de habilidades representan una autoevaluación personal.

## Controles

- Menú principal: clic/toque o Enter/Espacio para abrir una sección; flechas, Home y End para elegir.
- Dentro de una sección: «Volver al menú» o Escape para regresar. Un diálogo abierto o el menú móvil desplegado atienden Escape primero.

- Pantalla de inicio: activar «Entrar al portafolio» con clic, toque, Enter o Espacio; Escape también permite continuar. Tab mantiene el foco dentro del diálogo. Se muestra una vez por sesión de pestaña.
- Tab: acceder a los controles.
- «Saltar al contenido»: primer enlace al navegar con Tab, permite omitir el menú lateral.
- Flechas arriba/abajo dentro del menú: recorrer opciones.
- Enter o Espacio: confirmar.
- Home / End: primera o última opción.
- En móvil: botón MENÚ para desplegar; Escape o seleccionar una opción para cerrar.
- Botón SONIDO (esquina inferior derecha): silencia o reactiva los efectos; el estado se guarda en el navegador.
- En escritorio, el cursor del sistema se sustituye por uno propio que se agranda sobre elementos interactivos.

## Flujo de trabajo

1. Revisar `git status` y definir una etapa de alcance concreto.
2. Editar los datos en sus módulos compartidos; evitar duplicarlos en componentes.
3. Mantener los tipos de TypeScript y usar elementos HTML accesibles.
4. Ejecutar `npm run lint`, `npm run build` y `git diff --check`.
5. Comprobar navegación, cambios rápidos de sección, scroll y menú a 390, 768 y 1280 px; revisar también movimiento reducido.
6. Revisar el diff y crear un commit descriptivo por etapa (`feat:`, `fix:`, `refactor:` o `docs:`), antes de enviarlo al remoto.

## Preparación del despliegue

- Define `SITE_URL` con la dirección pública completa (por ejemplo, `https://tu-dominio.example`) antes de compilar para producción. Consulta `.env.example`.
- Si no se define, se utiliza `VERCEL_PROJECT_PRODUCTION_URL` en Vercel y `http://localhost:3000` en local.
- Al cambiar el dominio, vuelve a compilar: los metadatos se generan estáticamente.
- Revisa `/opengraph-image`, `/icon.svg` y `/favicon.ico`. Los metadatos incluyen URL canónica, Open Graph y tarjeta grande para Twitter/X.
- La vista previa real en redes se comprobará con una URL pública; localhost solo permite revisar los archivos y etiquetas.

## Estado

### Interacción

El recorrido menú ↔ ficha utiliza `SceneTransition`: barrido diagonal de cobertura (220 ms), cambio de escena y revelado (300 ms), con entrada coordinada de ilustración/opciones o del panel. Durante el cambio el contenido queda inerte y el foco se restaura al terminar. Movimiento reducido omite el barrido. Un identificador por fase evita avances duplicados por eventos tardíos y temporizadores de respaldo. La máquina de estados tiene pruebas con `node:test`; el ritmo visual queda pendiente de revisión en navegador.

Nueva composición: después del splash se presenta un menú principal independiente con el personaje y las seis opciones. Las fichas conservan navegación lateral directa y un botón de regreso. En móvil las opciones se muestran sobre una ilustración atenuada. La entrada enfoca el botón de regreso; al volver se enfoca la última sección elegida. Pendiente de revisión visual e interactiva de este recorrido.

Las transiciones recuerdan el último destino solicitado y cuentan con un temporizador de respaldo si se cancela la animación. El audio se detiene al ocultar la pestaña, limita repeticiones de cursor a intervalos de 70 ms y limpia el sonido diferido de About al desmontar la sección. Comprobaciones aisladas con audio simulado: limitación de repeticiones, silencio, pestaña oculta y detención correctas; la revisión interactiva de navegación rápida y foco sigue pendiente en navegador.

El splash bloquea el contenido de fondo mediante `showModal()` y mantiene ese bloqueo durante su transición de salida. Al entrar, enfoca el menú móvil o la sección activa de escritorio; con movimiento reducido cierra sin esperar la animación. Escape reproduce cancelación únicamente al cerrar un menú móvil o diálogo de proyecto. Pendiente de comprobación interactiva en navegador: entrada, foco, recarga de sesión y cierre de proyectos.

### Dirección visual de referencia

Fase 2, About y System: ambas fichas comparten `components/sections/ProfilePanel.module.css` para el panel oscuro y el encabezado blanco con acento rojo. Las estadísticas usan filas negras diagonales y etiquetas ampliadas; System conserva los enlaces pendientes y muestra Tab como control para recorrer sus acciones. Pendiente de revisión visual de esta iteración.

Fase 2, Proyectos y Timeline: títulos claros con cortes diagonales, selección blanca con acento rojo y paneles oscuros. Los filtros de proyectos conservan su estado visible al pasar el ratón; el diálogo comparte el tratamiento visual de las tarjetas. Timeline amplía fechas y subtítulos y alinea el eje con los marcadores. Los ajustes compactos se basan en el ancho del panel; el diálogo usa el ancho de ventana. Pendiente de revisión visual.

La composición interna de About, System, Social Link y Timeline responde al ancho del panel de contenido mediante consultas de contenedor (`portfolio`), descontando el menú y la ilustración lateral. La aprobación visual de esta fase sigue pendiente; lint y build no sustituyen la revisión en navegador.

La revisión de capturas de escritorio motivó una ficha oscura para mejorar el contraste de About y límites de desbordamiento horizontal en Social Link. Por decisión de diseño, se retiró la columna global de personaje: Oguri permanece en el menú principal y aparece dentro de su propia ficha en Social Link.

### Social Link: primera ficha ilustrada

La ficha de Oguri utiliza los cinco fotogramas proporcionados por Edward, convertidos a WebP sin pérdida conservando los lienzos de 1031 × 1526. Un sprite de 5155 × 1526 (aproximadamente 3.85 MB) reproduce un bucle de ida y vuelta de 3.2 segundos; el póster pesa aproximadamente 746 KB. La secuencia solo se solicita cuando la ficha entra en pantalla y no está activo el movimiento reducido. El póster permanece visible hasta que el sprite termina de decodificarse; ante un error se conserva la imagen fija.

La animación se pausa con su botón, al salir de vista o al ocultar la pestaña. Movimiento reducido muestra el póster y elimina el barrido de entrada. En paneles amplios, ilustración y texto comparten dos columnas; en tamaños menores se apilan. Los otros vínculos conservan sus fichas de texto hasta disponer de sus recursos. Revisar visualmente el bucle, sus bordes y la composición móvil antes de extender el patrón.

Verificado en Brave headless local: secuencia en reproducción, pausa que congela el tiempo, reanudación, pausa por intersección, imagen fija con movimiento reducido, ausencia de desbordamiento horizontal a 1440 × 1000 y 390 × 844, retirada de Oguri al seleccionar Leon o About y conservación de su imagen original en el menú principal. La aprobación estética del movimiento sigue pendiente del usuario.

Al cambiar de vínculo, `SceneTransition` en modo panel mantiene la ficha anterior durante la cobertura y revela la última selección solicitada. La lista sigue disponible durante el barrido, pero el detalle permanece inerte hasta finalizar. La misma máquina de estados se reutiliza para el menú principal y las fichas; sus pruebas incluyen selecciones rápidas de vínculos.

La nueva iteración toma como referencia los menús principal, Social Link y estado del grupo de Persona 3 Reload: fondo azul eléctrico con luz cian superior, selección blanca con acento rojo y filas negras de corte diagonal. Aplicado al fondo, navegación, Social Link y Skills. La revisión visual a 390, 768 y 1280 px sigue pendiente de comprobación en navegador.

El cursor personalizado se activa al mover el ratón; conserva el cursor nativo en diálogos y con movimiento reducido. Silenciar detiene también los efectos que ya se están reproduciendo.

Las seis secciones cuentan con presentación: About, Proyectos, Skills, Social Link, Timeline y System, con navegación por teclado en las listas y estilos aislados en CSS Modules. Proyectos muestra el portafolio real con filtros y detalle enlazado a GitHub. Skills presenta Java, SQL/Bases de datos, HTML/CSS y JavaScript con porcentajes de autoevaluación y comparte esos datos con About y System. La interfaz reproduce efectos de sonido de Persona 3 Reload en menús, selecciones y cierres, con botón de silencio persistente; los navegadores solo permiten audio tras la primera interacción del usuario. La pantalla de inicio se muestra una vez por pestaña y anuncia la entrada con el sonido de apertura del menú, y en escritorio el cursor del sistema se sustituye por uno propio. Oguri aparece en el menú principal y exclusivamente en su ficha dentro de Social Link. El CV y el enlace de LinkedIn aparecen como pendientes hasta agregar sus archivos u otros datos definitivos.

La inspiración visual en Persona 3 Reload es un homenaje personal; este proyecto no está afiliado a Atlus.
