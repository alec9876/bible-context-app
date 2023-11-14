import React from "react";
import { MaterialIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { logout } from '../../../service/authServices';
import { useNavigation } from "@react-navigation/native";

const MoreScreen = () => {
    const navigation = useNavigation();

    const handleProfile = async () => {
        navigation.navigate("Profile");
    }

    return (
        <SafeAreaView style={styles.container}>   
            <ScrollView style={styles.statusBarMargin}>
                <Pressable onPress={handleProfile}>
                    <View style={styles.view}>
                        <SimpleLineIcons name="user" size={24} color="white"/>
                        <Text style={styles.text}>Profile</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.view}>
                        <FontAwesome name="gear" size={24} color="white" />
                        <Text style={styles.text}>Settings</Text>
                    </View>
                </Pressable>
                <Pressable onPress={logout}>
                    <View style={styles.view}>
                        <MaterialIcons name="logout" size={24} color="white" />
                        <Text style={styles.text}>Sign Out</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    statusBarMargin: {
        marginTop: Constants.statusBarHeight + 10
    },
    viewItems: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    view: {
        marginBottom: 10,
        marginLeft: 20,
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10
    },
    icon: {
        marginRight: 10
    }
})

export default MoreScreen;