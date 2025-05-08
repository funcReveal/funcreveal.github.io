/**
 * 🚀 Auto-generated. Do not edit manually.
 */
export interface EffectSource {
  tsxCode: string;
  cssCode: string;
  githubUrl: string;
  TSXName: string;
  CSSName: string;
}

export const effectSources: Record<string, EffectSource> = {
  "animated-border": {
    tsxCode:
      "import React from 'react';\r\nimport styles from './AnimatedBorder.module.css';\r\n\r\n/**\r\n * AnimatedBorder Component\r\n * ------------------------\r\n * Renders a circular placeholder with a rotating colorful glow ring behind it.\r\n * This is commonly used for avatars or badges with visual effects.\r\n */\r\nconst AnimatedBorder = () => {\r\n    return (\r\n        <div className={styles.container}>\r\n            {/* Colorful rotating glow behind the circle */}\r\n            <div className={styles.glow}></div>\r\n\r\n            {/* Foreground placeholder (can represent avatar) */}\r\n            <div className={styles.placeholder}></div>\r\n        </div>\r\n    );\r\n};\r\n\r\nexport default AnimatedBorder;\r\n",
    cssCode:
      "/* =====================================\r\n   Container for the Circular Glow Effect\r\n   ===================================== */\r\n.container {\r\n  position: relative;\r\n  width: 160px;\r\n  height: 160px;\r\n  border-radius: 50%; /* Make the shape circular */\r\n  display: flex;\r\n  justify-content: center; /* Horizontally center the child */\r\n  align-items: center; /* Vertically center the child */\r\n}\r\n\r\n/* ==========================================\r\n   Rotating Rainbow Glow Effect (Outer Layer)\r\n   ========================================== */\r\n.glow {\r\n  position: absolute;\r\n  top: -12px;\r\n  left: -12px;\r\n  width: calc(100% + 24px); /* Expand beyond the container */\r\n  height: calc(100% + 24px);\r\n  border-radius: 50%; /* Keep it circular */\r\n  /* Rainbow gradient effect */\r\n  background: conic-gradient(red, orange, yellow, green, blue, purple, red);\r\n  filter: blur(12px); /* Soft blur for glow effect */\r\n  animation: spin 4s linear infinite; /* Infinite spinning animation */\r\n  z-index: 1; /* Positioned below the placeholder */\r\n}\r\n\r\n/* =====================================\r\n   Placeholder Circle (Simulated Avatar)\r\n   ===================================== */\r\n.placeholder {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 50%; /* Circular shape */\r\n  background-color: #ef9c9c; /* Default inner fill (can be replaced) */\r\n  position: relative;\r\n  z-index: 2; /* Layered above the glow */\r\n}\r\n\r\n/* ======================\r\n   Keyframe: Spin Motion\r\n   ====================== */\r\n@keyframes spin {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n",
    githubUrl:
      "https://github.com/funcReveal/effects-gallery/tree/main/static-effects/animated-border",
    TSXName: "AnimatedBorder.tsx",
    CSSName: "AnimatedBorder.module.css",
  },
  "heart-tree": {
    tsxCode:
      'import React from "react";\r\nimport styles from "./HeartTree.module.css";\r\n\r\nconst HeartTree = () => {\r\n    return (\r\n        <div className={styles.container}>\r\n            <div className={styles.tree}>\r\n                <div className={styles.trunk}></div>\r\n            </div>\r\n            {[...Array(20)].map((_, i) => (\r\n                <div\r\n                    key={i}\r\n                    className={styles.heart}\r\n                    style={{\r\n                        left: `${Math.random() * 100}%`,\r\n                        animationDelay: `${Math.random() * 5}s`,\r\n                        animationDuration: `${3 + Math.random() * 2}s`,\r\n                    }}\r\n                />\r\n            ))}\r\n        </div>\r\n    );\r\n\r\n}\r\nexport default HeartTree;\r\n',
    cssCode:
      '.container {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 400px;\r\n  background: linear-gradient(to top, #fce4ec, #ffffff);\r\n  overflow: hidden;\r\n}\r\n\r\n.tree {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  width: 40px;\r\n  height: 100px;\r\n  overflow: visible; /* ← 加這個 */\r\n}\r\n\r\n.trunk {\r\n  width: 20px;\r\n  height: 100%;\r\n  background: #8b5e3c;\r\n  margin: 0 auto;\r\n  border-radius: 5px;\r\n}\r\n\r\n.heart {\r\n  position: absolute;\r\n  top: -20px; /* 讓愛心從容器上方開始出現 */\r\n  width: 20px;\r\n  height: 20px;\r\n  background-color: #ff6b81;\r\n  transform: rotate(45deg);\r\n  animation-name: fall;\r\n  animation-timing-function: linear;\r\n  animation-iteration-count: infinite;\r\n  opacity: 0.9;\r\n  border: 1px solid black;\r\n  z-index: 10;\r\n}\r\n\r\n.heart::before,\r\n.heart::after {\r\n  content: "";\r\n  position: absolute;\r\n  width: 20px;\r\n  height: 20px;\r\n  background-color: #ff6b81;\r\n  border-radius: 50%;\r\n}\r\n\r\n.heart::before {\r\n  top: -10px;\r\n  left: 0;\r\n}\r\n\r\n.heart::after {\r\n  left: -10px;\r\n  top: 0;\r\n}\r\n\r\n@keyframes fall {\r\n  0% {\r\n    transform: translateY(-20px) rotate(45deg);\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    transform: translateY(400px) rotate(45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n',
    githubUrl:
      "https://github.com/funcReveal/effects-gallery/tree/main/static-effects/heart-tree",
    TSXName: "HeartTree.tsx",
    CSSName: "HeartTree.module.css",
  },
  "breathing-light": {
    tsxCode:
      "import React from 'react';\r\nimport styles from './BreathingLight.module.css';\r\n\r\ninterface BreathingLightProps {\r\n    /** Diameter in px (default 24) */\r\n    size?: number;\r\n    /** Base glow color (default #00e5ff) */\r\n    color?: string;\r\n    /** Breathing cycle in seconds (default 3) */\r\n    duration?: number;\r\n}\r\n\r\nconst BreathingLight: React.FC<BreathingLightProps> = ({\r\n    size = 24,\r\n    color = '#00e5ff',\r\n    duration = 3,\r\n}) => {\r\n    // Pass CSS variables to the style prop.\r\n    const style: React.CSSProperties & Record<string, string> = {\r\n        '--size': `${size}px`,\r\n        '--color': color,\r\n        '--duration': `${duration}s`,\r\n    };\r\n    return <span className={styles.breathingLight} style={style} />;\r\n};\r\n\r\nexport default BreathingLight;",
    cssCode:
      ".breathingLight {\r\n  /* Default CSS variables (override via inline style) */\r\n  --size: 24px; /* Diameter of the circle */\r\n  --color: #00e5ff; /* Base glow color */\r\n  --duration: 3s; /* One breathing cycle */\r\n\r\n  width: var(--size);\r\n  height: var(--size);\r\n  background: var(--color);\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  box-shadow: 0 0 8px currentColor;\r\n  animation: breathing var(--duration) ease-in-out infinite;\r\n}\r\n\r\n@keyframes breathing {\r\n  0%,\r\n  100% {\r\n    transform: scale(0.9);\r\n    opacity: 0.6;\r\n    box-shadow: 0 0 6px currentColor, 0 0 12px currentColor;\r\n  }\r\n  50% {\r\n    transform: scale(1.2);\r\n    opacity: 1;\r\n    box-shadow: 0 0 12px currentColor, 0 0 24px currentColor;\r\n  }\r\n}\r\n",
    githubUrl:
      "https://github.com/funcReveal/effects-gallery/tree/main/static-effects/breathing-light",
    TSXName: "BreathingLight.tsx",
    CSSName: "BreathingLight.module.css",
  },
  "heart-tree-click": {
    tsxCode:
      'import React, { useState } from "react";\r\nimport styles from "./HeartTreeClick.module.css";\r\n\r\ninterface Heart {\r\n    id: number;\r\n    left: number;\r\n    delay: number;\r\n    duration: number;\r\n}\r\n\r\nconst HeartTree = () => {\r\n    const [hearts, setHearts] = useState<Heart[]>([]);\r\n\r\n    const addHeart = () => {\r\n        const newHeart: Heart = {\r\n            id: Date.now(),\r\n            left: Math.random() * 100,\r\n            delay: Math.random() * 0.5,\r\n            duration: 2 + Math.random() * 2,\r\n        };\r\n        setHearts((prev) => [...prev, newHeart]);\r\n    };\r\n\r\n    return (\r\n        <div className={styles.container} onClick={addHeart}>\r\n            <div className={styles.tree}>\r\n                <div className={styles.trunk}></div>\r\n            </div>\r\n            {hearts.map((heart) => (\r\n                <div\r\n                    key={heart.id}\r\n                    className={styles.heart}\r\n                    style={{\r\n                        left: `${heart.left}%`,\r\n                        animationDelay: `${heart.delay}s`,\r\n                        animationDuration: `${heart.duration}s`,\r\n                    }}\r\n                />\r\n            ))}\r\n        </div>\r\n    );\r\n};\r\n\r\nexport default HeartTree;\r\n',
    cssCode:
      '.container {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 500px;\r\n  background: linear-gradient(to top, #fce4ec, #ffffff);\r\n  overflow: hidden;\r\n  cursor: pointer;\r\n}\r\n\r\n.tree {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  width: 40px;\r\n  height: 100px;\r\n}\r\n\r\n.trunk {\r\n  width: 20px;\r\n  height: 100%;\r\n  background: #8b5e3c;\r\n  margin: 0 auto;\r\n  border-radius: 5px;\r\n}\r\n\r\n.heart {\r\n  position: absolute;\r\n  top: -20px;\r\n  width: 20px;\r\n  height: 20px;\r\n  background-color: #ff6b81;\r\n  transform: rotate(45deg);\r\n  animation-name: fall;\r\n  animation-timing-function: ease-in;\r\n  animation-iteration-count: 1;\r\n  opacity: 0.9;\r\n}\r\n\r\n.heart::before,\r\n.heart::after {\r\n  content: "";\r\n  position: absolute;\r\n  width: 20px;\r\n  height: 20px;\r\n  background-color: #ff6b81;\r\n  border-radius: 50%;\r\n}\r\n\r\n.heart::before {\r\n  top: -10px;\r\n  left: 0;\r\n}\r\n\r\n.heart::after {\r\n  left: -10px;\r\n  top: 0;\r\n}\r\n\r\n@keyframes fall {\r\n  0% {\r\n    transform: translateY(0) rotate(45deg);\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    transform: translateY(500px) rotate(45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n',
    githubUrl:
      "https://github.com/funcReveal/effects-gallery/tree/main/static-effects/heart-tree-click",
    TSXName: "HeartTreeClick.tsx",
    CSSName: "HeartTreeClick.module.css",
  },
  "glow-button": {
    tsxCode:
      "import React from 'react';\r\nimport styles from './GlowButton.module.css'; // You can also use styled-components or Emotion\r\n\r\n/**\r\n * GlowButton Component\r\n * ---------------------\r\n * A button with a glowing hover effect using CSS animation.\r\n * Suitable for call-to-action or interactive UI elements.\r\n */\r\nconst GlowButton = () => {\r\n    return (\r\n        <button className={styles.glowButton}>\r\n            Hover Me\r\n        </button>\r\n    );\r\n};\r\n\r\nexport default GlowButton;\r\n",
    cssCode:
      "/* =============================\r\n   Glowing Button with Hover Effect\r\n   ============================= */\r\n.glowButton {\r\n  padding: 1rem 2rem; /* Inner spacing */\r\n  font-size: 1rem; /* Text size */\r\n  border: none; /* Remove default border */\r\n  background: #111; /* Dark background */\r\n  color: white; /* Text color */\r\n  cursor: pointer; /* Show pointer on hover */\r\n  position: relative;\r\n  border-radius: 8px; /* Rounded corners */\r\n\r\n  /* Initial glow effect (both outer and inner) */\r\n  box-shadow: 0 0 10px #00f, /* Outer glow */ 0 0 20px #00f inset; /* Inner glow */\r\n\r\n  transition: box-shadow 0.3s ease; /* Smooth transition on hover */\r\n}\r\n\r\n/* =============================\r\n   Stronger glow on hover\r\n   ============================= */\r\n.glowButton:hover {\r\n  box-shadow: 0 0 20px #0ff, /* Stronger outer glow */ 0 0 30px #0ff inset; /* Stronger inner glow */\r\n}\r\n",
    githubUrl:
      "https://github.com/funcReveal/effects-gallery/tree/main/undefined-effects/glow-button",
    TSXName: "GlowButton.tsx",
    CSSName: "GlowButton.module.css",
  },
};
