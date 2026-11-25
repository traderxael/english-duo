# English Duo 🦉

App web instalable (PWA) para aprender inglés, estilo Duolingo: lecciones cortas, vocabulario del día a día, gramática y pronunciación. Pensada para practicar desde el celular.

## Qué incluye

- Camino de unidades con lecciones que se desbloquean.
- Ejercicios: elegir la traducción, ordenar palabras, escuchar y escribir, y hablar (pronunciación).
- Gamificación: XP, racha diaria, vidas, niveles y logros.
- Tu progreso se guarda en el dispositivo (sin cuenta ni servidor).
- Funciona offline tras la primera carga e instalable en la pantalla de inicio.

## Instalarla en el celular (Android)

1. Abrí la app publicada (URL de GitHub Pages) en Chrome.
2. Menú ⋮ → **Agregar a la pantalla de inicio** (o "Instalar app").
3. Abrila desde el ícono: se abre como app, sin barra del navegador.

> La práctica de pronunciación usa el reconocimiento de voz de Chrome en Android. Si el micrófono falla, siempre podés tocar **Saltar**.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm test         # tests unitarios
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Deploy

Publicación automática a GitHub Pages con GitHub Actions (`.github/workflows/deploy.yml`) al hacer push a `main`. La `base` de Vite es `/english-duo/`, acorde a la URL del proyecto.