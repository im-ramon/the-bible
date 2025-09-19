import { daylyVerse, queryVerse } from '@/assets/db/daylyVerse';
import { THEME } from '@/styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Book, Bookmark, BookMarked, ChevronRight, Clock10, Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import backgroundImage from '../../assets/images/bg-paper.jpg';
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
        <ImageBackground source={backgroundImage} style={styles.image}>
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
                    <View style={styles.bookmarkWrapper}>
                        <Image
                            source={bookmark}
                            style={styles.bookmarkImage}
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

                <View>
                    <View style={styles.menuItemTitleArea}>
                        <Clock10 color={THEME.COLORS.BLACK} size={16} />
                        <Text style={styles.menuItemTitle}>Continuar lendo</Text>
                    </View>

                    <TouchableOpacity style={styles.menuItem}>
                        <BookMarked color={THEME.COLORS.PRIMARY} size={32} />
                        <View>
                            <Text style={styles.firstMenuItemText}>Gênesis</Text>
                            <Text style={styles.firstMenuItemSubText}>Capítulo 1 - Verso 1</Text>
                        </View>
                        <View style={{ marginLeft: 'auto' }} >
                            <ChevronRight size={28} color={THEME.COLORS.GRAY} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 16, width: '100%' }}>
                    <View style={styles.menuItemTitleArea}>
                        <Book color={THEME.COLORS.BLACK} size={16} />
                        <Text style={styles.menuItemTitle}>Explorar a Bíblia</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 12}}>
                        <TouchableOpacity style={styles.menu2Item}>
                            <Text style={styles.firstMenuItemText}>Antigo testamento</Text>
                            <Text style={styles.firstMenuItemSubText}>39 livros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu2Item}>
                            <Text style={styles.firstMenuItemText}>Novo testamento</Text>
                            <Text style={styles.firstMenuItemSubText}>27 livros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
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
        borderStyle: 'solid',
        borderWidth: THEME.SIZE.BORDER_WIDTH,
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
        borderRadius: 16,
        elevation: 24,
        height: "100%",
        left: 0,
        position: 'absolute',
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        top: 0,
    },
    bookmarkWrapper: {
        position: 'absolute',
        width: 36,
        height: 36,
        top: -4,
        left: 32,
    },
    bookmarkImage: {
        height: "100%",
        resizeMode: 'contain',
        width: "100%",
    },
    daylyVerseHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'flex-end',
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
        marginBottom: 48,
        marginTop: 24,
        textAlign: 'left',
    },
    menuDivider: {
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center',
        marginTop: 1,
        paddingBottom: 8,
        width: '100%',
    },
    menuLabelWrapper: {
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderColor: '#ccc',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 4,
        position: 'absolute',
        top: -6,
    },
    menuLabelText: {
        color: "#141414",
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        marginTop: 16,
        width: '100%',
    },
    menuItem: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: THEME.COLORS.GRAY,
        borderWidth: THEME.SIZE.BORDER_WIDTH,
        borderLeftWidth: THEME.SIZE.BORDER_WIDTH,
        borderRadius: THEME.SIZE.BORDER_RADIUS,
        gap: 4,
        marginBottom: 8,
        paddingHorizontal: 18,
        paddingVertical: 18,
        width: '100%',
        flexDirection: 'row',
    },
    menu2Item: {
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderColor: THEME.COLORS.GRAY,
        borderWidth: THEME.SIZE.BORDER_WIDTH,
        borderLeftWidth: THEME.SIZE.BORDER_WIDTH,
        borderRadius: THEME.SIZE.BORDER_RADIUS,
        gap: 4,
        marginBottom: 8,
        paddingHorizontal: 18,
        paddingVertical: 18,
        flex: 1,
    },
    firstMenuItemText: {
        fontSize: 16 - 2,
        fontWeight: '700',
        color: THEME.COLORS.PRIMARY,
        top: 0,
    },
    firstMenuItemSubText: {
        fontSize: 14 - 2,
        fontWeight: '600',
        opacity: 0.6,
        bottom: 1,
    },
    menuList: {
        flex: 1,
        width: '100%',
        gap: 8,
        marginTop: 0,
        marginBottom: 32,
    },
    menuItemTitleArea: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        marginBottom: 8,
        width: '100%',
        paddingLeft: 4,
    },
    menuItemTitle: {
        color: THEME.COLORS.BLACK,
        fontSize: 14,
        fontWeight: '600',
    }
});