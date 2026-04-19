import { Stack } from 'expo-router';

export default function DisabiliLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f4c81' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '900' },
        headerBackTitle: 'Indietro',
      }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Disabili e Accessibilità'
        }} 
      />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          title: 'Leggi e Agevolazioni' 
        }} 
      />
      <Stack.Screen 
        name="law/[id]" 
        options={{ 
          title: 'Dettaglio Norma'
        }} 
      />
    </Stack>
  );
}
