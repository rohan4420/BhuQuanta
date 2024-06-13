import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Navbar from "./NavBar";
import { WebView } from 'react-native-webview';

const ResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { state, district, tehsil, village, khasra } = route.params;

    // Constructing the HTML file path
    const htmlPath = require('../assets/Map.html'); // Adjust the path accordingly

    // Inject JavaScript to initialize the map with parameters
    const injectedJavaScript = `
        initializeMap('${state}', '${district}', '${tehsil}', '${village}', '${khasra}');
    `;

  return (
    <View style={styles.container}>
      <Navbar />
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={htmlPath} // Pass the HTML file path
        javaScriptEnabled={true} // Enable JavaScript execution in the WebView
        injectedJavaScript={injectedJavaScript}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  webview: {
    flex: 1,
    marginTop: 20,
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
