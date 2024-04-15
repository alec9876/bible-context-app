import React, { useEffect, useState, useRef } from "react";
import { Pressable, Dimensions } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { getAPIVerse } from "../../service/APICalls";
import { FontAwesome5 } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { doc, arrayUnion, updateDoc, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { auth } from '../../firebase/authConfig';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import VerseModalScreen from "./modal/VerseModalScreen";

const { height: windowHeight } = Dimensions.get("window");

const VerseScreen = ({ navigation, route }) => {
    const { chapter, bookName, endChapter, interHighlights } = route.params;
    const [verses, setVerses] = useState("");
    const [savedHighlights, setSavedHighlights] = useState([]);
    const [nextChapter, setNextChapter] = useState(
        nextChapter === undefined ? chapter : nextChapter);
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const [modalVisible, setModalVisible] = useState(false);
    const webViewRef = useRef(null);

    const getHighlights = async () => {
        const data = await getDoc(userRef);
        let arr = data.data().Highlights;
        setSavedHighlights(arr);
    }

    const getChapter = async (currentChapter) => {
        console.log("highlights", savedHighlights);
        const scripture = await getAPIVerse(bookName, currentChapter);
        setVerses(scripture.passages.toString());
    };

    const addHighlight = async (highlight) => {
        console.log("added");
        Toast.showWithGravityAndOffset(`Verse Saved`, 
            Toast.SHORT, Toast.TOP, 25, 25,{
                tapToDismissEnabled: true
            }
        );
        await updateDoc(userRef, {
            Highlights: arrayUnion(highlight) 
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
        console.log("data", data);
        str = data.nativeEvent.data
        if(!savedHighlights.includes(str)){
            addHighlight(str);
        } else {
            removeHighlight(str);
        }
    }

    const cssText =  `
        let highlight = ${interHighlights}.slice();

        document.querySelectorAll('p, h3')
        .forEach(e => {
            e.style.color='white';
        });

        if(!window.highlight.length) {
            document.querySelectorAll(highlight)
            .forEach(e => {
                e.style.color='yellow';
                e.style.fontSize='20px';
            }); 
        } else {
            document.querySelectorAll(window.highlight)
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
            if(window.highlight.includes("#" + this.id)){
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
                     injectedJavaScriptBeforeContentLoaded={
                        `window.highlight = "${savedHighlights.map(i => '#' + i)}";`
                    }
                     javaScriptEnabledAndroid={true}
                     ref={webViewRef}/>
            <View style={styles.iconBackground}>
                {nextChapter < endChapter ? (
                <View style={styles.rightIcon}>
                    <Pressable 
                        onPress={async () => getChapter(setNextChapter(parseInt(nextChapter) + 1))}>
                        <FontAwesome5 name="arrow-alt-circle-right" size={40} color="white" />
                    </Pressable>
                </View>
                ) : null}
                {nextChapter > 1 ? (
                <View style={styles.leftIcon}>
                    <Pressable 
                        onPress={async () => getChapter(setNextChapter(parseInt(nextChapter) - 1))}>
                        <FontAwesome5 name="arrow-alt-circle-left" size={40} color="white"/>
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
                <View style={styles.modalButtonStyle}>
                    <Modal
                        style={styles.modalStyle}
                        isVisible={modalVisible}
                        onBackdropPress={() => setModalVisible(false)}>
                        <View style={styles.modalPosition}>
                            <View style={styles.modalFormat}>
                                <Pressable
                                    style={styles.closeFormat}
                                    onPress={() => setModalVisible(false)}>
                                </Pressable>
                                <VerseModalScreen />
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        onPress={() => setModalVisible(true)}>
                        <FontAwesome5 name="question" size={35} color="white" />
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
    middleButtonStyle: {
        position: 'absolute',
        bottom: 12,
        left: 107.5,
    },
    middleButton: {
        backgroundColor: 'salmon',
        borderRadius: 20,
        width: 130,
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
    },
    modalButtonStyle: {
        position: 'absolute',
        bottom: 17,
        right: 115.5,
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 0
    },
    modalPosition: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    modalFormat: {
        width: 300,
        height: 250,
        borderColor: 'salmon',
        borderWidth: 3,
        borderRadius: 10,
        border: 'solid',
        overflow: 'hidden'
    },
});

export default VerseScreen;