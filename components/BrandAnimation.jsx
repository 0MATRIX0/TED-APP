import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useRoute } from "@react-navigation/native";

const BrandAnimation = () => {
  const route = useRoute();
  const brandId = route.params?.brandId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.40.60:4000/api/brands/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: FIREBASE_AUTH.currentUser.uid, brandId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <LottieView
          source={require("../assets/lottie/brandAnimation.json")} // Replace with the path to your Lottie file
          autoPlay
          loop
          style={{ width: 200, height: 200 }} // Adjust size as needed
        />
      ) : (
        <Text>Animation Finished</Text> // Display this text once the loading is complete
      )}
    </View>
  );
};

export default BrandAnimation;
