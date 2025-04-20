import { Stack } from 'expo-router';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',      // Azul principal (Material Blue 700)
    onPrimary: '#FFFFFF',
    secondary: '#90CAF9',    // Azul mais claro
    background: '#F5F7FA',   // Fundo geral
    surface: '#FFFFFF',
    onSurface: '#1C1C1E',
    surfaceVariant: '#FFFFFF', // ← ESSA LINHA AQUI corrige o roxo!
    error: '#D32F2F',
    onError: '#FFFFFF',
    outline: '#B0BEC5',      // Bordas sutis
    placeholder: '#90A4AE',
  },
};

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
}