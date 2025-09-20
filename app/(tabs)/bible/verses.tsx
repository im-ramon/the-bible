/* eslint-disable eqeqeq */

import DialogSaveFavorites from '@/components/DialogSaveFavorites';
import { useFontSettingsContext } from '@/hooks/FontSettingsContext';
import { getVerses } from '@/services/db';
import { THEME } from '@/styles/styles';
import { Verse } from '@/types/types';
import { saveLastReadedVerse } from '@/utils/local_storage';
import { useRoute } from '@react-navigation/native';
import { Bookmark } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

export default function VersesScreen() {
    const { fontSettings } = useFontSettingsContext();
    
    const scrollRef = useRef<ScrollView>(null);
    const [verses, setVerses] = useState<Verse[]>([]);
    const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [verseInput, setVerseInput] = useState('');
    const [loading, setLoading] = useState(false);

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

    function openAddBookmarkDialog() {
        setVerseInput('');
        setDialogVisible(true);
    }

    async function handleConfirmBookmark() {
        const verseNumber = Number(verseInput);
        if (!verseNumber || verseNumber < 1 || verseNumber > verses.length) {
            Alert.alert("Número inválido", "Digite um número de versículo válido.");
            return;
        }
        setLoading(true);
        await saveLastReadedVerse(bookId, chapter, verseNumber, bookName);
        setLoading(false);
        setDialogVisible(false);
        Alert.alert("Marcador salvo!", `Versículo ${verseNumber} foi salvo como último lido.`);
    }

    return (
        <>
            <ScrollView ref={scrollRef} style={styles.container}>
                <Text style={styles.verseText}>
                    {verses.map(v => (
                        <Text
                            key={v.id}
                            style={{
                                backgroundColor: highlightedVerse == v.verse ? 'yellow' : 'transparent',
                                fontSize: fontSettings.size,
                                fontWeight: fontSettings.weight,
                            }}
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
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>Salvar última leitura</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Número do versículo"
                            value={verseInput}
                            onChangeText={setVerseInput}
                            keyboardType="numeric"
                            mode="outlined"
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
                        <Button loading={loading} onPress={handleConfirmBookmark}>Salvar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <TouchableOpacity
                style={styles.fab}
                onPress={openAddBookmarkDialog}
                activeOpacity={0.8}
            >
                <Bookmark size={24} color="#fff" />
            </TouchableOpacity>
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
