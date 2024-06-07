import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTransactionScreen = ({ navigation }) => {
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');

  const saveTransaction = async () => {
    const newTransaction = {
      id: Date.now(),
      tipo,
      valor,
    };
    const storedTransactions = await AsyncStorage.getItem('transactions');
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
    transactions.push(newTransaction);
    await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Tipo de Transação</Text>
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
      />
      <Text>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={saveTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
});

export default AddTransactionScreen;