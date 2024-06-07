import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    };
    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.tipo}</Text>
            <Text>{item.valor}</Text>
          </View>
        )}
      />
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
