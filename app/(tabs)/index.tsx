
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksScreen from '../screens/BooksScreen';
import ChaptersScreen from '../screens/ChaptersScreen';
import VersesScreen from '../screens/VersesScreen';

const Stack = createNativeStackNavigator();

export default function BibleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Books" 
        component={BooksScreen} 
        options={{ title: 'Bíblia ACF' }} 
      />
      <Stack.Screen 
        name="Chapters" 
        component={ChaptersScreen} 
        options={({ route }) => ({ title: route.params.bookName })} 
      />
      <Stack.Screen 
        name="Verses" 
        component={VersesScreen} 
        options={({ route }) => ({ title: `${route.params.bookName} ${route.params.chapter}` })} 
      />
    </Stack.Navigator>
  );
}
