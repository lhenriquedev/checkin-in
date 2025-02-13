import { withLayoutContext } from 'expo-router';
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationOptions,
  NativeBottomTabNavigationEventMap,
} from '@bottom-tabs/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);


export default function TabLayout() {
  return (
    <Tabs    ignoresTopSafeArea
    hapticFeedbackEnabled>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => ({ sfSymbol: "house" }),
        }}
      />
    </Tabs>
  );
}