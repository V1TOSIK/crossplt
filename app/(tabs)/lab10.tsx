import { Image, StyleSheet, ScrollView, Text } from 'react-native';

export default function Lab10() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Локальне зображення (contain)</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.localImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Мережеве зображення ()</Text>

      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.networkImage}
        resizeMode="stretch"
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20
  },

  localImage: { 
    width: 150, 
    height: 150, 
    marginBottom: 20, 
    borderRadius: 15,
    backgroundColor: '#eee'
  },

  networkImage: { 
    width: 200, 
    height: 150, 
    borderRadius: 25 
  },
});