
import { daylyVerse, queryVerse } from '@/assets/db/daylyVerse';
import { THEME } from '@/styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bookmark, BookMarked, Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import bookmark from '../../assets/images/bookmark.png';

export default function Index() {
    const router = useRouter();

    const [daylyVerseText, setDaylyVerseText] = useState<{ text: string; book: string; chapter: number; verse: number, bookId: number }>({
        text: '',
        book: '',
        chapter: 0,
        verse: 0,
        bookId: 0,
    });
    useEffect(() => {
        const randomVerse = daylyVerse[Math.floor(Math.random() * daylyVerse.length)];
        setDaylyVerseText({
            book: randomVerse.book,
            chapter: randomVerse.chapter,
            verse: randomVerse.verse,
            text: queryVerse(randomVerse.book, randomVerse.chapter, randomVerse.verse),
            bookId: randomVerse.bookId,
        });
    }, []);

    return (
        <View style={styles.image}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerH1}>Bíblia Sagrada</Text>
                    <Text>Versão ACF - Almeida Corrigida e Fiel</Text>
                </View>

                <TouchableOpacity
                    style={styles.search}
                    onPress={() => {
                        router.push({
                            pathname: '/(tabs)/explore',
                            params: { title: 'Buscar na Bíblia' }
                        });
                    }}
                >
                    <Search size={24} color="#ccc" />
                    <Text style={{ fontSize: 12 }}>Pesquise por passagens, livros ou palavras chaves</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.daylyVerse}
                    onPress={() => {
                        router.navigate({
                            pathname: "/(tabs)/bible/verses",
                            params: {
                                bookId: daylyVerseText.bookId,
                                chapter: daylyVerseText.chapter,
                                bookName: daylyVerseText.book,
                                highlightedVerse: daylyVerseText.verse
                            },
                        });
                    }}
                    activeOpacity={0.95}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0.75 }}
                        end={{ x: 1, y: 0.25 }}
                        colors={['#5073a2', '#263d5c']}
                        style={styles.daylyVerseBackground}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            width: 36,
                            height: 36,
                            top: -4,
                            left: 32,
                        }}>
                        <Image
                            source={bookmark}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                    <View style={styles.daylyVerseHeader}>
                        <Bookmark color='white' size={12} />
                        <Text style={styles.daylyVerseHeaderText}>
                            {daylyVerseText.book} {daylyVerseText.chapter}:{daylyVerseText.verse}
                        </Text>
                    </View>
                    <Text style={styles.daylyVerseText}>
                        “
                        {daylyVerseText.text}
                        ”
                    </Text>
                </TouchableOpacity>

                <View style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    width: '100%',
                    marginTop: 1,
                    paddingBottom: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        position: 'absolute',
                        top: -5,
                        backgroundColor: '#f2f2f2',
                        paddingHorizontal: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: "#adadad",
                            }}
                        >
                            Menu
                        </Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <BookMarked size={36} color={THEME.COLORS.PRIMARY} />
                        <Text>Continuar leitura</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <BookMarked size={36} color={THEME.COLORS.PRIMARY} />
                        <Text>Continuar leitura</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        top: -16,
    },
    header: {
        width: '100%',
        alignItems: 'center',
    },
    headerH1: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    search: {
        width: '100%',
        marginTop: 48,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        fontSize: 8,
    },
    daylyVerse: {
        width: '100%',
        marginTop: 18,
        padding: 20,
    },
    daylyVerseBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    daylyVerseHeader: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    daylyVerseHeaderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'right',
    },
    daylyVerseText: {
        color: 'white',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 48,
        textAlign: 'left',
    },
    menuContainer: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 24,
        borderBottomWidth: 2,
        borderBottomColor: THEME.COLORS.PRIMARY,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#ffffff',
    },
});
