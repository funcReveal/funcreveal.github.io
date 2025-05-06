interface EffectSource {
  tsxCode: string;
  cssCode: string;
  githubUrl: string;
  TSXName: string;
  CSSName: string;
}

export const effectSources: Record<string, EffectSource> = {
  "animated-border": {
    tsxCode: `import React from 'react';
import styles from './AnimatedBorder.module.css';

/**
 * AnimatedBorder Component
 * ------------------------
 * Renders a circular placeholder with a rotating colorful glow ring behind it.
 * This is commonly used for avatars or badges with visual effects.
 */
const AnimatedBorder = () => {
    return (
        <div className={styles.container}>
            {/* Colorful rotating glow behind the circle */}
            <div className={styles.glow}></div>

            {/* Foreground placeholder (can represent avatar) */}
            <div className={styles.placeholder}></div>
        </div>
    );
};

export default AnimatedBorder;
    `,
    cssCode: `/* =====================================
   Container for the Circular Glow Effect
   ===================================== */
.container {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 50%;                /* Make the shape circular */
    display: flex;
    justify-content: center;           /* Horizontally center the child */
    align-items: center;               /* Vertically center the child */
}

/* ==========================================
   Rotating Rainbow Glow Effect (Outer Layer)
   ========================================== */
.glow {
    position: absolute;
    top: -12px;
    left: -12px;
    width: calc(100% + 24px);          /* Expand beyond the container */
    height: calc(100% + 24px);
    border-radius: 50%;                /* Keep it circular */
    background: conic-gradient(        /* Rainbow gradient effect */
        red,
        orange,
        yellow,
        green,
        cyan,
        blue,
        violet,
        red
    );
    filter: blur(12px);                /* Soft blur for glow effect */
    animation: spin 4s linear infinite;/* Infinite spinning animation */
    z-index: 1;                        /* Positioned below the placeholder */
}

/* =====================================
   Placeholder Circle (Simulated Avatar)
   ===================================== */
.placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;                /* Circular shape */
    background-color: #ef9c9c;         /* Default inner fill (can be replaced) */
    position: relative;
    z-index: 2;                        /* Layered above the glow */
}

/* ======================
   Keyframe: Spin Motion
   ====================== */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
    `,
    githubUrl: "https://github.com/funcReveal/effects-gallery",
    TSXName: "AnimatedBorder.tsx",
    CSSName: "AnimatedBorder.module.css",
  },
  "glow-button": {
    tsxCode: `import React from 'react';
import styles from './GlowButton.module.css'; // You can also use styled-components or Emotion

/**
 * GlowButton Component
 * ---------------------
 * A button with a glowing hover effect using CSS animation.
 * Suitable for call-to-action or interactive UI elements.
 */
const GlowButton = () => {
    return (
        <button className={styles.glowButton}>
            Hover Me
        </button>
    );
};

export default GlowButton;
      `,
    cssCode: `/* =============================
   Glowing Button with Hover Effect
   ============================= */
.glowButton {
  padding: 1rem 2rem; /* Inner spacing */
  font-size: 1rem; /* Text size */
  border: none; /* Remove default border */
  background: #111; /* Dark background */
  color: white; /* Text color */
  cursor: pointer; /* Show pointer on hover */
  position: relative;
  border-radius: 8px; /* Rounded corners */

  /* Initial glow effect (both outer and inner) */
  box-shadow: 0 0 10px #00f, /* Outer glow */ 0 0 20px #00f inset; /* Inner glow */

  transition: box-shadow 0.3s ease; /* Smooth transition on hover */
}

/* =============================
   Stronger glow on hover
   ============================= */
.glowButton:hover {
  box-shadow: 0 0 20px #0ff, /* Stronger outer glow */ 0 0 30px #0ff inset; /* Stronger inner glow */
}  
      `,
    githubUrl: "https://github.com/funcReveal/effects-gallery",
    TSXName: "GlowButton.tsx",
    CSSName: "GlowButton.module.css",
  },
};
