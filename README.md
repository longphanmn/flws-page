# Flatland Showcase & Landing Page (`flws-page`)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Showcase-blue.svg)](https://longphanmn.github.io/flws-page/)
[![HTML5 / Modern CSS](https://img.shields.io/badge/Frontend-HTML5%20%2F%20CSS3%20%2F%20ES6-orange.svg)](index.html)
[![Web Audio API](https://img.shields.io/badge/Audio-Web%20Audio%20Synthesis-purple.svg)](assets/js/app.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **The Official Landing Page & Marketing Showcase for Flatland.**  
> Hosted on GitHub Pages at: [https://longphanmn.github.io/flws-page/](https://longphanmn.github.io/flws-page/)

---

## 🏛️ Tri-Repository Ecosystem

Flatland is partitioned into three decoupled repositories:

1. **Simulation Engine ([`flws`](https://github.com/longphanmn/flws))**: High-throughput FastAPI simulation kernel, C/OpenMP batch raycaster, immutable laws of nature, SQLite WAL ledger, Textual TUI client, and live WebSocket broadcast.  
   - Repository: [longphanmn/flws](https://github.com/longphanmn/flws)  
   - API Docs: [https://longphanmn.github.io/flws-web/docs/](https://longphanmn.github.io/flws-web/docs/) (Local: `http://localhost:8000/docs`)

2. **Web Client & Docs Hub ([`flws-web`](https://github.com/longphanmn/flws-web))**: React 18 + TypeScript + Canvas2D/WebGL simulation client with Macro Analytics Observatory. Also hosts the static GitHub Pages documentation mirrors for the entire ecosystem.  
   - Repository: [longphanmn/flws-web](https://github.com/longphanmn/flws-web)  
   - Live Web App: [https://longphanmn.github.io/flws-web/](https://longphanmn.github.io/flws-web/)  
   - Living Wiki: [https://longphanmn.github.io/flws-web/wiki/](https://longphanmn.github.io/flws-web/wiki/)  
   - Static API Docs: [https://longphanmn.github.io/flws-web/docs/](https://longphanmn.github.io/flws-web/docs/)  
   - Health Monitor: [https://longphanmn.github.io/flws-web/health/](https://longphanmn.github.io/flws-web/health/)

3. **Showcase & Landing Page ([`flws-page`](https://github.com/longphanmn/flws-page))**: Tokyo Night marketing portal, Abbott Flatland lore guide, interactive background canvas, procedural audio soundscape, and quickstart onboarding.  
   - Repository: [longphanmn/flws-page](https://github.com/longphanmn/flws-page)  
   - Live Showcase: [https://longphanmn.github.io/flws-page/](https://longphanmn.github.io/flws-page/)

---

## ✨ Features

- **Tokyo Night Design System**: Sleek, responsive layout crafted with modern CSS custom properties, backdrop filters, and responsive typography.
- **Interactive 2D Background Canvas**: Procedural geometric organisms simulated in real time with interactive mouse and touch particle dynamics.
- **Web Audio Soundscape Synthesis**: Built-in procedural ambient generator (sub-bass drone, spatial wind filter, and pentatonic creature chimes) synthesized purely in code via native Web Audio API — zero audio files required.
- **Abbott Flatland Lore Exploration**: Rich guide explaining 2D physical existence, the vertex-based caste hierarchy, generational ascension, and the higher-dimensional Sphere.
- **Zero Framework Overhead**: Built with pure HTML5, vanilla CSS3, and modern ES6 JavaScript. Instant loading with zero build dependencies.

---

## 📂 Repository Contents

```
flws-page/
├── index.html          # Tokyo Night marketing portal & interactive canvas
├── 404.html            # Static router & custom 404 page
├── .nojekyll           # Bypasses Jekyll processing on GitHub Pages
├── assets/
│   ├── css/style.css   # Responsive layout, animations & Tokyo Night theme
│   ├── js/app.js       # Background canvas, Web Audio soundscape & theme controls
│   └── images/         # Showcase screenshots, logos, and favicons
└── README.md           # Project documentation and ecosystem links
```

---

## ⚡ Quickstart

### Full Stack One-Command Launch
To automatically set up and launch both the backend simulation engine and the web client locally:
```bash
curl -fsSL https://raw.githubusercontent.com/longphanmn/flws/main/setup.sh | bash
```

### Local Preview of this Landing Page
Run any local static HTTP server from this directory:
```bash
# Using Python:
python3 -m http.server 3000

# Using Node / npx:
npx serve .
```
Then navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

This repository is served statically via GitHub Pages. Any push to `main` or `gh-pages` updates the live site at `https://longphanmn.github.io/flws-page/`.

Production deployments can also be coordinated from the workspace orchestrator using `./deploy.sh`.

---

## 👤 Author & Attribution

- **Developed by**: **[Long Phan](mailto:long@minhnhan.in)** ([minhnhan.in](https://minhnhan.in/?lang=en))
- **Concept**: Developed from the geometric premises and social satire of Edwin A. Abbott's 1884 classic *Flatland: A Romance of Many Dimensions*.
- **Tooling**: Built and engineered with **OpenCode** and **Antigravity**.
- **License**: [MIT](https://opensource.org/licenses/MIT)
