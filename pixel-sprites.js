/**
 * Pixel Art Vector Sprites for StampChain Logistics Platform
 * Scalable SVG-based pixel rendering for trucks, drivers, checkpoints,
 * warehouses, hazards, dwell bubbles, and destination terminals.
 */

const PixelSprites = {
  /**
   * 🚚 Pixel Art Heavy Multi-Axle Hauler Truck
   */
  getTruckSvg({ status = 'blue', isMoving = true, scale = 1 }) {
    let cabColor = '#0284c7';
    let cabHighlight = '#38bdf8';
    let cabDark = '#0369a1';
    let glowColor = 'rgba(6, 182, 212, 0.4)';

    if (status === 'green') {
      cabColor = '#059669';
      cabHighlight = '#10b981';
      cabDark = '#047857';
      glowColor = 'rgba(16, 185, 129, 0.4)';
    } else if (status === 'amber') {
      cabColor = '#d97706';
      cabHighlight = '#f59e0b';
      cabDark = '#b45309';
      glowColor = 'rgba(245, 158, 11, 0.4)';
    } else if (status === 'red') {
      cabColor = '#dc2626';
      cabHighlight = '#ef4444';
      cabDark = '#b91c1c';
      glowColor = 'rgba(239, 68, 68, 0.5)';
    }

    const width = 58 * scale;
    const height = 34 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 58 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-truck-svg ${isMoving ? 'truck-moving-vibe' : ''}">
        <defs>
          <filter id="truckGlow_${status}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${glowColor}" />
          </filter>
        </defs>
        <g filter="url(#truckGlow_${status})">
          <!-- Trailer Container (Cargo Bay) -->
          <rect x="2" y="4" width="36" height="20" rx="1" fill="#1e293b" stroke="#334155" stroke-width="1" />
          <rect x="5" y="6" width="6" height="16" fill="#0f172a" />
          <rect x="15" y="6" width="6" height="16" fill="#0f172a" />
          <rect x="25" y="6" width="6" height="16" fill="#0f172a" />
          
          <!-- Container Logo Stamp -->
          <rect x="13" y="10" width="14" height="8" rx="1" fill="#0b111e" stroke="${cabHighlight}" stroke-width="0.8" />
          <text x="20" y="16" fill="${cabHighlight}" font-family="'JetBrains Mono', monospace" font-size="5" font-weight="800" text-anchor="middle">STAMP</text>
          
          <!-- Chassis / Connecting Hitch -->
          <rect x="36" y="16" width="6" height="6" fill="#475569" />
          <rect x="2" y="24" width="52" height="3" fill="#0f172a" />

          <!-- Truck Cab -->
          <rect x="40" y="8" width="16" height="16" rx="1" fill="${cabColor}" />
          <rect x="40" y="8" width="16" height="3" fill="${cabHighlight}" />
          <rect x="40" y="21" width="16" height="3" fill="${cabDark}" />
          
          <!-- Windshield & Side Window -->
          <rect x="46" y="11" width="8" height="6" rx="0.5" fill="#38bdf8" opacity="0.9" />
          <rect x="42" y="11" width="3" height="6" fill="#0284c7" />
          
          <!-- Headlights -->
          <rect x="55" y="18" width="2" height="3" fill="#fef08a" />
          <polygon points="57,18 64,15 64,24 57,21" fill="rgba(254, 240, 138, 0.18)" />

          <!-- Tail Lights -->
          <rect x="1" y="18" width="1.5" height="4" fill="#ef4444" />

          <!-- Wheels (6-Axle Configuration) -->
          <circle cx="8" cy="27" r="4.5" fill="#020617" stroke="#475569" stroke-width="1.5" />
          <circle cx="8" cy="27" r="1.5" fill="#94a3b8" />

          <circle cx="19" cy="27" r="4.5" fill="#020617" stroke="#475569" stroke-width="1.5" />
          <circle cx="19" cy="27" r="1.5" fill="#94a3b8" />

          <circle cx="30" cy="27" r="4.5" fill="#020617" stroke="#475569" stroke-width="1.5" />
          <circle cx="30" cy="27" r="1.5" fill="#94a3b8" />

          <circle cx="48" cy="27" r="4.5" fill="#020617" stroke="#475569" stroke-width="1.5" />
          <circle cx="48" cy="27" r="1.5" fill="#94a3b8" />
        </g>
      </svg>
    `;
  },

  /**
   * 👤 Pixel Art Driver Character Token
   */
  getDriverSvg(status = 'On Route', scale = 1) {
    let haloColor = '#10b981';
    if (status === 'Delayed') haloColor = '#f59e0b';
    else if (status === 'Waiting') haloColor = '#94a3b8';
    else if (status === 'At Checkpoint') haloColor = '#06b6d4';

    const width = 24 * scale;
    const height = 24 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-driver-svg">
        <circle cx="12" cy="12" r="11" fill="#0b111e" stroke="${haloColor}" stroke-width="1.5" />
        <rect x="8" y="4" width="8" height="4" rx="1" fill="#0284c7" />
        <rect x="7" y="7" width="10" height="2" fill="#38bdf8" />
        <rect x="8" y="9" width="8" height="6" fill="#fcd34d" />
        <rect x="9" y="11" width="2" height="1.5" fill="#0f172a" />
        <rect x="13" y="11" width="2" height="1.5" fill="#0f172a" />
        <rect x="6" y="15" width="12" height="7" rx="1" fill="#1e293b" />
        <rect x="10" y="15" width="4" height="7" fill="#f59e0b" />
      </svg>
    `;
  },

  /**
   * 🏭 Pixel Art Warehouse / Fulfillment Center
   */
  getWarehouseSvg({ isDestination = false, scale = 1 }) {
    const primaryColor = isDestination ? '#818cf8' : '#0284c7';
    const width = 52 * scale;
    const height = 44 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-warehouse-svg">
        <polygon points="2,16 26,4 50,16" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <polygon points="6,15 26,6 46,15" fill="#0f172a" />
        <rect x="4" y="16" width="44" height="24" rx="1" fill="#0f172a" stroke="#334155" stroke-width="1.2" />
        
        <!-- Roll-up Loading Bays -->
        <rect x="8" y="24" width="10" height="16" fill="#1e293b" stroke="${primaryColor}" stroke-width="1" />
        <line x1="8" y1="28" x2="18" y2="28" stroke="#334155" />
        <line x1="8" y1="32" x2="18" y2="32" stroke="#334155" />
        <line x1="8" y1="36" x2="18" y2="36" stroke="#334155" />

        <rect x="21" y="24" width="10" height="16" fill="#1e293b" stroke="${primaryColor}" stroke-width="1" />
        <line x1="21" y1="28" x2="31" y2="28" stroke="#334155" />
        <line x1="21" y1="32" x2="31" y2="32" stroke="#334155" />
        <line x1="21" y1="36" x2="31" y2="36" stroke="#334155" />

        <rect x="34" y="24" width="10" height="16" fill="#1e293b" stroke="${primaryColor}" stroke-width="1" />
        <line x1="34" y1="28" x2="44" y2="28" stroke="#334155" />
        <line x1="34" y1="32" x2="44" y2="32" stroke="#334155" />
        <line x1="34" y1="36" x2="44" y2="36" stroke="#334155" />

        <circle cx="26" cy="11" r="3" fill="${primaryColor}" />
      </svg>
    `;
  },

  /**
   * 📍 Pixel Art Checkpoint & Toll Gantry
   */
  getCheckpointSvg(state = 'verified', scale = 1) {
    let strokeColor = '#10b981';
    let lightColor = '#10b981';
    let label = '✓';

    if (state === 'delayed') {
      strokeColor = '#f59e0b';
      lightColor = '#f59e0b';
      label = '⚠';
    } else if (state === 'upcoming') {
      strokeColor = '#64748b';
      lightColor = '#06b6d4';
      label = '●';
    } else if (state === 'not_verified') {
      strokeColor = '#ef4444';
      lightColor = '#ef4444';
      label = '!';
    }

    const width = 36 * scale;
    const height = 40 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-checkpoint-svg">
        <!-- Gantry Posts -->
        <rect x="3" y="10" width="4" height="28" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <rect x="29" y="10" width="4" height="28" fill="#1e293b" stroke="#334155" stroke-width="1" />
        
        <!-- Overhead Sensor Beam -->
        <rect x="2" y="6" width="32" height="8" rx="1" fill="#0f172a" stroke="${strokeColor}" stroke-width="1.2" />
        
        <!-- Status Indicator Light -->
        <circle cx="18" cy="10" r="3" fill="${lightColor}" />
        
        <!-- RFID Scanner Scanner Line -->
        <line x1="8" y1="14" x2="28" y2="14" stroke="${lightColor}" stroke-width="1" stroke-dasharray="2 2" />
        
        <!-- Verification Stamp Badge -->
        <rect x="11" y="20" width="14" height="14" rx="2" fill="#0b111e" stroke="${strokeColor}" stroke-width="1" />
        <text x="18" y="30" fill="${strokeColor}" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" text-anchor="middle">${label}</text>
      </svg>
    `;
  },

  /**
   * ⚠️ Pixel Art Delay Hazard & Traffic Cones
   */
  getHazardSvg(scale = 1) {
    const width = 42 * scale;
    const height = 32 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-hazard-svg">
        <!-- Warning Diamond -->
        <polygon points="21,2 38,28 4,28" fill="#f59e0b" stroke="#0f172a" stroke-width="2" />
        <polygon points="21,7 34,26 8,26" fill="#0f172a" />
        <text x="21" y="24" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="900" text-anchor="middle">!</text>
        
        <!-- Small Traffic Cones -->
        <polygon points="5,24 9,24 8,16 6,16" fill="#ea580c" />
        <polygon points="33,24 37,24 36,16 34,16" fill="#ea580c" />
      </svg>
    `;
  },

  /**
   * ⏱️ Dwell Duration Timer Bubble (8m vs 42m)
   */
  getDwellBubbleSvg(durationStr = '42m', isLongDwell = true, scale = 1) {
    const borderColor = isLongDwell ? '#f59e0b' : '#38bdf8';
    const bgColor = isLongDwell ? 'rgba(245, 158, 11, 0.95)' : 'rgba(2, 132, 199, 0.95)';
    const textColor = isLongDwell ? '#0f172a' : '#ffffff';

    const width = 36 * scale;
    const height = 20 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="34" height="18" rx="4" fill="${bgColor}" stroke="${borderColor}" stroke-width="1.2" />
        <text x="18" y="13.5" fill="${textColor}" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" text-anchor="middle">⏱ ${durationStr}</text>
      </svg>
    `;
  },

  /**
   * 🏁 Destination Gateway Terminal
   */
  getDestinationSvg(scale = 1) {
    const width = 42 * scale;
    const height = 42 * scale;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="34" height="26" rx="2" fill="#0f172a" stroke="#818cf8" stroke-width="1.5" />
        <polygon points="2,12 21,2 40,12" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.2" />
        <rect x="14" y="22" width="14" height="16" fill="#312e81" stroke="#a5b4fc" stroke-width="1" />
        <text x="21" y="33" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="800" text-anchor="middle">GATE</text>
      </svg>
    `;
  }
};
