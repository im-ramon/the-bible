export interface Book {
  id: number;
  name: string;
    testament_reference_id: number;
    chapters: [][]; 
}

export interface Chapter {
  chapter: number;
}

export interface Verse {
  id: number;
  book_id: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface SearchResult {
  book_id: number;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}
