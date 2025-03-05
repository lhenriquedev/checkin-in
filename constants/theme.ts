import { TextStyle, ViewStyle } from 'react-native'

import Colors from './Colors'

// Paleta de cores expandida
export const palette = {
  primary: {
    main: '#3B82F6',
    light: '#93C5FD',
    dark: '#2563EB',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#10B981',
    light: '#6EE7B7',
    dark: '#059669',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#10B981',
    light: '#D1FAE5',
    dark: '#047857',
    contrastText: '#FFFFFF',
    background: '#E6F7ED',
  },
  error: {
    main: '#EF4444',
    light: '#FEE2E2',
    dark: '#B91C1C',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1D4ED8',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    disabled: '#9CA3AF',
    hint: '#6B7280',
  },
  background: {
    default: '#F9FAFB',
    paper: '#FFFFFF',
    card: '#FFFFFF',
  },
  divider: '#E5E7EB',
}

// Tipografia
export const typography = {
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 30,
    '5xl': 36,
  },
  fontWeights: {
    thin: '300' as TextStyle['fontWeight'],
    normal: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    extrabold: '800' as TextStyle['fontWeight'],
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}

// Espaçamento
export const spacing = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
}

// Bordas
export const borders = {
  radii: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    full: 9999,
  },
  width: {
    thin: 1,
    medium: 2,
    thick: 4,
  },
}

// Sombras
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  } as ViewStyle,
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  } as ViewStyle,
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  } as ViewStyle,
}

// Componentes comuns
export const components = {
  card: {
    container: {
      backgroundColor: palette.background.card,
      borderRadius: borders.radii.md,
      borderWidth: borders.width.thin,
      borderColor: palette.grey[200],
      padding: spacing['4'],
    } as ViewStyle,
    title: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
      color: palette.text.primary,
    } as TextStyle,
    subtitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
      color: palette.text.secondary,
    } as TextStyle,
  },
  button: {
    primary: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      paddingHorizontal: spacing['4'],
      paddingVertical: spacing['2'],
      borderRadius: borders.radii.md,
    } as ViewStyle,
    secondary: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.contrastText,
      paddingHorizontal: spacing['4'],
      paddingVertical: spacing['2'],
      borderRadius: borders.radii.md,
    } as ViewStyle,
    outline: {
      backgroundColor: 'transparent',
      borderWidth: borders.width.thin,
      borderColor: palette.primary.main,
      color: palette.primary.main,
      paddingHorizontal: spacing['4'],
      paddingVertical: spacing['2'],
      borderRadius: borders.radii.md,
    } as ViewStyle,
    text: {
      color: palette.primary.main,
      backgroundColor: 'transparent',
    } as TextStyle,
    disabled: {
      backgroundColor: palette.grey[200],
      color: palette.grey[500],
      paddingHorizontal: spacing['4'],
      paddingVertical: spacing['2'],
      borderRadius: borders.radii.md,
    } as ViewStyle,
  },
  badge: {
    success: {
      backgroundColor: palette.success.background,
      paddingHorizontal: spacing['2'],
      paddingVertical: spacing['0.5'],
      borderRadius: borders.radii.md,
      color: palette.success.dark,
    } as ViewStyle,
    error: {
      backgroundColor: palette.error.light,
      paddingHorizontal: spacing['2'],
      paddingVertical: spacing['0.5'],
      borderRadius: borders.radii.md,
      color: palette.error.dark,
    } as ViewStyle,
    warning: {
      backgroundColor: palette.warning.light,
      paddingHorizontal: spacing['2'],
      paddingVertical: spacing['0.5'],
      borderRadius: borders.radii.md,
      color: palette.warning.dark,
    } as ViewStyle,
    info: {
      backgroundColor: palette.info.light,
      paddingHorizontal: spacing['2'],
      paddingVertical: spacing['0.5'],
      borderRadius: borders.radii.md,
      color: palette.info.dark,
    } as ViewStyle,
  },
  input: {
    default: {
      borderWidth: borders.width.thin,
      borderColor: palette.grey[300],
      borderRadius: borders.radii.md,
      padding: spacing['3'],
      backgroundColor: palette.background.paper,
    } as ViewStyle,
    focus: {
      borderColor: palette.primary.main,
    } as ViewStyle,
    error: {
      borderColor: palette.error.main,
    } as ViewStyle,
    disabled: {
      backgroundColor: palette.grey[100],
      borderColor: palette.grey[200],
    } as ViewStyle,
  },
}

// Tema combinado
const theme = {
  colors: { ...Colors, ...palette },
  typography,
  spacing,
  borders,
  shadows,
  components,
  // Modo de cores (light/dark)
  mode: 'light',
}

export default theme
