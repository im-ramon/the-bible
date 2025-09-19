import { THEME } from "@/styles/styles";
import { Verse } from "@/types/types";
import { getFavoriteVerses } from "@/utils/local_storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { Share2, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

export default function Bookmarks() {
    const router = useRouter();

    const [favorites, setFavorites] = useState<(Verse & { bookName: string })[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    async function fetchFavorites() {
        setLoading(true);
        const favs = await getFavoriteVerses();
        setFavorites(favs);
        setLoading(false);
    }

    useEffect(() => {
        fetchFavorites();
        // Adiciona listener para atualizar ao voltar para bookmarks
        const unsubscribe = navigation.addListener('focus', fetchFavorites);
        return unsubscribe;
    }, [navigation]);

    async function handleDelete(verse: any) {
        const stored = await AsyncStorage.getItem('favoriteVerses');
        let favs: any[] = stored ? JSON.parse(stored) : [];
        favs = favs.filter(v =>
            !(v.bookName === verse.bookName && v.chapter === verse.chapter && v.verse === verse.verse)
        );
        await AsyncStorage.setItem('favoriteVerses', JSON.stringify(favs));
        setFavorites(favs);
    }

    async function handleClearAll() {
        Alert.alert(
            "Limpar todos?",
            "Tem certeza que deseja remover todos os versos favoritos?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Confirmar",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem('favoriteVerses');
                        setFavorites([]);
                    }
                }
            ]
        );
    }

    function handleShare(verse: any) {
        const msg = `${verse.bookName} ${verse.chapter}:${verse.verse} - ${verse.text}`;
        Share.share({ message: msg });
    }

    function handleNavigate(verse: any) {
        const data = {
            bookName: verse.bookName,
            bookId: parseInt(verse.book_id, 10),
            chapter: parseInt(verse.chapter, 10),
            text: verse.text,
            verse: parseInt(verse.verse, 10),
            highlightedVerse: [parseInt(verse.verse, 10)]
        };

        router.navigate({
            pathname: "/(tabs)/bible/verses",
            params: data
        });
    }

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum verso favorito salvo.</Text>
            ) : (
                loading ? <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} style={{ marginTop: 20 }} /> :
                    <ScrollView>
                        {favorites.map((v, idx) => (
                            <View key={`${v.bookName}-${v.chapter}-${v.verse}-${idx}`} style={styles.verseRow}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => handleNavigate(v)}>
                                    <Text style={styles.verseText}>
                                        <Text style={styles.verseNumber}>{v.bookName} {v.chapter}:{v.verse} </Text>
                                        {v.text}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => handleShare(v)} style={styles.actionBtn}>
                                        <Share2 size={18} color={THEME.COLORS.PRIMARY} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(v)} style={styles.actionBtn}>
                                        <Trash2 size={19} color={THEME.COLORS.DANGER} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
            )}
            {
                (favorites.length > 0 && !loading) && (
                    <Button
                        mode="contained-tonal"
                        style={styles.clearAllBtn}
                        onPress={handleClearAll}
                        icon={() => <Trash2 size={18} color={THEME.COLORS.DANGER} />}
                    >
                        Limpar todos os versos salvos
                    </Button>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center"
    },
    clearAllBtn: {
        alignSelf: "center",
        backgroundColor: THEME.COLORS.DANGER + "20",
        borderRadius: 8,
        marginBottom: 10
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#888"
    },
    verseRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    verseText: {
        fontSize: 16,
        flexShrink: 1,
        marginRight: 8
    },
    verseNumber: {
        fontWeight: "bold",
        fontSize: 14
    },
    actions: {
        flexDirection: "row",
        alignItems: "center"
    },
    actionBtn: {
        marginLeft: 8,
        padding: 8,
        backgroundColor: THEME.COLORS.GRAY + "50",
        borderRadius: THEME.SIZE.BORDER_RADIUS,
    },
    actionText: {
        fontSize: 18
    }
});