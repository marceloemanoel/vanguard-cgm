import { z } from "zod";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const SYSTEM_COLOR_SCHEME = "system" as const;
export const DARK_COLOR_SCHEME = "dark" as const;
export const LIGHT_COLOR_SCHEME = "light" as const;

export const DEFAULT_COLOR = "default" as const;
export const ORANGE_COLOR = "orange" as const;
export const YELLOW_COLOR = "yellow" as const;
export const GREEN_COLOR = "green" as const;
export const BLUE_COLOR = "blue" as const;

export const COLOR_SCHEMES = [
  DARK_COLOR_SCHEME,
  LIGHT_COLOR_SCHEME,
  SYSTEM_COLOR_SCHEME,
] as const;

export const COLORS = [
  DEFAULT_COLOR,
  BLUE_COLOR,
  ORANGE_COLOR,
  YELLOW_COLOR,
  GREEN_COLOR,
] as const;

const ThemeSchema = z.object({
  colorScheme: z.enum(COLOR_SCHEMES),
  color: z.enum(COLORS),
});
export type Theme = z.infer<typeof ThemeSchema>;

export type ColorScheme = Theme["colorScheme"];
export type ThemeColor = Theme["color"];

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export const systemDefaultTheme: Theme = {
  colorScheme: SYSTEM_COLOR_SCHEME,
  color: DEFAULT_COLOR,
};

const initialState: ThemeProviderState = {
  theme: systemDefaultTheme,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

type ThemeProviderProps = {
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = systemDefaultTheme,
  storageKey = "ui-theme",
  ...props
}: PropsWithChildren<ThemeProviderProps>) {
  const [theme, setTheme] = useState<Theme>(() => {
    const existingTheme = localStorage.getItem(storageKey);

    const parseResult = ThemeSchema.safeParse(
      existingTheme ? JSON.parse(existingTheme) : undefined,
    );

    return parseResult.success ? parseResult.data : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(...COLOR_SCHEMES, ...COLORS);

    root.classList.add(theme.color);

    if (theme.colorScheme === SYSTEM_COLOR_SCHEME) {
      const systemsColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? DARK_COLOR_SCHEME
        : LIGHT_COLOR_SCHEME;

      root.classList.add(systemsColorScheme);
      return;
    }

    root.classList.add(theme.colorScheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, JSON.stringify(theme));
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
