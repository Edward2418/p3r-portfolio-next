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
- `app/data/portfolio.ts`: habilidades, proyectos, intereses y trayectoria.
- `components/Sidebar.tsx`: navegación por clic, teclado y menú móvil.
- `components/SectionTransition.tsx`: transición entre secciones basada en eventos CSS.
- `components/ProgressBar.tsx`: barras reutilizables con valores accesibles y animación CSS.
- `components/sections/`: componentes de cada pantalla.
- `app/globals.css`: estilos organizados en capas, responsive y movimiento reducido.

El progreso académico se calcula desde los **semestres completados**, no desde el semestre en curso. Las habilidades de About y Skills comparten sus valores. HP/SP son elementos decorativos y los niveles de habilidades representan una autoevaluación personal.

## Controles

- Tab: acceder a los controles.
- Flechas arriba/abajo dentro del menú: recorrer opciones.
- Enter o Espacio: confirmar.
- Home / End: primera o última opción.
- En móvil: botón MENÚ para desplegar; Escape o seleccionar una opción para cerrar.

## Flujo de trabajo

1. Revisar `git status` y definir una etapa de alcance concreto.
2. Editar los datos en sus módulos compartidos; evitar duplicarlos en componentes.
3. Mantener los tipos de TypeScript y usar elementos HTML accesibles.
4. Ejecutar `npm run lint`, `npm run build` y `git diff --check`.
5. Comprobar navegación, cambios rápidos de sección, scroll y menú a 390, 768 y 1280 px; revisar también movimiento reducido.
6. Revisar el diff y crear un commit descriptivo por etapa (`feat:`, `fix:`, `refactor:` o `docs:`), antes de enviarlo al remoto.

## Estado

Base responsive, navegación, transiciones y ficha About implementadas. Skills, Social Link, Timeline y System tienen estructura; su presentación está en desarrollo. Proyectos tiene datos preparados y una pantalla provisional. Audio, personajes, CV y enlaces definitivos son etapas pendientes.

La inspiración visual en Persona 3 Reload es un homenaje personal; este proyecto no está afiliado a Atlus.
