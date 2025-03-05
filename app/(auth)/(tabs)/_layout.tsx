import { Tabs } from 'expo-router'

import { CustomTabBar } from '@/components/bottom-tab'
import DynamicHeader from '@/components/dynamic-header'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: ({ ...props }) => <DynamicHeader {...props} />,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
        }}
      />

      <Tabs.Screen
        name="classes"
        options={{
          title: 'Aulas',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
        }}
      />

      <Tabs.Screen
        name="class-history"
        options={{
          title: 'Histórico de Aulas',
          href: null,
        }}
      />

      <Tabs.Screen
        name="edit-profile"
        options={{
          title: 'Editar Perfil',
          href: null,
        }}
      />

      <Tabs.Screen
        name="class-details"
        options={{
          title: 'Aula',
          href: null,
        }}
      />
    </Tabs>
  )
}
