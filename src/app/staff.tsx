import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getStafWarung, StafWarung } from "../services/warungApi";

export default function StaffScreen() {
  const [staf, setStaf] = useState<StafWarung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const muatData = async () => {
      try {
        const data = await getStafWarung();
        setStaf(data);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };
    muatData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#8e44ad" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={staf}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.picture.medium }} style={styles.avatar} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
              <Text style={styles.role}>{index % 2 === 0 ? "Kasir Operasional" : "Staf Gudang & Stok"}</Text>
              <Text style={styles.phone}>📞 {item.phone}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 16 },
  error: { color: "red", padding: 20, textAlign: "center" },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, alignItems: "center", elevation: 2 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#eee" },
  name: { fontSize: 15, fontWeight: "bold", color: "#2c3e50" },
  role: { fontSize: 13, color: "#8e44ad", marginTop: 2 },
  phone: { fontSize: 12, color: "#7f8c8d", marginTop: 2 },
});