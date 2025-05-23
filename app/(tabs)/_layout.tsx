import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, BookOpen, ShoppingCart, User } from 'lucide-react-native';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 18,
          color: theme.text,
        },
        headerTintColor: theme.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meal Plans',
          tabBarLabel: 'Meal Plans',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarLabel: 'Recipes',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="grocery-list"
        options={{
          title: 'Grocery List',
          tabBarLabel: 'Groceries',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}