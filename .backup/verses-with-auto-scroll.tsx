/* eslint-disable eqeqeq */

import { getVerses } from '@/services/db';
import { Verse } from '@/types/types';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function VersesScreen() {
  const [verses, setVerses] = useState<Verse[]>([]);

  const route = useRoute();
  const { bookId, chapter, highlightedVerse } = route.params as { bookId: number, chapter: number, highlightedVerse?: number };

  const listRef = useRef<FlatList<Verse>>(null);

  useEffect(() => {
    (async () => {
      const fetchedVerses = await getVerses(bookId, chapter);
      setVerses(fetchedVerses);
    })();
  }, [bookId, chapter]);

  useEffect(() => {
    if (highlightedVerse && verses.length > 0) {
      const index = verses.findIndex(v => v.verse === highlightedVerse);
      if (index >= 0) {
        listRef.current?.scrollToIndex({ index, animated: true });
      }
    }
  }, [highlightedVerse, verses]);

  return (
    <FlatList
      ref={listRef}
      data={verses}
      keyExtractor={v => v.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={{ paddingVertical: 4 }}>
          <Text
            style={[
              styles.verseText,
              { backgroundColor: highlightedVerse == item.verse ? 'yellow' : 'transparent' },
            ]}
            onPress={() => alert(`Clicou no versículo ${item.verse}!`)}
          >
            <Text style={styles.verseNumber}>{item.verse} </Text>
            {item.text}{' '}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 100,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'justify',
  },
  verseNumber: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
