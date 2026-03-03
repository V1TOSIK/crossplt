import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};
type products = {
  userId: number;
  id: number;
  title: string;
  body: string;
};


export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error('Network error');
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Помилка при завантаженні даних');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts'); 

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data: products[] = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Помилка при завантаженні продуктів');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setError(null); 
    if (!showProducts) {
      fetchProducts();
    }
    setShowProducts(!showProducts);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Завантаження...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title={showProducts ? "Показати користувачів" : "Показати продукти"}
        onPress={handleToggle}
      />

      {showProducts ? (
         <FlatList<products>
             data={products}
             keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
                <View style={styles.item}>
               <Text style={styles.name}>{item.title}</Text>
               <Text style={styles.email}>{item.body}</Text>
              </View>
        )}
          style={{ marginTop: 20 }}
         />
          ) : (
  <FlatList<User>
    data={users}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    )}
    style={{ marginTop: 20 }}
  />
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});
