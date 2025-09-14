import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    MD3LightTheme as DefaultThemeNativePaper,
    PaperProvider,
} from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
    anchor: '(tabs)',
};

const theme = {
    ...DefaultThemeNativePaper,
    colors: {
        ...DefaultThemeNativePaper.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
    roundness: 2,
};

export default function RootLayout() {
    return (
        <ThemeProvider value={DefaultTheme}>
            <PaperProvider theme={theme}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </SafeAreaView>
            </PaperProvider>
            <StatusBar style="dark" />
        </ThemeProvider >
    );
}
