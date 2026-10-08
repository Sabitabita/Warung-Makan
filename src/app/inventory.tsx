import { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

// 1. POIN PENILAIAN: Type & Interface
interface InventoryItem {
  id: string;
  item: string;
  stock: string;
  price: string;
}

// 1. POIN PENILAIAN: Array of Objects dengan Type
const initialInventory: InventoryItem[] = [
  { id: "1", item: "Beras Premium 5kg", stock: "45 sak", price: "Rp 65.000" },
  { id: "2", item: "Minyak Goreng 1L", stock: "30 pouch", price: "Rp 18.000" },
  { id: "3", item: "Daging Ayam Potong", stock: "15 kg", price: "Rp 38.000" },
];

export default function InventoryScreen() {
  const [search, setSearch] = useState<string>("");
  const [inventory] = useState<InventoryItem[]>(initialInventory);

  const filteredInventory = inventory.filter((i) =>
    i.item.toLowerCase().includes(search.toLowerCase()),
  );

  // 2. POIN PENILAIAN: Deklarasi Custom Function
  const renderItemCard = (item: InventoryItem) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.item}</Text>

        {/* 3. POIN PENILAIAN: Inline Styles (style={{ ... }}) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text style={styles.info}>📦 Stok: {item.stock}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#27ae60" }}>
            💰 {item.price}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Modul Stok & Inventori</Text>
        <Text style={styles.headerSubtitle}>Kontrol Persediaan Barang</Text>
      </View>

      {/* Inline Style gabungan pada container input */}
      <View style={[styles.searchContainer, { marginBottom: 8 }]}>
        <TextInput
          style={styles.input}
          placeholder="Cari nama barang..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 2. POIN PENILAIAN: Loop menggunakan FlatList & Custom Function */}
      <FlatList
        data={filteredInventory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => renderItemCard(item)}
      />
    </SafeAreaView>
  );
}

// 3. POIN PENILAIAN: External Styles (StyleSheet.create)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  header: {
    padding: 20,
    backgroundColor: "#2980b9",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#d4e6f1", marginTop: 4 },
  searchContainer: { padding: 16 },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 8 },
  info: { fontSize: 14, color: "#666" },
});
