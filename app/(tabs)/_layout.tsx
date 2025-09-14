import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bíblia',
          tabBarIcon: ({ color }) => <Text style={{color: color}}>B</Text>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Busca',
          tabBarIcon: ({ color }) => <Text style={{color: color}}>P</Text>,
        }}
      />
    </Tabs>
  );
}
