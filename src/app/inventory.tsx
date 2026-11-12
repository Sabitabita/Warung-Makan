import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BahanWarung, getStokWarung } from "../services/warungApi";

export default function InventoryScreen() {
  const [barang, setBarang] = useState<BahanWarung[]>([]);
  const [cari, setCari] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const muatStok = async (keyword: string = "") => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStokWarung(keyword);
      setBarang(data);
    } catch (err) {
      setBarang([]);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    muatStok();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Cari bahan (chicken, beef, rice, egg, milk)..."
          value={cari}
          onChangeText={setCari}
        />
        <TouchableOpacity style={styles.btn} onPress={() => muatStok(cari)}>
          <Text style={styles.btnText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2980b9" style={{ flex: 1 }} />
      ) : error ? (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.btnReset} onPress={() => { setCari(""); muatStok(""); }}>
            <Text style={styles.btnText}>Muat Semua Stok</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={barang}
          keyExtractor={(item) => item.idIngredient}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.strIngredient)}-Small.png` }}
                style={styles.thumb}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.title}>{item.strIngredient}</Text>
                <Text style={styles.sub} numberOfLines={2}>
                  {item.strDescription || "Bahan pokok & kebutuhan dapur warung"}
                </Text>
                <Text style={styles.code}>Kode Barang: #{item.idIngredient}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 16 },
  searchRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  input: { flex: 1, backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 12, height: 42, borderWidth: 1, borderColor: "#ddd" },
  btn: { backgroundColor: "#2980b9", justifyContent: "center", paddingHorizontal: 16, borderRadius: 8 },
  btnReset: { backgroundColor: "#2980b9", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 10 },
  btnText: { color: "#fff", fontWeight: "bold" },
  error: { color: "red", textAlign: "center" },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, alignItems: "center", elevation: 2 },
  thumb: { width: 60, height: 60, borderRadius: 8, backgroundColor: "#f9f9f9" },
  title: { fontSize: 15, fontWeight: "bold", color: "#2c3e50" },
  sub: { fontSize: 12, color: "#666", marginVertical: 2 },
  code: { fontSize: 11, color: "#2980b9", fontWeight: "600" },
});