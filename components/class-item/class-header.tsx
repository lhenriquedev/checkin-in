import { Feather } from '@expo/vector-icons'
import { Image, Text, View } from 'react-native'

import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassHeader({ item }: ClassItemProps) {
  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image
          alt=""
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/60' }}
          style={styles.classImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {item.title || 'Jiu-Jitsu Fundamental'}
        </Text>
        <Text style={styles.instructor}>
          <Feather name="user" size={12} color="#555555" />{' '}
          {item.instructor || 'Sensei Ricardo'}
        </Text>
      </View>
    </View>
  )
}
