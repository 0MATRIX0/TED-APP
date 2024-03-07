import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { deleteUser, signOut } from "firebase/auth";

const MyProfile = ({ navigation }) => {
  const user = FIREBASE_AUTH.currentUser;
  const insets = useSafeAreaInsets();
  const [isEnabledDarkMode, setIsEnabledDarkMode] = React.useState(false);

  const toggleSwitch = () =>
    setIsEnabledDarkMode((previousState) => !previousState);

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(FIREBASE_AUTH);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.profileSection}>
        <Icon name="person-circle-outline" size={80} />
        <Text style={styles.userName}>{user.displayName || "User Name"}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileItem title="Profile" iconName="person-outline" />
        {/* <ProfileItem title="Availability" iconName="calendar-outline" />
        <ProfileItem title="Billings & Earnings" iconName="cash-outline" /> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings & Preferences</Text>
        {/* <ProfileItem title="Notifications" iconName="notifications-outline" />
        <ProfileItem title="Language" iconName="globe-outline" /> 
        <ProfileItem title="Security" iconName="shield-checkmark-outline" />*/}
        <View style={styles.item}>
          <Icon name="moon-outline" size={24} style={styles.icon} />
          <Text style={styles.itemText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4fd216" }}
            thumbColor={isEnabledDarkMode ? "#fff" : "#000"}
            onValueChange={toggleSwitch}
            value={isEnabledDarkMode}
          />
        </View>
      </View>

      <View style={styles.section}>
        <LogoutItem title="Logout" iconName="log-out" onPress={handleSignOut} />
      </View>

      <View style={styles.section}>
        <LogoutItem
          title="Delete Account"
          iconName="trash"
          onPress={deleteAccount}
        />
      </View>
    </ScrollView>
  );
};

const ProfileItem = ({ title, iconName }) => (
  <TouchableOpacity style={styles.item} onPress={() => {}}>
    <Icon name={iconName} size={24} style={styles.icon} />
    <Text style={styles.itemText}>{title}</Text>
    <Icon name="chevron-forward-outline" size={24} />
  </TouchableOpacity>
);

const LogoutItem = ({ title, iconName, onPress }) => (
  <Pressable onPress={onPress}>
    <TouchableOpacity style={styles.item}>
      <Icon name={iconName} size={24} style={styles.icon} />
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
    marginBottom: 2,
  },
  itemText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MyProfile;
