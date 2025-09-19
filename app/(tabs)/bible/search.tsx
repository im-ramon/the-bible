
import { search } from '@/services/db';
import { THEME } from '@/styles/styles';
import { SearchResult } from '@/types/types';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const router = useRouter();

    const handleSearch = async () => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const searchResults = await search(query);
        setResults(searchResults);
    };

    const navigateToVerse = (item: SearchResult) => {
        router.navigate({
            pathname: "/(tabs)/bible/verses",
            params: { bookId: item.book_id, chapter: item.chapter, bookName: item.book_name, highlightedVerse: item.verse },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar na Bíblia..."
                    placeholderTextColor={THEME.COLORS.BLACK}
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                >
                    <Search size={24} color={THEME.COLORS.WHITE} />
                </TouchableOpacity>
            </View>

            {results.length === 0 && query.trim() !== '' && (
                <Text style={styles.noResultsText}>
                    Nenhum resultado encontrado.
                </Text>
            )}

            <FlatList
                data={results}
                keyExtractor={(item, index) => `${item.book_name}-${item.chapter}-${item.verse}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigateToVerse(item)}>
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
        color: THEME.COLORS.BLACK,
        width: "90%"
    },
    search: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#ccc',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: THEME.SIZE.BORDER_WIDTH,
        flexDirection: 'row',
        fontSize: 8,
        gap: 8,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 6,
        width: '100%',
    },
    searchButton: {
        backgroundColor: THEME.COLORS.GRAY,
        padding: 6,
        borderRadius: THEME.SIZE.BORDER_RADIUS,
    },
    noResultsText: {
        color: THEME.COLORS.BLACK,
        marginBottom: "auto",
        marginTop: 20,
        textAlign: 'center',
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
