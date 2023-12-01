import { collection, getDocs, query, orderBy, getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase/firebaseConfig";
import { auth } from '../../firebase/authConfig';

const ChaptersScreen = ({ route, navigation }) => {
    const { itemId, collectionRef, bookName } = route.params;
    const [chapters, setChapters] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const chapterRef = collection(db, collectionRef, itemId, 'Chapters'); 
    const userRef = doc(db, "Users", auth.currentUser.uid);


    const getChapters = async () => {
        const q = query(chapterRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setChapters(mapData);
    }

    const getHighlights = async () => {
        const data = await getDoc(userRef);
        let arr = data.data().highlights;
        if(arr) {
            arr = arr.map(i => '#' + i );
            console.log("arr", arr.join());
            setHighlights(arr.join());
        }
    }

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {     
            getHighlights();
            getChapters();
        });
        return focusHandler;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.row}>
                    {chapters.map((item) => {
                        return (
                            <View key={item.id}
                                  style={styles.box}>
                                <Pressable
                                    onPress={() => navigation.navigate('Scripture', {
                                        highlights: highlights,
                                        chapter: item.Chapter, 
                                        bookName: bookName, name: `${bookName} ${item.Chapter}`, 
                                        endChapter: chapters.length})}>
                                    <Text style={styles.chapterNumber}>{item.Chapter}</Text>
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    box: {
        width: 75,
        height: 75,
        backgroundColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '3.3%'
    },
    chapterNumber: {
        fontSize: 30,
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    }
})

export default ChaptersScreen;