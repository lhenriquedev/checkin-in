import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '@/contexts/AuthContext'

// Define types
interface ClassHistoryItem {
  id: string
  date: string
  type: string
  instructor: string
  duration: string
}

interface UserData {
  name: string
  beltColor: 'white' | 'blue' | 'purple' | 'brown' | 'black'
  beltLevel: number
  totalClasses: number
  streak: number
  location: string
  avatar: string
  plan: {
    name: string
    status: 'active' | 'inactive'
    startDate: string
    endDate: string
  }
}

// Mock data for demonstration
const userData: UserData = {
  name: 'João Silva',
  beltColor: 'blue',
  beltLevel: 3, // 3 stripes
  totalClasses: 87,
  streak: 12,
  location: 'São Paulo',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  plan: {
    name: 'Plano Premium',
    status: 'active',
    startDate: '01/01/2023',
    endDate: '31/12/2023',
  },
}

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
]

// Belt color to display
const getBeltColorStyle = (color: UserData['beltColor']): string => {
  const colors = {
    white: '#F5F5F5',
    blue: '#1E88E5',
    purple: '#8E24AA',
    brown: '#795548',
    black: '#212121',
  }
  return colors[color] || colors.white
}

// Create the Profile component
function Profile() {
  const [avatar, setAvatar] = useState(userData.avatar)
  const router = useRouter()
  const { signOut, isLoading } = useAuth()

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatar(result.assets[0].uri)
        // Here you would typically upload the image to your server
        Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!')
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar a foto de perfil')
      console.error(error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      // O redirecionamento será tratado pelo AuthContext
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      Alert.alert('Erro', 'Não foi possível fazer logout')
    }
  }

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
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <Image source={{ uri: avatar }} style={styles.profileImage} />
              <View style={styles.editAvatarButton}>
                <Ionicons name="camera" size={14} color="#FFF" />
              </View>
            </TouchableOpacity>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>{userData.name}</Text>
              <View style={styles.beltContainer}>
                <View
                  style={[
                    styles.belt,
                    { backgroundColor: getBeltColorStyle(userData.beltColor) },
                  ]}
                />
              </View>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.location}>{userData.location}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push('/(auth)/edit-profile' as any)}
            >
              <Ionicons name="settings-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#f0f0f0' }]}>
                <MaterialCommunityIcons name="karate" size={20} color="#333" />
              </View>
              <Text style={styles.statValue}>{userData.totalClasses}</Text>
              <Text style={styles.statLabel}>Aulas</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#f0f0f0' }]}>
                <FontAwesome5 name="fire" size={18} color="#333" />
              </View>
              <Text style={styles.statValue}>{userData.streak}</Text>
              <Text style={styles.statLabel}>Sequência</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#f0f0f0' }]}>
                <Ionicons name="trophy-outline" size={20} color="#333" />
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Torneios</Text>
            </View>
          </View>
        </View>

        {/* Subscription Plan Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Plano de Assinatura</Text>
          <View style={styles.planContainer}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{userData.plan.name}</Text>
              <View
                style={[
                  styles.planStatusBadge,
                  {
                    backgroundColor:
                      userData.plan.status === 'active' ? '#f0f0f0' : '#e0e0e0',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.planStatusText,
                    {
                      color:
                        userData.plan.status === 'active' ? '#333' : '#888',
                    },
                  ]}
                >
                  {userData.plan.status === 'active' ? 'Ativo' : 'Inativo'}
                </Text>
              </View>
            </View>

            <View style={styles.planDetails}>
              <View style={styles.planDetailItem}>
                <Text style={styles.planDetailLabel}>Início:</Text>
                <Text style={styles.planDetailValue}>
                  {userData.plan.startDate}
                </Text>
              </View>
              <View style={styles.planDetailItem}>
                <Text style={styles.planDetailLabel}>Término:</Text>
                <Text style={styles.planDetailValue}>
                  {userData.plan.endDate}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Class History Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Histórico de Aulas</Text>
          <FlatList
            data={classHistory.slice(0, 3)} // Show only first 3 classes
            renderItem={renderClassHistoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>
                Nenhuma aula registrada ainda.
              </Text>
            }
          />

          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push('/(auth)/class-history' as any)}
          >
            <Text style={styles.seeAllText}>Ver todo o histórico</Text>
            <Ionicons name="chevron-forward" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(auth)/edit-profile' as any)}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#f0f0f0' }]}>
              <Ionicons name="person-outline" size={20} color="#333" />
            </View>
            <Text style={styles.menuTitle}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={20} color="#DDD" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutButtonText}>
              {isLoading ? 'Saindo...' : 'Sair da conta'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Export the component as default for Expo Router
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    backgroundColor: '#333',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  beltContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  belt: {
    width: 24,
    height: 8,
    borderRadius: 2,
    marginRight: 6,
  },
  stripesContainer: {
    flexDirection: 'row',
  },
  stripe: {
    width: 4,
    height: 8,
    marginRight: 2,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 10,
  },
  seeAllText: {
    color: '#333',
    fontWeight: '600',
    marginRight: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  planStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planDetailLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  planDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyListText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
})
