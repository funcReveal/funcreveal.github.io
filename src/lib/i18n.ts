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
