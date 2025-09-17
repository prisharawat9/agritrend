import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MandisScreen() {
  const { crop, lang } = useLocalSearchParams<{ crop: string; lang: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Mandis for {crop}</Text>

      <View style={styles.grid}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.boxText}>Mandi {index + 1}</Text>
            <Text style={styles.placeholder}>Data coming soon...</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0fdf4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "47%",
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3, // shadow Android
    shadowColor: "#000", // shadow iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placeholder: {
    fontSize: 14,
    color: "gray",
  },
});
