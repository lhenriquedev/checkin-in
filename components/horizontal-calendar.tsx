import { Feather } from '@expo/vector-icons'
import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  isSunday,
  startOfWeek,
  subWeeks,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type HorizontalCalendarProps = {
  currentDate: Date
  selectedDate: Date
  onDayPress: (day: Date) => void
}

// Tipo para representar uma semana
type Week = {
  id: string
  days: Date[]
  startDate: Date
}

export function HorizontalCalendar({
  currentDate,
  selectedDate,
  onDayPress,
}: HorizontalCalendarProps) {
  const scrollViewRef = useRef<ScrollView>(null)
  const [_, setLastContentOffset] = useState(0)
  const screenWidth = Dimensions.get('window').width
  const containerPadding = 16 // Padding do container

  // Calcular a largura total de uma semana (igual à largura da tela menos o padding)
  const weekWidth = screenWidth - containerPadding * 2

  // Calcular a largura de cada dia (dividir a largura da semana por 7, menos as margens)
  const dayWidth = Math.floor((weekWidth - 28) / 7) // 28 = margens totais (4 * 7)

  // Estado para armazenar as semanas
  const [weeks, setWeeks] = useState<Week[]>([])
  const [visibleWeekIndex, setVisibleWeekIndex] = useState(1) // Começa na semana do meio (atual)

  // Gerar uma semana a partir de uma data
  const generateWeek = (baseDate: Date, id: string): Week => {
    const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 })
    const days = Array.from({ length: 7 }, (_, index) =>
      addDays(weekStart, index),
    )

    return {
      id,
      days,
      startDate: weekStart,
    }
  }

  // Inicializar as semanas
  useEffect(() => {
    // Gerar semana atual, anterior e próxima
    const currentWeek = generateWeek(currentDate, 'current')
    const prevWeek = generateWeek(subWeeks(currentDate, 1), 'prev')
    const nextWeek = generateWeek(addWeeks(currentDate, 1), 'next')

    setWeeks([prevWeek, currentWeek, nextWeek])
    setVisibleWeekIndex(1) // Semana atual é a do meio

    // Resetar o scroll para a semana atual
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: weekWidth, // Posicionar na segunda semana (índice 1)
          animated: false,
        })
        setLastContentOffset(weekWidth)
      }
    }, 0)
  }, [currentDate, weekWidth])

  const isToday = (date: Date) => {
    return isSameDay(date, new Date())
  }

  // Obter o mês da semana visível
  const getMonthText = () => {
    if (!weeks.length || visibleWeekIndex >= weeks.length) return ''

    const currentWeek = weeks[visibleWeekIndex]
    const firstDay = currentWeek.days[0]
    const lastDay = currentWeek.days[currentWeek.days.length - 1]

    // Capitalize first letter of month name
    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // Check if week spans across two months
    if (format(firstDay, 'MM') !== format(lastDay, 'MM')) {
      // Check if months are in different years
      const firstDayYear = format(firstDay, 'yyyy')
      const lastDayYear = format(lastDay, 'yyyy')

      // Get formatted month names (capitalized)
      const firstDayMonth = capitalizeFirstLetter(
        format(firstDay, 'MMMM', { locale: ptBR }),
      )
      const lastDayMonth = capitalizeFirstLetter(
        format(lastDay, 'MMMM', { locale: ptBR }),
      )

      // If years are different, include years in the display
      if (firstDayYear !== lastDayYear) {
        return `${firstDayMonth}/${firstDayYear} - ${lastDayMonth}/${lastDayYear}`
      }

      // Otherwise just show month names
      return `${firstDayMonth} - ${lastDayMonth}`
    }

    // For single month, capitalize and return
    return capitalizeFirstLetter(format(firstDay, 'MMMM', { locale: ptBR }))
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.x

    // Calcular qual semana está visível
    const newVisibleIndex = Math.round(currentOffset / weekWidth)
    if (
      newVisibleIndex !== visibleWeekIndex &&
      newVisibleIndex >= 0 &&
      newVisibleIndex < weeks.length
    ) {
      setVisibleWeekIndex(newVisibleIndex)
    }

    // Verificar se estamos próximos do início ou fim para adicionar mais semanas
    const isNearStart = currentOffset < weekWidth * 0.5
    const isNearEnd = currentOffset > (weeks.length - 1.5) * weekWidth

    if (isNearStart && weeks.length > 0) {
      // Adicionar semanas no início
      const firstWeek = weeks[0]
      const newWeek = generateWeek(
        subWeeks(firstWeek.startDate, 1),
        `prev-${Date.now()}`,
      )
      setWeeks([newWeek, ...weeks])

      // Ajustar o scroll para manter a posição
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: currentOffset + weekWidth,
            animated: false,
          })
        }
        setVisibleWeekIndex(visibleWeekIndex + 1)
        setLastContentOffset(currentOffset + weekWidth)
      }, 0)
    } else if (isNearEnd) {
      // Adicionar semanas no final
      const lastWeek = weeks[weeks.length - 1]
      const newWeek = generateWeek(
        addWeeks(lastWeek.startDate, 1),
        `next-${Date.now()}`,
      )
      setWeeks([...weeks, newWeek])
    }

    // Atualizar o último offset conhecido
    setLastContentOffset(currentOffset)
  }

  // Quando o scroll termina
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Limitar o número de semanas para manter a performance
    if (weeks.length > 10) {
      // Manter apenas 5 semanas antes e depois da semana visível
      const startIndex = Math.max(0, visibleWeekIndex - 5)
      const endIndex = Math.min(weeks.length - 1, visibleWeekIndex + 5)
      const trimmedWeeks = weeks.slice(startIndex, endIndex + 1)

      setWeeks(trimmedWeeks)

      // Ajustar o índice visível
      const newVisibleIndex = visibleWeekIndex - startIndex
      setVisibleWeekIndex(newVisibleIndex)

      // Ajustar o scroll
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: newVisibleIndex * weekWidth,
            animated: false,
          })
          setLastContentOffset(newVisibleIndex * weekWidth)
        }
      }, 0)
    }
  }

  // Função para navegar para a semana anterior
  const handlePreviousWeek = () => {
    if (visibleWeekIndex > 0) {
      // Navegar para a semana anterior
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (visibleWeekIndex - 1) * weekWidth,
          animated: true,
        })
      }
    } else {
      // Adicionar uma semana no início e navegar para ela
      const firstWeek = weeks[0]
      const newWeek = generateWeek(
        subWeeks(firstWeek.startDate, 1),
        `prev-${weeks.length}`,
      )
      setWeeks([newWeek, ...weeks])

      // Manter a posição atual
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: 0,
            animated: true,
          })
        }
      }, 0)
    }
  }

  // Função para navegar para a próxima semana
  const handleNextWeek = () => {
    if (visibleWeekIndex < weeks.length - 1) {
      // Navegar para a próxima semana
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (visibleWeekIndex + 1) * weekWidth,
          animated: true,
        })
      }
    } else {
      // Adicionar uma semana no final e navegar para ela
      const lastWeek = weeks[weeks.length - 1]
      const newWeek = generateWeek(
        addWeeks(lastWeek.startDate, 1),
        `next-${weeks.length}`,
      )
      setWeeks([...weeks, newWeek])

      // Navegar para a nova semana
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: weeks.length * weekWidth,
            animated: true,
          })
        }
      }, 0)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Pressable
          hitSlop={20}
          style={styles.pressable}
          onPress={handlePreviousWeek}
        >
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.monthText} numberOfLines={1} ellipsizeMode="tail">
          {getMonthText()}
        </Text>
        <Pressable
          hitSlop={20}
          style={styles.pressable}
          onPress={handleNextWeek}
        >
          <Feather name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.calendarContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEnd}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          decelerationRate={Platform.OS === 'ios' ? 0.992 : 0.9}
          snapToInterval={weekWidth}
          snapToAlignment="start"
          pagingEnabled={true}
        >
          {weeks.map((week, weekIndex) => (
            <View
              key={week.id}
              style={[styles.weekContainer, { width: weekWidth }]}
            >
              {week.days.map((day) => {
                const isSelected = isSameDay(day, selectedDate)
                const isDisabled = isSunday(day)

                return (
                  <Pressable
                    key={day.toString()}
                    style={[
                      styles.dayContainer,
                      { width: dayWidth },
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
                      numberOfLines={1}
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
          ))}
        </ScrollView>
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  container: {
    padding: 16,
  },
  calendarContainer: {
    overflow: 'hidden',
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  scrollViewContent: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressable: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  dayContainer: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 2,
    height: 70,
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
