import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    marginRight: 12,
  },
  classImageSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flex: 1,
  },
  titleSkeleton: {
    height: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    width: '75%',
    marginBottom: 8,
  },
  instructorSkeleton: {
    height: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    width: '50%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'flex-start',
  },
  infoLabelSkeleton: {
    height: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    width: 60,
    marginBottom: 8,
  },
  timeContainerSkeleton: {
    height: 32,
    width: 110,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  studentCountSkeleton: {
    height: 32,
    width: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailsButtonSkeleton: {
    backgroundColor: '#f5f5f5',
    height: 40,
    flex: 1,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkinButtonSkeleton: {
    backgroundColor: '#f5f5f5',
    height: 40,
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
})
