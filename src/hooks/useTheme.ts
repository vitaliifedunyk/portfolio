import { useThemeContext } from '../context/useThemeContext';

export function useTheme() {
  const { theme, toggleTheme } = useThemeContext();
  return { theme, toggleTheme };
}
