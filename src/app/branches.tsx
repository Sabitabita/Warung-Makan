import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CabangWarung, getCabangWarung } from "../services/warungApi";

export default function BranchesScreen() {
  const [cabang, setCabang] = useState<CabangWarung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCabangWarung()
      .then((data) => setCabang(data))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#ff8c00" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cabang}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>🏪 Warung Cabang {item.name}</Text>
            <Text style={styles.sub}>Wilayah: Kota Malang, Jawa Timur (Kode Area: {item.id})</Text>
            <Text style={styles.status}>● Operasional Aktif</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 16 },
  error: { color: "red", padding: 20, textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 10, elevation: 2 },
  title: { fontSize: 16, fontWeight: "bold", color: "#ff8c00" },
  sub: { fontSize: 13, color: "#555", marginTop: 4 },
  status: { fontSize: 12, color: "#27ae60", fontWeight: "bold", marginTop: 6 },
});