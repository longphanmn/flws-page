# Flatland Showcase & Landing Page (`flws-page`)

> **The Showcase Landing Page, Living Wiki, and Architecture Portal for Flatland.**  
> Hosted on GitHub Pages at: [https://longphanmn.github.io/flws-page/](https://longphanmn.github.io/flws-page/)

---

## 🏛️ Tri-Repository Ecosystem

Flatland is partitioned into three decoupled repositories:

1. **Simulation Engine (`flws`)**: High-throughput FastAPI simulation kernel, OpenMP batch raycaster, immutable laws, and SQLite event ledger.  
   Repository: [longphanmn/flws](https://github.com/longphanmn/flws)
2. **Web Frontend (`flws-web`)**: React 18 + TypeScript + Canvas/WebGL HUD client with independent GitHub Pages deployment.  
   Repository: [longphanmn/flws-web](https://github.com/longphanmn/flws-web)  
   Live App: [https://longphanmn.github.io/flws-web/](https://longphanmn.github.io/flws-web/)
3. **Landing Page (`flws-page`)**: Marketing showcase, multi-lingual living wiki, engine health monitor, and architectural documentation.  
   Live Showcase: [https://longphanmn.github.io/flws-page/](https://longphanmn.github.io/flws-page/)

---

## 📂 Repository Contents

```
flws-page/
├── index.html          # Tokyo Night marketing portal & interactive canvas
├── 404.html            # Custom error handler
├── .nojekyll           # Bypasses Jekyll processing for GitHub Pages
├── assets/
│   ├── css/style.css   # Modern responsive styles & animations
│   ├── js/app.js       # Audio synthesis, theme toggle & background canvas
│   └── images/         # Screenshots, logos, and favicons
├── wiki/               # Multi-lingual living wiki
│   ├── index.html      # English Living Wiki
│   ├── wiki-vi.html    # Vietnamese Living Wiki
│   └── wiki-fr.html    # French Living Wiki
├── health/             # Engine health & telemetry status page
├── docs/               # System laws and specification documents
├── demo/               # Automatic redirect to flws-web GitHub Pages
└── openapi.json        # OpenAPI 3.1 REST API specification
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
