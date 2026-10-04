# Rendimiento y compatibilidad · 04/10/2026

## Línea base

Next.js 16.3.8, compilación de producción de `48b6b2b`, servidor local en puerto 3101. Lighthouse 13.5.0 sobre Brave headless, una ejecución con perfil móvil simulado y otra con preset desktop. Sin cambiar el estado de sesión ni cerrar automáticamente el splash.

| Métrica | Móvil simulado | Escritorio |
| --- | --- | --- |
| Puntuación de rendimiento | 74 | 96 |
| First Contentful Paint | 0.9 s | 0.3 s |
| Largest Contentful Paint | 4.0 s | 0.8 s |
| Total Blocking Time | 460 ms | 140 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 4.0 s | 0.9 s |
| Transferencia inicial | 441 KiB | 441 KiB |

Son mediciones de laboratorio locales, no métricas de usuarios reales ni del sitio publicado. Una ejecución no constituye una mediana estable. El splash condiciona qué contenido se mide; Social Link y las interacciones posteriores requieren medición separada.

Recursos principales en móvil: dos chunks JS de aproximadamente 72 y 48 KB, ilustración optimizada de 64 KB y dos fuentes de 63 y 58 KB. También se solicitan efectos de audio en la carga inicial (por ejemplo `levelup.mp3`, 28 KB). El video de Oguri se difiere hasta abrir su ficha y no forma parte de esos 441 KiB.

### Próxima optimización

1. Medir el menú después de cerrar el splash y el recorrido hasta Social Link.
2. Evaluar precarga de audio tras interacción y carga diferida de secciones; comparar varias ejecuciones bajo las mismas condiciones antes de adoptar cambios.
3. Repetir la medición con la URL pública para incluir red, caché y alojamiento reales.

## Compatibilidad

- Brave/Chromium: recorrido probado a 1280, 768 y 390 px.
- Firefox 155 (Playwright): cuatro casos aprobados a 1280 × 800; el caso de menú compacto se omite por tamaño. Transparencia del WebM comprobada leyendo el alfa de un punto vacío en canvas (0), además de reproducción, pausa y repetición.
- WebKit 26.6 (Playwright): descargado pero **no ejecutable** en este Windows por ausencia de `icuuc77.dll`, `icuin77.dll`, `nghttp3.dll` y `zlib1.dll`. No se declara compatibilidad con Safari; requiere otra máquina o un entorno compatible.
- Dispositivos físicos y Safari/iOS: pendientes.

## Reproducción

```sh
npx playwright install firefox webkit
```

En PowerShell:

```powershell
$env:E2E_CROSS_BROWSER = '1'
npm run test:e2e -- --project firefox --workers 1
# En un entorno compatible con WebKit:
npm run test:e2e -- --project webkit --workers 1
```

Los proyectos adicionales son optativos: el comando habitual conserva los tres tamaños Chromium. `PLAYWRIGHT_EXECUTABLE_PATH` solo se aplica a esos proyectos; Firefox/WebKit usan sus navegadores propios.

Para Lighthouse, instalar la versión 13.5.0 en un directorio de herramientas, compilar y arrancar producción; ejecutar su CLI con la URL local, `--only-categories=performance --output=json --chrome-flags="--headless=new"`, y añadir `--preset=desktop` para escritorio. Configurar `CHROME_PATH` si se utiliza Brave. Guardar los informes fuera del repositorio porque incluyen trazas extensas de la máquina local.
