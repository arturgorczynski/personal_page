/**
 * Composable for particle system with seeded PRNG
 */

/**
 * Mulberry32 PRNG for deterministic particle positioning
 * @param {number} seed - Seed for random number generation
 * @returns {Function} - Returns next random number between 0 and 1
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate particle styles for background animation
 * @param {number} count - Number of particles to generate
 * @param {number} baseSeed - Base seed for PRNG
 * @returns {Object[]} - Array of particle style objects
 */
export function generateParticleStyles(count = 56, baseSeed = 0xa53a) {
  return Array.from({ length: count }, (_, i) => {
    const rand = mulberry32(baseSeed + i * 97);
    const left = rand() * 100;
    const top = rand() * 100;
    const size = 1.5 + rand() * 6.5;
    const delay = rand() * 10;
    const duration = 7 + rand() * 13;
    const driftX = (rand() - 0.5) * 120;
    const driftY = (rand() - 0.5) * 80;
    return {
      left: `${left}%`,
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      "--drift-x": `${driftX}px`,
      "--drift-y": `${driftY}px`,
    };
  });
}

/**
 * Composable for particle system
 * @param {number} count - Number of particles
 * @param {number} seed - Base seed for deterministic generation
 * @returns {Object} - Particle styles and helper function
 */
export function useParticles(count = 56, seed = 0xa53a) {
  const particleStyles = generateParticleStyles(count, seed);

  /**
   * Get style for a specific particle (1-indexed)
   * @param {number} n - Particle index (1-based)
   * @returns {Object} - Style object for the particle
   */
  const getParticleStyle = (n) => particleStyles[n - 1];

  return {
    particleStyles,
    getParticleStyle,
    particleCount: count,
  };
}


