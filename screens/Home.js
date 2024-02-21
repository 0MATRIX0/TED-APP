import React, { useState } from 'react'
import { View, SafeAreaView, FlatList, Text } from 'react-native'
import { COLORS, NFTData } from '../constants'
import { NFTCard, HomeHeader, FocusedStatusBar } from '../components'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { signOut } from 'firebase/auth'
import { Button } from 'react-native-elements'

const Home = ({ navigation }) => {

    // const handleSignOut = () => {
    //     signOut(FIREBASE_AUTH)
    //         .then(() => {
    //             navigation.replace('Login')
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar background={COLORS.primary} />
            <View style={{ flex: 1 }} >
                <View style={{ zIndex: 0 }}>
                    <FlatList
                        data={NFTData}
                        renderItem={({ item }) => <NFTCard nft={item} />}
                    />
                    <Button title="Sign Out" onPress={() => { signOut(FIREBASE_AUTH) }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home