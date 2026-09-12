# Flatland Showcase & Landing Page (`flws-page`)

> **The Official Landing Page & Marketing Showcase for Flatland.**  
> Hosted on GitHub Pages at: [https://longphanmn.github.io/flws-page/](https://longphanmn.github.io/flws-page/)

---

## 🏛️ Tri-Repository Ecosystem

Flatland is partitioned into three decoupled repositories:

1. **Simulation Engine (`flws`)**: High-throughput FastAPI simulation kernel, OpenMP batch raycaster, immutable laws, SQLite ledger, live API docs (`/docs`), OpenAPI schema (`/openapi.json`), engine health telemetry (`/health`), and server-rendered wiki (`/wiki`).  
   Repository: [longphanmn/flws](https://github.com/longphanmn/flws)  
   Live Backend: [https://world.minhnhan.in](https://world.minhnhan.in)
2. **Web Frontend (`flws-web`)**: React 18 + TypeScript + Canvas/WebGL simulation client with independent GitHub Pages deployment.  
   Repository: [longphanmn/flws-web](https://github.com/longphanmn/flws-web)  
   Live App: [https://longphanmn.github.io/flws-web/](https://longphanmn.github.io/flws-web/)
3. **Landing Page (`flws-page`)**: Marketing showcase, lore introduction, quickstart guide, screenshots gallery, and ecosystem navigation portal.  
   Live Showcase: [https://longphanmn.github.io/flws-page/](https://longphanmn.github.io/flws-page/)

---

## 📂 Repository Contents

```
flws-page/
├── index.html          # Tokyo Night marketing portal & interactive canvas
├── 404.html            # Custom error handler & smart router
├── .nojekyll           # Bypasses Jekyll processing for GitHub Pages
├── assets/
│   ├── css/style.css   # Modern responsive styles & animations
│   ├── js/app.js       # Audio synthesis, theme toggle & background canvas
│   └── images/         # Screenshots, logos, and favicons
└── README.md           # Project introduction and ecosystem links
```

---

## ⚡ Quickstart

Anyone can set up and run the entire Flatland simulation locally with a single terminal command:
```bash
curl -fsSL https://raw.githubusercontent.com/longphanmn/flws/main/setup.sh | bash
```

---

## 🚀 Deployment

This repository is served statically via GitHub Pages. Any push to `main` or `gh-pages` updates the live site at `https://longphanmn.github.io/flws-page/`.

---

## 👤 Author & Attribution

- **Creator**: **Long Phan** ([long@minhnhan.in](mailto:long@minhnhan.in)) — [minhnhan.in](https://minhnhan.in/?lang=en)
- **Concept**: Developed from the geometric and philosophical foundations of Edwin A. Abbott's 1884 classic *Flatland*.
