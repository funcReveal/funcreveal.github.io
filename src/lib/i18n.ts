export const supportedLanguages = ["en", "zh-TW", "zh-CN"] as const;
export type Lang = (typeof supportedLanguages)[number];

export const defaultLang: Lang = "en";

export const detectLang = (path: string): Lang => {
  if (path.startsWith("/zh-TW")) return "zh-TW";
  if (path.startsWith("/zh-CN")) return "zh-CN";
  return "en";
};

export const navLabels: Record<Lang, Record<string, string>> = {
  en: {
    effects: "Effects",
    notes: "Notes",
  },
  "zh-TW": {
    effects: "特效",
    notes: "筆記",
  },
  "zh-CN": {
    effects: "特效",
    notes: "笔记",
  },
};

export const fallingParticlesLabels: Record<Lang, Record<string, string>> = {
  en: {
    carnation: "Carnation",
    rain: "Rain",
    maple: "Maple",
    bubble: "Bubble",
    snow: "Snow",
    snowflake: "Snowflake",
    heart: "Heart",
    all: "All",
    type: "Type",
    background: "Background",
    overlayText: "Overlay Text",
    count: "Count:",
    opacity: "Opacity:",
    driftAmount: "Drift Amount:",
    rotateSwing: "Rotate Swing (±°):",
    rotateSpeed: "Rotate Speed:",
    sizeRange: "Size Range:",
    speedRange: "Speed Range:",
    rotate: "Rotate",
    drift: "Drift",
    tiltWithDrift: "Tilt with Drift",
  },
  "zh-TW": {
    carnation: "康乃馨",
    rain: "雨",
    maple: "楓葉",
    bubble: "泡泡",
    snow: "雪",
    snowflake: "雪花",
    heart: "心形",
    all: "全部",
    type: "類型",
    background: "背景",
    overlayText: "覆蓋文字",
    count: "數量：",
    opacity: "透明度：",
    driftAmount: "飄移量：",
    rotateSwing: "旋轉幅度 (±°)：",
    rotateSpeed: "旋轉速度：",
    sizeRange: "大小範圍：",
    speedRange: "速度範圍：",
    rotate: "旋轉",
    drift: "飄移",
    tiltWithDrift: "根據飄移傾斜",
  },
  "zh-CN": {
    carnation: "康乃馨",
    rain: "雨",
    maple: "枫叶",
    bubble: "泡泡",
    snow: "雪",
    snowflake: "雪花",
    heart: "心形",
    all: "全部",
    type: "类型",
    background: "背景",
    overlayText: "覆盖文字",
    count: "数量：",
    opacity: "透明度：",
    driftAmount: "漂移量：",
    rotateSwing: "旋转幅度 (±°)：",
    rotateSpeed: "旋转速度：",
    sizeRange: "大小范围：",
    speedRange: "速度范围：",
    rotate: "旋转",
    drift: "漂移",
    tiltWithDrift: "随漂移倾斜",
  },
};
