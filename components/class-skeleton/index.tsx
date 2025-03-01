import { View } from 'react-native'

import { styles } from './styles/index'

export function ClassSkeleton() {
  return (
    <View style={styles.container}>
      {/* Class Header Skeleton */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <View style={styles.classImageSkeleton} />
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.titleSkeleton} />
          <View style={styles.instructorSkeleton} />
        </View>
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

      {/* Button Container Skeleton */}
      <View style={styles.buttonContainer}>
        <View style={styles.detailsButtonSkeleton} />
        <View style={styles.checkinButtonSkeleton} />
      </View>
    </View>
  )
}
