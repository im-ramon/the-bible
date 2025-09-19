import { THEME } from '@/styles/styles';
import { Tabs } from 'expo-router';
import { Bookmark, BookMarked, Home, Search, Settings } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function TabLayout() {
    const pageIcons = {
        configuration: <Settings color={THEME.COLORS.BLACK} />,
        bible: <BookMarked color={THEME.COLORS.BLACK} />,
        index: <Home color={THEME.COLORS.BLACK} />,
        explore: <Search color={THEME.COLORS.BLACK} />,
        bookmarks: <Bookmark color={THEME.COLORS.BLACK} />,
    }
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: THEME.COLORS.PRIMARY,
                tabBarActiveBackgroundColor: THEME.COLORS.PRIMARY + "30",
                header: (props) => {
                    return (
                        <View style={{
                            height: 60,
                            backgroundColor: THEME.COLORS.BACKGROUND,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 16,
                            borderBottomColor: THEME.COLORS.GRAY,
                            borderBottomWidth: THEME.SIZE.BORDER_WIDTH,
                            paddingLeft: 24,
                            gap: 8,
                        }}>
                            {props.route.name in pageIcons ? pageIcons[props.route.name as keyof typeof pageIcons] : null}
                            <Text style={{
                                color: THEME.COLORS.BLACK,
                                fontSize: 18,
                                fontWeight: "bold",
                            }}>
                                {props.options.title}
                            </Text>
                        </View>
                    )
                },
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
                    headerShown: false,
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
        </Tabs >
    );
}
