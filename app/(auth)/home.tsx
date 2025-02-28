import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { addDays, format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import {
  BottomSheetRefHandle,
  CustomBottomSheet,
} from '@/components/bottom-sheet'
import { ClassList } from '@/components/class-list'
import { HorizontalCalendar } from '@/components/horizontal-calendar'
import { Class } from '@/types/index'
import { getMockClassesForDate } from '@/utils/mockData'

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const bottomSheetModalRef = useRef<BottomSheetRefHandle>(null)

  const handleDayPress = (day: Date) => {
    setSelectedDate(day)
  }

  // Load classes when selected date changes
  useEffect(() => {
    const loadClasses = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        const classesForDate = getMockClassesForDate(selectedDate)
        setClasses(classesForDate as Class[])
      } catch (error) {
        console.error('Error loading classes:', error)
        setClasses([])
      } finally {
        setIsLoading(false)
      }
    }

    loadClasses()
  }, [selectedDate])

  const goToPreviousWeek = () => {
    const previousWeek = addDays(currentDate, -7)
    setCurrentDate(previousWeek)
  }

  const goToNextWeek = () => {
    const nextWeek = addDays(currentDate, 7)
    setCurrentDate(nextWeek)
  }

  const handleCheckin = (classItem: Class) => {
    console.log('Class pressed:', classItem)
  }

  const handlePresentBottomSheet = () => {
    bottomSheetModalRef.current?.open()
  }

  const handleDetails = (classItem: Class) => {
    handlePresentBottomSheet()
    console.log('Class pressed:', classItem)
  }

  // Formatando o dia selecionado
  const formattedSelectedDay = format(selectedDate, 'dd/MM/yyyy')

  return (
    <SafeAreaView style={styles.container}>
      <HorizontalCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        onPreviousMonthPress={goToPreviousWeek}
        onNextMonthPress={goToNextWeek}
        onDayPress={handleDayPress}
      />

      <View style={styles.listContainer}>
        <ClassList.Root selectedDay={formattedSelectedDay}>
          {isLoading && <ClassList.Loading />}

          {!isLoading && classes.length === 0 && <ClassList.Empty />}

          {!isLoading && classes.length > 0 && (
            <ClassList.Content
              classes={classes}
              onCheckin={handleCheckin}
              onDetails={handleDetails}
            />
          )}
        </ClassList.Root>
      </View>

      <CustomBottomSheet ref={bottomSheetModalRef} index={0}>
        <BottomSheetFlatList
          data={[
            {
              id: '1',
              name: 'Ana Silva',
              avatar: 'https://example.com/student1.jpg',
              time: '15:55',
            },
            {
              id: '2',
              name: 'Carlos Oliveira',
              avatar: 'https://example.com/student2.jpg',
              time: '15:50',
            },
            {
              id: '3',
              name: 'Mariana Santos',
              avatar: 'https://example.com/student3.jpg',
              time: '15:48',
            },
            {
              id: '4',
              name: 'Paulo Mendes',
              avatar: 'https://example.com/student4.jpg',
              time: '15:45',
            },
            {
              id: '5',
              name: 'Ana Silva',
              avatar: 'https://example.com/student1.jpg',
              time: '15:55',
            },
            {
              id: '6',
              name: 'Carlos Oliveira',
              avatar: 'https://example.com/student2.jpg',
              time: '15:50',
            },
            {
              id: '7',
              name: 'Mariana Santos',
              avatar: 'https://example.com/student3.jpg',
              time: '15:48',
            },
            {
              id: '8',
              name: 'Paulo Mendes',
              avatar: 'https://example.com/student4.jpg',
              time: '15:45',
            },

            {
              id: '9',
              name: 'Ana Silva',
              avatar: 'https://example.com/student1.jpg',
              time: '15:55',
            },
            {
              id: '10',
              name: 'Carlos Oliveira',
              avatar: 'https://example.com/student2.jpg',
              time: '15:50',
            },
            {
              id: '11',
              name: 'Mariana Santos',
              avatar: 'https://example.com/student3.jpg',
              time: '15:48',
            },
            {
              id: '12',
              name: 'Paulo Mendes',
              avatar: 'https://example.com/student4.jpg',
              time: '15:45',
            },
            {
              id: '13',
              name: 'Ana Silva',
              avatar: 'https://example.com/student1.jpg',
              time: '15:55',
            },
            {
              id: '14',
              name: 'Carlos Oliveira',
              avatar: 'https://example.com/student2.jpg',
              time: '15:50',
            },
            {
              id: '15',
              name: 'Mariana Santos',
              avatar: 'https://example.com/student3.jpg',
              time: '15:48',
            },
            {
              id: '12',
              name: 'Paulo Mendes',
              avatar: 'https://example.com/student4.jpg',
              time: '15:45',
            },
            {
              id: '14',
              name: 'Carlos Oliveira',
              avatar: 'https://example.com/student2.jpg',
              time: '15:50',
            },
            {
              id: '15',
              name: 'Mariana Santos',
              avatar: 'https://example.com/student3.jpg',
              time: '15:48',
            },
            {
              id: '12',
              name: 'Henrique',
              avatar: 'https://example.com/student4.jpg',
              time: '15:45',
            },
          ]}
          keyExtractor={(item) => item.id}
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
          ListHeaderComponent={() => (
            <>
              {/* Cabeçalho com informações principais */}
              <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.classTitle}>Aula de Yoga</Text>
                  <View style={styles.instructorContainer}>
                    <Image
                      source={{ uri: 'https://example.com/instructor.jpg' }}
                      style={styles.instructorAvatar}
                    />
                    <Text style={styles.instructorName}>
                      Prof. Amanda Silva
                    </Text>
                  </View>
                </View>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Em andamento</Text>
                </View>
              </View>

              {/* Cards com informações da aula */}
              <View style={styles.infoCardsContainer}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardLabel}>Horário</Text>
                  <Text style={styles.infoCardValue}>16:00 - 17:30</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardLabel}>Sala</Text>
                  <Text style={styles.infoCardValue}>Studio 3</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardLabel}>Participantes</Text>
                  <Text style={styles.infoCardValue}>12/20</Text>
                </View>
              </View>

              {/* Descrição da aula */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>Sobre a aula</Text>
                <Text style={styles.descriptionText}>
                  Aula focada em desenvolver flexibilidade e força através de
                  posturas tradicionais do yoga. Ideal para todos os níveis, com
                  adaptações disponíveis para iniciantes.
                </Text>
              </View>

              {/* Título da lista de participantes */}
              <View style={styles.studentsSection}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Participantes</Text>
                </View>
              </View>
            </>
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={true}
          bounces={false}
          initialNumToRender={20}
          scrollEnabled={true}
          overScrollMode="never"
          removeClippedSubviews={false}
          windowSize={21}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          onEndReachedThreshold={0.5}
        />
      </CustomBottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 20,
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
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  studentsSection: {
    marginTop: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexGrow: 1,
    gap: 10,
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
    width: 40,
    height: 40,
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
})
