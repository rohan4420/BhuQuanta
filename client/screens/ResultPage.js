// screens/ResultScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Navbar from "./NavBar";

const ResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // const { district, tehsil, village, khasra } = route.params;

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Result Screen</Text>
      <Text style={styles.resultText}>State:Maharashtra</Text>
      <Text style={styles.resultText}>District: Solapur</Text>
      <Text style={styles.resultText}>Tehsil: Jule Solapur</Text>
      <Text style={styles.resultText}>Village: Borgaon</Text>
      <Text style={styles.resultText}>Khasra: 143</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
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
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#495057",
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
    textAlign: "center",
  },
});

export default ResultScreen;
