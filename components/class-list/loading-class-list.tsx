import { View } from 'react-native'

import { ClassSkeleton } from '../class-skeleton'

import { styles } from './styles/index'

export function LoadingClassList() {
  return (
    <View style={styles.container}>
      <ClassSkeleton />
      <ClassSkeleton />
      <ClassSkeleton />
    </View>
  )
}
