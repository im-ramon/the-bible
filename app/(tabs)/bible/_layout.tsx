
import { THEME } from '@/styles/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import BooksScreen from './books';
import ChaptersScreen from './chapters';
import VersesScreen from './verses';

const Stack = createNativeStackNavigator();

export default function BibleStack() {
    const router = useRouter();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                header: (props) => {
                    return (
                        <View
                            style={{
                                alignItems: "center",
                                flexDirection: "row",
                                height: props.options.title === "Bíblia" ? 0 : 50,
                                justifyContent: "flex-start",
                                paddingHorizontal: 16,
                            }}
                        >
                            {props.options.title === "Bíblia" ? null : (
                                <>
                                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                                        <ArrowLeft color={THEME.COLORS.BLACK} size={24} />
                                    </TouchableOpacity>
                                    <Text style={{
                                        color: THEME.COLORS.BLACK,
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}>
                                        {props.options.title}
                                    </Text>
                                </>
                            )}
                        </View>
                    )
                },
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen
                name="books"
                component={BooksScreen}
                options={{ title: 'Bíblia' }}
            />
            <Stack.Screen
                name="chapters"
                component={ChaptersScreen}
                options={({ route }: { route: { params?: { bookName?: string } } }) => ({
                    title: route.params?.bookName || 'Chapters',
                })}
            />
            <Stack.Screen
                name="verses"
                component={VersesScreen}
                options={({ route }: { route: { params?: { bookName?: string; chapter?: number } } }) => ({
                    title: `${route.params?.bookName} ${route.params?.chapter}`,
                })}
            />
        </Stack.Navigator>
    );
}
