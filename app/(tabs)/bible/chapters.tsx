
import { getChapters } from '@/services/db';
import { Chapter } from '@/types/types';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChaptersScreen() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const route = useRoute();
    const { bookId, bookName } = route.params as { bookId: number, bookName: string };
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const fetchedChapters = await getChapters(bookId);
            setChapters(fetchedChapters);
        })();
    }, [bookId, bookName]);

    const handlePressChapter = (chapter: number) => {
        // navigation.navigate('Verses', { bookId, chapter, bookName });
        router.navigate({
            pathname: "/(tabs)/bible/verses",
            params: {
                bookId,
                chapter,
                bookName,
            },
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chapters}
                keyExtractor={(item) => item.chapter.toString()}
                numColumns={5}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePressChapter(item.chapter)} style={styles.item}>
                        <Text style={styles.itemText}>{item.chapter}</Text>
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
    item: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
    },
});
