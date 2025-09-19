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

export async function saveFavoriteVerseByNumber(bookId: number, chapter: number, verseNumber: number, bookName: string) {
    // Você precisa obter o texto do verso de algum lugar, então busque do banco/local
    // Aqui supõe-se que existe uma função getVerses(bookId, chapter) que retorna todos os versos do capítulo
    // Importe se necessário: import { getVerses } from '@/services/db';
    // Se não existir, adapte conforme sua fonte de dados.
    try {
        const { getVerses } = await import('@/services/db');
        const verses: Verse[] = await getVerses(bookId, chapter);
        const verse = verses.find(v => Number(v.verse) === Number(verseNumber));
        if (!verse) throw new Error('Verso não encontrado');
        await saveFavoriteVerse(verse, bookName);
    } catch (e) {
        console.error('Erro ao salvar marcador por número:', e);
    }
}

export async function getFavoriteVerseByNumber(bookId: number, chapter: number, verseNumber: number, bookName: string): Promise<(Verse & { bookName: string }) | undefined> {
    try {
        const favorites = await getFavoriteVerses();
        return favorites.find(v =>
            v.bookName === bookName &&
            Number(v.book_id) === Number(bookId) &&
            Number(v.chapter) === Number(chapter) &&
            Number(v.verse) === Number(verseNumber)
        );
    } catch {
        return undefined;
    }
}

export async function saveLastReadedVerse(bookId: number, chapter: number, verseNumber: number, bookName: string) {
    try {
        const { getVerses } = await import('@/services/db');
        const verses: Verse[] = await getVerses(bookId, chapter);
        const verse = verses.find(v => Number(v.verse) === Number(verseNumber));
        if (!verse) throw new Error('Verso não encontrado');
        const lastReaded = {
            ...verse,
            bookId,
            chapter,
            verse: verseNumber,
            bookName,
        };
        await AsyncStorage.setItem('last_readed', JSON.stringify(lastReaded));
    } catch (e) {
        console.error('Erro ao salvar marcador de último lido:', e);
    }
}

export async function getLastReadedVerse(): Promise<(Verse & { bookId: number, chapter: number, verse: number, bookName: string }) | null> {
    try {
        const stored = await AsyncStorage.getItem('last_readed');
        if (stored) {
            return JSON.parse(stored);
        }
        return null;
    } catch {
        return null;
    }
}