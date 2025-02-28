import { addDays, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { ClassList } from '@/components/class-list'
import { HorizontalCalendar } from '@/components/horizontal-calendar'
import { Class } from '@/types'
import { getMockClassesForDate } from '@/utils/mockData'

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
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

  // Navegar para a próxima semana
  const goToNextWeek = () => {
    const nextWeek = addDays(currentDate, 7)
    setCurrentDate(nextWeek)
  }
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        onPreviousMonthPress={goToPreviousWeek}
        onNextMonthPress={goToNextWeek}
        onDayPress={handleDayPress}
      />

      {/* Lista de aulas */}
      <View style={styles.listContainer}>
        <ClassList
          classes={classes}
          onClassPress={() => {}}
          isLoading={isLoading}
          selectedDay={format(selectedDate, 'dd/MM/yyyy')}
        />
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
