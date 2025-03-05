import { Platform } from 'react-native'

export const TabBarTheme = {
  // Colors
  primaryColor: '#000000',
  activeColor: '#000',
  inactiveColor: '#808080',
  backgroundColor: '#fff',
  borderColor: '#e5e7eb',

  // Dimensions
  height: Platform.OS === 'ios' ? 88 : 64,
  paddingBottom: Platform.OS === 'ios' ? 24 : 0,
  position: 'relative',
  centerButtonSize: 60,
  centerButtonRadius: 100,
  iconSize: {
    regular: 24,
    center: 22,
  },

  // Typography
  fontSize: 12,
  fontWeight: '500' as const,
}
