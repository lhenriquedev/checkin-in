import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { styles } from '@/components/home/styles'
import { Class } from '@/types/index'
import { getMockClassesForDate } from '@/utils/mockData'

// Tipos de aula disponíveis
interface ClassCategory {
  id: string
  name: string
  description: string
  imageUrl: string
}

// Função para obter as próximas aulas
const getNextClasses = (): Class[] => {
  // Obtém as aulas dos próximos 3 dias
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const dayAfterTomorrow = new Date(today)
  dayAfterTomorrow.setDate(today.getDate() + 2)

  // Obtém as aulas de cada dia
  const classesToday = getMockClassesForDate(today)
  const classesTomorrow = getMockClassesForDate(tomorrow)
  const classesDayAfter = getMockClassesForDate(dayAfterTomorrow)

  // Combina todas as aulas e adiciona a data para cada uma
  const allClasses = [
    ...classesToday.map((c) => ({
      ...c,
      date: today.toISOString().split('T')[0],
      duration: '60 min',
      location: 'Sala Principal',
    })),
    ...classesTomorrow.map((c) => ({
      ...c,
      date: tomorrow.toISOString().split('T')[0],
      duration: '60 min',
      location: 'Sala Principal',
    })),
    ...classesDayAfter.map((c) => ({
      ...c,
      date: dayAfterTomorrow.toISOString().split('T')[0],
      duration: '60 min',
      location: 'Sala Principal',
    })),
  ]

  // Pega as 5 primeiras aulas
  return allClasses.slice(0, 5)
}

// Categorias de aula
const classCategories: ClassCategory[] = [
  {
    id: 'muay-thai',
    name: 'Muay Thai',
    description:
      'Arte marcial tailandesa com técnicas de golpes com punhos, cotovelos, joelhos e canelas.',
    imageUrl:
      'https://portal.comunique-se.com.br/wp-content/uploads/2024/10/9b4b333e-1dd6-45de-9488-565a4b5dbbc1.jpeg',
  },
  {
    id: 'jiu-jitsu',
    name: 'Jiu-Jitsu',
    description:
      'Arte marcial japonesa e esporte de combate que se concentra em técnicas de imobilização e submissão.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/22/GABRIEL_VELLA_vs_ROMINHO_51.jpg',
  },
]

export default function HomeScreen() {
  const [nextClasses, setNextClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadClasses = async () => {
      setIsLoading(true)
      try {
        // Simula um delay de carregamento
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Obtém as próximas aulas
        const classes = getNextClasses()
        setNextClasses(classes)
      } catch (error) {
        console.error('Error loading next classes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadClasses()
  }, [])

  const goToClassList = () => {
    router.push('/(auth)/(tabs)/classes')
  }

  // Nova função para navegar para as classes e abrir o bottom sheet com a aula selecionada
  const goToClassWithSelected = (classItem: Class) => {
    // Navegamos para a tela de classes passando os parâmetros necessários
    router.push({
      pathname: '/(auth)/(tabs)/class-details',
      params: {
        classId: classItem.id,
        classDate: classItem.date,
      },
    })
  }

  const renderClassCard = ({ item }: { item: Class }) => {
    // Formatar a data para exibição (ex: "Seg, 05/03")
    const dateObj = new Date(item.date)
    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const weekday = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][
      dateObj.getDay()
    ]
    const formattedDate = `${weekday}, ${day}/${month}`

    return (
      <TouchableOpacity
        style={styles.classCard}
        onPress={() => goToClassWithSelected(item)}
      >
        <View style={styles.classCardHeader}>
          <View>
            <Text style={styles.classTime}>{item.time}</Text>
            <Text style={styles.classDate}>{formattedDate}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              !item.isCheckedIn ? styles.statusPending : {},
            ]}
          >
            <Text
              style={[
                styles.statusText,
                !item.isCheckedIn ? styles.statusTextPending : {},
              ]}
            >
              {item.isCheckedIn ? 'Check-in feito' : 'Fazer check-in'}
            </Text>
          </View>
        </View>

        <Text style={styles.classTitle}>{item.title}</Text>

        <View style={styles.instructorRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.instructorName}>{item.instructor}</Text>
        </View>

        <View style={styles.capacityRow}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.capacityText}>
            {item.enrolled}/{item.capacity} alunos
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderCategoryCard = ({ item }: { item: ClassCategory }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={goToClassList}>
      <Image
        alt=""
        source={{ uri: item.imageUrl }}
        style={styles.categoryImage}
      />
      <View style={styles.categoryOverlay}>
        <View style={styles.categoryGradient} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Aulas</Text>
            <TouchableOpacity onPress={goToClassList}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text>Carregando próximas aulas...</Text>
            </View>
          ) : (
            <FlatList
              data={nextClasses}
              renderItem={renderClassCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalListContent}
            />
          )}
        </View>

        <View style={styles.sectionCategories}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <TouchableOpacity onPress={goToClassList}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={classCategories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
