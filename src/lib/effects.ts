export const effects = [
  {
    slug: "shimmer",
    titles: {
      en: "Shimmer Effect",
      "zh-TW": "閃爍特效",
      "zh-CN": "闪烁特效",
    },
    descriptions: {
      en: "A subtle shimmer animation.",
      "zh-TW": "細緻的閃爍動畫。",
      "zh-CN": "细致的闪烁动画。",
    },
    createdTime: {
      time: 20250502235024,
      year: 2025,
      month: 5,
      day: 2,
      hour: 23,
      minute: 50,
      second: 24,
    },
    type: "static",
  },
  {
    slug: "glow",
    titles: {
      en: "Glow Effect",
      "zh-TW": "光暈特效",
      "zh-CN": "光晕特效",
    },
    descriptions: {
      en: "A subtle shimmer animation.",
      "zh-TW": "細緻的閃爍動畫。",
      "zh-CN": "细致的闪烁动画。",
    },
    createdTime: {
      time: 20250502235224,
      year: 2025,
      month: 5,
      day: 2,
      hour: 23,
      minute: 52,
      second: 24,
    },
    type: "static",
  },
  {
    slug: "glow-button",
    titles: {
      en: "Glow Button",
      "zh-TW": "會發光的按鈕",
      "zh-CN": "会发光的按钮",
    },
    descriptions: {
      en: "A glowing button on hover.",
      "zh-TW": "懸停時會發光的按鈕。",
      "zh-CN": "悬停时会发光的按钮。",
    },
    component: "GlowButton",
    createdTime: {
      time: 20250502235624,
      year: 2025,
      month: 5,
      day: 2,
      hour: 23,
      minute: 56,
      second: 24,
    },
    type: "interactive",
  },
  {
    slug: "animated-border",
    titles: {
      en: "Animated Border",
      "zh-TW": "動態邊框特效",
      "zh-CN": "动态边框特效",
    },
    descriptions: {
      en: "A border effect that can be placed around circular objects.",
      "zh-TW": "可圍繞在圓形物體的邊框特效。",
      "zh-CN": "可围绕在圆形物体的边框特效。",
    },
    component: "AnimatedBorder",
    createdTime: {
      time: 20250506235624,
      year: 2025,
      month: 5,
      day: 6,
      hour: 23,
      minute: 56,
      second: 24,
    },
    type: "static",
  },
  {
    slug: "breathing-light",
    titles: {
      en: "Breathing Light",
      "zh-TW": "呼吸燈樣式",
      "zh-CN": "呼吸灯样式",
    },
    descriptions: {
      en: "A breathing‑light style glow effect you can wrap around circular elements.",
      "zh-TW": "呼吸燈樣式的發光邊框效果，可圍繞於圓形元素。",
      "zh-CN": "呼吸灯样式的发光边框效果，可围绕于圆形元素。",
    },
    component: "BreathingLight",
    createdTime: {
      time: 20250506235624,
      year: 2025,
      month: 5,
      day: 6,
      hour: 23,
      minute: 56,
      second: 24,
    },
    type: "static",
  },
  {
    slug: "falling-particles",
    titles: {
      en: "Falling Particles",
      "zh-TW": "粒子掉落特效",
      "zh-CN": "粒子掉落特效",
    },
    descriptions: {
      en: "A customizable animation that simulates falling particles such as hearts, leaves, raindrops, and more using HTML canvas.",
      "zh-TW":
        "可自訂的動畫效果，使用 Canvas 模擬愛心、楓葉、雨滴等粒子從畫面上方掉落的視覺特效。",
      "zh-CN":
        "可自定义的动画效果，使用 Canvas 模拟爱心、枫叶、雨滴等粒子从画面上方掉落的视觉特效。",
    },
    component: "FallingParticles",
    createdTime: {
      time: 20250509175545,
      year: 2025,
      month: 5,
      day: 9,
      hour: 17,
      minute: 55,
      second: 45,
    },
    type: "static",
  },
];

export const effectsMap = new Map(effects.map((v) => [v.slug, v]));
