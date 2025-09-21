/* eslint-disable eqeqeq */

import { bible } from '@/assets/db/ACF';
import DialogSaveFavorites from '@/components/dialog_save_favorites';
import { useAppContext } from '@/contexts/app.context';
import { getVerses } from '@/services/db';
import { THEME } from '@/styles/styles';
import { Verse } from '@/types/types';
import { saveLastReadedVerse } from '@/utils/local_storage';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function VersesScreen() {
    const scrollRef = useRef<ScrollView>(null);

    const { fontSize } = useAppContext();

    const [verses, setVerses] = useState<Verse[]>([]);
    const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

    const route = useRoute();
    const router = useRouter();
    const { bookId, chapter, highlightedVerse, bookName } = route.params as { bookId: number, chapter: number, highlightedVerse?: number, bookName: string };
    const numberOfChapters = getNumberOfChapters(bookId);

    function handleClickVerse(verse: Verse) {
        setSelectedVerse(verse);
    }

    function navigateBetweenChapters(action: "previous" | "next") {
        const newChapter = action === "next" ? Number(chapter) + 1 : Number(chapter) - 1;

        if (newChapter < 1 || newChapter > numberOfChapters) return;

        blink();
        router.navigate({
            pathname: "/(tabs)/bible/verses",
            params: {
                bookId,
                chapter: newChapter,
                bookName,
            },
        });
    }

    function getNumberOfChapters(bookId: number) {
        return bible[bookId - 1].chapters.length;
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

    // Added for animation
    const opacity = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });
    const blink = () => {
        opacity.value = withTiming(0, { duration: 400 }, () => {
            opacity.value = withTiming(1, { duration: 400 });
        });
    };

    return (
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <ScrollView ref={scrollRef} style={styles.container}>
                <Text style={{ ...styles.verseText, fontSize: fontSize }}>
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
            {/* Botões flutuantes para navegação de capítulos */}
            <View style={styles.fabContainer} pointerEvents="box-none">
                <TouchableOpacity
                    style={[styles.fab, { left: 24, right: undefined, display: chapter <= 1 ? 'none' : 'flex' }]}
                    onPress={() => navigateBetweenChapters("previous")}
                    disabled={chapter <= 1}
                >
                    <CircleArrowLeft size={20} color={THEME.COLORS.WHITE} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.fab, { right: 24, left: undefined, display: chapter >= numberOfChapters ? 'none' : 'flex' }]}
                    onPress={() => navigateBetweenChapters("next")}
                >
                    <CircleArrowRight size={20} color={THEME.COLORS.WHITE} />
                </TouchableOpacity>
            </View>
            <DialogSaveFavorites
                visible={!!selectedVerse}
                hideDialog={() => setSelectedVerse(null)}
                verse={selectedVerse}
                bookName={bookName}
            />
        </Animated.View>
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
    fabContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        pointerEvents: 'box-none',
    },
    fab: {
        alignItems: 'center',
        backgroundColor: THEME.COLORS.BLACK,
        borderRadius: 32,
        elevation: 6,
        height: 36,
        justifyContent: 'center',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: 36,
    },
});
