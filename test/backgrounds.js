// backgrounds.js

export const backgrounds = [
    "linear-gradient(to bottom, #87CEEB, #1E90FF)",
    "linear-gradient(to bottom, #FFD700, #FFA500)",
    "linear-gradient(to bottom, #90EE90, #008000)",
    "linear-gradient(to bottom, #FF69B4, #8B0000)",
    "linear-gradient(to bottom, #8A2BE2, #4B0082)",
    "linear-gradient(to bottom, #2F4F4F, #000000)"
  ];
  
  /**
   * Returns an appropriate background gradient
   * based on the current level.
   */
  export function getBackgroundForLevel(level) {
    // For example, we use one background per five levels:
    const index = Math.min(Math.floor(level / 5), backgrounds.length - 1);
    return backgrounds[index];
  }
  