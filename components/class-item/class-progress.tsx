import React from 'react'
import { Text, View } from 'react-native'

import { styles } from './styles/index'
import { ClassItemProps } from './types'

export function ClassProgress({ item }: ClassItemProps) {
  // Calculate enrollment percentage for progress bar
  const enrollmentPercentage = (item.enrolled / item.capacity) * 100

  return (
    <>
      <View style={styles.progressContainer}>
        <View
          style={[styles.progressBar, { width: `${enrollmentPercentage}%` }]}
        />
      </View>

      <Text style={styles.enrollmentText}>
        {item.enrolled}/{item.capacity} faixas no tatame
      </Text>
    </>
  )
}
