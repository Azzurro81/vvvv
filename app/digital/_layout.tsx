import { Stack } from 'expo-router';

export default function DigitalLayout() {
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
          headerTitle: 'Burocrazia digitale',
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          headerTitle: 'Dettaglio Categoria',
        }}
      />
      <Stack.Screen
        name="law/[id]"
        options={{
          headerTitle: 'Guida Dettagliata',
        }}
      />
    </Stack>
  );
}
