/* eslint-disable eqeqeq */

import { getVerses } from '@/services/db';
import { Verse } from '@/types/types';
import { useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';

export default function VersesScreen() {
    const scrollRef = useRef<ScrollView>(null);
    const [verses, setVerses] = useState<Verse[]>([]);

    const route = useRoute();
    const { bookId, chapter, highlightedVerse } = route.params as { bookId: number, chapter: number, highlightedVerse?: number };

    useEffect(() => {
        (async () => {
            const fetchedVerses = await getVerses(bookId, chapter);
            setVerses(fetchedVerses);
        })();

    }, [bookId, chapter]);


    useEffect(() => {
        function scrollToLine() {
            const charInEachLine = Dimensions.get('window').width / 9;
            const lineHeight = styles.verseText.lineHeight; // altura da linha
            const charsBeforeTheVerse = verses.slice(0, (highlightedVerse ?? 1) - 1).reduce((acc, v) => acc + v.text.length + v.verse.toString().length + 1, 0);
            const posY = ((charsBeforeTheVerse / charInEachLine) * lineHeight) + 1;
            
            // console.log("-----------------------------")
            // console.log("charInEachLine: ", charInEachLine);
            // console.log("lineHeight: ", lineHeight);
            // console.log("charsBeforeTheVerse: ", charsBeforeTheVerse);
            // console.log("posY: ", posY);

            scrollRef.current?.scrollTo({ y: posY, animated: true });
        };

        scrollToLine();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ScrollView ref={scrollRef} style={styles.container}>
            <Text style={styles.verseText}>
                {verses.map(v => (
                    <Text
                        key={v.id}
                        style={{ backgroundColor: highlightedVerse == v.verse ? 'yellow' : 'transparent' }}
                        onPress={() => alert(`Versículo ${v.verse}: \n${v.text}`)}
                    >
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
