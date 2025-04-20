// app/tabs/index.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const irParaCriarTarefa = () => {
    router.push('/newTask');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo! 👋</Text>
      <Button title="Criar Nova Tarefa" onPress={irParaCriarTarefa} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
