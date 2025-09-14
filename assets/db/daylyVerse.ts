import jp from 'jsonpath';
import { bible } from './ACF';

export function queryVerse(book: string, chapter: number, verse: number) {
    return jp.query(bible, `$[?(@.name=="${book}")].chapters[${chapter - 1}][${verse - 1}]`)[0];
}

export const daylyVerse: { book: string; chapter: number; verse: number }[] = [
    { book: "Romanos", chapter: 8, verse: 31 },
    { book: "Filipenses", chapter: 4, verse: 13 },
    { book: "Salmos", chapter: 23, verse: 1 },
    { book: "João", chapter: 3, verse: 16 },
    { book: "Provérbios", chapter: 3, verse: 5 },
    { book: "Isaías", chapter: 41, verse: 10 },
]