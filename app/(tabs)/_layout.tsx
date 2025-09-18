import { THEME } from '@/styles/styles';
import { Tabs } from 'expo-router';
import { Bookmark, BookMarked, Home, Search, Settings } from 'lucide-react-native';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 66,
                    paddingBottom: 0,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: THEME.COLORS.PRIMARY,
                tabBarActiveBackgroundColor: THEME.COLORS.PRIMARY + "33",
            }}>
            <Tabs.Screen
                name="configuration"
                options={{
                    title: 'Configurações',
                    tabBarIcon: ({ color }) => <Settings color={color} />,
                }}
            />
            <Tabs.Screen
                name="bible"
                options={{
                    title: 'Bíblia',
                    tabBarIcon: ({ color }) => <BookMarked color={color} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Página inicial',
                    tabBarIcon: ({ color }) => <Home color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Busca',
                    tabBarIcon: ({ color }) => <Search color={color} />,
                }}
            />
            <Tabs.Screen
                name="bookmarks"
                options={{
                    title: 'Favoritos',
                    tabBarIcon: ({ color }) => <Bookmark color={color} />,
                }}
            />
        </Tabs>
    );
}
