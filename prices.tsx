import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const crops = [
  { en: "Wheat", hi: "गेहूँ", pa: "ਗੇਹੂੰ", ta: "கோதுமை" },
  { en: "Rice", hi: "चावल", pa: "ਚਾਵਲ", ta: "அரிசி" },
  { en: "Potato", hi: "आलू", pa: "ਆਲੂ", ta: "உருளைக்கிழங்கு" },
  { en: "Maize", hi: "मक्का", pa: "ਮੱਕੀ", ta: "சோளம்" },
];

export default function PricesScreen() {
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState(crops[0].en);
  const [language, setLanguage] = useState<"en" | "hi" | "pa" | "ta">("en");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Market Prices</Text>

      <Text style={styles.label}>Select Language:</Text>
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={(value) => setLanguage(value)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="हिन्दी" value="hi" />
        <Picker.Item label="ਪੰਜਾਬੀ" value="pa" />
        <Picker.Item label="தமிழ்" value="ta" />
      </Picker>

      <Text style={styles.label}>Select Crop:</Text>
      <Picker
        selectedValue={selectedCrop}
        style={styles.picker}
        onValueChange={(value) => setSelectedCrop(value)}
      >
        {crops.map((crop, index) => (
          <Picker.Item key={index} label={crop[language]} value={crop[language]} />
        ))}
      </Picker>

      <Button
        title="See Mandis"
        onPress={() =>
          router.push({
            pathname: "/mandis",
            params: { crop: selectedCrop, lang: language },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: 250,
    marginVertical: 10,
  },
});
