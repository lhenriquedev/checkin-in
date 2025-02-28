import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Class } from '@/types/class'

// Generate header for the day's classes
export function getClassesHeader(date: Date): string {
  const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: ptBR })
  return `Aulas de Jiu-Jitsu - ${formattedDate}`
}

// Generate mock classes for a specific date
export function getMockClassesForDate(date: Date): Class[] {
  const dateStr = format(date, 'yyyy-MM-dd')

  // Generate different classes based on the day of the week
  const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Base classes that appear on all days
  const baseClasses: Class[] = [
    {
      id: `${dateStr}-fundamentals`,
      title: 'Fundamentos de Jiu-Jitsu',
      instructor: 'Mestre Rodrigo Silva',
      time: '07:00',
      enrolled: 15,
      capacity: 20,
    },
    {
      id: `${dateStr}-advanced`,
      title: 'Jiu-Jitsu Avançado',
      instructor: 'Professor Carlos Gracie',
      time: '18:30',
      enrolled: 12,
      capacity: 15,
    },
  ]

  // Day-specific classes
  const daySpecificClasses: Record<number, Class[]> = {
    // Monday
    1: [
      {
        id: `${dateStr}-nogi`,
        title: 'No-Gi Jiu-Jitsu',
        instructor: 'Professor André Costa',
        time: '10:00',
        enrolled: 8,
        capacity: 12,
      },
      {
        id: `${dateStr}-competition`,
        title: 'Treino de Competição',
        instructor: 'Mestre Ricardo Alves',
        time: '19:30',
        enrolled: 20,
        capacity: 25,
      },
    ],
    // Wednesday
    3: [
      {
        id: `${dateStr}-takedowns`,
        title: 'Quedas e Projeções',
        instructor: 'Professor Marcos Paulo',
        time: '17:00',
        enrolled: 22,
        capacity: 30,
      },
    ],
    // Friday
    5: [
      {
        id: `${dateStr}-openmat`,
        title: 'Open Mat',
        instructor: 'Faixa Preta Fernanda Lima',
        time: '19:00',
        enrolled: 28,
        capacity: 30,
      },
    ],
    // Saturday
    6: [
      {
        id: `${dateStr}-kids`,
        title: 'Jiu-Jitsu Kids',
        instructor: 'Professor Bruno Santos',
        time: '09:00',
        enrolled: 14,
        capacity: 15,
      },
      {
        id: `${dateStr}-women`,
        title: 'Jiu-Jitsu Feminino',
        instructor: 'Professora Camila Rocha',
        time: '11:00',
        enrolled: 18,
        capacity: 25,
      },
    ],
  }

  // Combine base classes with day-specific classes
  return [...baseClasses, ...(daySpecificClasses[dayOfWeek] || [])]
}
