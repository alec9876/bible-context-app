import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { db } from '../../../firebase/firebaseConfig';
import { auth } from '../../../firebase/authConfig';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState();

    const navigation = useNavigation();

    const handleHighlight = async () => {
        navigation.navigate("Highlights");
    }
    // const docRef = doc(db, 'Users', auth.currentUser.uid);

    // const getName = async () => {
    //     const docSnap = await getDoc(docRef);

    //     if(docSnap.exists()) {
    //         console.log("Data", docSnap.data());
    //         setFirstName(docSnap.data().FirstName);
    //     } else {
    //         console.log("Does not exist");
    //     }
    // }

    // useEffect(() => {
    //     getName();
    // }, [])


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.avatarView}>
                    <View style={styles.avatar}>
                        <Text style={styles.profileText}>AS</Text>
                    </View>
                </View>
                <Pressable>
                    <View style={styles.iconView}>
                            <FontAwesome5 name="highlighter" size={20} color="white" />
                        <Pressable onPress={handleHighlight}>
                            <Text style={styles.highlightsText}>Highlights</Text>
                        </Pressable>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.iconView}>
                        <Foundation name="clipboard-notes" size={24} color="white" />
                        <Text style={styles.notesText}>Notes</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    profileText: {
        color: 'white',
        margin: 'auto',
        fontSize: 100
    },
    highlightsText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10
    },
    notesText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 16
    },
    avatarView: {
        alignItems: 'center',
        marginBottom: 20
    },
    avatar: {
        height: 200,
        width: 200,
        borderRadius: 200/2,
        backgroundColor: "#808080",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    iconView: {
        marginBottom: 15,
        marginLeft: 20,
        flexDirection: 'row'
    },

})

export default ProfileScreen;