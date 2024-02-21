import React from "react";
import { Image, StyleSheet, StatusBar, View, Text, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import img from '../assets/images/main.png';

const window = Dimensions.get("window");

const OnboardingThree = ({ navigation }) => {
    return (
        <View style={styles.onboarding}>
            <StatusBar barStyle="dark-content" />
            <Image
                style={styles.image}
                source={img}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>
                    People don’t take trips, trips take <Text style={styles.highlight}>people</Text>
                </Text>
                <Text style={styles.subtext}>
                    To get the best of your adventure you just need to leave and go
                    where you like. we are waiting for you
                </Text>
                <View style={styles.pagination}>
                    <View style={styles.paginationDot} />
                    <View style={[styles.paginatorItem, styles.paginatorLayout]} />
                    <View style={styles.paginationDot} />
                </View>
                <Pressable style={styles.button}>
                    <TouchableOpacity
                        style={styles.signupButton}
                        onPress={() => navigation.replace("OnboardingThree")}
                    >
                        <Text style={styles.buttonText}>{`Next ->`}</Text>
                    </TouchableOpacity>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    onboarding: {
        backgroundColor: Color.systemLabelPrimary,
        flex: 1,
    },
    image: {
        width: window.width,
        height: window.height * 0.5,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
    },
    heading: {
        textAlign: "center",
        color: Color.systemBlackWhite,
        fontSize: FontSize.largeTitle_size,
        fontFamily: FontFamily.subhead,
        fontWeight: "800",
    },
    highlight: {
        color: Color.colorCoral,
    },
    subtext: {
        fontSize: FontSize.subhead_size,
        lineHeight: 20,
        color: Color.systemLabelSecondary1,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    pagination: {
        flexDirection: "row",
        alignItems: "center",
    },
    paginationDot: {
        width: 13,
        height: 7,
        backgroundColor: Color.lightPrimaryColor,
        borderRadius: Border.br_base,
        marginHorizontal: 4,
    },
    paginationDotInactive: {
        width: 13,
        height: 7,
        backgroundColor: Color.lightPrimaryColor,
        borderRadius: Border.br_base,
        marginHorizontal: 4,
        opacity: 0.24,
    },
    button: {
        backgroundColor: "#4fd216", // Adjust the color to match the design
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
        elevation: 3, // This adds a shadow on Android
        shadowColor: "#000", // This adds a shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: Color.systemLabelPrimary,
        fontSize: FontSize.headline_size,
        fontFamily: FontFamily.subhead,
        fontWeight: "600",
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ccc",
        marginHorizontal: 5,
    },
    paginationDotActive: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#4fd216", // Adjust the color to match the design
        marginHorizontal: 5,
    },
    paginatorItem: {
        width: 35,
    },
    paginatorLayout: {
        marginLeft: 4,
        height: 7,
        backgroundColor: "#4fd216",
        borderRadius: Border.br_base,
    },
    highlight: {
        color: "#4fd216", // Adjust the color to match the design
    },
});

export default OnboardingThree;
