import { bible } from '@/assets/db/ACF';
import { Book, Chapter, SearchResult, Verse } from '@/types/types';

const books = bible.map((book, index) => ({
  id: index + 1,
  name: book.name,
  testament_reference_id: index < 39 ? 1 : 2,
  abbrev: book.abbrev,
  chapters: book.chapters,
}));

export async function getBooks(): Promise<{ oldTestament: Book[], newTestament: Book[] }> {
  const oldTestament = books.filter(b => b.testament_reference_id === 1);
  const newTestament = books.filter(b => b.testament_reference_id === 2);
  return { oldTestament, newTestament };
}

export async function getChapters(bookId: number): Promise<Chapter[]> {
  const book = books.find(b => b.id === bookId);
  if (book) {
    return book.chapters.map((_, index) => ({ chapter: index + 1 }));
  }
  return [];
}

export async function getVerses(bookId: number, chapter: number): Promise<Verse[]> {
  const book = books.find(b => b.id === bookId);
  if (book && book.chapters[chapter - 1]) {
    return book.chapters[chapter - 1].map((text, index) => ({
      id: bookId * 1000000 + chapter * 1000 + index + 1,
      book_id: bookId,
      chapter: chapter,
      verse: index + 1,
      text: text,
    }));
  }
  return [];
}

export async function search(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const lowerCaseQuery = query.toLowerCase();

  for (const book of books) {
    for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex++) {
      for (let verseIndex = 0; verseIndex < book.chapters[chapterIndex].length; verseIndex++) {
        const verseText = book.chapters[chapterIndex][verseIndex];
        if (verseText.toLowerCase().includes(lowerCaseQuery)) {
          results.push({
            book_id: book.id,
            book_name: book.name,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            text: verseText,
          });
        }
      }
    }
  }

  return results;
}