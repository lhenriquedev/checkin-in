import { View } from 'react-native'

import { ClassButtons } from './class-buttons'
import { ClassHeader } from './class-header'
import { ClassInfo } from './class-info'
import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassItem({ item, onCheckin, onDetails }: ClassItemProps) {
  return (
    <View style={styles.container}>
      <ClassHeader item={item} />
      <ClassInfo item={item} />
      <ClassButtons item={item} onCheckin={onCheckin} onDetails={onDetails} />
    </View>
  )
}
