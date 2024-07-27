import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

const IMAGE_URL = 'https://preview.redd.it/how-come-bender-could-hang-up-this-drawing-with-a-magnet-if-v0-glvii88y5fj91.jpg?auto=webp&s=759edb232d0282c7d1ad5acff12aafdf6f23f322';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View style={[styles.container, themeContainerStyle]}>
          <Image
            source={{ uri: IMAGE_URL }}
            style={styles.image}
          />
          <Text style={[styles.text, themeTextStyle]}>
            Get out with your Fxcking '{colorScheme}' theme !
          </Text>
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
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
