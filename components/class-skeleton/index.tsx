import { View } from 'react-native'

import { styles } from './styles/index'

export function ClassSkeleton() {
  return (
    <View style={styles.container}>
      {/* Class Header Skeleton */}
      <View style={styles.header}>
        <View style={styles.titleSkeleton} />
        <View style={styles.instructorSkeleton} />
      </View>

      {/* Class Info Skeleton */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <View style={styles.infoLabelSkeleton} />
          <View style={styles.timeContainerSkeleton} />
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoLabelSkeleton} />
          <View style={styles.studentCountSkeleton} />
        </View>
      </View>
    </View>
  )
}
