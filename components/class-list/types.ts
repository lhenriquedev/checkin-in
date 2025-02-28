import { ReactNode } from 'react'

import { Class } from '@/types/index'

export type { Class }

export interface ClassListProps {
  classes?: Class[] | null
  isLoading?: boolean
  onCheckin: (classItem: Class) => void
  onDetails: (classItem: Class) => void
  selectedDay?: string
  children?: ReactNode
}

export interface ClassListContentProps {
  classes: Class[]
  onCheckin: (classItem: Class) => void
  onDetails: (classItem: Class) => void
  selectedDay?: string
}

export interface EmptyClassListProps {
  selectedDay?: string
}
