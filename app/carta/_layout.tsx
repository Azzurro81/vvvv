import { Stack } from 'expo-router';

export default function CartaLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Carta di Soggiorno',
          headerStyle: { backgroundColor: '#0f4c81' },
          headerTintColor: '#fff',
          headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '900' }
        }} 
      />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          headerStyle: { backgroundColor: '#0f4c81' },
          headerTintColor: '#fff'
        }} 
      />
      <Stack.Screen 
        name="law/[id]" 
        options={{ 
          title: 'Dettaglio Carta UE', 
          headerStyle: { backgroundColor: '#0f4c81' },
          headerTintColor: '#fff'
        }} 
      />
    </Stack>
  );
}
