import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { TamaguiProvider, Theme } from "tamagui";
import { config } from "../tamagui.config";

export const unstable_settings = {
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Inter: Inter_400Regular,
        InterBold: Inter_700Bold,
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    const theme = useMemo(() => colorScheme === 'dark' ? DarkTheme : DefaultTheme, [colorScheme]);

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={config} defaultTheme={colorScheme!}>
            <ThemeProvider value={theme}>
                <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                    <StatusBar style="auto" />
                </Theme>
            </ThemeProvider>
        </TamaguiProvider>
    );
}
