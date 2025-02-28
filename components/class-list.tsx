import { FlatList, StyleSheet, Text, View } from 'react-native'

import { ClassItem } from './class-item'
import { ClassSkeleton } from './class-skeleton'

import { Class } from '@/types/class'

interface ClassListProps {
  classes: Class[] | null
  isLoading: boolean
  onClassPress: (classItem: Class) => void
  selectedDay?: string
}

export function ClassList({
  classes,
  isLoading,
  onClassPress,
  selectedDay,
}: ClassListProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ClassSkeleton />
        <ClassSkeleton />
        <ClassSkeleton />
      </View>
    )
  }

  if (!classes || classes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        {selectedDay && (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{selectedDay}</Text>
          </View>
        )}
        <Text style={styles.emptyText}>Nenhuma aula encontrada</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {selectedDay && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{selectedDay}</Text>
        </View>
      )}
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassItem item={item} onPress={() => onClassPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  headerContainer: {
    paddingVertical: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
})
