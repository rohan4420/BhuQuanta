import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import NavBar from "./NavBar";

const LeafletMap = ({ navigation }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leaflet Map</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      />
      <style>
        body { margin: 0; padding: 0; height: 100vh; overflow: hidden; }
        #map { height: 100%; }
        #selectMeButton {
          position: fixed; bottom: 20px; left: 50%;
          transform: translateX(-50%);
          background-color: #007bff; color: #fff;
          padding: 10px 20px; border-radius: 5px; border: none;
          cursor: pointer; font-size: 16px; z-index: 1000;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s, transform 0.3s;
        }
        #selectMeButton:hover { background-color: #0056b3; }
        #selectMeButton:active { background-color: #003d80; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <button id="selectMeButton">Select Me</button>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([20.5937, 78.9629], 5);
        
        var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        var baseMaps = {
          'OpenStreetMap': tileLayer,
          'Satellite': satelliteLayer
        };

        L.control.layers(baseMaps).addTo(map);

        document.getElementById('selectMeButton').addEventListener('click', function() {
          window.ReactNativeWebView.postMessage('showResults');
        });
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event) => {
    if (event.nativeEvent.data === "showResults") {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <WebView
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginTop: 50,
  },
});

export default LeafletMap;
