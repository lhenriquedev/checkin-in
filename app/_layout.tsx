import 'expo-dev-client'

import { QueryClientProvider } from '@tanstack/react-query'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from '@/lib/query-client'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const isSignedIn = true
  const [appIsReady, setAppIsReady] = useState(false)

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
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen once the app is ready
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

  useEffect(() => {
    if (!isSignedIn) return

    const inTabsGroup = segments[0] === '(auth)'

    console.log('User changed: ', isSignedIn)

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(auth)/home')
    } else if (!isSignedIn) {
      router.replace('/(public)/sign-in')
    }
  }, [isSignedIn])

  return <Slot />
}

if (__DEV__) {
  require('@/lib/reactotron')
}

const RootLayoutNav = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <InitialLayout />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayoutNav
