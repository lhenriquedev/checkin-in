import { StyleSheet, View } from 'react-native'

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  titleSkeleton: {
    height: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    width: '75%',
    marginBottom: 8,
  },
  instructorSkeleton: {
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    width: '50%',
  },
  timeSkeleton: {
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    width: 64,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  infoSkeleton: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    width: '66%',
  },
  progressSkeleton: {
    marginTop: 8,
    backgroundColor: '#e5e7eb',
    height: 8,
    borderRadius: 4,
  },
  enrollmentSkeleton: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    width: '25%',
    marginTop: 4,
  },
})
