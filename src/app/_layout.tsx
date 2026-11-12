import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#333' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Beranda Utama', headerShown: false }} />
      <Stack.Screen name="branches" options={{ title: 'Modul Cabang', headerShown: false }} />
      <Stack.Screen name="staff" options={{ title: 'Modul Staf & Karyawan', headerShown: false }} />
      <Stack.Screen name="inventory" options={{ title: 'Modul Stok & Inventori', headerShown: false }} />
      <Stack.Screen name="demo" options={{ title: 'Modul Demo', headerShown: false }} />
    </Stack>
  );
}