
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksScreen from './books';
import ChaptersScreen from './chapters';
import VersesScreen from './verses';

const Stack = createNativeStackNavigator();

export default function BibleStack() {
    return (
        <Stack.Navigator>
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
