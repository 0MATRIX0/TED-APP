import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const userId = user ? user.uid : null;

    fetch("http://192.168.40.234:5000/api/brands/get-brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.brands) setBrands(data?.brands);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [FIREBASE_AUTH.currentUser]);

  const renderBrandItem = ({ item }) => (
    <View style={styles.brandItem}>
      <Text style={styles.brandItemText}>{item.brand_name}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Welcome,</Text>
          <Text style={styles.email}>
            {FIREBASE_AUTH.currentUser.displayName ||
              FIREBASE_AUTH.currentUser.email}
          </Text>
        </View>
        <View style={styles.innerContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4fd216" />
          ) : (
            <>
              {brands.length > 0 ? (
                <Text style={styles.brandText}>Notifications Here</Text>
              ) : (
                <Text style={styles.messageText}>
                  You don't have any brands yet. Click on the plus icon on the
                  bottom right to create your first brand.
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createBrandButton}
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate("Create Brand");
            }}
          >
            <Text style={styles.createBrandButtonText}>Create Brand</Text>
          </TouchableOpacity>
          <FlatList
            data={brands}
            renderItem={renderBrandItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text>No brands available. Start by creating one!</Text>
            }
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light grey background
  },
  scrollView: {
    width: "100%",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  headingContainer: {
    flexDirection: "column", // Change to column for a more standard layout
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    color: "#4fd216", // Use the green color here for emphasis
    marginBottom: 4,
  },
  email: {
    fontSize: 20,
    fontWeight: "400",
    color: "#333",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  brandText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginTop: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4fd216",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalView: {
    flex: 1,
    paddingTop: 50, // Adjust as needed for your design
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  createBrandButton: {
    backgroundColor: "#4fd216",
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  createBrandButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  brandItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  brandItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Home;
