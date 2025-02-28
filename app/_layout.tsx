import 'expo-dev-client'

import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { tokenCache } from '@/lib/cache'
import { queryClient } from '@/lib/query-client'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

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
  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
          <ClerkLoaded>
            <QueryClientProvider client={queryClient}>
              <InitialLayout />
            </QueryClientProvider>
          </ClerkLoaded>
        </ClerkProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayoutNav
