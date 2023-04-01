import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebaseConfig";
import { getAPIVerse } from "../../service/APICalls";
import { FontAwesome5 } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';


const VerseScreen = ({ navigation, route }) => {
    const { chapter, bookName, endChapter } = route.params;
    const [verses, setVerses] = useState([]);
    const [nextChapter, setNextChapter] = useState(parseInt(chapter));

    const getChapter = async (currentChapter) => {
        if (currentChapter === undefined) {
            currentChapter = parseInt(chapter);
        }
        const scripture = await getAPIVerse(bookName, currentChapter);
        setVerses(scripture);
    }

    useEffect(() => {
        getChapter(nextChapter);
        navigation.setOptions({ title: `${bookName} ${nextChapter}` })
    }, [nextChapter]);

    return (
        <SafeAreaView style={styles.container}>
            {nextChapter < 50 ? (
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
            <ScrollView>
                <View>
                    <Text style={styles.fontStyle}>
                        {verses.passages}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
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
        zIndex: 1,
        borderRadius: 20
    },
    leftIcon: {
        position: 'absolute',
        bottom: 15,
        left: 25,
        zIndex: 1,
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
        zIndex: 1,
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
        color: 'black',
        padding: 10,
        alignItems: 'center'
    }
});

export default VerseScreen;