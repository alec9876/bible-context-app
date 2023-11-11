import React, {useState} from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView, Text, TextInput, ActivityIndicator, Button } from 'react-native';
import { register } from '../../service/authServices';
import { db } from "../../firebase/firebaseConfig";
import EmailVerifyScreen from './EmailVerifyScreen';
import { useNavigation } from '@react-navigation/native';


function RegistrationScreen() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [emailVerify, setEmailVerify] = useState(false);
    const navigation = useNavigation();

    const setData = async (firstName, lastName, email, id) => {
        try{
            console.log("setData");
            db.ref("Users").set({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                id: id
            }).then(() => console.log("Data set"));
        } catch (error) {
            console.log("DataError", error);
            throw error;
        }
    }

    const handleLogin = async () => {
        navigation.navigate("Login");
    }

    const handleRegistration = async () => {
        setLoading(true);
        try {
            const newUser = await register(email, password);
            //setData(firstName, lastName, email, newUser.id);
            if (newUser) {
                setLoading(false);
                setEmailVerify(true);
            }
        } catch (error) {
            setLoading(false);
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use.  Please use a different email.");
            } else if (error.code === "auth/weak-password") {
                alert("Weak password.  Please choose a stronger password.");
            } else {
                alert("Signup error: " + error.code);
            }
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            { !emailVerify ? (
            <View style={styles.items}>
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="First Name"
                        placeholderTextColor="salmon"
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Last Name"
                        placeholderTextColor="salmon"
                    />
                </View>
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
                    <Button title="Register" 
                            onPress={handleRegistration} 
                            color='salmon'/>
                    <View style={styles.space} />
                    <Button title="Back to Login" 
                            color="salmon"
                            onPress={handleLogin}/>
                    </>
                )}
            </View>
            ) : (
                <EmailVerifyScreen />
            )}
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

export default RegistrationScreen;