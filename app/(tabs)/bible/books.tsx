
import { getBooks } from '@/services/db';
import { Book } from '@/types/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollText, TableOfContents } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BooksScreen() {
    const params = useLocalSearchParams();
    const sectionListRef = useRef<SectionList>(null);

    const [sections, setSections] = useState<{ title: string; data: Book[] }[]>([]);
    const router = useRouter();

    const ITEM_HEIGHT = 54.7;

    useEffect(() => {
        (async () => {
            const { oldTestament, newTestament } = await getBooks();
            setSections([
                { title: 'Antigo Testamento', data: oldTestament },
                { title: 'Novo Testamento', data: newTestament },
            ]);
        })();
    }, []);


    useEffect(() => {
        if (params.title === 'Novo Testamento' && sections.length > 1) {
            sectionListRef.current?.scrollToLocation({
                sectionIndex: 1, // índice da seção Novo Testamento
                itemIndex: 0,
                animated: true,
            });
        } else if (params.title === 'Antigo Testamento' && sections.length > 1) {
            sectionListRef.current?.scrollToLocation({
                sectionIndex: 0, // índice da seção Antigo Testamento
                itemIndex: 0,
                animated: true,
            });
        }
    }, [sections, params.title]);

    const handlePressBook = (book: Book) => {
        router.navigate({
            pathname: "/(tabs)/bible/chapters",
            params: {
                bookId: book.id,
                bookName: book.name,
            },
        });
    };

    const getChaptersCount = (book: Book): number => {
        return book.chapters.length;
    };

    return (
        <View style={styles.container}>
            <SectionList
                ref={sectionListRef}
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePressBook(item)} style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, opacity: 0.25 }}>
                            <Text>{getChaptersCount(item)}</Text>
                            <TableOfContents
                                size={16}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{
                        backgroundColor: '#f4f4f4',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        paddingTop: title === 'Novo Testamento' ? 36 : 0
                    }}>
                        <ScrollText size={24} />
                        <Text style={{ ...styles.header }}>{title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: '#f4f4f4',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    itemText: {
        fontSize: 18,
    },
});
