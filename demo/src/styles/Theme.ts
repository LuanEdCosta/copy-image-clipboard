export interface AppTheme {
  id: string
  background: string
  snow: string
  primaryText: string
  secondaryText: string
  accent: string
  accentDark: string
  border: string
  placeholder: string
  disabled: string
  hover: string
}

export const LIGHT_THEME: AppTheme = {
  id: 'light',
  background: '#ffffff',
  snow: '#f2f2f2',
  primaryText: '#464646',
  secondaryText: '#737373',
  accent: '#D7DF36',
  accentDark: '#d3dd22',
  border: '#d9d9d9',
  placeholder: 'rgba(0, 0, 0, 0.7)',
  disabled: '#cccccc',
  hover: 'rgba(0, 0, 0, 0.1)',
}
