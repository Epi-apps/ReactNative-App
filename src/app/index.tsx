import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

function HomeScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={[styles.container, themeContainerStyle]}>
        <Text style={[styles.text, themeTextStyle]}>Content is in safe area in theme: {colorScheme}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
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