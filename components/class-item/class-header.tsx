import { Feather } from '@expo/vector-icons'
import { Text, View } from 'react-native'

import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassHeader({ item }: ClassItemProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{item.title || 'Jiu-Jitsu Fundamental'}</Text>
      <Text style={styles.instructor}>
        <Feather name="user" size={10} color="#555555" />{' '}
        {item.instructor || 'Sensei Ricardo'}
      </Text>
    </View>
  )
}
