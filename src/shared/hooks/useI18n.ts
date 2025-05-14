import { useRouter } from "next/router";
import { detectLang, Lang } from "@/lib/i18n";
import { navLabels, fallingParticlesLabels } from "@/lib/i18n";

const namespaces = {
  nav: navLabels,
  falling: fallingParticlesLabels,
} as const;

export function useI18n() {
  const { asPath } = useRouter();
  const lang: Lang = detectLang(asPath);

  const t = (key: string): string => {
    const [ns, subkey] = key.split(".");
    const dict = namespaces[ns as keyof typeof namespaces]?.[lang];
    return dict?.[subkey] || key;
  };

  return { lang, t };
}
