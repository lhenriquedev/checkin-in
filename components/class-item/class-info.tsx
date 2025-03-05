import { Feather } from '@expo/vector-icons'
import { Text, View } from 'react-native'

import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassInfo({ item }: ClassItemProps) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Horário</Text>
        <View style={styles.timeContainer}>
          <Feather name="clock" size={12} color="#000000" style={styles.icon} />
          <Text style={styles.time}>{item.time || '19:00 - 20:30'}</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Alunos</Text>
        <Text style={styles.studentCount}>
          <Feather name="users" size={12} color="#000000" style={styles.icon} />
          {item.enrolled}/{item.capacity}
        </Text>
      </View>
    </View>
  )
}
