
import { getVerses } from '@/services/db';
import { Verse } from '@/types/types';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function VersesScreen() {
    const [verses, setVerses] = useState<Verse[]>([]);
    const route = useRoute();
    const { bookId, chapter } = route.params as { bookId: number, chapter: number };

    useEffect(() => {
        (async () => {
            const fetchedVerses = await getVerses(bookId, chapter);
            setVerses(fetchedVerses);
        })();
    }, [bookId, chapter]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.verseText}>
                {verses.map(v => (
                    <Text key={v.id} onPress={() => alert(`Clicou no versículo ${v.verse}!`)}>
                        <Text style={styles.verseNumber}>{v.verse} </Text>
                        {v.text}
                        {' '}
                    </Text>
                ))}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    verseText: {
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'justify',
        paddingBottom: 100,
    },
    verseNumber: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});
