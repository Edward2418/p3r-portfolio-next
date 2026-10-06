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
2. Carga de audio bajo demanda implementada (ver comparación siguiente). Evaluar por separado la carga diferida de secciones.
3. Repetir la medición con la URL pública para incluir red, caché y alojamiento reales.

## Audio bajo demanda · 06/10/2026

Se retiró `preloadSounds()` del montaje global. `playSound()` conserva sus comprobaciones de silencio y visibilidad, crea el elemento únicamente al usar el efecto y lo reutiliza después. Esto reduce tráfico previo a la interacción a cambio de una posible demora de la primera reproducción en redes lentas.

Tres ejecuciones Lighthouse móviles antes y tres después, con producción local y splash, Brave headless y Lighthouse 13.5.0. La serie anterior se capturó antes de editar; la posterior después de compilar la optimización y validar las pruebas. Se usaron puertos locales 3101 y 3102 respectivamente. No son mediciones de usuarios reales ni sesiones de rendimiento aisladas del sistema operativo.

| Métrica | Antes (mediana) | Después (mediana) |
| --- | --- | --- |
| Puntuación | 78 (78–80) | 84 (72–86) |
| LCP | 3.87 s | 3.42 s |
| TBT | 375 ms | 327 ms |
| Transferencia inicial | 451521 bytes | 372252 bytes |
| Audio antes de interactuar | 79257 bytes | 0 bytes |

El ahorro de transferencia es consistente en las seis ejecuciones: 79269 bytes, aproximadamente 17.6 %. Las puntuaciones y tiempos varían, por lo que no se promete una mejora estable de seis puntos. La carga diferida de secciones y el recorrido posterior al splash siguen pendientes de medición.

Pruebas añadidas: ausencia de solicitudes de audio al entrar, solicitud de `open.mp3` al cerrar el splash y ninguna descarga de audio tras recargar una sesión silenciada y abrir About. Seis casos focalizados aprobados entre escritorio Chromium, móvil Chromium y Firefox (incluyen persistencia del silencio y movimiento reducido).

## Secciones bajo demanda · 06/10/2026

Las seis secciones usan `next/dynamic`: el menú se presenta primero y cada ficha solicita su código cuando se monta. Un mensaje de estado anuncia la carga si la conexión tarda. Se conserva el foco en «Volver al menú» durante la entrada.

Medición de Resource Timing con contexto nuevo de Brave, viewport 390 × 844 y producción local, antes (puerto 3102) y después (3103). Se espera a que la red esté inactiva primero en el splash y después al reproducir el video de Social Link. Valores acumulados de `transferSize` de recursos; no incluyen el documento principal ni son puntuaciones Lighthouse.

| Recurso | Antes | Después |
| --- | --- | --- |
| Recursos iniciales | 339494 bytes | 328524 bytes |
| JavaScript inicial | 156973 bytes, 6 solicitudes | 149983 bytes, 7 solicitudes |
| Recursos acumulados al abrir Social Link | 2257971 bytes | 2251705 bytes |
| JavaScript acumulado en Social Link | 156973 bytes | 154687 bytes |

Ahorro inicial observado: 10970 bytes (3.2 % de los recursos medidos). La ganancia es modesta y requiere una solicitud JS inicial adicional; no se atribuye una mejora de Lighthouse a este cambio. El video sigue siendo el recurso dominante al abrir Social Link.

Validación: navegación, foco, galería, audio y movimiento reducido pasaron a 1280, 768 y 390 px. La comprobación del bucle cambió de sondeo con una ventana de un segundo a observación de `timeupdate`, para no perder el reinicio bajo carga; se verificó de nuevo en los tres tamaños. Lint y compilación de producción correctos.

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
