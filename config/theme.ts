export type ThemeName = 'base' | 'site1' | 'site2';

export const getActiveTheme = (): ThemeName => {
  return (process.env.NEXT_PUBLIC_ACTIVE_THEME as ThemeName) || 'base';
};

export const getThemeComponent = async (componentName: string) => {
  const activeTheme = getActiveTheme();
  try {
    return await import(`../themes/${activeTheme}/${componentName}`);
  } catch {
    return await import(`../themes/base/${componentName}`);
  }
};