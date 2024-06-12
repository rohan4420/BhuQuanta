import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Navbar from "./NavBar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedState, setSelectedState] = useState("maharashtra");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTehsil, setSelectedTehsil] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedKhasra, setSelectedKhasra] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [villages, setVillages] = useState([]);
  const [khasras, setKhasras] = useState([]);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const geoserverUrl = 'https://gserver.quantasip.com/geoserver';
  const workspace = 'ne';

  const fetchData = async (layerName, filters = {}) => {
    let data = {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: `${workspace}:${layerName}`,
      outputFormat: 'application/json',
      ...filters
    };
    try {
      const response = await axios.get(`${geoserverUrl}/${workspace}/wfs`, { params: data });
      const resultData = response.data.features.map(feature => feature.properties);
      return resultData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const fetchDistricts = async () => {
    const data = await fetchData('completemaster_data');
    const districts = [...new Set(data.map(item => item.district))].filter(district => district).map(district => ({
      label: district,
      value: district
    }));
    setDistricts(districts);
  };

  const fetchTehsils = async (district) => {
    const filters = { cql_filter: `district='${district}'` };
    const data = await fetchData('completemaster_data', filters);
    const tehsils = [...new Set(data.map(item => item.tehsil))].filter(tehsil => tehsil).map(tehsil => ({
      label: tehsil,
      value: tehsil
    }));
    setTehsils(tehsils);
  };

  const fetchVillages = async (tehsil) => {
    const filters = { cql_filter: `tehsil='${tehsil}'` };
    const data = await fetchData('completemaster_data', filters);
    const villages = [...new Set(data.map(item => item.village))].filter(village => village).map(village => ({
      label: village,
      value: village
    }));
    setVillages(villages);
  };

  const fetchKhasras = async (village) => {
    const filters = { cql_filter: `village='${village}'` };
    const data = await fetchData('completemaster_data', filters);
    const khasras = [...new Set(data.map(item => item.khasra_no))].filter(khasra_no => khasra_no).map(khasra_no => ({
      label: khasra_no,
      value: khasra_no
    }));
    setKhasras(khasras);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedTehsil(null);
    setSelectedVillage(null);
    setSelectedKhasra(null);
    fetchTehsils(district);
  };

  const handleTehsilChange = (tehsil) => {
    setSelectedTehsil(tehsil);
    setSelectedVillage(null);
    setSelectedKhasra(null);
    fetchVillages(tehsil);
  };

  const handleVillageChange = (village) => {
    setSelectedVillage(village);
    setSelectedKhasra(null);
    fetchKhasras(village);
  };

  const handleShowResults = () => {
    if (!selectedDistrict || !selectedTehsil || !selectedVillage || !selectedKhasra) {
      Alert.alert("Error", "Please select all options.");
      return;
    }

    navigation.navigate("Result", {
      state: selectedState,
      district: selectedDistrict,
      tehsil: selectedTehsil,
      village: selectedVillage,
      khasra: selectedKhasra,
    });
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

      {selectedState && districts.length > 0 && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={handleDistrictChange}
            items={districts}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a district", value: null }}
          />
        </View>
      )}

      {selectedDistrict && tehsils.length > 0 && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={handleTehsilChange}
            items={tehsils}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a tehsil", value: null }}
          />
        </View>
      )}

      {selectedTehsil && villages.length > 0 && (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={handleVillageChange}
            items={villages}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a village", value: null }}
          />
        </View>
      )}

      {selectedVillage && khasras.length > 0 && (
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
