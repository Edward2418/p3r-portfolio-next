# P3R Portfolio — Edward Negrete

Portafolio personal inspirado en el menú de **Persona 3 Reload**. Proyecto de aprendizaje construido con Next.js 16, React 19, TypeScript y Tailwind CSS 4, con diseño personalizado en CSS.

## Desarrollo local

Requiere Node.js 20.9 o superior y npm.

```sh
npm ci
npm run dev
```

Abre la URL indicada en la terminal (normalmente http://localhost:3000).

```sh
npm run lint   # ESLint
npm run build  # Compilación y validación de TypeScript
npm start     # Servir la compilación de producción
```

## Organización

- `app/page.tsx`: composición de la interfaz y estado de navegación.
- `app/layout.tsx`: fuentes, idioma y metadatos.
- `app/data/profile.ts`: perfil, avance académico y estadísticas decorativas.
- `app/data/portfolio.ts`: habilidades, intereses y trayectoria.
- `app/data/projects.ts`: proyectos reales, tecnologías y enlaces; los filtros se generan desde estos datos.
- `app/data/systemActions.ts`: acciones de contacto y estado de cada recurso (disponible o pendiente).
- `components/Sidebar.tsx`: navegación por clic, teclado y menú móvil.
- `components/SectionTransition.tsx`: transición entre secciones basada en eventos CSS.
- `components/ProgressBar.tsx`: barras reutilizables con valores accesibles y animación CSS.
- `components/ProjectDialog.tsx`: detalle de proyecto con diálogo nativo, Escape y restauración de foco.
- `components/SoundControls.tsx`: precarga de audio y botón de silencio de la interfaz.
- `components/SplashScreen.tsx`: pantalla de bienvenida una sola vez por sesión, cerrada con cualquier tecla o clic.
- `components/CustomCursor.tsx`: cursor propio (anillo con retardo + punto) activo solo con puntero fino; el nativo queda oculto en `app/globals.css`.
- `components/MenuCharacter.tsx`: ilustración decorativa en columna propia a la derecha (desde 1440 px), atenuada fuera de About. En pantallas menores se oculta para conservar el ancho de lectura.
- `public/img/`: imágenes del sitio (ilustración de Oguri Cap).
- `lib/sounds.ts`: efectos de sonido tipados, estado de silencio persistente y reproducción tolerante a fallos.
- `public/audio/`: efectos de interfaz extraídos de Persona 3 Reload (CueSheet) y convertidos a MP3.
- `components/sections/`: componentes de cada pantalla.
- `app/globals.css`: estilos organizados en capas, responsive y movimiento reducido.

El progreso académico se calcula desde los **semestres completados**, no desde el semestre en curso. Las habilidades de About y Skills comparten sus valores. HP/SP son elementos decorativos y los niveles de habilidades representan una autoevaluación personal.

## Controles

- Pantalla de inicio: cualquier tecla, clic o toque entra al portafolio (una vez por sesión).
- Tab: acceder a los controles.
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

## Estado

### Dirección visual de referencia

La composición interna de About, System, Social Link y Timeline responde al ancho del panel de contenido mediante consultas de contenedor (`portfolio`), descontando el menú y la ilustración lateral. La aprobación visual de esta fase sigue pendiente; lint y build no sustituyen la revisión en navegador.

La nueva iteración toma como referencia los menús principal, Social Link y estado del grupo de Persona 3 Reload: fondo azul eléctrico con luz cian superior, selección blanca con acento rojo y filas negras de corte diagonal. Aplicado al fondo, navegación, Social Link y Skills. La revisión visual a 390, 768 y 1280 px sigue pendiente de comprobación en navegador.

El cursor personalizado se activa al mover el ratón; conserva el cursor nativo en diálogos y con movimiento reducido. Silenciar detiene también los efectos que ya se están reproduciendo.

Las seis secciones cuentan con presentación: About, Proyectos, Skills, Social Link, Timeline y System, con navegación por teclado en las listas y estilos aislados en CSS Modules. Proyectos muestra el portafolio real con filtros y detalle enlazado a GitHub. Skills presenta Java, SQL/Bases de datos, HTML/CSS y JavaScript con porcentajes de autoevaluación y comparte esos datos con About y System. La interfaz reproduce efectos de sonido de Persona 3 Reload en menús, selecciones y cierres, con botón de silencio persistente; los navegadores solo permiten audio tras la primera interacción del usuario. La pantalla de inicio se muestra una vez por pestaña y anuncia la entrada con el sonido de apertura del menú, y en escritorio el cursor del sistema se sustituye por uno propio. La ilustración de Oguri Cap acompaña el menú y se atenúa fuera de About. El CV y el enlace de LinkedIn aparecen como pendientes hasta agregar sus archivos u otros datos definitivos.

La inspiración visual en Persona 3 Reload es un homenaje personal; este proyecto no está afiliado a Atlus.
