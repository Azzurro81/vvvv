import { Stack } from 'expo-router';

export default function BonusLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Bonus',
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
          title: 'Dettaglio Bonus', 
          headerStyle: { backgroundColor: '#0f4c81' },
          headerTintColor: '#fff'
        }} 
      />
    </Stack>
  );
}
