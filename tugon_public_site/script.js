/**
 * TUGON Research Showcase Interactive Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("tugon-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("tugon-theme", next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "dark") {
      themeIcon.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
    } else {
      themeIcon.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
  }

  // 2. Interactive Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".tabs-container");
      const targetId = btn.getAttribute("data-tab");
      const container = parent.parentElement;

      parent.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      container.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
    });
  });

  // 3. Interactive Triage Simulation with Terrain Modeling
  const simulateBtn = document.getElementById("simulate-triage-btn");
  const inputEl = document.getElementById("simulate-text-input");
  const terrainSelect = document.getElementById("simulate-terrain-select");
  const terrainBadge = document.getElementById("terrain-elevation-badge");
  const resultCard = document.getElementById("simulation-result");

  const terrainProfiles = {
    foothill: {
      name: "Upland Banahaw Foothills",
      elevation: "580m MSL (Range: 450m-700m)",
      slope: "14% Grade (Steep Incline)",
      roadType: "Narrow Winding Concrete / Single-Lane Passages",
      etaPenalty: 1.8,
      recommendedFleet: "MAT 4x4 High-Clearance Rescue Pickup",
      hazardNotice: "Steep slope alert: Standard low-floor vehicles prone to bottom out. High torque transmission required.",
      slopeFactor: "Uphill Latency Penalty: +1.8 mins"
    },
    lowland: {
      name: "Lowland Poblacion & Valley",
      elevation: "310m MSL (Range: 280m-340m)",
      slope: "2% Grade (Flat Urban Grid)",
      roadType: "Paved Heritage Streets & Poblacion Arterials",
      etaPenalty: 0.0,
      recommendedFleet: "Standard MAT Ambulance 01",
      hazardNotice: "Urban pedestrian density & heritage street width restrictions (under 4.5m).",
      slopeFactor: "Zero Slope Penalty: Optimal Velocity"
    },
    riparian: {
      name: "Riverine Floodplain & Tributary",
      elevation: "290m MSL (Range: 270m-320m)",
      slope: "5% Grade (Depression Basin)",
      roadType: "Riparian Embankment & Low-Lying Crossings",
      etaPenalty: 1.2,
      recommendedFleet: "Water-Clearance Rescue Vehicle + Float Gear",
      hazardNotice: "Hydrological surge hazard: Bridge runoff monitoring active. Avoid submerged spillways.",
      slopeFactor: "Saturated Subsoil Delay: +1.2 mins"
    },
    highland_ridge: {
      name: "Mount Banahaw Highland Ridge",
      elevation: "850m MSL (Range: 750m-950m)",
      slope: "18% Grade (Extreme Mountain Terrain)",
      roadType: "Unpaved Agro-Forest Trail & Rocky Subgrade",
      etaPenalty: 3.5,
      recommendedFleet: "All-Terrain 4x4 Multi-Role Rescue Unit",
      hazardNotice: "Severe mountain terrain: High landslide vulnerability. Winch and tow recovery equipped.",
      slopeFactor: "Mountain Ascent Traversal: +3.5 mins"
    }
  };

  if (terrainSelect && terrainBadge) {
    terrainSelect.addEventListener("change", () => {
      const selected = terrainProfiles[terrainSelect.value] || terrainProfiles.foothill;
      terrainBadge.textContent = `Elev: ${selected.elevation.split(' ')[0]} · Slope: ${selected.slope.split(' ')[0]} Grade`;
    });
  }

  if (simulateBtn && inputEl && resultCard) {
    simulateBtn.addEventListener("click", () => {
      const text = inputEl.value.trim().toLowerCase();
      if (!text) return;

      const selectedTerrainKey = terrainSelect ? terrainSelect.value : "foothill";
      const terrain = terrainProfiles[selectedTerrainKey] || terrainProfiles.foothill;

      // Simulated classification heuristics matching TUGON AI pipeline
      let category = "MEDICAL";
      let severity = "HIGH";
      let unit = terrain.recommendedFleet;
      let urgencyScore = "88/100";
      let baseEta = 3.2;

      if (text.includes("sunog") || text.includes("apoy") || text.includes("usok") || text.includes("fire")) {
        category = "FIRE";
        severity = "CRITICAL";
        unit = selectedTerrainKey === "highland_ridge" || selectedTerrainKey === "foothill" 
          ? "BFP Wildland 4x4 Engine + Tanker" 
          : "BFP Fire Engine 1 + Rescue";
        urgencyScore = "96/100";
        baseEta = 2.6;
      } else if (text.includes("baha") || text.includes("bagyo") || text.includes("landslide") || text.includes("evacuate") || text.includes("gumuho")) {
        category = "NATURAL_DISASTER";
        severity = "HIGH";
        unit = selectedTerrainKey === "riparian" 
          ? "MDRRMO Amphibious Rescue Truck" 
          : "MDRRMO 4x4 Mountain Rescue Unit";
        urgencyScore = "93/100";
        baseEta = 3.8;
      } else if (text.includes("aksidente") || text.includes("bangga") || text.includes("motor") || text.includes("kotse")) {
        category = "TRAFFIC_ACCIDENT";
        severity = "HIGH";
        unit = selectedTerrainKey === "foothill" || selectedTerrainKey === "highland_ridge"
          ? "MAT Heavy Duty 4x4 Rescue Pickup + Paramedic"
          : "MAT First Responder + PNP Traffic";
        urgencyScore = "89/100";
        baseEta = 3.0;
      } else if (text.includes("gulo") || text.includes("away") || text.includes("nakaw") || text.includes("holdap")) {
        category = "PEACE_AND_ORDER";
        severity = "MEDIUM";
        unit = selectedTerrainKey === "highland_ridge" ? "PNP Tactical Patrol 4x4" : "PNP Patrol Unit 02";
        urgencyScore = "74/100";
        baseEta = 4.5;
      }

      const totalEta = (baseEta + terrain.etaPenalty).toFixed(1);

      resultCard.style.display = "block";
      resultCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <span class="tag tag-accent">SIMULATED AI &amp; TERRAIN INFERENCE RESULT</span>
          <span class="mono" style="font-size:0.75rem; color:var(--muted)">Latency: 52ms · Gemini 3.1 Flash-Lite + Topographical Pipeline</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 0.5rem;">
          <div>
            <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase;">Predicted Category</div>
            <div style="font-weight:700; font-size:1.1rem; color:var(--ink);">${category}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase;">Assigned Severity</div>
            <div style="font-weight:700; font-size:1.1rem; color:var(--accent);">${severity} (${urgencyScore})</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase;">Terrain-Adapted Unit</div>
            <div style="font-weight:700; font-size:1.1rem; color:var(--moss);">${unit}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--muted); text-transform:uppercase;">Terrain-Adjusted ETA</div>
            <div style="font-weight:700; font-size:1.1rem; color:var(--blue);">${totalEta} mins</div>
          </div>
        </div>

        <!-- Topography & Slope Telemetry Panel -->
        <div style="margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 0.5rem; background: var(--bg-2); border: 1px solid var(--line);">
          <div style="font-size:0.75rem; color:var(--accent); text-transform:uppercase; font-weight:700; margin-bottom:0.35rem; display:flex; justify-content:space-between;">
            <span>Topographical Profile: ${terrain.name}</span>
            <span class="mono">${terrain.elevation}</span>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; font-size:0.8125rem;">
            <div><strong style="color:var(--ink);">Slope Gradient:</strong> <span style="color:var(--muted);">${terrain.slope}</span></div>
            <div><strong style="color:var(--ink);">Road Infrastructure:</strong> <span style="color:var(--muted);">${terrain.roadType}</span></div>
            <div><strong style="color:var(--ink);">Elevation Impact:</strong> <span style="color:var(--muted);">${terrain.slopeFactor}</span></div>
          </div>
          <div style="margin-top: 0.4rem; font-size: 0.8125rem; color: var(--yellow);">
            ⚠️ ${terrain.hazardNotice}
          </div>
        </div>
      `;
    });
  }

  // 4. Topographical Terrain Map Canvas Renderer
  const terrainCanvas = document.getElementById("terrain-canvas");
  const terrainTooltip = document.getElementById("terrain-tooltip");
  const chipsContainer = document.getElementById("barangay-chips-container");

  if (terrainCanvas) {
    const ctx = terrainCanvas.getContext("2d");
    let terrainData = null;
    let decodedHeights = null;
    let activePin = null;

    function renderProceduralTopo() {
      const w = terrainCanvas.width;
      const h = terrainCanvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // Slope gradient descending from top-south to bottom-north (Banahaw towards Laguna Lake)
          const ny = y / h;
          const nx = x / w;
          const distFromPeak = Math.hypot(nx - 0.45, ny - 0.15);
          const elevNorm = Math.max(0, Math.min(1, 1 - distFromPeak * 1.1 + Math.sin(nx * 12 + ny * 8) * 0.04));

          let r, g, b;
          if (elevNorm < 0.25) { // Lowland Valley (280m - 340m)
            r = Math.floor(26 + elevNorm * 80);
            g = Math.floor(74 + elevNorm * 90);
            b = Math.floor(53 + elevNorm * 40);
          } else if (elevNorm < 0.55) { // Midland Terraces (350m - 600m)
            const t = (elevNorm - 0.25) / 0.3;
            r = Math.floor(60 + t * 134);
            g = Math.floor(107 + t * 40);
            b = Math.floor(63 - t * 15);
          } else if (elevNorm < 0.8) { // Upland Slopes (600m - 950m)
            const t = (elevNorm - 0.55) / 0.25;
            r = Math.floor(194 + t * 16);
            g = Math.floor(147 - t * 75);
            b = Math.floor(61 - t * 46);
          } else { // Highland Banahaw Ridge (1000m - 2100m)
            const t = (elevNorm - 0.8) / 0.2;
            r = Math.floor(210 + t * 35);
            g = Math.floor(72 + t * 160);
            b = Math.floor(15 + t * 220);
          }

          // Contour bands every 10%
          const contour = Math.abs((elevNorm * 20) % 1);
          if (contour < 0.06) {
            r = Math.min(255, r + 45);
            g = Math.min(255, g + 45);
            b = Math.min(255, b + 45);
          }

          const idx = (y * w + x) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Draw grid overlay and contour labels
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Draw Mount Banahaw Peak indicator
      const peakX = Math.floor(w * 0.45);
      const peakY = Math.floor(h * 0.15);
      ctx.fillStyle = "#ff6b2c";
      ctx.beginPath(); ctx.arc(peakX, peakY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      ctx.fillText("▲ Mt. Banahaw Peak (2,100m MSL)", peakX + 8, peakY + 3);

      // Draw Poblacion Municipal Hall indicator
      const pobX = Math.floor(w * 0.52);
      const pobY = Math.floor(h * 0.78);
      ctx.fillStyle = "#7fb08a";
      ctx.beginPath(); ctx.arc(pobX, pobY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillText("★ Poblacion Center / MAT HQ (310m MSL)", pobX + 8, pobY + 3);

      if (activePin) {
        ctx.strokeStyle = "#ff6b2c";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(activePin.x, activePin.y, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#ff6b2c";
        ctx.beginPath(); ctx.arc(activePin.x, activePin.y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText(`📍 ${activePin.name} (${activePin.elev}m)`, activePin.x + 10, activePin.y - 4);
      }
    }

    // Default 33 barangays of Liliw with real relative coordinates and elevation profiles
    const liliwBarangays = [
      { name: "Bagong Anyo", zone: "lowland", elev: 310, x: 0.52, y: 0.74 },
      { name: "Bayate", zone: "foothill", elev: 520, x: 0.42, y: 0.45 },
      { name: "Bongkol", zone: "foothill", elev: 490, x: 0.62, y: 0.52 },
      { name: "Bubukal", zone: "lowland", elev: 320, x: 0.58, y: 0.72 },
      { name: "Cabuyew", zone: "foothill", elev: 480, x: 0.38, y: 0.58 },
      { name: "Calumpang", zone: "foothill", elev: 440, x: 0.48, y: 0.62 },
      { name: "Culoy", zone: "lowland", elev: 300, x: 0.65, y: 0.75 },
      { name: "Dagatan", zone: "highland_ridge", elev: 780, x: 0.44, y: 0.32 },
      { name: "Daniw", zone: "lowland", elev: 290, x: 0.70, y: 0.78 },
      { name: "Dita", zone: "lowland", elev: 330, x: 0.55, y: 0.68 },
      { name: "Ibabang Palina", zone: "lowland", elev: 295, x: 0.72, y: 0.72 },
      { name: "Ibabang San Roque", zone: "lowland", elev: 315, x: 0.48, y: 0.76 },
      { name: "Iibang Sungi", zone: "lowland", elev: 305, x: 0.54, y: 0.80 },
      { name: "Ilayang Palina", zone: "foothill", elev: 460, x: 0.68, y: 0.60 },
      { name: "Ilayang San Roque", zone: "foothill", elev: 540, x: 0.46, y: 0.50 },
      { name: "Ilayang Sungi", zone: "lowland", elev: 340, x: 0.51, y: 0.70 },
      { name: "Kanlurang Bukal", zone: "lowland", elev: 300, x: 0.42, y: 0.76 },
      { name: "Laguan", zone: "foothill", elev: 420, x: 0.34, y: 0.66 },
      { name: "Luquin", zone: "foothill", elev: 610, x: 0.40, y: 0.40 },
      { name: "Malinao", zone: "riparian", elev: 285, x: 0.76, y: 0.82 },
      { name: "Masikap", zone: "highland_ridge", elev: 720, x: 0.48, y: 0.36 },
      { name: "Maslun", zone: "lowland", elev: 310, x: 0.50, y: 0.73 },
      { name: "Mojon", zone: "foothill", elev: 430, x: 0.36, y: 0.64 },
      { name: "Novaliches", zone: "foothill", elev: 650, x: 0.43, y: 0.38 },
      { name: "Oples", zone: "riparian", elev: 280, x: 0.78, y: 0.79 },
      { name: "Pag-asa", zone: "lowland", elev: 315, x: 0.52, y: 0.77 },
      { name: "Palayan", zone: "foothill", elev: 450, x: 0.60, y: 0.64 },
      { name: "Rizal", zone: "lowland", elev: 305, x: 0.53, y: 0.75 },
      { name: "San Isidro", zone: "lowland", elev: 325, x: 0.56, y: 0.71 },
      { name: "Silangang Bukal", zone: "lowland", elev: 310, x: 0.59, y: 0.77 },
      { name: "Tuy-Baanan", zone: "highland_ridge", elev: 880, x: 0.45, y: 0.25 },
      { name: "Poblacion", zone: "lowland", elev: 310, x: 0.52, y: 0.78 }
    ];

    function selectBarangay(b) {
      const w = terrainCanvas.width;
      const h = terrainCanvas.height;
      activePin = {
        name: b.name,
        elev: b.elev,
        x: Math.floor(b.x * w),
        y: Math.floor(b.y * h),
        zone: b.zone
      };
      renderProceduralTopo();

      if (terrainTooltip) {
        terrainTooltip.innerHTML = `📍 <strong>Barangay ${b.name}</strong> · Elevation: <strong>${b.elev}m MSL</strong> · Zone: <span style="color:var(--accent);">${b.zone.toUpperCase()}</span>`;
      }

      if (terrainSelect) {
        terrainSelect.value = b.zone;
        const event = new Event("change");
        terrainSelect.dispatchEvent(event);
      }

      // Highlight active chip
      if (chipsContainer) {
        chipsContainer.querySelectorAll("button").forEach(btn => {
          if (btn.dataset.bname === b.name) {
            btn.style.borderColor = "var(--accent)";
            btn.style.color = "var(--accent)";
            btn.style.background = "var(--bg-3)";
          } else {
            btn.style.borderColor = "var(--line)";
            btn.style.color = "var(--muted)";
            btn.style.background = "var(--bg)";
          }
        });
      }
    }

    // Populate Barangay Chips
    if (chipsContainer) {
      chipsContainer.innerHTML = "";
      liliwBarangays.forEach(b => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "tag";
        chip.dataset.bname = b.name;
        chip.style.cursor = "pointer";
        chip.style.fontSize = "0.75rem";
        chip.textContent = `${b.name} (${b.elev}m)`;
        chip.addEventListener("click", () => selectBarangay(b));
        chipsContainer.appendChild(chip);
      });
    }

    // Canvas click & hover interaction
    terrainCanvas.addEventListener("mousemove", (e) => {
      const rect = terrainCanvas.getBoundingClientRect();
      const scaleX = terrainCanvas.width / rect.width;
      const scaleY = terrainCanvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      // Find nearest barangay
      let nearest = null;
      let minDist = 35;
      liliwBarangays.forEach(b => {
        const bx = b.x * terrainCanvas.width;
        const by = b.y * terrainCanvas.height;
        const dist = Math.hypot(mouseX - bx, mouseY - by);
        if (dist < minDist) {
          minDist = dist;
          nearest = b;
        }
      });

      if (nearest) {
        terrainCanvas.style.cursor = "pointer";
        terrainTooltip.innerHTML = `📍 <strong>Barangay ${nearest.name}</strong> · Elevation: <strong>${nearest.elev}m MSL</strong> (Click to simulate)`;
      } else {
        terrainCanvas.style.cursor = "crosshair";
        // Interpolate elevation from Y position
        const ny = mouseY / terrainCanvas.height;
        const estimatedElev = Math.floor(280 + Math.pow(Math.max(0, 1 - ny), 1.6) * 1600);
        terrainTooltip.innerHTML = `Topographic Survey: Approx <strong>${estimatedElev}m MSL</strong> · Incline: ~<strong>${Math.floor((1 - ny) * 16)}%</strong>`;
      }
    });

    terrainCanvas.addEventListener("click", (e) => {
      const rect = terrainCanvas.getBoundingClientRect();
      const scaleX = terrainCanvas.width / rect.width;
      const scaleY = terrainCanvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      let nearest = null;
      let minDist = 40;
      liliwBarangays.forEach(b => {
        const bx = b.x * terrainCanvas.width;
        const by = b.y * terrainCanvas.height;
        const dist = Math.hypot(mouseX - bx, mouseY - by);
        if (dist < minDist) {
          minDist = dist;
          nearest = b;
        }
      });

      if (nearest) {
        selectBarangay(nearest);
      }
    });

    // Try loading full liliw-terrain.json if available
    fetch("liliw-terrain.json")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          terrainData = data;
        }
        renderProceduralTopo();
      })
      .catch(() => {
        renderProceduralTopo();
      });

    // Initial render
    renderProceduralTopo();
  }

  // 5. Copy code snippet utility
  window.copyToClipboard = function(text, elementId) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById(elementId);
      if (btn) {
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        setTimeout(() => { btn.innerText = originalText; }, 2000);
      }
    });
  };
});


