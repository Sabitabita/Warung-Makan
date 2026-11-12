import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { getCabangWarung, getStafWarung, getStokWarung } from "../services/warungApi";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState({ cabang: 0, staf: 0, stok: 0 });

  useEffect(() => {
    const muatRingkasan = async () => {
      try {
        const [cabang, staf, stok] = await Promise.all([
          getCabangWarung(),
          getStafWarung(),
          getStokWarung(),
        ]);
        setTotal({ cabang: cabang.length, staf: staf.length, stok: stok.length });
      } catch (e) {
        // Tetap buka dashboard jika offline
      } finally {
        setLoading(false);
      }
    };
    muatRingkasan();
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
          <Text style={{ marginTop: 10, color: "#666" }}>Memuat sistem...</Text>
        </View>
      ) : (
        <View style={styles.menuContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>{total.cabang}</Text>
              <Text style={styles.statLabel}>Wilayah Cabang</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>{total.staf}</Text>
              <Text style={styles.statLabel}>Total Staf</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>{total.stok}</Text>
              <Text style={styles.statLabel}>Item Sembako</Text>
            </View>
          </View>

          <Text style={styles.menuTitle}>Pilih Modul Operasional:</Text>

          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: "#ff8c00" }]}
            onPress={() => router.push("/branches")}
          >
            <Text style={styles.menuButtonText}>🏪 Modul Cabang</Text>
            <Text style={styles.menuButtonSub}>Kelola Lokasi & Cabang Operasional</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: "#8e44ad" }]}
            onPress={() => router.push("/staff")}
          >
            <Text style={styles.menuButtonText}>👥 Modul Staf & Karyawan</Text>
            <Text style={styles.menuButtonSub}>Manajemen Jadwal & Personil Karyawan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: "#2980b9" }]}
            onPress={() => router.push("/inventory")}
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
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  header: { padding: 24, backgroundColor: "#333", borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 13, color: "#ccc", marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  menuContainer: { padding: 20 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 10, alignItems: "center", elevation: 2 },
  statNum: { fontSize: 20, fontWeight: "bold", color: "#333" },
  statLabel: { fontSize: 11, color: "#666", marginTop: 2 },
  menuTitle: { fontSize: 16, fontWeight: "bold", color: "#444", marginBottom: 16 },
  menuButton: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 3 },
  menuButtonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  menuButtonSub: { fontSize: 12, color: "rgba(255, 255, 255, 0.85)", marginTop: 4 },
});