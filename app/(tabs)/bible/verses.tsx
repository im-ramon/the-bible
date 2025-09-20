/* eslint-disable eqeqeq */

import DialogSaveFavorites from '@/components/dialog_save_favorites';
import { getVerses } from '@/services/db';
import { THEME } from '@/styles/styles';
import { Verse } from '@/types/types';
import { saveLastReadedVerse } from '@/utils/local_storage';
import { useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';

export default function VersesScreen() {
    const scrollRef = useRef<ScrollView>(null);
    const [verses, setVerses] = useState<Verse[]>([]);
    const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

    const route = useRoute();
    const { bookId, chapter, highlightedVerse, bookName } = route.params as { bookId: number, chapter: number, highlightedVerse?: number, bookName: string };

    function handleClickVerse(verse: Verse) {
        setSelectedVerse(verse);
    }

    useEffect(() => {
        (async () => {
            const fetchedVerses = await getVerses(bookId, chapter);
            setVerses(fetchedVerses);
        })();

    }, [bookId, chapter]);


    useEffect(() => {
        (() => {
            const charInEachLine = Dimensions.get('window').width / 9;
            const lineHeight = styles.verseText.lineHeight; // altura da linha
            const charsBeforeTheVerse = verses.slice(0, (highlightedVerse ?? 1) - 1).reduce((acc, v) => acc + v.text.length + v.verse.toString().length + 1, 0);
            const posY = ((charsBeforeTheVerse / charInEachLine) * lineHeight) + 1;
            scrollRef.current?.scrollTo({ y: posY, animated: true });
        })()

        saveLastReadedVerse(bookId, chapter, bookName);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <ScrollView ref={scrollRef} style={styles.container}>
                <Text style={styles.verseText}>
                    {verses.map(v => (
                        <Text
                            key={v.id}
                            style={{ backgroundColor: highlightedVerse == v.verse ? 'yellow' : 'transparent' }}
                            onPress={() => handleClickVerse(v)}
                        >
                            <Text style={styles.verseNumber}>{v.verse} </Text>
                            {v.text}
                            {' '}
                        </Text>
                    ))}
                </Text>
            </ScrollView>
            <DialogSaveFavorites
                visible={!!selectedVerse}
                hideDialog={() => setSelectedVerse(null)}
                verse={selectedVerse}
                bookName={bookName}
            />
        </>
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
    fab: {
        alignItems: 'center',
        backgroundColor: THEME.COLORS.SUCCESS,
        borderRadius: 32,
        bottom: 32,
        elevation: 6,
        height: 45,
        justifyContent: 'center',
        position: 'absolute',
        right: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: 45,
    },
});
