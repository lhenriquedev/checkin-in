import { addDays, format, parseISO } from 'date-fns'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { ClassList } from '@/components/class-list'
import { HorizontalCalendar } from '@/components/horizontal-calendar'
import { Class } from '@/types/index'
import { getMockClassesForDate } from '@/utils/mockData'

export default function ClassesScreen() {
  const router = useRouter()
  // Obtém os parâmetros da rota
  const params = useLocalSearchParams<{
    selectedClassId?: string
    openBottomSheet?: string
    classDate?: string
  }>()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(
    params.classDate ? parseISO(params.classDate) : new Date(),
  )
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(false)

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

        // Se tiver um ID de aula selecionada como parâmetro, buscar a aula correspondente
        if (params.selectedClassId) {
          const foundClass = classesForDate.find(
            (c) => c.id === params.selectedClassId,
          )
          if (foundClass) {
            // No longer using BottomSheet, navigate to class-details
            router.push({
              pathname: '/(auth)/(tabs)/class-details',
              params: {
                classId: foundClass.id,
                classDate: selectedDate.toISOString(),
              },
            })
          }
        }
      } catch (error) {
        console.error('Error loading classes:', error)
        setClasses([])
      } finally {
        setIsLoading(false)
      }
    }

    loadClasses()
  }, [selectedDate, params.selectedClassId, params.openBottomSheet, router])

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

  const handleDetails = (classItem: Class) => {
    // Instead of using the bottom sheet, navigate to the class-details screen
    router.push({
      pathname: '/(auth)/(tabs)/class-details',
      params: {
        classId: classItem.id,
        classDate: selectedDate.toISOString(),
      },
    })
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
})
