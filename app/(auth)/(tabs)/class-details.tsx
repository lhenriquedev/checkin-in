import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Class } from '@/types/index'
import { getMockClassesForDate } from '@/utils/mockData'

// Interface para a aula com todas as propriedades necessárias
interface ClassWithDetails extends Class {
  date: string
  duration: string
  location: string
}

export default function ClassDetailsScreen() {
  const router = useRouter()
  // Obtém os parâmetros da rota
  const params = useLocalSearchParams<{
    classId?: string
    classDate?: string
  }>()

  const [selectedClass, setSelectedClass] = useState<ClassWithDetails | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        if (!params.classId || !params.classDate) {
          router.back()
          return
        }

        setIsLoading(true)
        const date = new Date(params.classDate)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const classesForDate = getMockClassesForDate(date)
        const foundClass = classesForDate.find((c) => c.id === params.classId)

        if (foundClass) {
          setSelectedClass({
            ...foundClass,
            date: date.toISOString().split('T')[0],
            duration: '60 min',
            location: 'Sala Principal',
          })
        } else {
          // If class not found, go back
          router.back()
        }
      } catch (error) {
        console.error('Error loading class details:', error)
        router.back()
      } finally {
        setIsLoading(false)
      }
    }

    loadClassDetails()
  }, [params.classId, params.classDate, router])

  const handleCheckIn = async () => {
    if (!selectedClass) return

    try {
      // Simular um delay de API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Atualizar o estado local
      setSelectedClass({
        ...selectedClass,
        isCheckedIn: true,
      })

      // Aqui você implementaria a chamada real à API para registrar o check-in
      console.log(
        'Check-in realizado com sucesso para a aula:',
        selectedClass.id,
      )
    } catch (error) {
      console.error('Erro ao fazer check-in:', error)
      // Implementar tratamento de erro adequado aqui
    }
  }

  if (isLoading || !selectedClass) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.classTitle}>{selectedClass.title}</Text>
          <View style={styles.instructorContainer}>
            <Image
              alt=""
              source={{ uri: 'https://example.com/instructor.jpg' }}
              style={styles.instructorAvatar}
            />
            <Text style={styles.instructorName}>
              Prof. {selectedClass.instructor}
            </Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {selectedClass.isCheckedIn ? 'Check-in feito' : 'Pendente'}
          </Text>
        </View>
      </View>

      {/* Cards com informações da aula */}
      <View style={styles.infoCardsContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardLabel}>Horário</Text>
          <Text style={styles.infoCardValue}>
            {selectedClass.time} ({selectedClass.duration})
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardLabel}>Sala</Text>
          <Text style={styles.infoCardValue}>{selectedClass.location}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardLabel}>Participantes</Text>
          <Text style={styles.infoCardValue}>
            {selectedClass.enrolled}/{selectedClass.capacity}
          </Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Alunos presentes</Text>
      </View>

      <FlatList
        data={[
          {
            id: '1',
            name: 'Ana Silva',
            avatar: 'https://placehold.co/32x32',
            time: '15:55',
          },
          {
            id: '2',
            name: 'Carlos Oliveira',
            avatar: 'https://placehold.co/32x32',
            time: '15:50',
          },
          {
            id: '3',
            name: 'Mariana Santos',
            avatar: 'https://placehold.co/32x32',
            time: '15:48',
          },
          {
            id: '4',
            name: 'Paulo Mendes',
            avatar: 'https://placehold.co/32x32',
            time: '15:45',
          },
          {
            id: '5',
            name: 'Ana Silva',
            avatar: 'https://placehold.co/32x32',
            time: '15:55',
          },
          {
            id: '6',
            name: 'Carlos Oliveira',
            avatar: 'https://placehold.co/32x32',
            time: '15:50',
          },
          {
            id: '7',
            name: 'Mariana Santos',
            avatar: 'https://placehold.co/32x32',
            time: '15:48',
          },
          {
            id: '8',
            name: 'Paulo Mendes',
            avatar: 'https://placehold.co/32x32',
            time: '15:45',
          },
          {
            id: '9',
            name: 'Ana Silva',
            avatar: 'https://placehold.co/32x32',
            time: '15:55',
          },
          {
            id: '10',
            name: 'Carlos Oliveira',
            avatar: 'https://placehold.co/32x32',
            time: '15:50',
          },
          {
            id: '11',
            name: 'Mariana Santos',
            avatar: 'https://placehold.co/32x32',
            time: '15:48',
          },
          {
            id: '12',
            name: 'Paulo Mendes',
            avatar: 'https://placehold.co/32x32',
            time: '15:45',
          },
          {
            id: '13',
            name: 'Ana Silva',
            avatar: 'https://placehold.co/32x32',
            time: '15:55',
          },
          {
            id: '14',
            name: 'Carlos Oliveira',
            avatar: 'https://placehold.co/32x32',
            time: '15:50',
          },
          {
            id: '15',
            name: 'Mariana Santos',
            avatar: 'https://placehold.co/32x32',
            time: '15:48',
          },
          {
            id: '16',
            name: 'Paulo Mendes',
            avatar: 'https://placehold.co/32x32',
            time: '15:45',
          },
          {
            id: '17',
            name: 'Carlos Oliveira',
            avatar: 'https://placehold.co/32x32',
            time: '15:50',
          },
          {
            id: '18',
            name: 'Mariana Santos',
            avatar: 'https://placehold.co/32x32',
            time: '15:48',
          },
          {
            id: '19',
            name: 'Henrique',
            avatar: 'https://placehold.co/32x32',
            time: '15:45',
          },
        ]}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <Image
              alt=""
              source={{ uri: item.avatar }}
              style={styles.studentAvatar}
            />
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.checkInTime}>Check-in: {item.time}</Text>
            </View>
          </View>
        )}
        style={styles.studentList}
      />

      {/* Botão de check-in */}
      {!selectedClass.isCheckedIn && (
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={handleCheckIn}
          activeOpacity={0.7}
        >
          <Text style={styles.checkInButtonText}>Fazer Check-in</Text>
        </TouchableOpacity>
      )}

      {selectedClass.isCheckedIn && (
        <View style={styles.checkInCompleted}>
          <Feather
            name="check-circle"
            size={20}
            color="#10B981"
            style={styles.checkIcon}
          />
          <Text style={styles.checkInCompletedText}>Check-in realizado</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  classTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 8,
    backgroundColor: '#E0E0E0',
  },
  instructorName: {
    fontSize: 14,
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  infoCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    width: '100%',
  },
  studentAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  checkInTime: {
    fontSize: 12,
    color: '#777',
  },
  studentList: {
    flex: 1,
    marginBottom: 16,
  },
  checkInButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  checkInButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  checkInCompleted: {
    backgroundColor: '#E6F7ED',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
    flexDirection: 'row',
  },
  checkInCompletedText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 16,
  },
  checkIcon: {
    marginRight: 8,
  },
})
