# Feliz cumpleaños, MARIA ♡

Web estática inspirada en la secuencia del video: lluvia de caracteres rosa, cuenta regresiva, HAPPY BIRTHDAY MARIA, torta con velas, carta, álbum y corazón de fotos. No requiere npm ni compilación.

## Tus imágenes

Pon **8 fotos** en `assets/images/`, con estos nombres exactos:

```
foto-01.jpg
foto-02.jpg
foto-03.jpg
foto-04.jpg
foto-05.jpg
foto-06.jpg
foto-07.jpg
foto-08.jpg
```

Se muestran de dos en dos en el álbum y se reutilizan en el corazón. Recomendación: formato vertical, 800 × 1000 píxeles aproximadamente. Si falta una foto se muestra un diseño de reemplazo. Para usar PNG o WebP, cambia los nombres en la lista `memories` al principio de `app.js`; cambiar solo la extensión del archivo no convierte una imagen.

## Música opcional

Pon una canción en `assets/audio/cumple.mp3`. Se intenta reproducir al abrir la sorpresa. El botón ♫ permite activarla o pausarla. Sin archivo de audio, la web funciona igualmente.

## Textos

El álbum funciona con gestos sobre el libro: desliza **de derecha a izquierda para avanzar** y en sentido contrario para volver. La hoja gira de derecha a izquierda al avanzar. En computadora también puedes arrastrar con el mouse, usar las flechas del teclado al enfocar el libro o usar los botones. En celular se ocultan los botones de flecha. El desplazamiento vertical de la página sigue disponible.

Edita los mensajes y títulos de las fotos en `memories`, al principio de `app.js`. El saludo principal está en `index.html`. Las fuentes de Google son opcionales: sin internet se usan las fuentes de sistema.

## Abrir localmente

Abre `index.html` con doble clic. También puedes usar un servidor estático como Live Server de VS Code. Todo el contenido funciona en el navegador, sin backend.

## GitHub Pages con Actions

1. Sube estos archivos a tu repositorio, incluida la carpeta `.github`.
2. En GitHub ve a **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Haz push a `main` o ejecuta el workflow manualmente desde Actions. Si tu rama se llama distinto, cambia `branches: [main]` en `.github/workflows/deploy.yml`.
4. El workflow publica únicamente HTML, CSS, JavaScript y assets. La URL aparecerá en el despliegue de GitHub Pages.

Todas las rutas son relativas para funcionar también bajo `usuario.github.io/nombre-del-repositorio/`.
