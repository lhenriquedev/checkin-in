import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import theme, {
  components,
  palette,
  spacing,
  typography,
} from '../constants/theme'

/**
 * Componente de exemplo que demonstra como usar o sistema de tema
 */
const ThemeExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemplo de Tema</Text>

      {/* Demonstração de cores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cores Primárias</Text>
        <View style={styles.colorRow}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: palette.primary.main } as ViewStyle,
            ]}
          >
            <Text style={styles.colorText}>Principal</Text>
          </View>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: palette.primary.light } as ViewStyle,
            ]}
          >
            <Text style={styles.colorText}>Clara</Text>
          </View>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: palette.primary.dark } as ViewStyle,
            ]}
          >
            <Text style={styles.colorText}>Escura</Text>
          </View>
        </View>
      </View>

      {/* Demonstração de tipografia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipografia</Text>
        <Text style={{ fontSize: typography.fontSizes.xs } as TextStyle}>
          Extra Pequeno (XS)
        </Text>
        <Text style={{ fontSize: typography.fontSizes.sm } as TextStyle}>
          Pequeno (SM)
        </Text>
        <Text style={{ fontSize: typography.fontSizes.md } as TextStyle}>
          Médio (MD)
        </Text>
        <Text style={{ fontSize: typography.fontSizes.lg } as TextStyle}>
          Grande (LG)
        </Text>
        <Text style={{ fontSize: typography.fontSizes.xl } as TextStyle}>
          Extra Grande (XL)
        </Text>
      </View>

      {/* Demonstração de componentes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Componentes</Text>

        {/* Cards */}
        <View style={components.card.container as ViewStyle}>
          <Text style={components.card.title as TextStyle}>
            Título do Cartão
          </Text>
          <Text style={components.card.subtitle as TextStyle}>
            Subtítulo do cartão
          </Text>
          <Text style={{ marginTop: spacing['2'] } as TextStyle}>
            Conteúdo do cartão usando margens do tema.
          </Text>
        </View>

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={components.button.primary as ViewStyle}>
            <Text style={{ color: palette.primary.contrastText } as TextStyle}>
              Primário
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={components.button.secondary as ViewStyle}>
            <Text
              style={{ color: palette.secondary.contrastText } as TextStyle}
            >
              Secundário
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={components.button.outline as ViewStyle}>
            <Text style={{ color: palette.primary.main } as TextStyle}>
              Contorno
            </Text>
          </TouchableOpacity>
        </View>

        {/* Badges */}
        <View style={styles.badgeRow}>
          <View style={components.badge.success as ViewStyle}>
            <Text style={{ color: palette.success.dark } as TextStyle}>
              Sucesso
            </Text>
          </View>

          <View style={components.badge.error as ViewStyle}>
            <Text style={{ color: palette.error.dark } as TextStyle}>Erro</Text>
          </View>

          <View style={components.badge.warning as ViewStyle}>
            <Text style={{ color: palette.warning.dark } as TextStyle}>
              Aviso
            </Text>
          </View>

          <View style={components.badge.info as ViewStyle}>
            <Text style={{ color: palette.info.dark } as TextStyle}>Info</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing['4'],
    backgroundColor: theme.colors.background.default,
  },
  title: {
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing['6'],
  },
  section: {
    marginBottom: theme.spacing['8'],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing['4'],
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borders.radii.md,
    ...theme.shadows.sm,
  },
  colorText: {
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeights.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing['4'],
    marginBottom: theme.spacing['4'],
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing['4'],
  },
})

export default ThemeExample
