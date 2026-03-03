import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserStorage() {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      try {
        const value = await AsyncStorage.getItem('userName');
        if (value !== null) {
          setStoredName(value);
        }
      } catch (error) {
        console.log('Помилка завантаження:', error);
      }
    };

    loadName();
  }, []);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      setStoredName(name);
      setName('');
    } catch (error) {
      console.log('Помилка збереження:', error);
    }
  };

  const clearName = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      setStoredName('');
    } catch (error) {
      console.log('Помилка очищення:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Збережене імя: {storedName ? storedName : 'Немає даних'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Введіть ім'я"
        value={name}
        onChangeText={setName}
      />

      <Button title="Зберегти" onPress={saveName} />
      <View style={{ marginTop: 10 }}>
        <Button title="Очистити" onPress={clearName} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
  },
});