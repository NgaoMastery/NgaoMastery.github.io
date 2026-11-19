/* ==========================================================================
   NGAO CONTENT — PRODUCTION INTERACTIVE NOEL EFFECTS + PIVOTING FLASHLIGHT
   Self-contained module:
   - 3D Wall Light Switch beside "Ebook Thực Chiến" (Default OFF)
   - Noel Control Dock (hidden until switch is ON) + 3 Christmas Music Box tracks
   - 3 Crisp Non-Stretched Vector Garlands, 3-Layer Snow, Corner Pines, Santa Hat
   - 2 Animated Reindeer & Santa Claus Sleigh running back & forth along Subnav
   - Pivoting 360° Volumetric Conical Flashlight beside "Gặp Gỡ 2 Giảng Viên Đồng Hành"
   ========================================================================== */
(() => {
  if (window.__ngaoNoelMounted) return;
  window.__ngaoNoelMounted = true;

  function mountNoelExperience() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = {
      masterOn: false,        // Default OFF until visitor clicks the 3D Light Switch
      flashlight: false,      // Pivoting conical flashlight in Trainers section
      musicTrack: 'off',      // 'off' | 'jingle' | 'wish' | 'silent'
      musicVolume: 0.55,
      sleigh: true,
      snow: true,
      lights: true,
      garlandStyle: 'classic', // 'classic' | 'stars' | 'pine'
      corners: false,
      hat: true,
      sparkle: false,
      crystals: true,
      count: 58,
      paused: prefersReduced,
      windTarget: 0,
      wind: 0
    };

    /* ------------------------------------------------------------------
       1. Inject DOM Overlay Elements cleanly at end of <body>
       ------------------------------------------------------------------ */
    const rootWrap = document.createElement('div');
    rootWrap.id = 'ngaoNoelRoot';
    rootWrap.innerHTML = `
      <canvas id="noelFlashlightCanvas" aria-hidden="true"></canvas>
      <button type="button" class="flashlight-exit-pill" id="flashlightExitBtn">🔦 Tắt đèn pin (ESC)</button>
      <canvas id="noelCanvas" class="hidden" aria-hidden="true"></canvas>
      <div class="noel-garland hidden paused" id="noelGarland" aria-hidden="true"></div>

      <div class="noel-corners hidden" id="noelCorners" aria-hidden="true">
        <svg class="corner-pine left" viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M-8,-6 Q46,16 112,8 Q72,30 16,24 Z" fill="#1D5C43"/>
          <path d="M-8,-6 Q26,48 64,98 Q22,68 4,24 Z" fill="#174B36"/>
          <path d="M4,4 Q58,34 102,48 Q54,48 16,22 Z" fill="#257355"/>
          <path d="M-4,12 Q36,42 52,82 Q18,56 0,28 Z" fill="#2A805F"/>
          <circle cx="52" cy="30" r="11" fill="#C82061"/>
          <circle cx="48" cy="26" r="3.5" fill="rgba(255,255,255,0.55)"/>
          <circle cx="28" cy="52" r="8.5" fill="#FFDE59"/>
          <circle cx="25" cy="49" r="2.6" fill="rgba(255,255,255,0.65)"/>
          <circle cx="76" cy="20" r="4" fill="#E6007E"/>
          <circle cx="84" cy="24" r="3.6" fill="#E6007E"/>
          <circle cx="78" cy="28" r="3.5" fill="#FFDE59"/>
        </svg>
        <svg class="corner-pine right" viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M-8,-6 Q46,16 112,8 Q72,30 16,24 Z" fill="#1D5C43"/>
          <path d="M-8,-6 Q26,48 64,98 Q22,68 4,24 Z" fill="#174B36"/>
          <path d="M4,4 Q58,34 102,48 Q54,48 16,22 Z" fill="#257355"/>
          <path d="M-4,12 Q36,42 52,82 Q18,56 0,28 Z" fill="#2A805F"/>
          <circle cx="52" cy="30" r="11" fill="#C82061"/>
          <circle cx="48" cy="26" r="3.5" fill="rgba(255,255,255,0.55)"/>
          <circle cx="28" cy="52" r="8.5" fill="#FFDE59"/>
          <circle cx="25" cy="49" r="2.6" fill="rgba(255,255,255,0.65)"/>
          <circle cx="76" cy="20" r="4" fill="#E6007E"/>
          <circle cx="84" cy="24" r="3.6" fill="#E6007E"/>
          <circle cx="78" cy="28" r="3.5" fill="#FFDE59"/>
        </svg>
      </div>

      <div class="noel-sleigh-track hidden paused" id="noelSleighTrack" aria-hidden="true">
        <div class="noel-sleigh-runner" id="noelSleighRunner">
          <div class="sleigh-bob">
            <svg viewBox="0 0 240 60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sleighBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#E6007E"/>
                  <stop offset="55%" stop-color="#B01552"/>
                  <stop offset="100%" stop-color="#701A39"/>
                </linearGradient>
                <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#FFE885"/>
                  <stop offset="50%" stop-color="#FFDE59"/>
                  <stop offset="100%" stop-color="#E5A818"/>
                </linearGradient>
                <linearGradient id="deerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#C88A52"/>
                  <stop offset="100%" stop-color="#8C5327"/>
                </linearGradient>
                <radialGradient id="noseGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#FF3B7F"/>
                  <stop offset="60%" stop-color="#E6007E" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#E6007E" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <path d="M62,25 Q102,36 146,28 Q174,31 200,25" fill="none" stroke="url(#goldTrim)" stroke-width="1.6" stroke-linecap="round"/>
              <path d="M66,31 Q104,40 144,32" fill="none" stroke="rgba(255,222,89,0.65)" stroke-width="1.1"/>
              <g>
                <rect x="20" y="19" width="13" height="12" rx="2" fill="#FFDE59" stroke="#9B6C0A" stroke-width="1"/>
                <line x1="26.5" y1="19" x2="26.5" y2="31" stroke="#C82061" stroke-width="2"/>
                <line x1="20" y1="25" x2="33" y2="25" stroke="#C82061" stroke-width="2"/>
                <rect x="30" y="15" width="12" height="14" rx="2" fill="#FF79B0" stroke="#701A39" stroke-width="1"/>
                <line x1="36" y1="15" x2="36" y2="29" stroke="#FFDE59" stroke-width="2"/>
                <ellipse cx="26" cy="29" rx="11" ry="8" fill="#8E1A3E"/>
              </g>
              <g>
                <path d="M40,21 C40,16 56,16 58,24 L58,34 L40,34 Z" fill="#D91E48"/>
                <rect x="46" y="21" width="3.5" height="12" rx="1.5" fill="#FFFFFF"/>
                <path d="M54,23 Q62,18 65,13" fill="none" stroke="#D91E48" stroke-width="4.5" stroke-linecap="round"/>
                <circle cx="65.5" cy="12.5" r="2.6" fill="#FFDE59"/>
                <circle cx="49" cy="14" r="5.5" fill="#FFD6BC"/>
                <circle cx="51.8" cy="13.2" r="0.9" fill="#381224"/>
                <circle cx="51.2" cy="15.2" r="1.2" fill="rgba(230,0,126,0.35)"/>
                <path d="M44.5,15.5 C44,22 54.5,23 55,16.5 C52.5,17.8 47,17.5 44.5,15.5 Z" fill="#FFFFFF"/>
                <path d="M42.5,11 C44,4 52,3 56.5,8 C53,9 46,10 42.5,11 Z" fill="#D91E48"/>
                <rect x="42" y="9.5" width="13.5" height="3.2" rx="1.6" fill="#FFFFFF"/>
                <circle cx="41.5" cy="7.5" r="2.3" fill="#FFFDF5"/>
              </g>
              <g>
                <path d="M10,50 L72,50 Q84,50 86,41 Q87,37 82,38" fill="none" stroke="url(#goldTrim)" stroke-width="2.8" stroke-linecap="round"/>
                <line x1="25" y1="43" x2="23" y2="50" stroke="url(#goldTrim)" stroke-width="2.2"/>
                <line x1="60" y1="43" x2="62" y2="50" stroke="url(#goldTrim)" stroke-width="2.2"/>
                <path d="M12,24 Q14,44 30,44 L66,44 Q77,44 80,31 Q71,33 65,30 Q58,34 45,33 L22,27 Q16,22 12,24 Z" fill="url(#sleighBodyGrad)" stroke="#540B27" stroke-width="1.2"/>
                <path d="M13,25 Q20,24 26,28 L46,33 Q58,34 66,30 Q73,32 79,31" fill="none" stroke="url(#goldTrim)" stroke-width="2" stroke-linecap="round"/>
                <circle cx="46" cy="39" r="2.2" fill="#FFDE59"/>
              </g>
              <g transform="translate(115, 3)">
                <path class="reindeer-leg-b" d="M11,33 L5,47" stroke="#7A4620" stroke-width="3" stroke-linecap="round"/>
                <path class="reindeer-leg-f" d="M15,33 L18,47" stroke="#9B5E2E" stroke-width="3" stroke-linecap="round"/>
                <path class="reindeer-leg-f" d="M31,32 L38,45" stroke="#9B5E2E" stroke-width="3" stroke-linecap="round"/>
                <path class="reindeer-leg-b" d="M27,32 L25,46" stroke="#7A4620" stroke-width="3" stroke-linecap="round"/>
                <path d="M8,26 Q3,23 5,20" fill="none" stroke="#FFF4E6" stroke-width="3" stroke-linecap="round"/>
                <ellipse cx="21" cy="29" rx="14" ry="7.5" fill="url(#deerGrad)"/>
                <ellipse cx="21" cy="32" rx="9" ry="3.2" fill="#F6DFC3" opacity="0.75"/>
                <path d="M27,22 Q32,27 29,34" fill="none" stroke="#C82061" stroke-width="3.2" stroke-linecap="round"/>
                <circle cx="31" cy="29" r="2.2" fill="#FFDE59"/>
                <path d="M29,25 Q35,17 40,16" fill="none" stroke="url(#deerGrad)" stroke-width="7" stroke-linecap="round"/>
                <ellipse cx="42" cy="15.5" rx="6.5" ry="4.5" fill="#B87A44"/>
                <ellipse cx="37" cy="11.5" rx="2" ry="3.5" transform="rotate(-25 37 11.5)" fill="#8C5327"/>
                <circle cx="43.5" cy="14.5" r="1.1" fill="#2A091A"/>
                <circle cx="48" cy="16" r="1.8" fill="#4A0E26"/>
                <path d="M39,12 L37,4 M37,7 L33,5 M37,8 L41,5 M41,11 L43,3 M43,6 L47,4" fill="none" stroke="#703E1A" stroke-width="1.6" stroke-linecap="round"/>
              </g>
              <g transform="translate(174, 0)">
                <path class="reindeer-leg-f" d="M11,34 L4,48" stroke="#7A4620" stroke-width="3.1" stroke-linecap="round"/>
                <path class="reindeer-leg-b" d="M15,34 L19,48" stroke="#A66534" stroke-width="3.1" stroke-linecap="round"/>
                <path class="reindeer-leg-b" d="M32,33 L41,45" stroke="#A66534" stroke-width="3.1" stroke-linecap="round"/>
                <path class="reindeer-leg-f" d="M28,33 L25,47" stroke="#7A4620" stroke-width="3.1" stroke-linecap="round"/>
                <path d="M8,27 Q3,24 5,21" fill="none" stroke="#FFF4E6" stroke-width="3" stroke-linecap="round"/>
                <ellipse cx="21" cy="30" rx="14.5" ry="7.8" fill="url(#deerGrad)"/>
                <ellipse cx="21" cy="33" rx="9.5" ry="3.2" fill="#F6DFC3" opacity="0.75"/>
                <path d="M28,22 Q33,28 30,35" fill="none" stroke="#E6007E" stroke-width="3.4" stroke-linecap="round"/>
                <circle cx="32" cy="30" r="2.4" fill="#FFDE59"/>
                <path d="M30,25 Q36,17 42,16" fill="none" stroke="url(#deerGrad)" stroke-width="7.2" stroke-linecap="round"/>
                <ellipse cx="44" cy="15.5" rx="6.8" ry="4.6" fill="#C4834B"/>
                <ellipse cx="38.5" cy="11.5" rx="2" ry="3.6" transform="rotate(-25 38.5 11.5)" fill="#8C5327"/>
                <circle cx="45.5" cy="14.5" r="1.2" fill="#2A091A"/>
                <circle class="rudolph-nose" cx="50.8" cy="16.2" r="7" fill="url(#noseGlow)"/>
                <circle cx="50.8" cy="16.2" r="2.4" fill="#FF1E6A"/>
                <circle cx="50.2" cy="15.5" r="0.8" fill="#FFFFFF"/>
                <path d="M40.5,11.5 L38,3 M38.5,6.5 L34,4.5 M38.5,7.5 L42.5,4.5 M42.5,11 L45,2.5 M44.5,6 L49,3.5" fill="none" stroke="#7A441C" stroke-width="1.7" stroke-linecap="round"/>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <aside class="noel-control-dock is-hidden" id="noelControlDock" aria-label="Bảng điều khiển Hiệu ứng Noel">
        <div class="noel-dock-head">
          <div class="noel-dock-title">
            <span>🎄 Bảng Điều Khiển Noel</span>
          </div>
          <button type="button" class="noel-collapse-btn" id="noelCollapseBtn">Thu gọn</button>
        </div>

        <div class="noel-dock-body">
          <p class="noel-dock-sub">
            Tùy chỉnh hiệu ứng, kiểu dây đèn và nhạc Giáng Sinh theo sở thích của bạn.
          </p>

          <div class="noel-preset-row" role="group" aria-label="Chọn phong cách Noel">
            <button type="button" class="noel-preset-btn active" data-preset="luxury">
              ✨ Tinh tế
              <small>Khuyên dùng</small>
            </button>
            <button type="button" class="noel-preset-btn" data-preset="festive">
              🎄 Rực rỡ
              <small>Đầy đủ lễ hội</small>
            </button>
            <button type="button" class="noel-preset-btn" data-preset="minimal">
              ❄️ Tối giản
              <small>Siêu nhẹ</small>
            </button>
          </div>

          <div class="noel-toggles-grid">
            <label class="noel-tog-item" style="grid-column:span 2"><input type="checkbox" id="noelTogSleigh" checked> 🦌 Tuần lộc &amp; Ông già Noel kéo xe</label>
            <label class="noel-tog-item"><input type="checkbox" id="noelTogSnow" checked> ❄️ Tuyết rơi 3 lớp</label>
            <label class="noel-tog-item"><input type="checkbox" id="noelTogLights" checked> 💡 Dây đèn viền trên</label>
            <label class="noel-tog-item"><input type="checkbox" id="noelTogCorners"> 🌿 Lá thông 2 góc</label>
            <label class="noel-tog-item"><input type="checkbox" id="noelTogHat" checked> 🎅 Mũ Noel Ngáo Bot</label>
            <label class="noel-tog-item"><input type="checkbox" id="noelTogSparkle"> ✨ Bụi sao theo chuột</label>
            <label class="noel-tog-item"><input type="checkbox" id="noelTogCrystals" checked> ✳️ Bông tuyết pha lê</label>
          </div>

          <div class="noel-garland-row">
            <span class="noel-garland-label">Kiểu dây đèn:</span>
            <div class="noel-gstyle-pills" role="group" aria-label="Chọn kiểu dây đèn">
              <button type="button" class="noel-gstyle-btn active" data-gstyle="classic">💡 Bóng cổ điển</button>
              <button type="button" class="noel-gstyle-btn" data-gstyle="stars">✨ Rèm sao vàng</button>
              <button type="button" class="noel-gstyle-btn" data-gstyle="pine">🌲 Dây thông</button>
            </div>
          </div>

          <div class="noel-music-box">
            <div class="noel-music-head">
              <span>🎵 Nhạc Giáng Sinh</span>
              <span id="noelMusicStatus" style="font-size:10px;opacity:0.8">Đang tắt</span>
            </div>
            <div class="noel-music-pills" role="group" aria-label="Chọn nhạc Giáng Sinh">
              <button type="button" class="noel-music-btn active" data-track="off">🔇 Tắt nhạc</button>
              <button type="button" class="noel-music-btn" data-track="jingle">🔔 Jingle Bells</button>
              <button type="button" class="noel-music-btn" data-track="wish">🎄 We Wish You</button>
              <button type="button" class="noel-music-btn" data-track="silent">❄️ Silent Night</button>
            </div>
            <div class="noel-music-vol-row">
              <span>🔊 Âm lượng:</span>
              <input type="range" id="noelMusicVol" min="0" max="100" value="55" aria-label="Âm lượng nhạc Giáng Sinh">
              <strong id="noelMusicVolVal" style="min-width:28px;text-align:right;color:#FFDE59">55%</strong>
            </div>
          </div>

          <div class="noel-slider-row">
            <span>Mật độ tuyết:</span>
            <input type="range" id="noelSnowDensity" min="20" max="140" value="58" aria-label="Mật độ tuyết">
            <strong id="noelDensityVal" style="min-width:28px;text-align:right;color:#FFDE59">58</strong>
          </div>

          <button type="button" class="noel-off-btn" id="noelOffBtn">🔌 Tắt công tắc Noel</button>
        </div>
      </aside>
    `;
    document.body.appendChild(rootWrap);

    const flCanvas = document.getElementById('noelFlashlightCanvas');
    const flCtx = flCanvas.getContext('2d');
    const flashlightExitBtn = document.getElementById('flashlightExitBtn');
    const canvas = document.getElementById('noelCanvas');
    const ctx = canvas.getContext('2d');
    const garland = document.getElementById('noelGarland');
    const corners = document.getElementById('noelCorners');
    const sleighTrack = document.getElementById('noelSleighTrack');
    const sleighRunner = document.getElementById('noelSleighRunner');
    const controlDock = document.getElementById('noelControlDock');
    const collapseBtn = document.getElementById('noelCollapseBtn');
    const offBtn = document.getElementById('noelOffBtn');
    const musicVol = document.getElementById('noelMusicVol');
    const musicVolVal = document.getElementById('noelMusicVolVal');
    const musicStatus = document.getElementById('noelMusicStatus');

    const togSleigh = document.getElementById('noelTogSleigh');
    const togSnow = document.getElementById('noelTogSnow');
    const togLights = document.getElementById('noelTogLights');
    const togCorners = document.getElementById('noelTogCorners');
    const togHat = document.getElementById('noelTogHat');
    const togSparkle = document.getElementById('noelTogSparkle');
    const togCrystals = document.getElementById('noelTogCrystals');
    const snowDensity = document.getElementById('noelSnowDensity');
    const densityVal = document.getElementById('noelDensityVal');

    /* ------------------------------------------------------------------
       2. Audio: Mechanical Switch Click + Warm Christmas Music Box Synth
       ------------------------------------------------------------------ */
    let audioCtx = null;
    let musicMasterGain = null;
    let musicTimer = null;
    let musicStep = 0;

    function ensureAudio() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!audioCtx) {
        audioCtx = new AC();
        musicMasterGain = audioCtx.createGain();
        musicMasterGain.gain.value = state.musicVolume * 0.28;
        musicMasterGain.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function playSwitchClick(turningOn) {
      try {
        const ac = ensureAudio();
        if (!ac) return;
        const now = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(turningOn ? 920 : 640, now);
        osc.frequency.exponentialRampToValueAtTime(turningOn ? 240 : 160, now + 0.028);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.035);
      } catch (e) {}
    }

    const NOTE_FREQ = {
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, A5: 880.00
    };

    const CHRISTMAS_TRACKS = {
      jingle: {
        label: '🔔 Jingle Bells',
        tempoMs: 260,
        notes: [
          ['E5', 1, 'C4'], ['E5', 1], ['E5', 2, 'G3'],
          ['E5', 1, 'C4'], ['E5', 1], ['E5', 2, 'G3'],
          ['E5', 1, 'C4'], ['G5', 1], ['C5', 1.5, 'E4'], ['D5', 0.5], ['E5', 4, 'C4'],
          ['F5', 1, 'F3'], ['F5', 1], ['F5', 1.5, 'A3'], ['F5', 0.5],
          ['F5', 1, 'C4'], ['E5', 1], ['E5', 1, 'G3'], ['E5', 0.5], ['E5', 0.5],
          ['E5', 1, 'D4'], ['D5', 1], ['D5', 1, 'G3'], ['E5', 1], ['D5', 2, 'B3'], ['G5', 2, 'G3'],
          ['E5', 1, 'C4'], ['E5', 1], ['E5', 2, 'G3'],
          ['E5', 1, 'C4'], ['E5', 1], ['E5', 2, 'G3'],
          ['E5', 1, 'C4'], ['G5', 1], ['C5', 1.5, 'E4'], ['D5', 0.5], ['E5', 4, 'C4'],
          ['F5', 1, 'F3'], ['F5', 1], ['F5', 1.5, 'A3'], ['F5', 0.5],
          ['F5', 1, 'C4'], ['E5', 1], ['E5', 1, 'G3'], ['E5', 0.5], ['E5', 0.5],
          ['G5', 1, 'G3'], ['G5', 1], ['F5', 1, 'B3'], ['D5', 1], ['C5', 4, 'C4']
        ]
      },
      wish: {
        label: '🎄 We Wish You',
        tempoMs: 310,
        notes: [
          ['D4', 1, 'G3'],
          ['G4', 1, 'G3'], ['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['F#4', 0.5],
          ['E4', 1, 'C4'], ['E4', 1], ['E4', 1],
          ['A4', 1, 'A3'], ['A4', 0.5], ['B4', 0.5], ['A4', 0.5], ['G4', 0.5],
          ['F#4', 1, 'D4'], ['D4', 1], ['D4', 1],
          ['B4', 1, 'B3'], ['B4', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 0.5],
          ['G4', 1, 'E4'], ['E4', 1], ['D4', 0.5], ['D4', 0.5],
          ['E4', 1, 'C4'], ['A4', 1, 'D4'], ['F#4', 1],
          ['G4', 3, 'G3']
        ]
      },
      silent: {
        label: '❄️ Silent Night',
        tempoMs: 420,
        notes: [
          ['G4', 1.5, 'C4'], ['A4', 0.5], ['G4', 1, 'E4'], ['E4', 3, 'C4'],
          ['G4', 1.5, 'C4'], ['A4', 0.5], ['G4', 1, 'E4'], ['E4', 3, 'C4'],
          ['D5', 2, 'G3'], ['D5', 1], ['B4', 3, 'G3'],
          ['C5', 2, 'C4'], ['C5', 1], ['G4', 3, 'E4'],
          ['A4', 2, 'F3'], ['A4', 1], ['C5', 1.5, 'A3'], ['B4', 0.5], ['A4', 1],
          ['G4', 1.5, 'C4'], ['A4', 0.5], ['G4', 1, 'E4'], ['E4', 3, 'C4'],
          ['D5', 2, 'G3'], ['D5', 1], ['F5', 1.5, 'B3'], ['D5', 0.5], ['B4', 1],
          ['C5', 3, 'C4'], ['E5', 3, 'G4'],
          ['C5', 1, 'C4'], ['G4', 1], ['E4', 1], ['G4', 1.5, 'G3'], ['F4', 0.5], ['D4', 1],
          ['C4', 4, 'C3']
        ]
      }
    };

    function playBellNote(freq, durSec, isBass = false) {
      if (!audioCtx || !musicMasterGain || !freq) return;
      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc1.type = isBass ? 'sine' : 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(isBass ? freq * 2 : freq * 3, now);
      const g2 = audioCtx.createGain();
      g2.gain.value = isBass ? 0.14 : 0.12;
      const peak = isBass ? 0.36 : 0.65;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(peak, now + 0.014);
      g.gain.exponentialRampToValueAtTime(0.0008, now + Math.max(0.32, durSec * 1.35));
      osc1.connect(g);
      osc2.connect(g2);
      g2.connect(g);
      g.connect(musicMasterGain);
      osc1.start(now);
      osc2.start(now);
      const stopAt = now + Math.max(0.36, durSec * 1.4);
      osc1.stop(stopAt);
      osc2.stop(stopAt);
    }

    function stopMusic() {
      if (musicTimer) {
        clearTimeout(musicTimer);
        musicTimer = null;
      }
      state.musicTrack = 'off';
      syncMusicUI();
    }

    function scheduleNextNote() {
      if (!state.masterOn || state.musicTrack === 'off') {
        musicTimer = null;
        return;
      }
      const track = CHRISTMAS_TRACKS[state.musicTrack];
      if (!track) return;
      const [noteName, beats, bassName] = track.notes[musicStep % track.notes.length];
      const durMs = beats * track.tempoMs;
      playBellNote(NOTE_FREQ[noteName], durMs / 1000, false);
      if (bassName && NOTE_FREQ[bassName]) {
        playBellNote(NOTE_FREQ[bassName], (durMs / 1000) * 1.5, true);
      }
      musicStep = (musicStep + 1) % track.notes.length;
      musicTimer = setTimeout(scheduleNextNote, durMs);
    }

    function startMusic(trackKey) {
      if (musicTimer) {
        clearTimeout(musicTimer);
        musicTimer = null;
      }
      state.musicTrack = trackKey;
      if (trackKey === 'off') {
        syncMusicUI();
        return;
      }
      ensureAudio();
      if (musicMasterGain) {
        musicMasterGain.gain.value = state.musicVolume * 0.28;
      }
      musicStep = 0;
      syncMusicUI();
      scheduleNextNote();
    }

    function syncMusicUI() {
      document.querySelectorAll('.noel-music-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.track === state.musicTrack);
      });
      const t = CHRISTMAS_TRACKS[state.musicTrack];
      musicStatus.textContent = t ? `Đang phát: ${t.label}` : 'Đang tắt';
    }

    /* ------------------------------------------------------------------
       3. Mount Physical 3D Light Switch, Pivoting Flashlight & Santa Hat
       ------------------------------------------------------------------ */
    function mountLightSwitch() {
      const navActions = document.querySelector('.nav-actions');
      if (!navActions) return;
      let sw = document.getElementById('noelLightSwitch');
      if (!sw) {
        sw = document.createElement('button');
        sw.type = 'button';
        sw.id = 'noelLightSwitch';
        sw.className = 'noel-wall-switch';
        sw.setAttribute('role', 'switch');
        sw.setAttribute('aria-label', 'Công tắc bật hoặc tắt hiệu ứng Giáng Sinh');
        sw.innerHTML = `
          <span class="noel-rocker-well" aria-hidden="true">
            <span class="noel-rocker-paddle">
              <span class="noel-mark-i"></span>
              <span class="noel-led-slit"></span>
              <span class="noel-mark-o"></span>
            </span>
          </span>
          <span class="noel-switch-text">
            <span class="noel-switch-eyebrow">🎄 ĐÈN NOEL</span>
            <span class="noel-switch-state" id="noelSwitchStateLabel">ĐANG TẮT</span>
          </span>
        `;
        sw.addEventListener('click', () => {
          state.masterOn = !state.masterOn;
          if (state.masterOn) {
            state.paused = false;
          } else {
            stopMusic();
          }
          playSwitchClick(state.masterOn);
          applyUI();
        });
        navActions.insertBefore(sw, navActions.firstChild);
      }
      sw.classList.toggle('is-on', state.masterOn);
      sw.setAttribute('aria-checked', state.masterOn ? 'true' : 'false');
      sw.title = state.masterOn ? 'Nhấn công tắc để tắt hiệu ứng Noel' : 'Nhấn công tắc để bật hiệu ứng Noel';
      const lbl = document.getElementById('noelSwitchStateLabel');
      if (lbl) lbl.textContent = state.masterOn ? 'ĐANG BẬT' : 'ĐANG TẮT';
    }

    function mountTrainerFlashlight() {
      const trainersCard = document.querySelector('#part-trainers .part-card');
      if (!trainersCard) return;
      let btn = document.getElementById('trainerFlashlightBtn');
      if (!btn) {
        const titleEl = trainersCard.querySelector('h2.sec-title');
        if (!titleEl) return;
        const row = document.createElement('div');
        row.className = 'trainers-title-row';
        titleEl.parentNode.insertBefore(row, titleEl);
        row.appendChild(titleEl);

        const wrap = document.createElement('div');
        wrap.className = 'trainer-flashlight-wrap';

        const hint = document.createElement('span');
        hint.id = 'trainerFlashlightHint';
        hint.className = 'trainer-flashlight-hint';
        hint.textContent = '✨ Bấm đèn pin chiếu sáng';
        wrap.appendChild(hint);

        btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'trainerFlashlightBtn';
        btn.className = 'trainer-flashlight-btn';
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Bật hoặc tắt đèn pin chiếu sáng theo chuột');
        btn.title = 'Nhấn để bật đèn pin xoay chiếu theo chuột';
        btn.innerHTML = `
          <svg id="trainerFlashlightSvg" class="fl-svg" viewBox="0 0 44 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="flBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFE680"/>
                <stop offset="50%" stop-color="#F5B82E"/>
                <stop offset="100%" stop-color="#A66B08"/>
              </linearGradient>
              <linearGradient id="flGrip" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#9A164B"/>
                <stop offset="100%" stop-color="#4A0B24"/>
              </linearGradient>
            </defs>
            <rect x="2" y="7.5" width="4" height="9" rx="2" fill="url(#flBody)" stroke="#5A3703" stroke-width="0.8"/>
            <rect x="5.5" y="7" width="18" height="10" rx="2.5" fill="url(#flGrip)" stroke="#3D081D" stroke-width="0.9"/>
            <rect x="13" y="5.2" width="5" height="2.4" rx="1.1" fill="#FFDE59"/>
            <path d="M23,6.8 L34,2.8 L36.5,2.8 L36.5,21.2 L34,21.2 L23,17.2 Z" fill="url(#flBody)" stroke="#6B4204" stroke-width="0.9" stroke-linejoin="round"/>
            <ellipse cx="36.8" cy="12" rx="2.2" ry="8.8" fill="#FFFDF0" stroke="#FFE066" stroke-width="0.9"/>
          </svg>
        `;
        btn.addEventListener('click', () => setFlashlight(!state.flashlight));
        wrap.appendChild(btn);
        row.appendChild(wrap);
      }
      btn.classList.toggle('is-on', state.flashlight);
      btn.setAttribute('aria-pressed', state.flashlight ? 'true' : 'false');
      const hint = document.getElementById('trainerFlashlightHint');
      if (hint) {
        hint.textContent = state.flashlight ? '🔦 Di chuyển chuột để quét sáng' : '✨ Bấm đèn pin chiếu sáng';
      }
    }

    function syncSantaHat() {
      const floater = document.querySelector('.ngao-bot-floater');
      if (!floater) return;
      let hat = document.getElementById('noelSantaHat');
      if (!hat) {
        floater.style.position = 'relative';
        hat = document.createElement('div');
        hat.id = 'noelSantaHat';
        hat.setAttribute('aria-hidden', 'true');
        hat.style.cssText = 'position:absolute;top:-22px;left:18px;width:78px;height:56px;pointer-events:none;z-index:5;transform:rotate(-10deg);filter:drop-shadow(0 6px 10px rgba(74,14,38,0.28));transition:opacity 0.25s ease;';
        hat.innerHTML = `
          <svg viewBox="0 0 110 80" width="78" height="56" xmlns="http://www.w3.org/2000/svg">
            <path d="M18,56 C24,20 56,4 88,24 C95,28 100,37 94,42 C82,36 68,42 64,54 Z" fill="#D91E48" stroke="#7A0B28" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M30,48 C36,26 56,16 74,23" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="4" stroke-linecap="round"/>
            <rect x="10" y="50" width="66" height="17" rx="8.5" fill="#FFFFFF" stroke="#F0D8E2" stroke-width="2"/>
            <circle cx="96" cy="40" r="10.5" fill="#FFFDF5" stroke="#FFDE59" stroke-width="2"/>
          </svg>
        `;
        floater.appendChild(hat);
      }
      const hatVisible = state.masterOn && state.hat;
      hat.style.opacity = hatVisible ? '1' : '0';
      const bubble = document.querySelector('.ngao-bot-bubble');
      if (bubble) {
        bubble.style.top = hatVisible ? '-58px' : '';
      }
    }

    /* ------------------------------------------------------------------
       4. Volumetric Conical Pivoting Flashlight Renderer
       ------------------------------------------------------------------ */
    let W = 0, H = 0, dpr = 1;
    let flTargetX = 480, flTargetY = 520;
    let flCurX = 480, flCurY = 520;
    let flAngleRad = (155 * Math.PI) / 180;

    function getFlashlightPivot() {
      const btn = document.getElementById('trainerFlashlightBtn');
      if (btn) {
        const r = btn.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
      }
      return { x: W * 0.82, y: 220 };
    }

    function setFlashlight(nextVal) {
      state.flashlight = Boolean(nextVal);
      if (state.flashlight) {
        const piv = getFlashlightPivot();
        flTargetX = Math.max(120, piv.x - 360);
        flTargetY = Math.min(H - 120, piv.y + 230);
        flCurX = flTargetX;
        flCurY = flTargetY;
      } else {
        flCtx.clearRect(0, 0, W, H);
        const svg = document.getElementById('trainerFlashlightSvg');
        if (svg) svg.style.transform = 'rotate(155deg)';
      }
      playSwitchClick(state.flashlight);
      applyUI();
    }

    function drawVolumetricFlashlight() {
      flCtx.clearRect(0, 0, W, H);
      if (!state.flashlight) return;

      const piv = getFlashlightPivot();
      flCurX += (flTargetX - flCurX) * 0.22;
      flCurY += (flTargetY - flCurY) * 0.22;

      const dx = flCurX - piv.x;
      const dy = flCurY - piv.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 14) flAngleRad = Math.atan2(dy, dx);

      const svg = document.getElementById('trainerFlashlightSvg');
      if (svg) svg.style.transform = `rotate(${(flAngleRad * 180 / Math.PI).toFixed(1)}deg)`;

      const cosA = Math.cos(flAngleRad);
      const sinA = Math.sin(flAngleRad);
      const perpX = -sinA;
      const perpY = cosA;
      const lx = piv.x + cosA * 15;
      const ly = piv.y + sinA * 15;
      const beamLen = Math.max(Math.hypot(W, H) * 0.92, dist + 320);

      flCtx.globalCompositeOperation = 'source-over';
      flCtx.fillStyle = 'rgba(13, 4, 10, 0.87)';
      flCtx.fillRect(0, 0, W, H);

      function traceCone(halfStart, spreadRad, len) {
        const endX = lx + cosA * len;
        const endY = ly + sinA * len;
        const halfEnd = halfStart + Math.tan(spreadRad) * len;
        flCtx.beginPath();
        flCtx.moveTo(lx + perpX * halfStart, ly + perpY * halfStart);
        flCtx.lineTo(endX + perpX * halfEnd, endY + perpY * halfEnd);
        flCtx.lineTo(endX - perpX * halfEnd, endY - perpY * halfEnd);
        flCtx.lineTo(lx - perpX * halfStart, ly - perpY * halfStart);
        flCtx.closePath();
      }

      // Silky Gaussian-feathered cutout cone
      flCtx.save();
      flCtx.globalCompositeOperation = 'destination-out';
      flCtx.filter = 'blur(28px)';
      const endX = lx + cosA * beamLen;
      const endY = ly + sinA * beamLen;
      const cutGrad = flCtx.createLinearGradient(lx, ly, endX, endY);
      cutGrad.addColorStop(0, 'rgba(0,0,0,1)');
      cutGrad.addColorStop(0.55, 'rgba(0,0,0,0.96)');
      cutGrad.addColorStop(0.84, 'rgba(0,0,0,0.52)');
      cutGrad.addColorStop(1, 'rgba(0,0,0,0)');
      flCtx.fillStyle = cutGrad;
      traceCone(9, (17.5 * Math.PI) / 180, beamLen);
      flCtx.fill();
      flCtx.restore();

      // Keep flashlight icon illuminated in the dark
      flCtx.save();
      flCtx.globalCompositeOperation = 'destination-out';
      const pivGlow = flCtx.createRadialGradient(piv.x, piv.y, 10, piv.x, piv.y, 50);
      pivGlow.addColorStop(0, 'rgba(0,0,0,1)');
      pivGlow.addColorStop(0.55, 'rgba(0,0,0,0.75)');
      pivGlow.addColorStop(1, 'rgba(0,0,0,0)');
      flCtx.fillStyle = pivGlow;
      flCtx.beginPath();
      flCtx.arc(piv.x, piv.y, 50, 0, Math.PI * 2);
      flCtx.fill();
      flCtx.restore();

      // Warm golden-amber volumetric light shaft
      flCtx.save();
      flCtx.globalCompositeOperation = 'source-over';
      flCtx.filter = 'blur(18px)';
      const hazeLen = Math.min(beamLen, 720);
      const hazeOuter = flCtx.createLinearGradient(lx, ly, lx + cosA * hazeLen, ly + sinA * hazeLen);
      hazeOuter.addColorStop(0, 'rgba(255, 246, 198, 0.56)');
      hazeOuter.addColorStop(0.2, 'rgba(255, 226, 132, 0.26)');
      hazeOuter.addColorStop(0.58, 'rgba(255, 214, 108, 0.08)');
      hazeOuter.addColorStop(1, 'rgba(255, 214, 108, 0)');
      flCtx.fillStyle = hazeOuter;
      traceCone(6, (16.5 * Math.PI) / 180, hazeLen);
      flCtx.fill();

      const hazeCore = flCtx.createLinearGradient(lx, ly, lx + cosA * 300, ly + sinA * 300);
      hazeCore.addColorStop(0, 'rgba(255, 254, 232, 0.78)');
      hazeCore.addColorStop(0.32, 'rgba(255, 232, 148, 0.22)');
      hazeCore.addColorStop(1, 'rgba(255, 232, 148, 0)');
      flCtx.fillStyle = hazeCore;
      traceCone(4.5, (9.5 * Math.PI) / 180, 300);
      flCtx.fill();
      flCtx.restore();
    }

    /* ------------------------------------------------------------------
       5. 3 Crisp Responsive Non-Stretched Vector Garlands
       ------------------------------------------------------------------ */
    function renderGarland() {
      const w = Math.max(320, W || window.innerWidth);
      const twinkleClasses = ['twinkle-a', 'twinkle-b', 'twinkle-c', 'twinkle-d'];

      if (state.garlandStyle === 'classic') {
        const swags = Math.max(3, Math.round(w / 210));
        const span = w / swags;
        let wirePath = 'M 0,1';
        let bulbsMarkup = '';
        const palette = [
          { body: '#E6005C', tip: '#FF75A8', glow: '#FF2E82', stroke: '#8F003A' },
          { body: '#F59E0B', tip: '#FFF0A6', glow: '#FFD147', stroke: '#92400E' },
          { body: '#10B981', tip: '#A7F3D0', glow: '#34D399', stroke: '#065F46' },
          { body: '#D91E48', tip: '#FF8FA3', glow: '#FF477E', stroke: '#7A0B28' },
          { body: '#FBBF24', tip: '#FFFBEB', glow: '#FFE270', stroke: '#9A6300' }
        ];
        const ts = [0.16, 0.39, 0.61, 0.84];
        let idx = 0;

        for (let s = 0; s < swags; s++) {
          const x0 = s * span;
          const cx = x0 + span * 0.5;
          const x1 = x0 + span;
          const cy = 20;
          wirePath += ` Q ${cx.toFixed(1)},${cy} ${x1.toFixed(1)},1`;
          for (const t of ts) {
            const bx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
            const by = (1 - t) * (1 - t) * 1 + 2 * (1 - t) * t * cy + t * t * 1;
            const angle = (t - 0.5) * 28;
            const c = palette[idx % palette.length];
            const tw = twinkleClasses[idx % twinkleClasses.length];
            const gid = `nbg${idx}`;
            const hg = `nhg${idx}`;
            idx++;
            bulbsMarkup += `
              <defs>
                <radialGradient id="${hg}" cx="50%" cy="55%" r="50%">
                  <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.72"/>
                  <stop offset="55%" stop-color="${c.glow}" stop-opacity="0.22"/>
                  <stop offset="100%" stop-color="${c.glow}" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="${gid}" x1="25%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stop-color="${c.tip}"/>
                  <stop offset="48%" stop-color="${c.body}"/>
                  <stop offset="100%" stop-color="${c.stroke}"/>
                </linearGradient>
              </defs>
              <g transform="translate(${bx.toFixed(1)}, ${(by - 0.5).toFixed(1)}) rotate(${angle.toFixed(1)})">
                <circle class="bulb-glow ${tw}" cx="0" cy="12.5" r="14.5" fill="url(#${hg})"/>
                <rect x="-3.1" y="-1.5" width="6.2" height="5.2" rx="1.4" fill="#184231" stroke="#0D261C" stroke-width="0.7"/>
                <rect x="-3.5" y="2.6" width="7" height="1.6" rx="0.8" fill="#E5B94C"/>
                <path d="M 0,4 C -4.6,7.2 -5.5,14.5 0,19.2 C 5.5,14.5 4.6,7.2 0,4 Z" fill="url(#${gid})" stroke="${c.stroke}" stroke-width="0.6"/>
                <ellipse class="bulb-glow ${tw}" cx="0" cy="11.2" rx="1.7" ry="3.8" fill="#FFFDF5" opacity="0.82"/>
                <path d="M -2.2,7.5 Q -3.4,11.2 -1.6,14.6" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="1.25" stroke-linecap="round"/>
              </g>`;
          }
        }
        garland.innerHTML = `
          <svg viewBox="0 0 ${w} 52" xmlns="http://www.w3.org/2000/svg">
            <path d="${wirePath}" fill="none" stroke="rgba(20,52,38,0.22)" stroke-width="4" transform="translate(0,1.5)"/>
            <path d="${wirePath}" fill="none" stroke="#184231" stroke-width="2.2" stroke-linecap="round"/>
            <path d="${wirePath}" fill="none" stroke="rgba(255,222,89,0.32)" stroke-width="0.8" stroke-dasharray="6 8"/>
            ${bulbsMarkup}
          </svg>`;
        return;
      }

      if (state.garlandStyle === 'stars') {
        const step = w <= 720 ? 38 : 48;
        const count = Math.floor(w / step);
        const offset = (w - (count - 1) * step) / 2;
        const lengths = [12, 24, 15, 30, 18, 26, 13, 22];
        let drops = '';
        for (let i = 0; i < count; i++) {
          const x = offset + i * step;
          const len = lengths[i % lengths.length];
          const tw = twinkleClasses[i % twinkleClasses.length];
          const sway = i % 2 === 0 ? 'sway-slow' : 'sway-alt';
          const kind = i % 3;
          let ornament = '';
          if (kind === 0) {
            ornament = `
              <circle class="bulb-glow ${tw}" cx="0" cy="${len + 5}" r="13" fill="url(#nStarHalo)"/>
              <path d="M0,${len - 2} L2,${len + 3.2} L7.2,${len + 5.2} L2,${len + 7.2} L0,${len + 12.5} L-2,${len + 7.2} L-7.2,${len + 5.2} L-2,${len + 3.2} Z" fill="url(#nGoldStarFill)" stroke="#A8740C" stroke-width="0.65" stroke-linejoin="round"/>
              <circle cx="0" cy="${len + 5.2}" r="1.5" fill="#FFFDF5"/>`;
          } else if (kind === 1) {
            ornament = `
              <circle class="bulb-glow ${tw}" cx="0" cy="${len + 4}" r="10.5" fill="url(#nStarHalo)"/>
              <polygon points="0,${len - 1.5} 4.2,${len + 4.2} 0,${len + 10} -4.2,${len + 4.2}" fill="#FFF7D6" stroke="#C8931E" stroke-width="0.8"/>
              <polygon points="0,${len - 1.5} 2,${len + 4.2} 0,${len + 10}" fill="rgba(255,210,80,0.45)"/>`;
          } else {
            ornament = `
              <circle class="bulb-glow ${tw}" cx="0" cy="${len + 3}" r="10" fill="url(#nRoseHalo)"/>
              <circle cx="0" cy="${len + 3}" r="3.4" fill="#E6007E" stroke="#8C0944" stroke-width="0.6"/>
              <circle cx="-1" cy="${len + 1.8}" r="1.1" fill="#FFFFFF" opacity="0.85"/>`;
          }
          drops += `
            <g class="bulb-swing ${sway}" transform="translate(${x.toFixed(1)}, 2)">
              <line x1="0" y1="0" x2="0" y2="${len}" stroke="url(#nGoldWire)" stroke-width="1.05" opacity="0.82"/>
              ${ornament}
            </g>`;
        }
        garland.innerHTML = `
          <svg viewBox="0 0 ${w} 52" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="nGoldWire" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#B07A12"/>
                <stop offset="100%" stop-color="#FFE066"/>
              </linearGradient>
              <linearGradient id="nGoldStarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFF7C2"/>
                <stop offset="50%" stop-color="#FFCA2C"/>
                <stop offset="100%" stop-color="#C98A0E"/>
              </linearGradient>
              <radialGradient id="nStarHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFE066" stop-opacity="0.72"/>
                <stop offset="55%" stop-color="#FFCA2C" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#FFCA2C" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="nRoseHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FF6BA8" stop-opacity="0.65"/>
                <stop offset="100%" stop-color="#E6007E" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <line x1="0" y1="2" x2="${w}" y2="2" stroke="#C8931E" stroke-width="2" opacity="0.78"/>
            ${drops}
          </svg>`;
        return;
      }

      // Pine Garland
      const swags = Math.max(3, Math.round(w / 220));
      const span = w / swags;
      let foliage = '';
      let ornaments = '';
      let ledIdx = 0;
      for (let s = 0; s < swags; s++) {
        const x0 = s * span;
        const cx = x0 + span * 0.5;
        const x1 = x0 + span;
        const cy = 22;
        const steps = 22;
        for (let k = 0; k <= steps; k++) {
          const t = k / steps;
          const px = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
          const py = (1 - t) * (1 - t) * 2 + 2 * (1 - t) * t * cy + t * t * 2;
          const spread = 8 + Math.sin(t * Math.PI) * 3;
          foliage += `
            <path d="M${px.toFixed(1)},${py.toFixed(1)} l-5,${(spread * 0.85).toFixed(1)} M${px.toFixed(1)},${py.toFixed(1)} l5,${(spread * 0.85).toFixed(1)}" stroke="#14452F" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M${px.toFixed(1)},${(py - 1).toFixed(1)} l-3.5,${(spread * 0.65).toFixed(1)} M${px.toFixed(1)},${(py - 1).toFixed(1)} l3.5,${(spread * 0.65).toFixed(1)}" stroke="#247350" stroke-width="1.6" stroke-linecap="round"/>`;
        }
        for (const t of [0.18, 0.38, 0.62, 0.82]) {
          const lx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
          const ly = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * (cy + 3) + t * t * 4;
          const tw = twinkleClasses[ledIdx++ % twinkleClasses.length];
          ornaments += `
            <circle class="bulb-glow ${tw}" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="8.5" fill="url(#nPineLedHalo)"/>
            <circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="2.2" fill="#FFFDF0"/>`;
        }
        const mx = cx;
        const my = 0.5 * cy + 4;
        ornaments += `
          <circle cx="${mx.toFixed(1)}" cy="${(my + 6).toFixed(1)}" r="5" fill="url(#nGoldBauble)" stroke="#9A6B0A" stroke-width="0.7"/>
          <circle cx="${(mx - 1.6).toFixed(1)}" cy="${(my + 4.3).toFixed(1)}" r="1.4" fill="#FFFFFF" opacity="0.75"/>`;
        if (s > 0) {
          ornaments += `
            <circle cx="${(x0 - 3).toFixed(1)}" cy="9" r="3.2" fill="#D90452" stroke="#7A0430" stroke-width="0.5"/>
            <circle cx="${(x0 + 3).toFixed(1)}" cy="9" r="3.2" fill="#E6005C" stroke="#7A0430" stroke-width="0.5"/>
            <circle cx="${x0.toFixed(1)}" cy="12.5" r="3.3" fill="#B80044" stroke="#7A0430" stroke-width="0.5"/>
            <circle cx="${(x0 - 3.8).toFixed(1)}" cy="8" r="0.9" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="${(x0 + 2.2).toFixed(1)}" cy="8" r="0.9" fill="#FFFFFF" opacity="0.8"/>`;
        }
      }
      garland.innerHTML = `
        <svg viewBox="0 0 ${w} 52" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nPineLedHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFF4B8" stop-opacity="0.9"/>
              <stop offset="55%" stop-color="#FFCE38" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#FFCE38" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="nGoldBauble" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFF7CC"/>
              <stop offset="55%" stop-color="#F5B82E"/>
              <stop offset="100%" stop-color="#A16B07"/>
            </radialGradient>
          </defs>
          ${foliage}
          ${ornaments}
        </svg>`;
    }

    /* ------------------------------------------------------------------
       6. Snowflakes, Sparkles & Sleigh Animation Loop
       ------------------------------------------------------------------ */
    let flakes = [];
    let sparkles = [];
    let sleighX = 140;
    let sleighDir = 1;
    let sleighFrame = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flCanvas.width = Math.floor(W * dpr);
      flCanvas.height = Math.floor(H * dpr);
      flCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderGarland();
    }

    function makeFlake(randomY = true) {
      const layer = Math.random();
      const isGold = Math.random() < 0.16;
      const isCrystal = Math.random() < 0.28;
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : -15,
        r: isCrystal ? (3.5 + layer * 4.5) : (1.6 + layer * 3.4),
        vy: 0.45 + layer * 1.15,
        vx: (Math.random() - 0.5) * 0.45,
        phase: Math.random() * Math.PI * 2,
        sway: 0.3 + layer * 0.65,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.018,
        alpha: 0.35 + layer * 0.52,
        isGold,
        isCrystal
      };
    }

    function syncFlakes() {
      while (flakes.length < state.count) flakes.push(makeFlake(true));
      if (flakes.length > state.count) flakes.length = state.count;
    }

    function drawCrystal(x, y, r, rot, alpha, isGold) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = isGold ? `rgba(255, 212, 72, ${alpha})` : `rgba(200, 32, 97, ${alpha * 0.45})`;
      ctx.lineWidth = 1.25;
      ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.moveTo(0, -r * 0.58);
        ctx.lineTo(r * 0.28, -r * 0.8);
        ctx.moveTo(0, -r * 0.58);
        ctx.lineTo(-r * 0.28, -r * 0.8);
        ctx.stroke();
      }
      ctx.restore();
    }

    function spawnSparkle(x, y) {
      if (!state.masterOn || !state.sparkle || state.paused) return;
      for (let i = 0; i < 2; i++) {
        sparkles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.1,
          vy: -0.4 - Math.random() * 0.9,
          r: 1.8 + Math.random() * 2.4,
          life: 1,
          gold: Math.random() > 0.35
        });
      }
      if (sparkles.length > 75) sparkles.splice(0, sparkles.length - 75);
    }

    function spawnSleighTrail(x, y, dir) {
      sparkles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 10,
        vx: -dir * (0.4 + Math.random() * 0.7),
        vy: (Math.random() - 0.35) * 0.65,
        r: 1.4 + Math.random() * 2.1,
        life: 0.95,
        gold: Math.random() > 0.25
      });
      if (sparkles.length > 90) sparkles.splice(0, sparkles.length - 90);
    }

    function tick() {
      drawVolumetricFlashlight();
      ctx.clearRect(0, 0, W, H);

      if (state.masterOn && !state.paused) {
        state.wind += (state.windTarget - state.wind) * 0.04;

        if (state.sleigh && sleighRunner) {
          const sleighW = W <= 720 ? 146 : 196;
          const trackTop = W <= 720 ? 52 : 64;
          const speed = W <= 720 ? 1.15 : 1.55;
          sleighX += speed * sleighDir;
          if (sleighDir === 1 && sleighX > W + 24) sleighDir = -1;
          else if (sleighDir === -1 && sleighX < -(sleighW + 24)) sleighDir = 1;
          sleighRunner.style.transform = `translate3d(${sleighX.toFixed(1)}px, 0, 0) scaleX(${sleighDir})`;
          sleighFrame++;
          if (sleighFrame % 4 === 0 && sleighX > -sleighW && sleighX < W + 20) {
            const rearX = sleighDir === 1 ? (sleighX + 14) : (sleighX + sleighW - 14);
            const rearY = trackTop + (W <= 720 ? 27 : 36);
            spawnSleighTrail(rearX, rearY, sleighDir);
          }
        }

        if (state.snow) {
          for (const f of flakes) {
            f.phase += 0.015;
            f.rot += f.vrot;
            f.y += f.vy;
            f.x += f.vx + Math.sin(f.phase) * f.sway + state.wind;
            if (f.y > H + 16) { f.y = -14; f.x = Math.random() * W; }
            if (f.x > W + 16) f.x = -14;
            if (f.x < -16) f.x = W + 14;
            if (state.crystals && f.isCrystal) {
              drawCrystal(f.x, f.y, f.r, f.rot, f.alpha, f.isGold);
            } else {
              const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 1.6);
              if (f.isGold) {
                grad.addColorStop(0, `rgba(255, 232, 130, ${f.alpha})`);
                grad.addColorStop(1, 'rgba(255, 222, 89, 0)');
              } else {
                grad.addColorStop(0, `rgba(255, 255, 255, ${f.alpha})`);
                grad.addColorStop(0.6, `rgba(248, 200, 220, ${f.alpha * 0.55})`);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
              }
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(f.x, f.y, f.r * 1.6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        if (sparkles.length) {
          for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];
            s.x += s.vx;
            s.y += s.vy;
            s.life -= 0.032;
            if (s.life <= 0) { sparkles.splice(i, 1); continue; }
            ctx.save();
            ctx.globalAlpha = s.life;
            ctx.fillStyle = s.gold ? '#FFDE59' : '#E6007E';
            ctx.translate(s.x, s.y);
            ctx.beginPath();
            for (let k = 0; k < 4; k++) {
              ctx.rotate(Math.PI / 2);
              ctx.moveTo(0, -s.r * 1.5);
              ctx.quadraticCurveTo(0, 0, s.r * 1.5, 0);
              ctx.quadraticCurveTo(0, 0, 0, s.r * 1.5);
            }
            ctx.fill();
            ctx.restore();
          }
        }
      }
      requestAnimationFrame(tick);
    }

    /* ------------------------------------------------------------------
       7. State & UI Synchronization + Event Bindings
       ------------------------------------------------------------------ */
    function applyUI() {
      togSleigh.checked = state.sleigh;
      togSnow.checked = state.snow;
      togLights.checked = state.lights;
      togCorners.checked = state.corners;
      togHat.checked = state.hat;
      togSparkle.checked = state.sparkle;
      togCrystals.checked = state.crystals;
      snowDensity.value = state.count;
      densityVal.textContent = state.count;

      const on = state.masterOn;
      controlDock.classList.toggle('is-hidden', !on);
      canvas.classList.toggle('hidden', !on);
      sleighTrack.classList.toggle('hidden', !on || !state.sleigh);
      sleighTrack.classList.toggle('paused', !on || state.paused);
      if (sleighRunner) {
        sleighRunner.style.transform = `translate3d(${sleighX.toFixed(1)}px, 0, 0) scaleX(${sleighDir})`;
      }
      garland.classList.toggle('hidden', !on || !state.lights);
      garland.classList.toggle('paused', !on || state.paused);
      corners.classList.toggle('hidden', !on || !state.corners);

      flCanvas.classList.toggle('active', state.flashlight);
      flashlightExitBtn.classList.toggle('active', state.flashlight);

      syncFlakes();
      syncMusicUI();
      mountLightSwitch();
      mountTrainerFlashlight();
      syncSantaHat();
    }

    const PRESETS = {
      luxury:  { sleigh: true,  snow: true, lights: true,  corners: false, hat: true,  sparkle: false, crystals: true,  count: 55 },
      festive: { sleigh: true,  snow: true, lights: true,  corners: true,  hat: true,  sparkle: true,  crystals: true,  count: 105 },
      minimal: { sleigh: false, snow: true, lights: false, corners: false, hat: false, sparkle: false, crystals: false, count: 32 }
    };

    document.querySelectorAll('.noel-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.noel-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Object.assign(state, PRESETS[btn.dataset.preset], { masterOn: true, paused: false });
        playSwitchClick(true);
        applyUI();
      });
    });

    document.querySelectorAll('.noel-gstyle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.noel-gstyle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.garlandStyle = btn.dataset.gstyle;
        state.lights = true;
        state.masterOn = true;
        state.paused = false;
        renderGarland();
        playSwitchClick(true);
        applyUI();
      });
    });

    document.querySelectorAll('.noel-music-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const track = btn.dataset.track;
        if (track !== 'off') state.masterOn = true;
        startMusic(track);
        applyUI();
      });
    });

    musicVol.addEventListener('input', () => {
      const pct = Number(musicVol.value);
      state.musicVolume = pct / 100;
      musicVolVal.textContent = `${pct}%`;
      if (musicMasterGain) musicMasterGain.gain.value = state.musicVolume * 0.28;
    });

    togSleigh.addEventListener('change', () => { state.sleigh = togSleigh.checked; applyUI(); });
    togSnow.addEventListener('change', () => { state.snow = togSnow.checked; applyUI(); });
    togLights.addEventListener('change', () => { state.lights = togLights.checked; applyUI(); });
    togCorners.addEventListener('change', () => { state.corners = togCorners.checked; applyUI(); });
    togHat.addEventListener('change', () => { state.hat = togHat.checked; applyUI(); });
    togSparkle.addEventListener('change', () => { state.sparkle = togSparkle.checked; applyUI(); });
    togCrystals.addEventListener('change', () => { state.crystals = togCrystals.checked; applyUI(); });
    snowDensity.addEventListener('input', () => { state.count = Number(snowDensity.value); applyUI(); });

    offBtn.addEventListener('click', () => {
      state.masterOn = false;
      stopMusic();
      playSwitchClick(false);
      applyUI();
    });

    collapseBtn.addEventListener('click', () => {
      const collapsed = controlDock.classList.toggle('collapsed');
      collapseBtn.textContent = collapsed ? 'Mở bảng Noel' : 'Thu gọn';
    });

    flashlightExitBtn.addEventListener('click', () => setFlashlight(false));

    window.addEventListener('mousemove', (e) => {
      state.windTarget = ((e.clientX / (W || 1)) - 0.5) * 1.4;
      spawnSparkle(e.clientX, e.clientY);
      if (state.flashlight) {
        flTargetX = e.clientX;
        flTargetY = e.clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (state.flashlight && e.touches && e.touches[0]) {
        flTargetX = e.touches[0].clientX;
        flTargetY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.flashlight) setFlashlight(false);
    });

    window.addEventListener('resize', resize);

    resize();
    applyUI();
    // Retry Santa hat mount shortly after ebook-engine mounts Ngáo Bot
    setTimeout(syncSantaHat, 350);
    setTimeout(syncSantaHat, 950);
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountNoelExperience);
  } else {
    mountNoelExperience();
  }
})();
