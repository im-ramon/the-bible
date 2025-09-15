import jp from 'jsonpath';
import { bible } from './ACF';

export function queryVerse(book: string, chapter: number, verse: number) {
    return jp.query(bible, `$[?(@.name=="${book}")].chapters[${chapter - 1}][${verse - 1}]`)[0];
}

export const daylyVerse: { book: string; chapter: number; verse: number, bookId: number }[] = [
    { book: "Romanos", chapter: 8, verse: 31, bookId: 45 },
    { book: "Filipenses", chapter: 4, verse: 13, bookId: 50 },
    { book: "Salmos", chapter: 23, verse: 1, bookId: 19 },
    { book: "João", chapter: 3, verse: 16, bookId: 43 },
    { book: "Provérbios", chapter: 3, verse: 5, bookId: 20 },
    { book: "Isaías", chapter: 41, verse: 10, bookId: 23 },
]