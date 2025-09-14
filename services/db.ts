
import { Book, Chapter, SearchResult, Verse } from '@/types/types';
import { Asset } from 'expo-asset';
import * as FileSystem from "expo-file-system/legacy";
import * as SQLite from 'expo-sqlite';
import acfAsset from '../assets/sqlite/ACF.sqlite';

const DB_NAME = "ACF.sqlite";

const asset = Asset.fromModule(acfAsset);
const dbPath = `${FileSystem.documentDirectory}SQLite/${DB_NAME}`;

export async function openDatabase() {
    const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
    if (!(await FileSystem.getInfoAsync(sqliteDir)).exists) {
        await FileSystem.makeDirectoryAsync(sqliteDir);
    }

    if (!(await FileSystem.getInfoAsync(dbPath)).exists) {
        await FileSystem.downloadAsync(asset.uri, dbPath);
    }

    return SQLite.openDatabaseAsync(DB_NAME);
}

export async function getBooks(): Promise<{ oldTestament: Book[], newTestament: Book[] }> {
    const db = await openDatabase();
    const result = await db.getAllAsync<Book>(`SELECT * FROM book ORDER BY id`);
    const oldTestament = result.filter(b => b.testament_reference_id === 1);
    const newTestament = result.filter(b => b.testament_reference_id === 2);

    return { oldTestament, newTestament };
}

export async function getChapters(bookId: number): Promise<Chapter[]> {
    const db = await openDatabase();

    const result = await db.getAllAsync<Chapter>(
        'SELECT DISTINCT chapter FROM verse WHERE book_id = ? ORDER BY chapter',
        [bookId]
    );
    if (result.length > 0) {
        return result;
    } else {
        return [];
    }
}

export async function getVerses(bookId: number, chapter: number): Promise<Verse[]> {
    const db = await openDatabase();
    const result = await db.getAllAsync<Verse>(
        'SELECT * FROM verse WHERE book_id = ? AND chapter = ? ORDER BY verse',
        [bookId, chapter]
    );
    if (result.length > 0) {
        return result;
    } else {
        return [];
    }
}

export async function search(query: string): Promise<SearchResult[]> {
    const db = await openDatabase();
    const result = await db.getAllAsync<SearchResult>(
        `SELECT v.text, v.chapter, v.verse, b.name as book_name, b.id as book_id FROM verse v JOIN book b ON v.book_id = b.id WHERE v.text LIKE ?`,
        [`%${query}%`]
    );
    if (result.length > 0) {
        return result;
    } else {
        return [];
    }
}
