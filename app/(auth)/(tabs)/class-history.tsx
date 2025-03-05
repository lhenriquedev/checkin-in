import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Define types
interface ClassHistoryItem {
  id: string
  date: string
  type: string
  instructor: string
  duration: string
}

// Mock data for demonstration
const classHistory: ClassHistoryItem[] = [
  {
    id: '1',
    date: '12/06/2023',
    type: 'Fundamentals',
    instructor: 'Prof. Carlos',
    duration: '1h 30m',
  },
  {
    id: '2',
    date: '10/06/2023',
    type: 'Advanced',
    instructor: 'Prof. Marcelo',
    duration: '2h',
  },
  {
    id: '3',
    date: '08/06/2023',
    type: 'Open Mat',
    instructor: '-',
    duration: '1h',
  },
  {
    id: '4',
    date: '05/06/2023',
    type: 'Competition Training',
    instructor: 'Prof. Carlos',
    duration: '2h',
  },
  {
    id: '5',
    date: '03/06/2023',
    type: 'Fundamentals',
    instructor: 'Prof. Rafael',
    duration: '1h 30m',
  },
  {
    id: '6',
    date: '01/06/2023',
    type: 'No Gi',
    instructor: 'Prof. André',
    duration: '1h 30m',
  },
  {
    id: '7',
    date: '29/05/2023',
    type: 'Fundamentals',
    instructor: 'Prof. Carlos',
    duration: '1h 30m',
  },
  {
    id: '8',
    date: '27/05/2023',
    type: 'Advanced',
    instructor: 'Prof. Marcelo',
    duration: '2h',
  },
  {
    id: '9',
    date: '25/05/2023',
    type: 'Open Mat',
    instructor: '-',
    duration: '1h',
  },
  {
    id: '10',
    date: '22/05/2023',
    type: 'Competition Training',
    instructor: 'Prof. Carlos',
    duration: '2h',
  },
]

function ClassHistory() {
  const renderClassHistoryItem = ({ item }: { item: ClassHistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyItemLeft}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <Text style={styles.historyType}>{item.type}</Text>
        <Text style={styles.historyInstructor}>
          Instrutor: {item.instructor}
        </Text>
      </View>
      <View style={styles.historyItemRight}>
        <Text style={styles.historyDuration}>{item.duration}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={classHistory}
        renderItem={renderClassHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            Nenhuma aula registrada ainda.
          </Text>
        }
      />
    </SafeAreaView>
  )
}

export default ClassHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  historyItemLeft: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  historyType: {
    fontSize: 16,
    marginBottom: 2,
  },
  historyInstructor: {
    fontSize: 12,
    color: '#666',
  },
  historyItemRight: {
    justifyContent: 'center',
  },
  historyDuration: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  separator: {
    height: 8,
  },
  emptyListText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
})
