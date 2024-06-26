import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Assuming you are using Expo for icon support

const NavBar = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Implement your logout logic here
    navigation.navigate("Login");
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 80, // Increase the height of the navbar for more space
    backgroundColor: "#007bff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 9,
    borderRadius: 5,
    backgroundColor: "#0056b3",
    paddingHorizontal: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default NavBar;
