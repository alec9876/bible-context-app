import React, { useEffect, useState, useRef } from "react";
import { Pressable, Dimensions } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { getAPIVerse } from "../../service/APICalls";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { doc, arrayUnion, updateDoc, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { auth } from '../../firebase/authConfig';
import Toast from 'react-native-simple-toast';

const { height: windowHeight } = Dimensions.get("window");

const VerseScreen = ({ navigation, route }) => {
    const { chapter, bookName, endChapter, interHighlights } = route.params;
    const [verses, setVerses] = useState("");
    const [savedHighlights, setSavedHighlights] = useState([]);
    const [nextChapter, setNextChapter] = useState(
        nextChapter === undefined ? chapter : nextChapter);
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const webViewRef = useRef(null);

    const getHighlights = async () => {
        const data = await getDoc(userRef);
        let arr = data.data().highlights;
        setSavedHighlights(arr);
    }
    const getChapter = async (currentChapter) => {
        console.log(interHighlights);
        const scripture = await getAPIVerse(bookName, currentChapter);
        setVerses(scripture.passages.toString());
    };

    const addHighlight = async (highlight) => {
        console.log("added");
        Toast.showWithGravityAndOffset(`Verse Saved`, 
            Toast.SHORT, Toast.TOP, 25, 25,{
                tapToDismissEnabled: true,
            }
        );
        await updateDoc(userRef, {
            highlights: arrayUnion(highlight) 
        })
        getHighlights();
    }

    const removeHighlight = async (highlight) => {
        console.log("removed");
        Toast.showWithGravityAndOffset(`Verse Removed`, 
            Toast.SHORT, Toast.TOP, 25, 25,{
                tapToDismissEnabled: true,
            }
        );
        await updateDoc(userRef, {
            highlights: arrayRemove(highlight)
        })
        getHighlights();
    }

    const onMessage = (data) => {
        str = data.nativeEvent.data
        if(!savedHighlights.includes(str)){
            addHighlight(str);
        } else {
            removeHighlight(str);
        }
    }

    const cssText =  `
    // window.onload = (event) => {
    //     if (window.ReactNativeWebView.injectedObjectJson()) {
    //         const highlight = JSON.parse(window.ReactNativeWebView.injectedObjectJson()).highlight;
    //         alert(highlight);
    //     }
    // }
        let highlight = ${interHighlights}.slice();
        document.querySelectorAll("p, h3")
        .forEach(e => {
            e.style.color='white';
        });

        if(highlight) {
            document.querySelectorAll(highlight)
            .forEach(e => {
                e.style.color='yellow';
                e.style.fontSize='20px';
            }); 
        }

        var boldClick = document.querySelectorAll("b");
        for(var i=0; i<boldClick.length; i++){
            boldClick[i].onclick = myfunction;
        }

        function myfunction(){
            if(highlight.includes("#" + this.id)){
                document.querySelectorAll("#" + this.id)
                .forEach(e => {
                    e.style.color='white';
                    e.style.fontSize='17px';                
                }); 
            } else {
                document.querySelectorAll("#" + this.id)
                .forEach(e => {
                    e.style.color='yellow';
                    e.style.fontSize='20px';
                }); 
            } 
            window.ReactNativeWebView.postMessage(this.id);
        }
        true;
    `;

    useEffect(() => {
        getHighlights();
        getChapter(nextChapter);
        navigation.setOptions({ title: `${bookName} ${nextChapter}` });
    }, [nextChapter], [savedHighlights]);

    return (
        <SafeAreaView style={styles.container}>
            <WebView style={styles.html}
                     scalesPageToFit={false}
                     originWhitelist={['*']}
                     source={{ html: verses}}
                     onMessage={onMessage}
                     injectedJavaScript={cssText}
                    //  injectedJavaScriptBeforeContentLoaded={
                    //     `window.highlights = "${savedHighlights.map(i => '#' + i), console.log("beforeContent")}";`
                    // }
                     injectedJavaScriptObject={{highlight: "#v01001007-1"}}
                     //onLoadStart={onLoadEnd}
                     //onLoadEnd={onLoadEnd}
                     javaScriptEnabledAndroid={true}
                     ref={webViewRef}/>
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
                        <Text style={styles.middleButtonText}>Back to Books</Text>
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