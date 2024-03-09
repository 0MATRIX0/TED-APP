import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { FontFamily, FontSize, Padding, Color, Border } from "../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "432845431971-6an1ltasu9i0a38frn5hdasd3ugs5on5.apps.googleusercontent.com",
    androidClientId:
      "1077156841536-3003bkvqt9ofp0vpk03h8nba6toso0c0.apps.googleusercontent.com",
    webClientId:
      "1077156841536-6ekrnij0hbm9np7adu09m3g5khgp1e9c.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const credential = GoogleAuthProvider.credential(
        null,
        authentication.accessToken
      );
      signInWithFirebase(credential);
    }
  }, [response]);

  const signInWithFirebase = async (credential) => {
    try {
      await signInWithCredential(FIREBASE_AUTH, credential);
      // Handle successful sign-in
      // navigation.replace("App");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  const handleLogin = () => {
    if (email === "" || email === null) {
      alert("Email is required");
    } else if (password === "" || password === null) {
      alert("Password is required");
    } else {
      signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          navigation.replace("App");
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred. Please try again later.");
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.loginScreen}>
      <View style={styles.header}>
        <Text style={styles.loginHere}>Login here</Text>
        <Text style={styles.welcomeBackYouve}>
          Welcome back you’ve been missed!
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        type="email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        // other props
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        // other props
      />
      <Pressable
        style={styles.button2}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotYourPassword}>Forgot your password?</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.createAccount}>Create new account</Text>
      </Pressable>
      <Text style={styles.orContinueWith}>Or continue with</Text>
      <View style={styles.socialMedia1}>
        {/* Icons for Google, Facebook, Apple */}
        <Pressable onPress={() => promptAsync()} style={styles.socialButton}>
          <Icon name="google" size={24} color="#DB4437" />
        </Pressable>
        {/* <Pressable style={styles.socialButton}>Apple Icon</Pressable> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 50,
  },
  loginHere: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4fd216",
    textAlign: "center",
  },
  welcomeBackYouve: {
    fontSize: 18,
    color: "#626262",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    fontSize: 16,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
  },
  forgotYourPassword: {
    alignSelf: "flex-end",
    color: "#4fd216",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#34C759",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    fontSize: 16,
    color: "#4fd216",
    marginBottom: 15,
  },
  orContinueWith: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  socialMedia1: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 30,
  },
  socialButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#e8e8e8",
    width: 50,
    height: 50,
  },
  button2: {
    textAlign: "right",
    width: "100%",
  },
});

export default Login;
