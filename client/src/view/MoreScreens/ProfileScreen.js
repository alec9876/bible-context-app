import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { db } from '../../../firebase/firebaseConfig';
import { auth } from '../../../firebase/authConfig';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import PhotoPicker from '../../components/ImagePickerScreen';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../../service/ImageStorage';


const ProfileScreen = () => {
    const [firstName, setFirstName] = useState();
    const [profileImage, setProfileImage] = useState();
    const docRef = doc(db, 'Users', auth.currentUser.uid);
    const storage = getStorage();
    const navigation = useNavigation();

    const handleHighlight = async () => {
        navigation.navigate("Highlights");
    }

    const getName = async () => {
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            setFirstName(docSnap.data().FirstName);
        } else {
            console.log("Does not exist");
        }
    }

    const getProfilePic = async () => {
        const imageRef = ref(storage, `profiles/${auth.currentUser.uid}`);
        getDownloadURL(imageRef)
            .then((url) => {
                console.log(url);
                setProfileImage(url);
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        setProfileImage(null);
                        console.log(error.code);
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.error(error.code);
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        console.error(error.code);
                        break;
                }
            });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
            setProfileImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        getName();
        getProfilePic();
    }, [])


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.avatarView}>
                {profileImage !== null && profileImage !== 'none' ? (
                    <View>
                        <Image style={styles.imageProps}
                               source={{uri: profileImage}}/>
                    </View>
                ) : (
                    <View style={styles.avatar}>
                        <Text style={styles.profileText}
                                adjustsFontSizeToFit
                                numberOfLines={1}>
                            {firstName}
                        </Text>
                    </View>
                )}
                    <View style={styles.cameraIcon}>
                        <FontAwesome5.Button name="camera" backgroundColor="#3B3B3B" onPress={pickImage}>
                            Edit
                        </FontAwesome5.Button>
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
        fontSize: 50
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
    profileImage: {
        height: 200,
        width: 200,
        borderRadius: 200/2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    imageProps: {
        height: 200,
        width: 200,
        borderRadius: 200/2,
        marginTop: 20
    },
    iconView: {
        marginBottom: 15,
        marginLeft: 20,
        flexDirection: 'row'
    },
    cameraIcon: {
        marginTop: 20
    }

})

export default ProfileScreen;