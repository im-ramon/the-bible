
import { search } from '@/services/db';
import { SearchResult } from '@/types/types';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const searchResults = await search(query);
        setResults(searchResults);
    };

    const navigateToVerse = (navigation: any, item: SearchResult) => {
        navigation.navigate('Verses', { bookId: item.book_id, chapter: item.chapter, bookName: item.book_name });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar na Bíblia..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            <FlatList
                data={results}
                keyExtractor={(item, index) => `${item.book_name}-${item.chapter}-${item.verse}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigateToVerse(navigation, item)}>
                        <Text style={styles.itemText}>
                            <Text style={styles.itemTitle}>{`${item.book_name} ${item.chapter}:${item.verse}`}</Text> – {item.text}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
    itemTitle: {
        fontWeight: 'bold',
    },
});
