import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

import DynamicHeader from '../../components/dynamic-header'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: ({ ...props }) => <DynamicHeader {...props} />,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Aulas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar-clear' : 'calendar-clear-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 70,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    marginBottom: 5,
  },
})
