// screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./NavBar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedState, setSelectedState] = useState("maharashtra");
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [villages, setVillages] = useState([]);
  const [khasras, setKhasras] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTehsil, setSelectedTehsil] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedKhasra, setSelectedKhasra] = useState(null);

  useEffect(() => {
    // Simulate fetching districts based on the fixed state "Maharashtra"
    if (selectedState) {
      setDistricts([
        { label: "District 1", value: "district1" },
        { label: "District 2", value: "district2" },
      ]);
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  useEffect(() => {
    // Simulate fetching tehsils based on selected district
    if (selectedDistrict) {
      setTehsils([
        { label: "Tehsil 1", value: "tehsil1" },
        { label: "Tehsil 2", value: "tehsil2" },
      ]);
    } else {
      setTehsils([]);
      setVillages([]);
      setKhasras([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // Simulate fetching villages based on selected tehsil
    if (selectedTehsil) {
      setVillages([
        { label: "Village 1", value: "village1" },
        { label: "Village 2", value: "village2" },
      ]);
    } else {
      setVillages([]);
      setKhasras([]);
    }
  }, [selectedTehsil]);

  useEffect(() => {
    // Simulate fetching khasras based on selected village
    if (selectedVillage) {
      setKhasras([
        { label: "Khasra 1", value: "khasra1" },
        { label: "Khasra 2", value: "khasra2" },
      ]);
    } else {
      setKhasras([]);
    }
  }, [selectedVillage]);

  const handleShowResults = () => {
    if (!selectedDistrict) {
      Alert.alert("Error", "Please select a district.");
      return;
    }
    if (!selectedTehsil) {
      Alert.alert("Error", "Please select a tehsil.");
      return;
    }
    if (!selectedVillage) {
      Alert.alert("Error", "Please select a village.");
      return;
    }
    if (!selectedKhasra) {
      Alert.alert("Error", "Please select a khasra number.");
      return;
    }

    navigation.navigate("Result", {
      state: selectedState,
      district: selectedDistrict,
      tehsil: selectedTehsil,
      village: selectedVillage,
      khasra: selectedKhasra,
    });
    navigation.navigate("Result");
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Home Screen</Text>

      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedState(value)}
          items={[{ label: "Maharashtra", value: "maharashtra" }]}
          style={pickerSelectStyles}
          value="maharashtra"
          disabled
        />
      </View>

      {selectedState && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDistrict(value)}
            items={districts}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a district", value: null }}
          />
        </View>
      )}

      {selectedDistrict && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedTehsil(value)}
            items={tehsils}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a tehsil", value: null }}
          />
        </View>
      )}

      {selectedTehsil && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedVillage(value)}
            items={villages}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a village", value: null }}
          />
        </View>
      )}

      {selectedVillage && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedKhasra(value)}
            items={khasras}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a khasra number", value: null }}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleShowResults}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LeafletMap")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#343a40",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
  },
});

export default HomeScreen;
