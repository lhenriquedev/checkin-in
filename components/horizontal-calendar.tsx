import { Feather } from '@expo/vector-icons'
import { addDays, format, isSameDay, isSunday, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type HorizontalCalendarProps = {
  currentDate: Date
  selectedDate: Date
  onPreviousMonthPress: () => void
  onNextMonthPress: () => void
  onDayPress: (day: Date) => void
}

export function HorizontalCalendar({
  currentDate,
  selectedDate,
  onPreviousMonthPress,
  onNextMonthPress,
  onDayPress,
}: HorizontalCalendarProps) {
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(startOfCurrentWeek, index)
    return date
  })

  const isToday = (date: Date) => {
    return isSameDay(date, new Date())
  }

  // Check if week spans across two months
  const monthChangeNeeded = () => {
    const firstDay = weekDays[0]
    const lastDay = weekDays[weekDays.length - 1]

    if (firstDay && lastDay) {
      return format(firstDay, 'MM') !== format(lastDay, 'MM')
    }

    return false
  }

  // Get the month text based on the current date or spanning months
  const getMonthText = () => {
    // Capitalize first letter of month name
    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    if (monthChangeNeeded()) {
      // Check if months are in different years
      const firstDayYear = format(weekDays[0], 'yyyy')
      const lastDayYear = format(weekDays[weekDays.length - 1], 'yyyy')

      // Get formatted month names (capitalized)
      const firstDayMonth = capitalizeFirstLetter(
        format(weekDays[0], 'MMMM', { locale: ptBR }),
      )
      const lastDayMonth = capitalizeFirstLetter(
        format(weekDays[weekDays.length - 1], 'MMMM', { locale: ptBR }),
      )

      // If years are different, include years in the display
      if (firstDayYear !== lastDayYear) {
        return `${firstDayMonth}/${firstDayYear} - ${lastDayMonth}/${lastDayYear}`
      }

      // Otherwise just show month names
      return `${firstDayMonth} - ${lastDayMonth}`
    }

    // For single month, capitalize and return
    return capitalizeFirstLetter(format(currentDate, 'MMMM', { locale: ptBR }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Pressable
          hitSlop={20}
          style={styles.pressable}
          onPress={onPreviousMonthPress}
        >
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.monthText}>{getMonthText()}</Text>
        <Pressable
          hitSlop={20}
          style={styles.pressable}
          onPress={onNextMonthPress}
        >
          <Feather name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.weekContainer}>
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, selectedDate)
          const isDisabled = isSunday(day)

          return (
            <Pressable
              key={day.toString()}
              style={[
                styles.dayContainer,
                isToday(day) && styles.todayContainer,
                isSelected && styles.selectedContainer,
                isDisabled && styles.disabledContainer,
              ]}
              onPress={() => !isDisabled && onDayPress(day)}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  isDisabled && styles.disabledText,
                ]}
              >
                {format(day, 'EEEEE', { locale: ptBR })}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  isSelected && styles.selectedDayNumber,
                  isDisabled && styles.disabledText,
                ]}
              >
                {format(day, 'dd', { locale: ptBR })}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pressable: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    flex: 1,
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'semibold',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todayContainer: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#000000',
  },
  selectedContainer: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  },
  selectedDayText: {
    color: '#ffffff',
  },
  selectedDayNumber: {
    color: '#ffffff',
  },
  disabledContainer: {
    backgroundColor: '#f5f5f5',
    borderColor: '#cccccc',
    opacity: 0.6,
  },
  disabledText: {
    color: '#999999',
  },
})
