import { FlatList, Text, View } from 'react-native'

import { ClassItem } from '../class-item'

import { styles } from './styles/index'
import { ClassListContentProps } from './types'

export function ClassListContent({
  classes,
  onClassPress,
  selectedDay,
}: ClassListContentProps) {
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
