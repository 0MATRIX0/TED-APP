import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Color } from '../GlobalStyles';
import img from '../assets/images/forgot_password.png'
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = () => {
        if (email === '' || email === null) {
            alert('Email is required');
        }
        sendPasswordResetEmail(FIREBASE_AUTH, email)
            .then(() => {
                alert('Password reset email sent');
                console.log('Password reset email sent');
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error);
                alert('An error occurred. Please try again later.');
            });

        console.log('Reset password for: ', email);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    {/* You should insert your back arrow icon here */}
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.container1}>
                    <Text style={styles.title}>Forgot password</Text>
                    <Text style={styles.subtitle}>Enter your email account to reset your password</Text>
                    <Image
                        source={img}
                        style={styles.resetIcon}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={handlePasswordReset} style={styles.resetButton}>
                        <Text style={styles.resetButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Assuming a white background
        padding: 20,
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff', // Assuming a white background
        padding: 30,
    },
    resetIcon: {
        width: 200, // Set the width of the image
        height: 200, // Set the height of the image
        resizeMode: 'contain', // Ensures the entire image fits within the bounds and maintains its aspect ratio
        marginBottom: 20, // Adds some space below the image
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 10,
        marginTop: 20,
        color: Color.lightPrimaryColor,
    },
    title: {
        fontSize: 30, // Adjust the size according to your design
        fontWeight: 'bold',
        color: '#000', // Assuming black color for the title
        marginTop: 50, // Space from the top
        marginBottom: 20, // Space before the subtitle
        color: Color.lightPrimaryColor,
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 30, // More space before the input field
        textAlign: 'center', // Centered text
    },
    input: {
        width: '100%',
        height: 50,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e8e8e8', // Light grey border
        borderRadius: 25, // Circular border radius
        marginBottom: 20,
        fontSize: 18, // Bigger font size for better readability
    },
    resetButton: {
        width: '100%',
        height: 50,
        backgroundColor: Color.lightPrimaryColor, // iOS green color
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25, // Circular border radius to match input
        padding: 15,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 20, // Slightly larger font size
        fontWeight: '600', // Semi-bold weight
    },
    backText: {
        color: Color.lightPrimaryColor,
        fontSize: 18,
    }
});

export default ForgotPasswordScreen;