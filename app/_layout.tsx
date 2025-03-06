import 'expo-dev-client'

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { queryClient } from '@/lib/query-client'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const { isSignedIn, isLoading } = useAuth()
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  })

  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    async function prepare() {
      try {
        // Perform any initialization tasks here, such as loading assets
        // For example: await Font.loadAsync({...})

        // When everything is ready, set appIsReady to true
        await new Promise((resolve) => setTimeout(resolve, 500)) // Small delay to ensure smooth transition
      } catch (e) {
        console.warn(e)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (!fontsLoaded) return

    const inAuthGroup = segments[0] === '(auth)'
    const inPublicGroup = segments[0] === '(public)'

    // Navegação baseada no estado de autenticação
    if (isSignedIn && !inAuthGroup) {
      // Se estiver autenticado, mas não estiver na área autenticada
      router.replace('/(auth)/(tabs)/home')
    } else if (!isSignedIn && !inPublicGroup) {
      // Se não estiver autenticado e não estiver na área pública
      router.replace('/(public)/sign-in')
    }
  }, [isSignedIn, fontsLoaded, segments])

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      // Esconde a tela de splash quando o app estiver pronto e
      // não estiver ocorrendo nenhuma operação de autenticação
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, isLoading])

  // Se o app ainda não estiver pronto ou estiver ocorrendo uma operação de autenticação,
  // retorna null para manter a tela de splash visível
  if (!fontsLoaded || isLoading) {
    return null
  }

  return <Slot />
}

if (__DEV__) {
  require('@/lib/reactotron')
}

const RootLayoutNav = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <InitialLayout />
          </AuthProvider>
        </QueryClientProvider>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayoutNav
