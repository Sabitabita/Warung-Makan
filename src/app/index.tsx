import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏪 Warung App Dashboard</Text>
        <Text style={styles.headerSubtitle}>Sistem Operasional & Manajemen</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff8c00" />
          <Text style={{ marginTop: 10, color: '#666' }}>Memuat sistem...</Text>
        </View>
      ) : (
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Pilih Modul Operasional:</Text>

          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: '#ff8c00' }]}
            onPress={() => router.push('/branches')}
          >
            <Text style={styles.menuButtonText}>🏪 Modul Cabang</Text>
            <Text style={styles.menuButtonSub}>Kelola Lokasi & Cabang Operasional</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: '#8e44ad' }]}
            onPress={() => router.push('/staff')}
          >
            <Text style={styles.menuButtonText}>👥 Modul Staf & Karyawan</Text>
            <Text style={styles.menuButtonSub}>Manajemen Jadwal & Personil Karyawan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: '#2980b9' }]}
            onPress={() => router.push('/inventory')}
          >
            <Text style={styles.menuButtonText}>📦 Modul Stok & Inventori</Text>
            <Text style={styles.menuButtonSub}>Kontrol Stok & Persediaan Barang</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { padding: 24, backgroundColor: '#333', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: '#ccc', marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  menuContainer: { padding: 20 },
  menuTitle: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 16 },
  menuButton: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 3 },
  menuButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  menuButtonSub: { fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4 },
});