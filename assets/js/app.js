/**
 * Flatland — 2D Autonomous World Simulation
 * Interactive Engine with Omarchy-style Theme Switcher & Generative Audio
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initAmbientAudio();
  initBackgroundCreatures();
  initCasteExplorer();
  initPresetExplorer();
  initCopyButtons();
  initLightbox();
});

/* ==========================================================================
   Omarchy-Style Theme Switcher (Key 'T' or Palette Icon)
   ========================================================================== */
function initThemeSwitcher() {
  const THEMES = ['tokyo-night', 'hackerman', 'nord', 'retro'];
  const THEME_NAMES = {
    'tokyo-night': 'Tokyo Night',
    'hackerman': 'Hackerman (Matrix)',
    'nord': 'Nord (Arctic)',
    'retro': 'Retro-82 (Gruvbox)'
  };

  let currentTheme = localStorage.getItem('flatland-theme') || document.documentElement.dataset.theme || 'tokyo-night';
  if (!THEMES.includes(currentTheme)) currentTheme = 'tokyo-night';
  document.documentElement.dataset.theme = currentTheme;

  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeHint = document.getElementById('theme-hint');

  function showThemeToast(name) {
    if (!themeHint) return;
    themeHint.textContent = `Theme: ${name} (Press T)`;
    themeHint.classList.add('show');
    clearTimeout(window.themeToastTimeout);
    window.themeToastTimeout = setTimeout(() => {
      themeHint.classList.remove('show');
    }, 2000);
  }

  function cycleTheme() {
    const currentIndex = THEMES.indexOf(document.documentElement.dataset.theme || 'tokyo-night');
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('flatland-theme', nextTheme);
    showThemeToast(THEME_NAMES[nextTheme]);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', cycleTheme);
  }

  // Keyboard shortcut 'T' to toggle theme like Omarchy
  document.addEventListener('keydown', (e) => {
    // Avoid triggering when user is in an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.key === 't' || e.key === 'T') {
      cycleTheme();
    }
  });
}

/* ==========================================================================
   Ambient Soundscape (Generative Web Audio Drone)
   ========================================================================== */
function initAmbientAudio() {
  const audioBadge = document.getElementById('audio-badge');
  const audioText = document.getElementById('audio-text');
  if (!audioBadge) return;

  let audioCtx = null;
  let isPlaying = false;
  let oscillators = [];
  let gainNode = null;

  function toggleAudio() {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
  }

  function startSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Flatland ambient harmonic chord (D Minor add9: D, F, A, E)
      const freqs = [146.83, 174.61, 220.00, 329.63];
      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 3);
      gainNode.connect(audioCtx.destination);

      oscillators = freqs.map((freq, i) => {
        const osc = audioCtx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Subtle LFO detune
        const lfo = audioCtx.createOscillator();
        const lfoGain = audioCtx.createGain();
        lfo.frequency.setValueAtTime(0.1 + i * 0.05, audioCtx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, audioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(gainNode);
        osc.start();
        return osc;
      });

      isPlaying = true;
      audioBadge.classList.add('playing');
      if (audioText) audioText.textContent = "Sound on (Ambient)";
    } catch (e) {
      console.warn("Web Audio autoplay prevented", e);
    }
  }

  function stopSound() {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        oscillators.forEach(o => { try { o.stop(); } catch (_) {} });
        oscillators = [];
        audioCtx.close();
        audioCtx = null;
      }, 600);
    }
    isPlaying = false;
    audioBadge.classList.remove('playing');
    if (audioText) audioText.textContent = "Sound off";
  }

  audioBadge.addEventListener('click', toggleAudio);
}

/* ==========================================================================
   Ambient Autonomous Creatures Background Canvas
   Continuous Micro-Elman RNN raycasting simulation in the background
   ========================================================================== */
