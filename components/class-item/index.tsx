import { TouchableOpacity } from 'react-native'

import { ClassHeader } from './class-header'
import { ClassInfo } from './class-info'
import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassItem({ item, onDetails }: ClassItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onDetails?.(item)}
      activeOpacity={0.7}
    >
      <ClassHeader item={item} />
      <ClassInfo item={item} />
    </TouchableOpacity>
  )
}
