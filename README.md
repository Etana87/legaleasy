# LegalEasy — MVP

Prototipo funcional de LegalEasy. Analiza textos legales con IA y los traduce a lenguaje humano.

## Stack

- **React** — UI
- **Vite** — bundler
- **Tailwind CSS v4** — estilos
- **Anthropic Claude API** — análisis de textos

## Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar la API key

Crea un archivo `.env` en la raíz del proyecto:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

> ⚠️ **Importante**: Esta configuración expone la API key en el cliente.
> Solo úsala en local o para demos. En producción, usa un servidor
> intermedio (Netlify Functions, Vercel Edge Functions, etc.) que
> haga las llamadas a la API desde el servidor.

### 3. Arrancar en desarrollo

```bash
npm run dev
```

### 4. Build para producción

```bash
npm run build
```

## Estructura

```
src/
├── components/
│   ├── Header.jsx        # Barra de navegación fija
│   ├── InputScreen.jsx   # Pantalla principal (filtros + textarea + botón)
│   ├── FilterRow.jsx     # Chips de tipo de documento
│   ├── ModeSelector.jsx  # Selector básico / experto
│   ├── UploadZone.jsx    # Zona de subida de archivo
│   ├── ResultView.jsx    # Pantalla de resultado (resumen + alertas + términos)
│   ├── TermCard.jsx      # Tarjeta individual de término legal
│   └── History.jsx       # Historial de análisis
├── App.jsx               # Estado global y navegación entre pantallas
├── main.jsx              # Punto de entrada
└── index.css             # Tailwind + tema de marca
```

## Próximos pasos

- [ ] Añadir PDF.js para extraer texto real de PDFs
- [ ] Mover la llamada a la API a un servidor (Netlify Functions)
- [ ] Añadir React Router para URLs por pantalla
- [ ] Persistir historial en localStorage
- [ ] Q&A por documento
