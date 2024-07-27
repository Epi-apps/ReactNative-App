import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

const GIPHY_API_KEY = 'mwzpIYfstTOD19Q9Ioc1m270ZlvlCvwd';

const searchGifs = async (query: string, limit: number) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=${limit}`
  );
  const data = await response.json();
  return data.data;
};

const getAlternatingStyle = (index: number) => {
  const isEven = Math.floor(index / 2) % 2 === 0;
  return index % 2 === 0
    ? (isEven ? styles.square : styles.rectangle)
    : (isEven ? styles.rectangle : styles.square);
};

interface GifItem {
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

export default function GiphyScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const [query, setQuery] = useState('Futurama Bender cash');
  const [gifs, setGifs] = useState<GifItem[]>([]);
  const [limit, setLimit] = useState(20);

  const fetchGifs = async () => {
    try {
      const results = await searchGifs(query, limit);
      setGifs(results);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, [limit]);

  const getImageStyle = useCallback((index: number) => {
    return getAlternatingStyle(index);
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View style={[styles.container, themeContainerStyle]}>
          <Text style={[styles.text, themeTextStyle]}>GIFs from Giphy</Text>
          <TextInput
            style={[styles.input, themeTextStyle]}
            placeholder="Search GIFs"
            placeholderTextColor={colorScheme === 'light' ? '#888' : '#ccc'}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.button} onPress={fetchGifs}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <FlatList
            numColumns={2}
            data={gifs}
            keyExtractor={(item: GifItem) => item.id}
            renderItem={({ item, index }) => (
              <Image
                source={{ uri: item.images.fixed_height.url }}
                style={[styles.image, getImageStyle(index)]}
              />
            )}
          />
          <TouchableOpacity style={styles.button} onPress={() => setLimit(limit + 20)}>
            <Text style={styles.buttonText}>Load More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightContainer: {
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  lightThemeText: {
    color: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  image: {
    marginLeft: Platform.OS === 'web' ? 5 : '2%',
    marginTop: Platform.OS === 'web' ? 5 : '1%',
    marginRight: Platform.OS === 'web' ? 5 : '1%',
    marginBottom: Platform.OS === 'web' ? 5 : '1%',
    borderRadius: 8,
  },
  square: {
    width: Platform.OS === 'web' ? 150 : '44%',
    height: 150,
  },
  rectangle: {
    width: Platform.OS === 'web' ? 200 : '48%',
    height: 150,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
