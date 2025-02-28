import React, { ReactNode } from 'react'
import { FlatList, Text, View } from 'react-native'

import { ClassItem } from '../class-item'
import { ClassSkeleton } from '../class-skeleton'

import { styles } from './styles/index'
import { Class, ClassListContentProps, ClassListProps } from './types'

function ClassListRoot({
  children,
  selectedDay,
}: {
  children: ReactNode
  selectedDay?: string
}) {
  return (
    <View style={styles.container}>
      {selectedDay && <ClassListRoot.Header day={selectedDay} />}
      {children}
    </View>
  )
}

ClassListRoot.Header = function ClassListHeader({ day }: { day: string }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{day}</Text>
    </View>
  )
}

ClassListRoot.Content = function ClassListContent({
  classes,
  onCheckin,
  onDetails,
}: Omit<ClassListContentProps, 'selectedDay'>) {
  return (
    <FlatList
      data={classes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ClassListRoot.Item
          item={item}
          onCheckin={() => onCheckin(item)}
          onDetails={() => onDetails(item)}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  )
}

ClassListRoot.Item = function ClassListItem({
  item,
  onCheckin,
  onDetails,
}: {
  item: Class
  onCheckin: (classItem: Class) => void
  onDetails: (classItem: Class) => void
}) {
  return <ClassItem item={item} onCheckin={onCheckin} onDetails={onDetails} />
}

ClassListRoot.Empty = function EmptyClassList() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhuma aula encontrada</Text>
    </View>
  )
}

ClassListRoot.Loading = function LoadingClassList() {
  return (
    <View style={styles.container}>
      <ClassSkeleton />
      <ClassSkeleton />
      <ClassSkeleton />
    </View>
  )
}

// Componente de alto nível que abstrai a lógica
export function ClassList({
  classes,
  isLoading,
  onCheckin,
  onDetails,
  selectedDay,
}: ClassListProps) {
  return (
    <ClassListRoot selectedDay={selectedDay}>
      {isLoading ? (
        <ClassListRoot.Loading />
      ) : !classes || classes.length === 0 ? (
        <ClassListRoot.Empty />
      ) : (
        <ClassListRoot.Content
          classes={classes}
          onCheckin={onCheckin}
          onDetails={onDetails}
        />
      )}
    </ClassListRoot>
  )
}

// Exportando os subcomponentes
ClassList.Root = ClassListRoot
ClassList.Header = ClassListRoot.Header
ClassList.Content = ClassListRoot.Content
ClassList.Item = ClassListRoot.Item
ClassList.Empty = ClassListRoot.Empty
ClassList.Loading = ClassListRoot.Loading
