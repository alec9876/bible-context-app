import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../service/authServices';


function EmailVerifyScreen(){
    const navigation = useNavigation();

    const handleLogin = async () => {
        logout();
        navigation.push("Login");
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Welcome to Bible Context!
                </Text>
                <Text style={styles.text}>
                    Please check your email to verify your account.
                    After you verify your account, return to the 
                    Bible Context app to login.
                </Text>
                <Pressable onPress={handleLogin}>
                    <Text style={styles.linkText}>
                        Return to Login
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
    },
    title:{
        fontWeight: "bold",
        fontSize:50,
        color:"salmon",
        marginBottom: 40,
        textAlign: 'center'
    },
    text: {
        color: 'salmon',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        marginRight: 7,
        marginLeft: 7
    },
    linkText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default EmailVerifyScreen;