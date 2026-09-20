/**
 * Design tokens ported from the web app's `src/app/globals.css`.
 *
 * The site defines its palette as CSS custom properties that flip on a `.dark`
 * class. React Native has no cascade, so the same two ramps live here as plain
 * objects and `useTheme()` picks one from the device colour scheme.
 */
import { useColorScheme } from 'react-native';

export type Palette = {
  bg: string;
  surface: string;
  border: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  onAccent: string;
  grid: string;
  status: Record<'good' | 'warning' | 'serious' | 'critical', string>;
};

const status = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
};

export const light: Palette = {
  bg: '#f7f5fb',
  surface: '#ffffff',
  border: '#e6e1f2',
  fg: '#140f22',
  muted: '#55506b',
  accent: '#7c3aed',
  accent2: '#0891b2',
  onAccent: '#ffffff',
  grid: '#e1e0d9',
  status,
};

export const dark: Palette = {
  bg: '#08060f',
  surface: '#161028',
  border: '#2a2145',
  fg: '#ece9f5',
  muted: '#a29ab8',
  accent: '#a78bfa',
  accent2: '#22d3ee',
  onAccent: '#0f091e',
  grid: '#2c2c2a',
  status,
};

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme !== 'light';
  return { colors: isDark ? dark : light, isDark };
}

/** Type scale and spacing, kept in one place so screens stay consistent. */
export const type = {
  display: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.8 },
  h1: { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.4 },
  h2: { fontSize: 18, fontWeight: '700' as const, letterSpacing: -0.2 },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  small: { fontSize: 13, fontWeight: '500' as const },
  mono: { fontSize: 13, fontFamily: 'monospace' as const },
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
