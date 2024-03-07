import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { FontFamily, FontSize, Padding, Color, Border } from "../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSignup = () => {
    if (fullName === "" || fullName === null) {
      alert("Full name is required");
    } else if (email === "" || email === null) {
      alert("Email is required");
    } else if (password === "" || password === null) {
      alert("Password is required");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            updateProfile(user, {
              displayName: fullName,
            })
              .then(() => {
                navigation.navigate("App");
              })
              .catch((error) => {
                alert("Failed to update user profile.");
                console.log(error);
              });
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
          });
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.signUpScreen}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Create an account so you can explore all the existing jobs
        </Text>
        <View style={styles.form}>
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder="Full Name"
            placeholderTextColor="#626262"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder="Email"
            placeholderTextColor="#626262"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {/* <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#626262"
          /> */}
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#626262"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#626262"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Pressable style={styles.signUpButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
        <View style={styles.socialMedia}>
          <Pressable
            style={styles.button2}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signInText}>Already have an account</Text>
          </Pressable>
          <Text style={styles.orContinueWith}>Or continue with</Text>
          <View style={styles.socialMedia1}>
            <Pressable style={styles.googleFlexBox}>
              <Icon name="google" size={24} color="#DB4437" />
            </Pressable>
            {/* <Pressable style={[styles.facebook, styles.googleFlexBox]}>
              <Icon name="apple" size={24} color="#000" />
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signUpScreen: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Padding.p_xl,
    backgroundColor: Color.systemLabelPrimary,
  },
  title: {
    fontSize: FontSize.size_11xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "center",
    color: Color.lightPrimaryColor,
    marginTop: Padding.p_xl,
  },
  subtitle: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    textAlign: "center",
    color: Color.systemBlack,
    textAlign: "center",
    marginBottom: Padding.p_xl,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    backgroundColor: Color.colorGhostwhite_100,
    borderRadius: Border.br_3xs,
    padding: Padding.p_xl,
    width: "100%",
    marginBottom: Padding.p_sm,
  },
  inputMargin: {
    marginTop: Padding.p_xl,
  },
  signUpButton: {
    marginTop: Padding.p_xl,
    backgroundColor: Color.lightPrimaryColor,
    borderRadius: Border.br_3xs,
    paddingVertical: Padding.p_mini,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_xl,
    color: Color.systemLabelPrimary,
  },
  signInText: {
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.systemGray,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    marginTop: Padding.p_xl,
  },
  socialMedia: {
    paddingVertical: Padding.p_xl,
    marginTop: Padding.p_xl,
  },
  orContinueWith: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_sm,
    color: Color.lightPrimaryColor,
    textAlign: "center",
    marginTop: Padding.p_xl,
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: Padding.p_sm,
  },
  iconButton: {
    backgroundColor: Color.colorWhitesmoke,
    padding: Padding.p_mini,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    justifyContent: "center",
  },
  inputMargin: {
    marginTop: Padding.p_xl,
  },
  signUpButton: {
    marginTop: Padding.p_xl,
    backgroundColor: Color.lightPrimaryColor,
    borderRadius: Border.br_3xs,
    paddingVertical: Padding.p_mini,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_xl,
    color: Color.systemLabelPrimary,
    textAlign: "center",
  },
  signInText: {
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.systemGray,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    marginTop: Padding.p_xl,
  },
  socialMedia: {
    alignItems: "center",
  },
  orContinueWith: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_sm,
    color: Color.lightPrimaryColor,
    textAlign: "center",
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: Padding.p_sm,
  },
  iconButton: {
    backgroundColor: Color.colorWhitesmoke,
    padding: Padding.p_mini,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    justifyContent: "center",
  },
  googleFlexBox: {
    width: 60,
    backgroundColor: Color.colorWhitesmoke,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_3xs,
  },
  facebook: {
    marginLeft: 10,
  },
  socialMedia1: {
    justifyContent: "flex-end",
    marginTop: 20,
    flexDirection: "row",
  },
  // This is where you add any additional styles that you need for your component
});

export default SignUp;
