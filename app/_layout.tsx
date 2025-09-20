import { FontSettingsProvider } from "@/hooks/FontSettingsContext";
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
    MD3LightTheme as DefaultThemeNativePaper,
    PaperProvider
} from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
    anchor: '(tabs)',
};

const theme = {
    ...DefaultThemeNativePaper,
    colors: {
        ...DefaultThemeNativePaper.colors,
        primary: 'red',
        secondary: 'yellow',
    },
    roundness: 2,
    fonts: {
        ...DefaultThemeNativePaper.fonts,
        default: {
            ...DefaultThemeNativePaper.fonts.default,
            fontSize: 14,
        },
    }
};

export default function RootLayout() {
    useEffect(() => {
        NavigationBar.setStyle("auto");
    }, []);

    return (
        <ThemeProvider value={DefaultTheme}>
            <FontSettingsProvider>
                <PaperProvider theme={theme}>
                    <SafeAreaProvider>
                        <SafeAreaView style={{ flex: 1 }}>
                            <Stack>
                                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            </Stack>
                        </SafeAreaView>
                    </SafeAreaProvider>
                </PaperProvider>
                <StatusBar style="auto" />
            </FontSettingsProvider>
        </ThemeProvider >
    );
}
