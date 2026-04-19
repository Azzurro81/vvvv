import { Stack } from 'expo-router';

export default function PermessoLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Permesso di Soggiorno',
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
          title: 'Guida Pratica', 
          headerStyle: { backgroundColor: '#0f4c81' },
          headerTintColor: '#fff'
        }} 
      />
    </Stack>
  );
}
