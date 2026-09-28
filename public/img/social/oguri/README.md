# Oguri · secuencia anterior de Social Link

Fuente: cinco PNG generados con ChatGPT y proporcionados por Edward el 25/09/2026.
Archivos originales en orden: `Imagen de ChatGPT 25 sept 2026, 11_08_37 a.m.-1.png`,
`11_08_38 a.m.-2.png`, `11_08_38 a.m.-3.png`, `11_08_39 a.m.-4.png`, `11_08_39 a.m.-5.png`
(los cuatro últimos comparten el prefijo `Imagen de ChatGPT 25 sept 2026, `).

- Los cinco lienzos miden 1031 × 1526 y contienen canal alfa.
- `poster.webp`: primer fotograma, convertido a WebP sin pérdida.
- `idle-sheet.webp`: cinco fotogramas contiguos, de izquierda a derecha, 5155 × 1526, WebP sin pérdida.
- `idle-480.webp`: variante web estándar, 480 × 710 por fotograma, 400616 bytes.
- `idle-960.webp`: variante web para alta densidad, 960 × 1421 por fotograma, 1127888 bytes.
- Las variantes web se redimensionan por fotograma con Lanczos3 y se codifican en WebP calidad 90 y alfa 100. El maestro sin pérdida se conserva como fuente; no se descarga durante la animación normal.
- Se elige la resolución según el ancho mostrado y la densidad de pantalla, con posibilidad de subir a 960 al redimensionar. Se conserva la variante ya cargada hasta decodificar la nueva.
- El póster y el maestro conservan los lienzos originales. Las variantes mantienen proporcionalmente los márgenes y el encuadre, sin retocar al personaje.
- Bucle de 3.2 segundos en ida y vuelta: 1 → 2 → 3 → 4 → 5 → 4 → 3 → 2.
- La secuencia se carga al entrar en pantalla y solo se reproduce tras decodificarse. Se pausa fuera de vista, al ocultar la pestaña y mediante el control de pausa. Movimiento reducido muestra el póster.

La consistencia de movimiento y los bordes dependen de los fotogramas generados; requieren revisión visual. El menú principal sigue utilizando su ilustración anterior.
# Video provisional actual

- Fuente: `C:\Users\Edward\Downloads\gemini_generated_video_2c36ce23.mp4`, elegido por Edward para reemplazar `Oguri_Idle.mp4`. Original intacto: H.264, 720 × 1280, 24 fps, 10 s y audio AAC.
- `idle-video.webm`: VP9 con alfa, 540 × 960, 24 fps, 10 s, 1830865 bytes; sin pista de audio.
- `video-poster.webp`: primer fotograma procesado, 540 × 960, 54206 bytes.
- Se conserva la duración completa: este clip ya comienza con fondo verde. Croma RGB aproximado `#17E127`, similitud 0.18 y mezcla 0.04. No se interpolaron fotogramas ni se fabricó una unión por fundido.
- Conversión reproducible con FFmpeg 6.1.1:

```sh
ffmpeg -i gemini_generated_video_2c36ce23.mp4 -map 0:v:0 -an -vf "scale=540:960,format=rgba,colorkey=0x17E127:0.18:0.04,format=yuva420p" -c:v libvpx-vp9 -crf 32 -b:v 0 -deadline good -cpu-used 3 -auto-alt-ref 0 idle-video.webm
```

El póster usa el mismo escalado y croma sobre el primer fotograma, codificado con Sharp en WebP calidad 90 y alfa 100. Los bordes y las variaciones de pose dependen del video generado. `loop` repite el clip, pero no garantiza una unión imperceptible. Transparencia verificada en Brave; otros motores requieren revisión.

Los sprites descritos arriba son recursos de la iteración anterior, conservados como referencia; el componente actual no los descarga.
