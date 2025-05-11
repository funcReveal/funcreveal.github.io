import fs from "fs";
import path from "path";
import fg from "fast-glob";

// ----------------------- 基本設定 -----------------------

const EFFECTS_DIR = "src/components/effects";
const EFFECTS_FILE = "src/lib/effects.ts";
const SOURCES_FILE = "src/lib/effectSources.ts";

interface CreatedTime {
  time: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

interface Effect {
  slug: string;
  titles: { en: string };
  descriptions: { en: string, "zh-TW": string, "zh-CN": string };
  component: string;
  createdTime: CreatedTime;
  type: string;
  category: string;
}

interface EffectSource {
  tsxCode: string;
  cssCode: string;
  githubUrl: string;
  TSXName: string;
  CSSName: string;
}

// ----------------------- 工具函式 -----------------------

function toKebabCase(input: string): string {
  return input.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function generateTitle(componentName: string): string {
  return componentName.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}

function generateCreatedTime(): CreatedTime {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    time: parseInt(
      `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(
        now.getHours()
      )}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    ),
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };
}

function escapeForTemplateLiteral(str: string): string {
  return (
    str
      .replace(/\\/g, "\\\\")
      // .replace(/`/g, "\\`")
      .replace(/\$\{/g, "${")
  );
}

function findCss(file: string): string | null {
  const dir = path.dirname(file);
  const baseName = path.basename(file, ".tsx");
  const try1 = path.join(dir, `${baseName}.module.css`);
  const try2 = path.join(dir, `${baseName}.css`);
  return fs.existsSync(try1) ? try1 : fs.existsSync(try2) ? try2 : null;
}

function loadExistingEffects(): Effect[] {
  if (!fs.existsSync(EFFECTS_FILE)) return [];

  const raw = fs.readFileSync(EFFECTS_FILE, "utf8");
  const match = raw.match(/export const effects = (\[[\s\S]*?\]);?/);
  if (!match) return [];

  try {
    // 用 Function 包裝比 eval 安全一點（仍有限）
    return Function(`return ${match[1]}`)();
  } catch {
    return [];
  }
}

// ----------------------- 主流程 -----------------------

async function main() {
  const files = await fg("**/*.tsx", { cwd: EFFECTS_DIR, absolute: true });
  const existing = loadExistingEffects();
  const effectBySlug = new Map(existing.map((e) => [e.slug, e]));
  const effectByComponent = new Map(existing.map((e) => [e.component, e]));
  const updatedEffects: Effect[] = [...existing];
  const effectSources: Record<string, EffectSource> = {};

  const effectsMap = "export const effectsMap = new Map(effects.map((v) => [v.slug, v]));";

  for (const tsxPath of files) {
    const tsxCode = fs.readFileSync(tsxPath, "utf8");
    const cssPath = findCss(tsxPath);
    const cssCode = cssPath ? fs.readFileSync(cssPath, "utf8") : "";

    const component = path.basename(tsxPath, ".tsx");
    const slug = toKebabCase(component);
    const TSXName = path.basename(tsxPath);
    const CSSName = cssPath ? path.basename(cssPath) : "";

    // 找舊的 metadata 或新建
    let effect = effectBySlug.get(slug) || effectByComponent.get(component);

    if (!effect) {
      effect = {
        slug,
        titles: { en: generateTitle(component) },
        descriptions: { en: "", "zh-TW": "", "zh-CN": "" },
        component,
        createdTime: generateCreatedTime(),
        type: "static",
        category: "",
      };
      updatedEffects.push(effect);
    }

    const githubUrl = `https://github.com/funcReveal/effects-gallery/tree/main/${effect.type}-effects/${slug}`;

    effectSources[slug] = {
      tsxCode: escapeForTemplateLiteral(tsxCode),
      cssCode: escapeForTemplateLiteral(cssCode),
      githubUrl,
      TSXName,
      CSSName,
    };
  }

  // 寫入 effects.ts
  const effectsString =
    "export const effects = " + JSON.stringify(updatedEffects, null, 2) + ";\n\n" + effectsMap;
  fs.writeFileSync(EFFECTS_FILE, effectsString, "utf8");

  // 寫入 effectSources.ts
  const sourcesString = `/**
 * 🚀 Auto-generated. Do not edit manually.
 */
export interface EffectSource {
  tsxCode: string;
  cssCode: string;
  githubUrl: string;
  TSXName: string;
  CSSName: string;
}

export const effectSources: Record<string, EffectSource> = ${JSON.stringify(
    effectSources,
    null,
    2
  )};
`;
  fs.writeFileSync(SOURCES_FILE, sourcesString, "utf8");

  console.log("✅ 已更新 effects.ts 與 effectSources.ts");
}

main().catch(console.error);
