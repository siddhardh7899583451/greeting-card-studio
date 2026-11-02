# Greeting Card Studio – All-in-One Greeting Card Generator

A complete, offline-first professional greeting card creation platform.

**Completely replaces** the previous single-file birthday.html project with a modern, feature-rich application.

## Features

* **80+ occasions** across Personal, Indian Festivals, International Holidays, Everyday Greetings, and Professional/Corporate categories
* **Professionally designed templates** with unique styles (festive, elegant, minimalist, romantic, corporate, traditional, etc.)
* **Interactive card editor**

  * Add / edit text with fonts, sizes, colors, bold/italic/underline, alignment
  * Upload personal photos
  * Add stickers and shapes
  * Change solid, gradient or image backgrounds
  * Drag, resize (via properties), rotate, opacity, layer order
  * Undo / Redo
* **Offline message generator** with tones (heartfelt, funny, romantic, formal…) and languages (English, Hindi, Telugu, Tamil, Kannada)
* **Standard formats**: Square, Portrait, Landscape, Story, 5×7", A6
* **Export**: PNG, JPEG, PDF, high-resolution print-ready PDF
* **Save \& manage designs** in browser localStorage
* **Dark / Light theme**
* **Responsive** layout

No paid AI API or backend server is required for core card creation and export.

## How to Run (Windows 10 / 11)

### Option A – Simplest (recommended)

1. Open the `frontend` folder.
2. Double-click `index.html`.
3. It opens in your default browser. You can start creating cards immediately.

> First export may require internet once so the browser can load `html2canvas` and `jsPDF` from the CDN. After that, basic creation works offline.

### Option B – Local static server (optional)

If you prefer a local server:

```cmd
cd frontend
npx --yes serve -p 3000
```

Then open http://localhost:3000

Or with Python:

```cmd
cd frontend
python -m http.server 3000
```

## Project Structure

```
greeting-card-studio/
├── frontend/
│   ├── index.html          # Main application
│   ├── styles.css          # Professional UI styles
│   ├── data.js             # Occasions, templates, messages
│   ├── app.js              # Editor + app logic
├── docs/
├── scripts/
├── README.md
└── START\_HERE.md
```

## Usage Guide

1. Click **Create Your Card** or go to **Occasions**.
2. Choose an occasion (or Custom).
3. Select a template or start with a blank canvas.
4. Choose card format (Square, Portrait, etc.).
5. Use the left panel to add text, stickers, photos, change background.
6. Click any element on the card to select it; drag to move; use properties to refine.
7. Generate a personalized message and insert it.
8. Click **Save** to store the design locally.
9. Click **Download** and choose PNG / JPEG / PDF.

## Browser Support

Chrome, Edge, Firefox (latest versions). Best experience on desktop.

## License

This project is provided as a complete rewrite for personal and educational use.

