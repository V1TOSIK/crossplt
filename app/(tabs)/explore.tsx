import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';


type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);



type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [userName, setUserName] = useState<string>('Іван');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}



function HomeScreen() {
  const context = useContext(UserContext);
  if (!context) throw new Error('Must be used inside UserProvider');

  const { userName } = context;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Привіт, {userName}!</Text>
    </View>
  );
}


function ProfileScreen() {
  const context = useContext(UserContext);
  if (!context) throw new Error('Must be used inside UserProvider');

  const { userName, setUserName } = context;


  const [inputName, setInputName] = useState<string>(userName);

  const handleSave = () => {
    if (inputName.trim() !== '') {
      setUserName(inputName);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Введіть нове ім`я користувача:</Text>

      <TextInput
        style={styles.input}
        value={inputName}
        onChangeText={setInputName}
        placeholder="Ім'я користувача"
      />

      <Button title="Зберегти" onPress={handleSave} />
    </View>
  );
}



export default function Index() {
  return (
    <UserProvider>
      <HomeScreen />
      <ProfileScreen />
    </UserProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginVertical: 10,
  },
});
