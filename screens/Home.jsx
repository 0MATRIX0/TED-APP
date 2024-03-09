import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
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
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { Animated } from "react-native";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [brands, setBrands] = useState([]);
  const [unfilledBrands, setUnfilledBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = () => {
    const user = FIREBASE_AUTH.currentUser;
    const userId = user ? user.uid : null;
    setLoading(true);

    Promise.all([
      fetch("http://192.168.40.60:4000/api/brands/get-brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }).then((response) => response.json()),
      fetch("http://192.168.40.60:4000/api/brands/unfilled", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }).then((response) => response.json()),
    ])
      .then(([brandsData, unfilledBrandsData]) => {
        setBrands(brandsData);
        setUnfilledBrands(unfilledBrandsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleDelete = (brandId) => {
    fetch(`http://192.168.40.60:4000/api/brands/delete-unfilled/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: FIREBASE_AUTH.currentUser.uid, brandId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Remove the brand from the state to update the UI
        setUnfilledBrands((prevBrands) =>
          prevBrands.filter((brand) => brand._id !== brandId)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const HeaderComponent = () => (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome,</Text>
        <Text style={styles.email}>
          {FIREBASE_AUTH.currentUser.displayName ||
            FIREBASE_AUTH.currentUser.email}
        </Text>
      </View>
      {loading && <ActivityIndicator size="large" color="#4fd216" />}
      {!loading && brands.length === 0 && unfilledBrands.length === 0 && (
        <Text style={styles.messageText}>
          You don't have any brands yet. Click on the plus icon on the bottom
          right to create your first brand.
        </Text>
      )}
      {!loading && unfilledBrands.length > 0 && (
        <Text style={styles.sectionTitle}>Complete your Brands</Text>
      )}
      {/* You can add more headings or sections here as needed */}
    </>
  );

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    const onPress = () => {
      handleDelete(item._id); // handle the deletion
    };

    return (
      <View
        style={{
          width: 100,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingVertical: 10,
        }}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: 100,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: 5,
            }}
          >
            <Icon name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const renderUnfilledBrandItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item)
        }
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Create Brand", { brand_id: item._id })
          }
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.brandName}</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${((item.questionIndex + 1) / 6) * 100}%` },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={unfilledBrands}
        renderItem={renderUnfilledBrandItem}
        keyExtractor={(item, index) => `unfilled-${index}`}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={<View style={{ paddingBottom: insets.bottom }} />}
        contentContainerStyle={styles.contentContainer}
      />
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
    alignItems: "stretch",
    marginTop: 20,
    width: "100%",
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
    width: "100%", // ensures card takes full width of its parent container
  },
  cardContent: {},
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  progressBarBackground: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden", // Ensures the inner fill does not spill over the border radius
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4fd216",
    borderRadius: 10, // Maintain the same border radius for the fill
  },
});

export default Home;
