import { Text, View } from 'react-native'

import { styles } from './styles/index'
import { EmptyClassListProps } from './types'

export function EmptyClassList({ selectedDay }: EmptyClassListProps) {
  return (
    <View style={styles.emptyContainer}>
      {selectedDay && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{selectedDay}</Text>
        </View>
      )}
      <Text style={styles.emptyText}>Nenhuma aula encontrada</Text>
    </View>
  )
}
