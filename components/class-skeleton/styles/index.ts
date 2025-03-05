import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    marginBottom: 12,
  },
  titleSkeleton: {
    height: 18,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    width: '75%',
    marginBottom: 6,
  },
  instructorSkeleton: {
    height: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    width: '50%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  infoItem: {
    alignItems: 'flex-start',
  },
  infoLabelSkeleton: {
    height: 13,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    width: 50,
    marginBottom: 6,
  },
  timeContainerSkeleton: {
    height: 26,
    width: 90,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  studentCountSkeleton: {
    height: 26,
    width: 70,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
})
