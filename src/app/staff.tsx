import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
}

const initialStaff: StaffMember[] = [
  { id: '1', name: 'Ahmad Fauzi', role: 'Kasir', branch: 'Cabang Dinoyo' },
  { id: '2', name: 'Rina Kartika', role: 'Koki', branch: 'Cabang Dinoyo' },
  { id: '3', name: 'Dewi Lestari', role: 'Pelayan', branch: 'Cabang Dinoyo' },
  { id: '4', name: 'Siti Aminah', role: 'Koki', branch: 'Cabang SoeHat' },
  { id: '5', name: 'Rizky Pratama', role: 'Kasir', branch: 'Cabang SoeHat' },
  { id: '6', name: 'Eko Prasetyo', role: 'Pelayan', branch: 'Cabang SoeHat' },
  { id: '7', name: 'Budi Santoso', role: 'Pelayan', branch: 'Cabang Blimbing' },
  { id: '8', name: 'Maya Indah', role: 'Kasir', branch: 'Cabang Blimbing' },
  { id: '9', name: 'Hendra Gunawan', role: 'Koki', branch: 'Cabang Blimbing' },
  { id: '10', name: 'Fadia Hanin K', role: 'Koki', branch: 'Cabang Blimbing' },
];

export default function StaffScreen() {
  const router = useRouter(); // 🟢 Navigasi Expo Router
  const [search, setSearch] = useState<string>(''); // 🟢 useState (10%)
  const [staff] = useState<StaffMember[]>(initialStaff);
  const [loading, setLoading] = useState<boolean>(true);

  // 🟢 useEffect (10%)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredStaff = staff.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topNav}>
          {/* 🟢 router.back() (10%) */}
          <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
            <Text style={styles.navBtnText}>⬅ Kembali</Text>
          </TouchableOpacity>
          {/* 🟢 router.replace() (10%) */}
          <TouchableOpacity style={styles.navBtn} onPress={() => router.replace('/')}>
            <Text style={styles.navBtnText}>🏠 Home</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Modul Staf & Karyawan</Text>
        <Text style={styles.headerSubtitle}>Manajemen Jadwal & Personil</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari nama, posisi, atau cabang..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Text style={{ marginTop: 10, fontSize: 13, color: '#4b5563', fontWeight: '600' }}>
          📊 Total Hasil: <Text style={{ color: '#8e44ad', fontWeight: 'bold' }}>{filteredStaff.length} Personil</Text>
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8e44ad" />
          <Text style={{ marginTop: 10, color: '#666' }}>Memuat data staf...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStaff}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            /* 🟢 Menerapkan router.push() saat kartu diklik */
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push('/inventory')}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={[styles.roleBadgeContainer, { backgroundColor: item.role === 'Kasir' ? '#27ae60' : item.role === 'Koki' ? '#e67e22' : '#2980b9' }]}>
                  <Text style={styles.roleBadgeText}>{item.role}</Text>
                </View>
              </View>
              <Text style={styles.info}>🏢 Penempatan: {item.branch}</Text>
              <Text style={{ fontSize: 11, color: '#8e44ad', marginTop: 8, fontWeight: 'bold' }}>
                👉 Klik untuk cek stok bahan warung ➔
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { padding: 20, backgroundColor: '#8e44ad', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: 'center' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  navBtn: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  navBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#f5eeaf', marginTop: 4 },
  searchContainer: { padding: 16 },
  input: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, fontSize: 14, borderWidth: 1, borderColor: '#ddd' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 14, borderRadius: 12, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  roleBadgeContainer: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  roleBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#666', marginTop: 4 },
});