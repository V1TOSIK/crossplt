import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !email) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }

    setError('');
    console.log('Ім’я:', name);
    console.log('Email:', email);

    Alert.alert('Дані надіслані', `Ім’я: ${name}\nEmail: ${email}`);

    setName('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ім'я користувача"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Електронна пошта"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Надіслати" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5,
    width: '100%',
  },
  error: { 
    color: 'red', 
    marginBottom: 10 
  },
});
