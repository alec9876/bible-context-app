import React, { useState } from 'react';
import { Dimensions, ActivityIndicator, Button, StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { login, logout } from '../../../service/authServices';
import { auth } from '../../../firebase/authConfig';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleRegister = async () => {
        navigation.navigate("Registration");
    }

    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await login(email, password);
            if (user.emailVerified) {
                setLoading(false);
            } else {
                logout();
                setLoading(false);
                alert("Please verify your email before loggin in.");
            }
        } catch (error) {
            setLoading(false);
            if (error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password") {
                    alert("Invalid email or password.  Please try again.");
            } else if (error.code === "auth/too-many-requests") {
                alert("Too many unsuccessful login attempts.  Please try again later.");
            } else {
                alert("Sign-in error: " + error.message);
            }
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.items}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        placeholderTextColor="salmon"
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor="salmon"
                    />
                </View>
                {loading ? (
                    <ActivityIndicator size='large' color='salmon' />
                ) : (
                    <>
                    <Button title="Login" 
                            onPress={handleLogin} 
                            color='salmon'/>
                    <View style={styles.space} />
                    <Button title="Create Account" 
                            color="salmon"
                            onPress={handleRegister}/>
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: Dimensions.get('screen').height,
        justifyContent: 'center'
    },
    items: {
        alignItems: 'center'
    },
    title:{
        fontWeight: "bold",
        fontSize:50,
        color:"salmon",
        marginBottom: 40,
    },
    inputView:{
        width:"80%",
        backgroundColor:"#333",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    space:{
        marginBottom: 10
    }
});

export default LoginScreen;

