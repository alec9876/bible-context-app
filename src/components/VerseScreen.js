import React, { useEffect, useState, useRef } from "react";
import { Pressable, Dimensions } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { getAPIVerse } from "../../service/APICalls";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { auth } from '../../firebase/authConfig';
import Toast from 'react-native-simple-toast';

const { height: windowHeight } = Dimensions.get("window");

const VerseScreen = ({ navigation, route }) => {
    const { chapter, bookName, endChapter, highlights } = route.params;
    const [verses, setVerses] = useState("");
    const [nextChapter, setNextChapter] = useState(
        nextChapter === undefined ? chapter : nextChapter);
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const webviewRef = useRef(false);

    const getChapter = async (currentChapter) => {
        const scripture = await getAPIVerse(bookName, currentChapter);
        console.log("highlights", highlights);
        setVerses(scripture.passages.toString());
    };

    const addHighlight = async (highlight) => {
        console.log("clicked");
        await updateDoc(userRef, {
            highlights: arrayUnion(highlight) 
        })
    }

    const onMessage = (data) => {
        str = data.nativeEvent.data
        console.log("str", str);
        Toast.showWithGravityAndOffset(`Verse Saved!`, 
                    Toast.LONG, Toast.TOP, 25, 25, {
                        tapToDismissEnabled: true,
                    });
        addHighlight(str);
    }

    const cssText =  `
        document.querySelectorAll("p, h3")
        .forEach(e => {
            e.style.color='white';
        });

        if("${highlights}") {
            document.querySelectorAll("${highlights}")
            .forEach(e => {
                e.style.color='yellow';
            }); 
        }

        var boldClick = document.querySelectorAll("b");
        for(var i=0; i<boldClick.length; i++){
            boldClick[i].onclick = myfunction;
        }

        function myfunction (){
            document.querySelectorAll("#" + this.id)
            .forEach(e => {
                e.style.color='yellow';
            }); 
            window.ReactNativeWebView.postMessage(this.id);
        }
    `;

    useEffect(() => {
        getChapter(nextChapter);
        navigation.setOptions({ title: `${bookName} ${nextChapter}` })
    }, [nextChapter], [highlights]);

    return (
        <SafeAreaView style={styles.container}>
            <WebView style={styles.html}
                     scalesPageToFit={false}
                     originWhitelist={['*']}
                     source={{ html: verses}}
                     onMessage={onMessage}
                     injectedJavaScript={cssText}
                     javaScriptEnabledAndroid={true}
                     ref={webviewRef}/>
            <View style={styles.iconBackground}>
                {nextChapter < endChapter ? (
                <View style={styles.rightIcon}>
                    <Pressable 
                        onPress={async () => getChapter(setNextChapter(parseInt(nextChapter) + 1))}
                        style={styles.iconButton}>
                        <FontAwesome5 name="arrow-circle-right" size={35} color="#333" />
                    </Pressable>
                </View>
                ) : null}
                {nextChapter > 1 ? (
                <View style={styles.leftIcon}>
                    <Pressable 
                        onPress={async () => getChapter(setNextChapter(parseInt(nextChapter) - 1))}
                        style={styles.iconButton}>
                        <FontAwesome5 name="arrow-circle-left" size={35} color="#333"/>
                    </Pressable>
                </View>
                ) : null}
                <View style={styles.middleButtonStyle}>
                    <Pressable 
                        onPress={async () => navigation.dispatch(StackActions.popToTop())}
                        style={styles.middleButton}>
                        <Text style={styles.middleButtonText}>Back to Book Selection</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -25
    },
    fontStyle: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 10
    },
    rightIcon: {
        position: 'absolute',
        bottom: 15,
        right: 25,
        borderRadius: 20
    },
    leftIcon: {
        position: 'absolute',
        bottom: 15,
        left: 25,
    },
    iconButton: {
        backgroundColor: 'white',
        borderRadius: 15,
        border: 'solid',
        borderWidth: 4,
        borderColor: '#333'
    },
    middleButtonStyle: {
        position: 'absolute',
        bottom: 15,
        left: 107.5,
    },
    middleButton: {
        backgroundColor: 'salmon',
        borderRadius: 20,
        width: 200,
        alignItems: 'center',
        border: 'solid',
        borderColor: '#333',
        borderWidth: 2
    },
    middleButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        padding: 10,
        alignItems: 'center'
    },
    iconBackground: {
        backgroundColor: 'black',
        height: windowHeight * 0.1
    },
    html: {
        flex: 1,
        backgroundColor: 'black',
    }
});

export default VerseScreen;