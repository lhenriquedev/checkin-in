import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    // marginBottom: 16,
  },
  sectionCategories: {
    marginBottom: 24,
  },
  seeAllText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  horizontalListContent: {
    paddingRight: 16,
  },
  classCard: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  classCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  classTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  classDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  statusTextPending: {
    color: '#D97706',
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  instructorName: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  categoryCard: {
    width: 160,
    height: 100,
    borderRadius: 12,
    marginLeft: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  categoryGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
})
