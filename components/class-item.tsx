import { Feather } from '@expo/vector-icons'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Class } from '@/types/class'

interface ClassItemProps {
  item: Class
  onPress?: (classItem: Class) => void
}

export function ClassItem({ item, onPress }: ClassItemProps) {
  // Calculate enrollment percentage for progress bar
  const enrollmentPercentage = (item.enrolled / item.capacity) * 100

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/60' }}
            style={styles.classImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.title || 'Jiu-Jitsu Fundamental'}
          </Text>
          <Text style={styles.instructor}>
            <Feather name="user" size={12} color="#555555" />{' '}
            {item.instructor || 'Sensei Ricardo'}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Horário</Text>
          <View style={styles.timeContainer}>
            <Feather
              name="clock"
              size={14}
              color="#000000"
              style={styles.icon}
            />
            <Text style={styles.time}>{item.time || '19:00 - 20:30'}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Alunos</Text>
          <Text style={styles.studentCount}>
            <Feather
              name="users"
              size={14}
              color="#000000"
              style={styles.icon}
            />
            {item.enrolled}/{item.capacity}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[styles.progressBar, { width: `${enrollmentPercentage}%` }]}
        />
      </View>

      <Text style={styles.enrollmentText}>
        {item.enrolled}/{item.capacity} faixas no tatame
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => onPress?.(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.detailsButtonText}>Ver detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkinButton}
          onPress={() => onPress?.(item)}
          activeOpacity={0.7}
        >
          <Feather
            name="check-circle"
            size={16}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.checkinButtonText}>Check-in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  classImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  instructor: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 6,
    fontWeight: '500',
  },
  icon: {
    marginRight: 4,
  },
  timeContainer: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  studentCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 8,
    backgroundColor: '#f5f5f5',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  progressBarLow: {
    backgroundColor: '#10b981', // green
  },
  progressBarMedium: {
    backgroundColor: '#f59e0b', // amber
  },
  progressBarHigh: {
    backgroundColor: '#ef4444', // red
  },
  enrollmentText: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailsButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailsButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
  },
  checkinButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkinButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonIcon: {
    marginRight: 6,
  },
})
