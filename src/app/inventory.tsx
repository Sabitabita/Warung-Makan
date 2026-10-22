import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { usePathname, useRouter } from "expo-router";

interface InventoryItem {
  id: string;
  item: string;
  stock: string;
  price: string;
}

const initialInventory: InventoryItem[] = [
  { id: "1", item: "Beras Premium 5kg", stock: "45 sak", price: "Rp 65.000" },
  { id: "2", item: "Minyak Goreng 1L", stock: "30 pouch", price: "Rp 18.000" },
  { id: "3", item: "Daging Ayam Potong", stock: "15 kg", price: "Rp 38.000" },
  { id: "4", item: "Gula 1kg", stock: "10 kg", price: "Rp 15.000" },
];

export default function InventoryScreen() {
  const [search, setSearch] = useState<string>("");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setInventory(initialInventory);
  }, []);

  const filteredInventory = inventory.filter((i) =>
    i.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>← Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
            <Text style={styles.backText}>🏠 Home</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Kontrol Persediaan Barang</Text>
        <Text style={styles.pathText}>Path aktif: {pathname}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari nama barang..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Text style={styles.counterText}>
          📊 Total Terdata:{" "}
          <Text style={{ fontWeight: "bold", color: "#2980b9" }}>
            {filteredInventory.length} Barang
          </Text>
        </Text>
      </View>

      <FlatList
        data={filteredInventory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.item}</Text>
            <View style={styles.cardRow}>
              <Text style={styles.info}>📦 Stok: {item.stock}</Text>
              <Text style={styles.price}>💰 {item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  header: { padding: 16, backgroundColor: "#2980b9" },
  backButton: { marginBottom: 6 },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  headerSubtitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  pathText: { fontSize: 12, color: "#d4e6f1", marginTop: 2 },
  searchContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  input: { backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, fontSize: 14, borderWidth: 1, borderColor: "#ddd" },
  counterText: { fontSize: 13, color: "#555", marginTop: 10, marginBottom: 4 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { backgroundColor: "#fff", padding: 16, marginBottom: 12, borderRadius: 12, elevation: 2 },
  title: { fontSize: 16, fontWeight: "bold", color: "#2c3e50", marginBottom: 8 },
  cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  info: { fontSize: 14, color: "#666" },
  price: { fontSize: 14, fontWeight: "bold", color: "#27ae60" },
});