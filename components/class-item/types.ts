import { Class } from '@/types/index'

export interface ClassItemProps {
  item: Class
  onCheckin?: (classItem: Class) => void
  onDetails?: (classItem: Class) => void
}
