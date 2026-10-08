import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

const dummyData = [
  { id: '1', title: 'Warung Cabang Dinoyo', info: 'Jl. MT Haryono No. 10' },
  { id: '2', title: 'Warung Cabang SoeHat', info: 'Jl. Soekarno Hatta No. 45' },
];

export default function BranchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Modul Cabang Warung</Text>
      </View>
      
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.info}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 16, backgroundColor: '#ff8c00' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, margin: 12, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
});