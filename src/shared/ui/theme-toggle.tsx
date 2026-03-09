import type { ReactElement } from "react";

import type { Theme } from "@/shared/model/stores/theme-store";
import { useThemeStore } from "@/shared/model/stores/theme-store";

const THEMES: Theme[] = ["light", "dark", "system"];

const THEME_LABEL_MAP: Record<Theme, string> = {
  light: "라이트",
  dark: "다크",
  system: "시스템",
};

export function ThemeToggle(): ReactElement {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="inline-flex items-center gap-1 rounded-sm border border-(--color-border-default) bg-(--color-bg-surface) p-1">
      {THEMES.map((item) => (
        <button
          key={item}
          type="button"
          className={`rounded-sm px-2 py-1 text-xs transition-colors ${
            theme === item
              ? "bg-(--color-cta) text-(--color-on-accent)"
              : "text-(--color-text-secondary) hover:bg-(--color-bg-page)"
          }`}
          onClick={() => {
            setTheme(item);
          }}
        >
          {THEME_LABEL_MAP[item]}
        </button>
      ))}
    </div>
  );
}
