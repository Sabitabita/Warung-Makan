import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput } from 'react-native';

// ==========================================
// 1. TYPE & ARRAY OF OBJECTS (Bobot: 10%)
// ==========================================
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
  shift: string;
}

const initialStaff: StaffMember[] = [
  // Cabang Dinoyo (3 orang)
  { id: '1', name: 'Ahmad Fauzi', role: 'Kasir', branch: 'Cabang Dinoyo', shift: 'Pagi' },
  { id: '2', name: 'Rina Kartika', role: 'Koki', branch: 'Cabang Dinoyo', shift: 'Siang' },
  { id: '3', name: 'Dewi Lestari', role: 'Pelayan', branch: 'Cabang Dinoyo', shift: 'Malam' },

  // Cabang SoeHat (3 orang)
  { id: '4', name: 'Siti Aminah', role: 'Koki', branch: 'Cabang SoeHat', shift: 'Siang' },
  { id: '5', name: 'Rizky Pratama', role: 'Kasir', branch: 'Cabang SoeHat', shift: 'Pagi' },
  { id: '6', name: 'Eko Prasetyo', role: 'Pelayan', branch: 'Cabang SoeHat', shift: 'Malam' },

  // Cabang Blimbing (3 orang)
  { id: '7', name: 'Budi Santoso', role: 'Pelayan', branch: 'Cabang Blimbing', shift: 'Malam' },
  { id: '8', name: 'Maya Indah', role: 'Kasir', branch: 'Cabang Blimbing', shift: 'Pagi' },
  { id: '9', name: 'Hendra Gunawan', role: 'Koki', branch: 'Cabang Blimbing', shift: 'Siang' },
];

// ==========================================
// 2. CUSTOM FUNCTION & LOOP (Bobot: 10%)
// ==========================================

// Custom Function 1: Filter dengan Loop
function searchStaffList(list: StaffMember[], keyword: string): StaffMember[] {
  const query = keyword.toLowerCase().trim();
  return list.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query) ||
      item.branch.toLowerCase().includes(query)
    );
  });
}

// Custom Function 2: Menghitung total personil dengan Loop (forEach)
function countTotalStaff(list: StaffMember[]): number {
  let count = 0;
  list.forEach(() => {
    count++;
  });
  return count;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function StaffScreen() {
  const [search, setSearch] = useState<string>('');
  const [staff] = useState<StaffMember[]>(initialStaff);

  // Memanggil Custom Function & Loop
  const filteredStaff = searchStaffList(staff, search);
  const totalCount = countTotalStaff(filteredStaff);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER dengan External Style */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Modul Staf & Karyawan</Text>
        <Text style={styles.headerSubtitle}>Manajemen Jadwal & Personil</Text>
      </View>

      {/* INPUT PENCARIAN */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari nama, posisi, atau cabang..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        
        {/* INLINE STYLE 1: Ringkasan Jumlah Staf */}
        <Text style={{ marginTop: 10, fontSize: 13, color: '#4b5563', fontWeight: '600' }}>
          📊 Total Hasil: <Text style={{ color: '#8e44ad', fontWeight: 'bold' }}>{totalCount} Personil</Text>
        </Text>
      </View>

      {/* LIST DATA */}
      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.name}</Text>
              
              {/* INLINE STYLE 2: Warna Badge Dinamis Berdasarkan Role */}
              <View
                style={[
                  styles.roleBadgeContainer,
                  {
                    backgroundColor:
                      item.role === 'Kasir'
                        ? '#27ae60'
                        : item.role === 'Koki'
                        ? '#e67e22'
                        : '#2980b9', // INLINE STYLE DINAMIS
                  },
                ]}
              >
                <Text style={styles.roleBadgeText}>{item.role}</Text>
              </View>
            </View>

            <Text style={styles.info}>🏢 Penempatan: {item.branch}</Text>
            <Text style={styles.info}>⏰ Shift: {item.shift}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// ==========================================
// 3. EXTERNAL STYLES (StyleSheet)
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: {
    padding: 20,
    backgroundColor: '#8e44ad',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#f5eeaf', marginTop: 4 },
  searchContainer: { padding: 16 },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  roleBadgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: { fontSize: 14, color: '#666', marginTop: 4 },
});