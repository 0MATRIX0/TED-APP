import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import CreateBrandError from "./CreateBrandError";

const ContentCalendar = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const userId = user ? user.uid : null;

    fetch("http://192.168.40.60:4000/api/brands/get-brands", {
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
        setBrands(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [FIREBASE_AUTH.currentUser]);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#4fd216" />
      ) : (
        <>
          {brands.length > 0 ? (
            <>
              <View>
                <Text>ContentCalendar</Text>
              </View>
            </>
          ) : (
            <CreateBrandError />
          )}
        </>
      )}
    </>
  );
};

export default ContentCalendar;
