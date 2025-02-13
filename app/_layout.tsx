import "../global.css";

import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";


import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/cache";


import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://db6a95c2a02c3220901552ae478d8bf1@o4508761356763136.ingest.us.sentry.io/4508761362071552',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/(auth)/home");
    } else if (!isSignedIn) {
      router.replace("/(public)/sign-in");
    }
  }, [isSignedIn]);

  return <Slot />;
};


if (__DEV__) {
  require('@/lib/reactotron');
}

const RootLayoutNav = () => {
  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <InitialLayout />
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
