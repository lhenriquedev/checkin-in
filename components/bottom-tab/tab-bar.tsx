import { Ionicons } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { TabBarTheme } from './theme'

// Define types for the Ionicons names we're using
export type IconName =
  | 'home'
  | 'home-outline'
  | 'calendar-number'
  | 'calendar-number-outline'
  | 'person'
  | 'person-outline'
  | 'help-circle-outline'

/**
 * Custom Tab Bar component with a prominent center button
 * @param props Bottom tab bar props from React Navigation
 */
export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        // Skip rendering tab items that should be hidden
        if (
          route.name === 'class-history' ||
          route.name === 'edit-profile' ||
          route.name === 'class-details'
        ) {
          return null
        }

        const { options } = descriptors[route.key]
        const label = options.title || route.name
        const isFocused = state.index === index

        // Get icon information
        const getIconName = (): IconName => {
          if (route.name === 'home') return isFocused ? 'home' : 'home-outline'
          if (route.name === 'classes')
            return isFocused ? 'calendar-number' : 'calendar-number-outline'
          if (route.name === 'profile')
            return isFocused ? 'person' : 'person-outline'
          return 'help-circle-outline'
        }

        // Special styling for the classes tab (center button)
        const isClassesTab = route.name === 'classes'

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        if (isClassesTab) {
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.centerButton}
            >
              <View style={styles.centerButtonContent}>
                <Ionicons
                  name={getIconName()}
                  size={TabBarTheme.iconSize.center}
                  color="#fff"
                />
                <Text style={styles.centerButtonLabel}>{label}</Text>
              </View>
            </TouchableOpacity>
          )
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={getIconName()}
              size={TabBarTheme.iconSize.regular}
              color={
                isFocused ? TabBarTheme.activeColor : TabBarTheme.inactiveColor
              }
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused
                    ? TabBarTheme.activeColor
                    : TabBarTheme.inactiveColor,
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: TabBarTheme.height,
    backgroundColor: TabBarTheme.backgroundColor,
    borderTopWidth: 1,
    borderTopColor: TabBarTheme.borderColor,

    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: TabBarTheme.fontSize,
    marginTop: 3,
    fontWeight: TabBarTheme.fontWeight,
  },
  centerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#e6e6e6',
    borderRadius: 100,
    bottom: 5,
  },
  centerButtonContent: {
    backgroundColor: TabBarTheme.primaryColor,
    width: TabBarTheme.centerButtonSize,
    height: TabBarTheme.centerButtonSize,
    borderRadius: TabBarTheme.centerButtonRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonLabel: {
    fontSize: TabBarTheme.fontSize,
    color: TabBarTheme.backgroundColor,
    fontWeight: TabBarTheme.fontWeight,
    marginTop: 2,
  },
})
