import { Feather } from '@expo/vector-icons'
import {
  Calendar as CalendarComponent,
  CalendarProps,
  CalendarTheme,
  useCalendar,
} from '@marceloterreiro/flash-calendar'
import { isSunday } from 'date-fns'
import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { weekDaysInPT } from '@/constants/weekDaysInPT'
import { uppercaseFirstLetter } from '@/utils/uppercaseFirstLetter'

interface ICalendarProps extends CalendarProps {
  onPreviousMonthPress: () => void
  onNextMonthPress: () => void
}

const calendarTheme: CalendarTheme = {
  rowMonth: {
    container: {
      paddingHorizontal: 16,
      height: 48,
      backgroundColor: '#000000',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    content: {
      fontSize: 18,
      color: '#FFFFFF',
    },
  },
  itemDay: {
    base: ({ date }) => ({
      content: isSunday(date) ? { color: '#d1d5db' } : undefined,
      opacity: isSunday(date) ? 0.5 : 1,
    }),
  },
}

export const Calendar = memo((props: ICalendarProps) => {
  const { calendarRowMonth, weekDaysList, weeksList } = useCalendar(props)

  const handleDayPress = (dateId: string) => {
    if (!isSunday(new Date(dateId))) {
      props.onCalendarDayPress(dateId)
    }
  }

  return (
    <View style={styles.container}>
      <CalendarComponent.VStack spacing={props.calendarRowVerticalSpacing}>
        <CalendarComponent.HStack
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          style={calendarTheme.rowMonth?.container}
        >
          <TouchableOpacity onPress={props.onPreviousMonthPress}>
            <Feather name="chevron-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={calendarTheme.rowMonth?.content}>
            {uppercaseFirstLetter(calendarRowMonth)}
          </Text>
          <TouchableOpacity onPress={props.onNextMonthPress}>
            <Feather name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </CalendarComponent.HStack>

        <CalendarComponent.Row.Week spacing={4} theme={calendarTheme.rowWeek}>
          {weekDaysList.map((weekDay, index) => (
            <CalendarComponent.Item.WeekName key={index} height={32}>
              {weekDaysInPT[weekDay as keyof typeof weekDaysInPT]}
            </CalendarComponent.Item.WeekName>
          ))}
        </CalendarComponent.Row.Week>

        {weeksList.map((week, index) => (
          <CalendarComponent.Row.Week
            spacing={4}
            theme={calendarTheme.rowWeek}
            key={index}
          >
            {week.map((day, index) => (
              <CalendarComponent.Item.Day.Container
                daySpacing={4}
                dayHeight={32}
                isStartOfWeek={day.isStartOfWeek}
                key={index}
              >
                <CalendarComponent.Item.Day
                  height={32}
                  onPress={handleDayPress}
                  metadata={day}
                  theme={calendarTheme.itemDay}
                >
                  {day.displayLabel}
                </CalendarComponent.Item.Day>
              </CalendarComponent.Item.Day.Container>
            ))}
          </CalendarComponent.Row.Week>
        ))}
      </CalendarComponent.VStack>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingBottom: 16,
  },
})

Calendar.displayName = 'Calendar'
