import { Verse } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveFavoriteVerse(verse: Verse, bookName?: string) {
    try {
        const key = 'favoriteVerses';
        const newFavorite = {
            ...verse,
            bookName: bookName || '',
        };
        const stored = await AsyncStorage.getItem(key);
        let favorites: any[] = [];
        if (stored) {
            favorites = JSON.parse(stored);
        }
        if (!favorites.some(v => v.bookName === newFavorite.bookName && v.chapter === newFavorite.chapter && v.verse === newFavorite.verse)) {
            favorites.push(newFavorite);
            await AsyncStorage.setItem(key, JSON.stringify(favorites));
        }
    } catch (e) {
        // Trate erros se necessário
        console.error('Error saving favorite verse:', e);
    }
}

export async function getFavoriteVerses(): Promise<(Verse & { bookName: string })[]> {
    try {
        const stored = await AsyncStorage.getItem('favoriteVerses');
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    } catch {
        return [];
    }
}

export async function logAllFavoriteVerses() {
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        const allItems = await AsyncStorage.multiGet(allKeys);
        const storeObj: Record<string, any> = {};
        allItems.forEach(([key, value]) => {
            storeObj[key] = value;
        });
        console.log(storeObj);
    } catch (e) {
        console.error('Erro ao imprimir local storage:', e);
    }
}