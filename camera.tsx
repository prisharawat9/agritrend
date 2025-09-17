import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);

  const cameraRef = useRef<any>(null);

  // Ask location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === "granted");
    })();
  }, []);

  // Get state name from OpenStreetMap
  const getStateFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      const state = data?.address?.state || "State not found";
      setStateName(state);
    } catch (error) {
      console.error("Error fetching state:", error);
      setStateName("Error fetching state");
    }
  };

  // Capture photo + get location + fetch state
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);

      if (hasLocationPermission) {
        const location = await Location.getCurrentPositionAsync({});
        getStateFromCoords(location.coords.latitude, location.coords.longitude);
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!capturedImage ? (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={{ flex: 1, justifyContent: "flex-end", margin: 20 }}>
            <Button title="Capture Photo" onPress={takePicture} />
          </View>
        </CameraView>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          <Text style={styles.stateText}>
            {stateName ? `State: ${stateName}` : "Fetching state..."}
          </Text>
          <Button title="Retake" onPress={() => setCapturedImage(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
  preview: { flex: 1, width: "100%", resizeMode: "contain" },
  stateText: { fontSize: 18, margin: 10, fontWeight: "bold" },
});
