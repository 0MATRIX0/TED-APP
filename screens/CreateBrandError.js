import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateBrandError = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.headline}>No Brands Yet</Text>
            <Text style={styles.subtext}>
                Create your first brand to showcase your products or services.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('My Brand')}>
                <Text style={styles.buttonText}>Create Brand</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4fd216',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateBrandError;
