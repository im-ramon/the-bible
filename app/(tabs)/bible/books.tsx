
import { getBooks } from '@/services/db';
import { Book } from '@/types/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BooksScreen() {
    const [sections, setSections] = useState<{ title: string; data: Book[] }[]>([]);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { oldTestament, newTestament } = await getBooks();
            setSections([
                { title: 'Antigo Testamento', data: oldTestament },
                { title: 'Novo Testamento', data: newTestament },
            ]);
        })();
    }, []);

    const handlePressBook = (book: Book) => {
        router.navigate({
            pathname: "/(tabs)/bible/chapters",
            params: {
                bookId: book.id,
                bookName: book.name,
            },
        });
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePressBook(item)} style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
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
        padding: 10,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});
