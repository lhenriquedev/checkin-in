import { Feather } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassButtons({ item, onCheckin, onDetails }: ClassItemProps) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => onDetails?.(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.detailsButtonText}>Ver detalhes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.checkinButton,
          item.isCheckedIn && styles.isButtonDisabled,
        ]}
        onPress={() => onCheckin?.(item)}
        activeOpacity={0.7}
      >
        {item.isCheckedIn && (
          <Feather
            name="check-circle"
            size={16}
            color="#ffffff"
            style={styles.buttonIcon}
          />
        )}
        <Text style={styles.checkinButtonText}>Check-in</Text>
      </TouchableOpacity>
    </View>
  )
}