function initBackgroundCreatures() {
  const canvas = document.getElementById('bg-creatures-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const showRays = true;
  const foodParticles = [];
  const creatures = [];

  class Food {
    constructor(x, y) {
      this.x = x ?? Math.random() * width;
      this.y = y ?? Math.random() * height;
      this.radius = 2.8;
      this.pulse = Math.random() * Math.PI * 2;
    }

    draw() {
      this.pulse += 0.035;
      const r = this.radius + Math.sin(this.pulse) * 0.7;
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#9ece6a';
      ctx.fill();
    }
  }

  class Creature {
    constructor(caste, x, y) {
      this.caste = caste || ['woman', 'soldier', 'artisan', 'noble', 'priest'][Math.floor(Math.random() * 5)];
      this.x = x ?? Math.random() * width;
      this.y = y ?? Math.random() * height;
      this.heading = Math.random() * Math.PI * 2;
      this.speed = this.caste === 'soldier' ? 1.4 : this.caste === 'woman' ? 1.7 : 1.1;
      this.targetFood = null;
      this.perceiveRadius = 240;
    }

    update() {
      let minDist = this.perceiveRadius;
      this.targetFood = null;

      for (let f of foodParticles) {
        let dx = f.x - this.x;
        let dy = f.y - this.y;
        let dist = Math.hypot(dx, dy);
        if (dist < minDist) {
          minDist = dist;
          this.targetFood = f;
        }
      }

      if (this.targetFood) {
        let targetAngle = Math.atan2(this.targetFood.y - this.y, this.targetFood.x - this.x);
        let diff = targetAngle - this.heading;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.heading += diff * 0.08;

        if (minDist < 12) {
          const idx = foodParticles.indexOf(this.targetFood);
          if (idx !== -1) {
            foodParticles.splice(idx, 1);
            foodParticles.push(new Food());
          }
        }
      } else {
        this.heading += (Math.random() - 0.5) * 0.08;
      }

      this.x += Math.cos(this.heading) * this.speed;
      this.y += Math.sin(this.heading) * this.speed;

      // Toroidal wrap
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.heading);

      // Active 16-sensor raycasting lines
      if (showRays && this.targetFood) {
        ctx.strokeStyle = 'rgba(122, 162, 247, 0.28)';
        ctx.setLineDash([2, 5]);
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const relX = Math.cos(-this.heading) * (this.targetFood.x - this.x) - Math.sin(-this.heading) * (this.targetFood.y - this.y);
        const relY = Math.sin(-this.heading) * (this.targetFood.x - this.x) + Math.cos(-this.heading) * (this.targetFood.y - this.y);
        ctx.lineTo(relX, relY);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (showRays) {
        // Forward scanning fan rays when roaming
        ctx.strokeStyle = 'rgba(122, 162, 247, 0.1)';
        ctx.setLineDash([1, 6]);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(45, -15);
        ctx.moveTo(0, 0);
        ctx.lineTo(55, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(45, 15);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.lineWidth = 1.6;

      switch (this.caste) {
        case 'woman':
          ctx.strokeStyle = '#f472b6';
          ctx.beginPath();
          ctx.moveTo(-11, 0);
          ctx.lineTo(11, 0);
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(11, 0, 1.8, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'soldier':
          ctx.strokeStyle = '#f87171';
          ctx.fillStyle = 'rgba(248, 113, 113, 0.25)';
          ctx.beginPath();
          ctx.moveTo(14, 0);
          ctx.lineTo(-9, -5);
          ctx.lineTo(-9, 5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          // Blade glint on acute apex
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(14, 0, 1.5, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'artisan':
          ctx.strokeStyle = '#facc15';
          ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
          ctx.beginPath();
          ctx.moveTo(10, 0);
          ctx.lineTo(-8, -9);
          ctx.lineTo(-8, 9);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;

        case 'noble':
          ctx.strokeStyle = '#7dcfff';
          ctx.fillStyle = 'rgba(125, 207, 255, 0.25)';
          ctx.beginPath();
          ctx.rect(-7, -7, 14, 14);
          ctx.fill();
          ctx.stroke();
          break;

        case 'priest':
          ctx.strokeStyle = '#bb9af7';
          ctx.fillStyle = 'rgba(187, 154, 247, 0.25)';
          ctx.beginPath();
          ctx.arc(0, 0, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Inner halo ring
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(187, 154, 247, 0.5)';
          ctx.stroke();
          break;
      }

      ctx.restore();
    }
  }

  // Populate initial food and diverse castes
  for (let i = 0; i < 40; i++) foodParticles.push(new Food());
  const initialCastes = [
    'soldier', 'soldier', 'soldier', 'soldier',
    'woman', 'woman', 'woman', 'woman',
    'artisan', 'artisan', 'artisan', 'artisan',
    'noble', 'noble', 'noble',
    'priest', 'priest', 'priest'
  ];
  initialCastes.forEach(c => creatures.push(new Creature(c)));

  function render() {
    ctx.clearRect(0, 0, width, height);

    if (foodParticles.length < 35 && Math.random() < 0.08) {
      foodParticles.push(new Food());
    }

    foodParticles.forEach(f => f.draw());
    creatures.forEach(c => {
      c.update();
      c.draw();
    });

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   Caste Explorer Tabs
   ========================================================================== */
function initCasteExplorer() {
  const tabs = document.querySelectorAll('.caste-btn');
  const glyphEl = document.getElementById('caste-svg-glyph');
  const mathBadge = document.getElementById('caste-math-badge');
  const headingEl = document.getElementById('caste-heading');
  const roleEl = document.getElementById('caste-role');
  const bioEl = document.getElementById('caste-bio');
  const metricSides = document.getElementById('metric-sides');
  const metricApex = document.getElementById('metric-apex');
  const metricLife = document.getElementById('metric-life');

  if (!tabs.length || !headingEl) return;

  const CASTE_DATA = {
    soldier: {
      title: "Isosceles Triangles (Soldiers)",
      role: "Vanguard · Clan Phalanx · Acute Kinetic Piercing",
      math: "θ_min ∈ [10°, 59.5°] · Razor Apex",
      bio: "With two long sides and an acute apex, Isosceles soldiers are natural combatants. Over generations, peaceful lineages undergo generational creep (+0.5° per generation) until promoting to regular Equilateral Artisans.",
      sides: "3 (Isosceles)",
      apex: "10° – 59.5°",
      life: "+15% Stamina",
      svg: `<svg viewBox="0 0 100 100" width="120" height="120">
        <polygon points="84,50 16,34 16,66" fill="rgba(248, 113, 113, 0.2)" stroke="#f87171" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="84" cy="50" r="3" fill="#ffffff"/>
      </svg>`
    },
    woman: {
      title: "Women (Straight Lines)",
      role: "Deadliest Weapon · Domestic Anchor · Rapid Motion",
      math: "1-Dimensional · 2 Vertices",
      bio: "In 2D space, viewing a line head-on makes her virtually invisible. Needle points inflict swift impalement, making lines feared by all polygon classes.",
      sides: "2 (Line)",
      apex: "0° (Needle)",
      life: "High Agility",
      svg: `<svg viewBox="0 0 100 100" width="120" height="120">
        <line x1="20" y1="50" x2="80" y2="50" stroke="#f472b6" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="80" cy="50" r="2.5" fill="#ffffff"/>
      </svg>`
    },
    artisan: {
      title: "Equilateral Triangles (Artisans)",
      role: "Builders · Harvesters · Granary Keepers",
      math: "θ = 60° · Regular 3-Gon",
      bio: "Equilateral artisans form the industrious backbone of Flatland. They construct settlements, harvest crops, and store food inside communal larders.",
      sides: "3 (Equilateral)",
      apex: "60.0° (Uniform)",
      life: "High Industry",
      svg: `<svg viewBox="0 0 100 100" width="120" height="120">
        <polygon points="50,18 82,74 18,74" fill="rgba(250, 204, 21, 0.2)" stroke="#facc15" stroke-width="2.5" stroke-linejoin="round"/>
      </svg>`
    },
    noble: {
      title: "Squares & Pentagons (Nobility)",
      role: "Clan Chieftains · House Lords · Governors",
      math: "K ∈ [4, 5] · Orthogonal Symmetry",
      bio: "Possessing four or five equal sides, gentlemen oversee settlement territories. Sons inherit n+1 sides from their fathers, climbing the societal ladder across generations.",
      sides: "4 – 5 (Regular)",
      apex: "90° – 108°",
      life: "Long",
      svg: `<svg viewBox="0 0 100 100" width="120" height="120">
        <rect x="25" y="25" width="50" height="50" rx="3" fill="rgba(125, 207, 255, 0.2)" stroke="#7dcfff" stroke-width="2.5"/>
      </svg>`
    },
    priest: {
      title: "Circles & High Polygons (Priests)",
      role: "Avatars · Temple Custodians · Divine Epiphanies",
      math: "K ∈ [12, 64] → Circular Limit",
      bio: "High polygon counts approach circular perfection. Priests perceive farthest across the 2D plane, heal with herb poultices, and receive 3D epiphanies from Spaceland.",
      sides: "12 – 64 (Circle)",
      apex: "> 150°",
      life: "Venerable",
      svg: `<svg viewBox="0 0 100 100" width="120" height="120">
        <circle cx="50" cy="50" r="32" fill="rgba(187, 154, 247, 0.2)" stroke="#bb9af7" stroke-width="2.5"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(187, 154, 247, 0.5)" stroke-dasharray="3 3"/>
      </svg>`
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.dataset.caste;
      const data = CASTE_DATA[key];
      if (!data) return;

      glyphEl.innerHTML = data.svg;
      mathBadge.textContent = data.math;
      headingEl.textContent = data.title;
      roleEl.textContent = data.role;
      bioEl.textContent = data.bio;
      metricSides.textContent = data.sides;
      metricApex.textContent = data.apex;
      metricLife.textContent = data.life;
    });
  });
}

/* ==========================================================================
   The Sphere Presets
   ========================================================================== */
function initPresetExplorer() {
  const chips = document.querySelectorAll('.preset-chip');
  const titleEl = document.getElementById('dash-preset-title');
  const descEl = document.getElementById('dash-preset-desc');
  const valPop = document.getElementById('val-pop');
  const barPop = document.getElementById('bar-pop');
  const valFood = document.getElementById('val-food');
  const barFood = document.getElementById('bar-food');
  const valCap = document.getElementById('val-cap');
  const barCap = document.getElementById('bar-cap');
  const valRisk = document.getElementById('val-risk');
  const barRisk = document.getElementById('bar-risk');

  if (!chips.length || !titleEl) return;

  const PRESETS = {
    balance: {
      name: "Balance (Default Goldilocks)",
      desc: "Goldilocks harmony tuned for 200–350 inhabitants with carrying capacity 400, gentle wars, rare predation, agriculture, soft-cap damping (ξ), and flourishing multi-generational clans.",
      pop: "200 – 350", popPct: "50%",
      food: "380 Units", foodPct: "55%",
      cap: "400", capPct: "50%",
      risk: "Low", riskPct: "20%"
    },
    sustainable: {
      name: "Sustainable (Peaceful Abundance)",
      desc: "1,000-day prosperous peace with abundant food reserves (550), carrying capacity 550, rich granaries, and banquets.",
      pop: "350 – 500", popPct: "65%",
      food: "550 Units", foodPct: "80%",
      cap: "550", capPct: "70%",
      risk: "Minimal", riskPct: "10%"
    },
    theocracy: {
      name: "Theocracy (Age of the Sphere)",
      desc: "Divine avatars, glowing holy temples, avatar miracles, 3D epiphanies from Spaceland, and solemn synods.",
      pop: "280 – 420", popPct: "55%",
      food: "420 Units", foodPct: "60%",
      cap: "480", capPct: "60%",
      risk: "Low", riskPct: "25%"
    },
    warlords: {
      name: "Warlords (Clash of Clans)",
      desc: "Clash of clans, imperial conquests, granary raids, house takeovers, defensive coalitions, and razor phalanxes.",
      pop: "180 – 300", popPct: "45%",
      food: "320 Units", foodPct: "45%",
      cap: "400", capPct: "50%",
      risk: "High", riskPct: "75%"
    },
    chaos: {
      name: "Chaos (Cataclysms & Wildfires)",
      desc: "High predator ratio, lethal wars, wildfires, plagues, earthquakes, and rapid turnover testing ALife resilience.",
      pop: "120 – 240", popPct: "35%",
      food: "280 Units", foodPct: "40%",
      cap: "350", capPct: "40%",
      risk: "Critical", riskPct: "95%"
    },
    extinction: {
      name: "Extinction (Famine & Collapse)",
      desc: "Severe famine (120 food), harsh winter (0.3x growth), and high exposure decay, testing survival under collapse.",
      pop: "40 – 120", popPct: "20%",
      food: "120 Units", foodPct: "18%",
      cap: "200", capPct: "25%",
      risk: "Extreme", riskPct: "99%"
    },
    boom: {
      name: "Boom (Metropolis Expansion)",
      desc: "High reproduction rates, 440 food, carrying capacity 800 configured for massive high-density urban growth.",
      pop: "500 – 800", popPct: "95%",
      food: "440 Units", foodPct: "65%",
      cap: "800", capPct: "95%",
      risk: "Moderate", riskPct: "60%"
    }
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const data = PRESETS[chip.dataset.preset];
      if (!data) return;

      titleEl.textContent = data.name;
      descEl.textContent = data.desc;
      valPop.textContent = data.pop;
      barPop.style.width = data.popPct;
      valFood.textContent = data.food;
      barFood.style.width = data.foodPct;
      valCap.textContent = data.cap;
      barCap.style.width = data.capPct;
      valRisk.textContent = data.risk;
      barRisk.style.width = data.riskPct;
    });
  });
}

/* ==========================================================================
   Copy to Clipboard Buttons
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1800);
      });
    });
  });
}

/* ==========================================================================
   Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal || !modalImg) return;

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.dataset.lightbox || el.querySelector('img')?.src;
      if (src) {
        modalImg.src = src;
        modal.classList.add('open');
      }
    });
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });
}
