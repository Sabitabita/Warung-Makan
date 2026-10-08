import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// ==========================================
// 1. TYPE & ARRAY OF OBJECTS
// ==========================================

// Interface untuk Cabang
export interface Branch {
  id: string;
  title: string;
  info: string;
  city: string;
  status: 'Buka' | 'Tutup';
}

// Interface untuk Staff
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
  shift: string;
}

// Data Array of Objects - Cabang (3 Cabang)
const initialBranches: Branch[] = [
  { id: '1', title: 'Warung Cabang Dinoyo', info: 'Jl. MT Haryono No. 10', city: 'Malang', status: 'Buka' },
  { id: '2', title: 'Warung Cabang SoeHat', info: 'Jl. Soekarno Hatta No. 45', city: 'Malang', status: 'Buka' },
  { id: '3', title: 'Warung Cabang Blimbing', info: 'Jl. Borobudur No. 12', city: 'Malang', status: 'Tutup' },
];

// Data Array of Objects - Staff (9 Staff, 3 Per Cabang)
const initialStaff: StaffMember[] = [
  // Cabang Dinoyo
  { id: '1', name: 'Ahmad Fauzi', role: 'Kasir', branch: 'Cabang Dinoyo', shift: 'Pagi' },
  { id: '2', name: 'Rina Kartika', role: 'Koki', branch: 'Cabang Dinoyo', shift: 'Siang' },
  { id: '3', name: 'Dewi Lestari', role: 'Pelayan', branch: 'Cabang Dinoyo', shift: 'Malam' },

  // Cabang SoeHat
  { id: '4', name: 'Siti Aminah', role: 'Koki', branch: 'Cabang SoeHat', shift: 'Siang' },
  { id: '5', name: 'Rizky Pratama', role: 'Kasir', branch: 'Cabang SoeHat', shift: 'Pagi' },
  { id: '6', name: 'Eko Prasetyo', role: 'Pelayan', branch: 'Cabang SoeHat', shift: 'Malam' },

  // Cabang Blimbing
  { id: '7', name: 'Budi Santoso', role: 'Pelayan', branch: 'Cabang Blimbing', shift: 'Malam' },
  { id: '8', name: 'Maya Indah', role: 'Kasir', branch: 'Cabang Blimbing', shift: 'Pagi' },
  { id: '9', name: 'Hendra Gunawan', role: 'Koki', branch: 'Cabang Blimbing', shift: 'Siang' },
];

// ==========================================
// 2. CUSTOM FUNCTION & LOOP
// ==========================================

// Custom Function 1: Filter Staff dengan Loop
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

// Custom Function 2: Filter Cabang dengan Loop
function searchBranchList(list: Branch[], keyword: string): Branch[] {
  const query = keyword.toLowerCase().trim();
  return list.filter((item) => {
    return item.title.toLowerCase().includes(query) || item.info.toLowerCase().includes(query);
  });
}

// Custom Function 3: Menghitung total data dengan Loop (forEach)
function countTotalItems<T>(list: T[]): number {
  let count = 0;
  list.forEach(() => {
    count++;
  });
  return count;
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function MainApp() {
  const [activeTab, setActiveTab] = useState<'branches' | 'staff'>('branches');
  const [search, setSearch] = useState<string>('');

  // Memanggil Custom Functions & Loop
  const filteredBranches = searchBranchList(initialBranches, search);
  const filteredStaff = searchStaffList(initialStaff, search);

  const totalBranches = countTotalItems(filteredBranches);
  const totalStaff = countTotalItems(filteredStaff);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER UTAMA */}
      <View
        style={[
          styles.header,
          { backgroundColor: activeTab === 'branches' ? '#ff8c00' : '#8e44ad' }, // INLINE STYLE DINAMIS
        ]}
      >
        <Text style={styles.headerTitle}>
          {activeTab === 'branches' ? 'Modul Cabang Warung' : 'Modul Staf & Karyawan'}
        </Text>
        <Text style={{ fontSize: 13, color: '#fff', marginTop: 4, opacity: 0.9 }}>
          {activeTab === 'branches' ? 'Daftar Operasional Cabang' : 'Manajemen Jadwal & Personil'}
        </Text>
      </View>

      {/* NAVIGASI TAB */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'branches' && styles.activeTabBranch]}
          onPress={() => {
            setActiveTab('branches');
            setSearch('');
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'branches' && { color: '#ff8c00', fontWeight: 'bold' },
            ]}
          >
            🏪 Cabang
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'staff' && styles.activeTabStaff]}
          onPress={() => {
            setActiveTab('staff');
            setSearch('');
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'staff' && { color: '#8e44ad', fontWeight: 'bold' },
            ]}
          >
            👥 Staf & Karyawan
          </Text>
        </TouchableOpacity>
      </View>

      {/* INPUT PENCARIAN */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={
            activeTab === 'branches'
              ? 'Cari nama cabang atau alamat...'
              : 'Cari nama, posisi, atau cabang...'
          }
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />

        {/* INLINE STYLE: Ringkasan Total Data */}
        <Text style={{ marginTop: 10, fontSize: 13, color: '#555', fontWeight: '600' }}>
          📊 Total Terdata:{' '}
          <Text
            style={{
              color: activeTab === 'branches' ? '#ff8c00' : '#8e44ad',
              fontWeight: 'bold',
            }}
          >
            {activeTab === 'branches' ? `${totalBranches} Cabang` : `${totalStaff} Personil`}
          </Text>
        </Text>
      </View>

      {/* DISPLAY MODUL CABANG */}
      {activeTab === 'branches' ? (
        <FlatList
          data={filteredBranches}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                
                {/* INLINE STYLE: Status Badge */}
                <View
                  style={[
                    styles.badgeContainer,
                    { backgroundColor: item.status === 'Buka' ? '#27ae60' : '#e74c3c' },
                  ]}
                >
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.subtitle}>📍 Alamat: {item.info}</Text>
              <Text style={styles.subtitle}>🏙️ Kota: {item.city}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Data cabang tidak ditemukan.</Text>
          }
        />
      ) : (
        /* DISPLAY MODUL STAF */
        <FlatList
          data={filteredStaff}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.name}</Text>

                {/* INLINE STYLE DINAMIS: Badge Role */}
                <View
                  style={[
                    styles.badgeContainer,
                    {
                      backgroundColor:
                        item.role === 'Kasir'
                          ? '#27ae60'
                          : item.role === 'Koki'
                          ? '#e67e22'
                          : '#2980b9',
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>{item.role}</Text>
                </View>
              </View>

              <Text style={styles.subtitle}>🏢 Penempatan: {item.branch}</Text>
              <Text style={styles.subtitle}>⏰ Shift: {item.shift}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Data staf tidak ditemukan.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

// ==========================================
// 3. EXTERNAL STYLES (StyleSheet)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabBranch: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  activeTabStaff: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 14,
  },
});