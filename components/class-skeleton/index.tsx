import { View } from 'react-native'

import { styles } from './styles/index'

export function ClassSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSkeleton} />
          <View style={styles.instructorSkeleton} />
        </View>
        <View style={styles.timeSkeleton} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoSkeleton} />
      </View>

      <View style={styles.progressSkeleton} />
      <View style={styles.enrollmentSkeleton} />
    </View>
  )
}
