import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function BranchScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const dummyBranches = [
    { id: '1', name: 'Warung Cabang Dinoyo', address: 'Jl. MT Haryono No. 10', status: 'Buka' },
    { id: '2', name: 'Warung Cabang SoeHat', address: 'Jl. Soekarno Hatta No. 45', status: 'Buka' },
  ];

  const filteredBranches = dummyBranches.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
            <Text style={styles.navBtnText}>⬅ Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => router.replace('/')}>
            <Text style={styles.navBtnText}>🏠 Home</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Pilih Cabang Warung</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari cabang..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Memuat data cabang...</Text>
      ) : (
        <FlatList
          data={filteredBranches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.address}</Text>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push('/inventory')} 
              >
                <Text style={styles.buttonText}>Cek Inventori Cabang Ini ➔</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 16, backgroundColor: '#ff8c00' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  navBtn: { backgroundColor: 'rgba(255,255,255,0.25)', padding: 6, borderRadius: 6 },
  navBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  searchContainer: { padding: 16 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginBottom: 12, borderRadius: 8, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  button: { marginTop: 12, backgroundColor: '#ff8c00', padding: 8, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
