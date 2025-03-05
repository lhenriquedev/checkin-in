import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import theme, { palette } from '../constants/theme'

interface ClassCardProps {
  title: string
  time: string
  date: string
  status: 'available' | 'full' | 'inProgress' | 'completed'
  onPress?: () => void
  onCheckIn?: () => void
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  time,
  date,
  status,
  onPress,
  onCheckIn,
}) => {
  // Configuração baseada no status
  const getStatusConfig = (status: ClassCardProps['status']) => {
    switch (status) {
      case 'available':
        return {
          color: palette.success.dark,
          backgroundColor: palette.success.background,
          label: 'Disponível',
        }
      case 'full':
        return {
          color: palette.error.dark,
          backgroundColor: palette.error.light,
          label: 'Lotada',
        }
      case 'inProgress':
        return {
          color: palette.warning.dark,
          backgroundColor: palette.warning.light,
          label: 'Em andamento',
        }
      case 'completed':
        return {
          color: palette.grey[600],
          backgroundColor: palette.grey[200],
          label: 'Concluída',
        }
      default:
        return {
          color: palette.grey[600],
          backgroundColor: palette.grey[200],
          label: 'Desconhecido',
        }
    }
  }

  const statusConfig = getStatusConfig(status)

  return (
    <TouchableOpacity
      style={styles.container as ViewStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.classTime as TextStyle}>{time}</Text>
          <Text style={styles.classDate as TextStyle}>{date}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.backgroundColor },
          ]}
        >
          <Text
            style={
              [styles.statusText, { color: statusConfig.color }] as TextStyle[]
            }
          >
            {statusConfig.label}
          </Text>
        </View>
      </View>

      <Text style={styles.classTitle as TextStyle}>{title}</Text>

      {status === 'available' && onCheckIn && (
        <TouchableOpacity
          style={styles.checkinButton as ViewStyle}
          onPress={onCheckIn}
          activeOpacity={0.7}
        >
          <Text style={styles.checkinButtonText as TextStyle}>Check-in</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.components.card.container,
    width: 250,
    marginHorizontal: theme.spacing['4'],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing['3'],
  },
  classTime: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
  },
  classDate: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing['0.5'],
  },
  statusBadge: {
    paddingHorizontal: theme.spacing['2'],
    paddingVertical: theme.spacing['0.5'],
    borderRadius: theme.borders.radii.md,
  },
  statusText: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
  },
  classTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing['3'],
  },
  checkinButton: {
    ...theme.components.button.primary,
    alignItems: 'center',
    marginTop: theme.spacing['2'],
  },
  checkinButtonText: {
    color: theme.colors.primary.contrastText,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
  },
})

export default ClassCard
