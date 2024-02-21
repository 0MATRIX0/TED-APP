import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import img from '../assets/images/email.png'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { Color } from '../GlobalStyles';

const EmailVerification = ({ navigation }) => {

    useEffect(() => {
        const interval = setInterval(async () => {
            await FIREBASE_AUTH.currentUser.reload();
            const user = FIREBASE_AUTH.currentUser;
            if (user.emailVerified) {
                clearInterval(interval);
                navigation.navigate('App'); // Replace 'App' with the name of your main app route
            }
        }, 3000); // Check every 3000 milliseconds (3 seconds)

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [navigation]);

    const handleEmailVerification = () => {
        sendEmailVerification(FIREBASE_AUTH.currentUser)
            .then(() => {
                console.log('Email verification sent');
                alert('Email verification sent');
            })
            .catch((error) => {
                console.log(error);
                alert('An error occurred. Please try again later.');
            });
    }

    return (
        <View style={styles.container}>
            <Image
                source={img}
                style={styles.icon}
            />
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.description}>
                Please verify your email address to continue using our app.
            </Text>

            <TouchableOpacity onPress={handleEmailVerification} style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>VERIFY NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { signOut(FIREBASE_AUTH) }}>
                <Text style={styles.backToSignInText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        fontSize: 24,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
        width: '80%',
    },
    resendButton: {
        marginVertical: 10,
        // Additional styling for the resend button
    },
    resendButtonText: {
        color: '#f0ad4e', // Or any other color
    },
    verifyButton: {
        backgroundColor: Color.lightPrimaryColor,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    verifyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backToSignInText: {
        color: '#000',
        textDecorationLine: 'underline',
    },
});

export default EmailVerification;