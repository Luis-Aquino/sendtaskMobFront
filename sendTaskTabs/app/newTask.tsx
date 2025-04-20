// app/NovaTask.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import api from '../src/services/api';
import { MaskedTextInput } from 'react-native-mask-text';
import { TextInput } from 'react-native-paper'; 

export default function NovaTaskScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
     if (!title || !content || !email || !phoneNumber) {
    Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
    return;
  }

  if (!isEmailValid(email)) {
    Alert.alert('E-mail inválido', 'Por favor, insira um e-mail válido.');
    return;
  }
    try {
      await api.post('/tasks', {
        title,
        content,
        email,
        phoneNumber,
      });
  
      Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
      /*setTitle('');
      setContent('');
      setEmail('');
      setPhoneNumber('');*/
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const messageFromBackend = error.response?.data?.message;
    
        if (messageFromBackend) {
          Alert.alert('Erro', messageFromBackend);
        } else {
          Alert.alert('Erro', 'Erro desconhecido retornado pela API.');
        }
      } else {
        Alert.alert('Erro', 'Erro inesperado.');
        console.log('Erro genérico:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.label}>Título</Text>
      <TextInput
        value={title}
        onChangeText={(text) => {
          if (text.length <= 20) setTitle(text);
        }}
        multiline
        numberOfLines={4}
        
        style={{
          height: 50
        }}
        right={<TextInput.Affix text={`${title.length}/20`} />}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={content}
        onChangeText={(text) => {
          if (text.length <= 150) setContent(text);
        }}
        mode="flat"
        multiline
        numberOfLines={4}
        style={{
          padding:0,
          height: 150
        }}
        right={<TextInput.Affix text={`${content.length}/150`} />}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>Telefone (WhatsApp)</Text>
      <TextInput
        label="Telefone (WhatsApp)"
        render={props => (
          <MaskedTextInput
            {...props}
            mask="(99) 99999-9999"
            onChangeText={(masked, unmasked) => setPhoneNumber(unmasked)}
            keyboardType="numeric"
          />
        )}
        value={phoneNumber}
      />

      <Button title="Criar Tarefa" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  }
});
