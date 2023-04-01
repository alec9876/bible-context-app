import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { db } from "../../firebaseConfig";
import { ScrollView } from "react-native";

const BibleScreen = ({ navigation }) => {
    const [oldTest, setOldTest] = useState([]);
    const [newTest, setNewTest] = useState([]);
    const otRef = collection(db, 'OldTestamentBooks');
    const ntRef = collection(db, "NewTestamentBooks");

    const getOTBooks = async () => {
        const q = query(otRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setOldTest(mapData);
    };

    const getNTBooks = async () => {
        const q = query(ntRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setNewTest(mapData);
    };

    useEffect(() => {
        getOTBooks();
    }, []);

    useEffect(() => {
        getNTBooks();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.statusBarMargin}>
                {oldTest.map((item) => {
                    return (
                        <View key={item.id}
                              style={[styles.item,{backgroundColor: `${item.BackgroundColor.toLowerCase()}`}]}>
                            <View style={styles.bookGroup}>
                                <Text style={styles.text}>{item.BookName}</Text>
                            </View>
                            <View style={styles.buttonGroup}>
                                <Pressable 
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Chapters', {
                                        itemId: item.id, 
                                        collectionRef: 'OldTestamentBooks', 
                                        name: `${item.BookName} Chapters`, 
                                        bookName: item.BookName})}>
                                    <Text style={styles.textButton}>Chapters</Text>
                                </Pressable>
                                <Pressable 
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Sections')}>
                                    <Text style={styles.textButton}>Sections</Text>
                                </Pressable>
                            </View>
                        </View>
                    );
                })}
            </View>
            <View>
                {newTest.map((item) => {
                    return (
                        <View key={item.id}
                              style={[styles.item,{backgroundColor: `${item.BackgroundColor.toLowerCase()}`}]}>
                            <View style={styles.bookGroup}>
                                <Text style={styles.text}>{item.BookName}</Text>
                            </View>
                            <View style={styles.buttonGroup}>
                                <Pressable 
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Chapters', {
                                        itemId: item.id, 
                                        collectionRef: 'NewTestamentBooks', 
                                        name: `${item.BookName} Chapters`, 
                                        bookName: item.BookName})}>
                                    <Text style={styles.textButton}>Chapters</Text>
                                </Pressable>
                                <Pressable 
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Sections')}>
                                    <Text style={styles.textButton}>Sections</Text>
                                </Pressable>
                            </View>
                        </View>
                    );
                })}
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    statusBarMargin: {
        marginTop: Constants.statusBarHeight + 10
    },
    item: {
        padding: 15,
        marginBottom: 10,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 20,
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    textButton: {
        color: 'lightsalmon',
        fontSize: 17
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 25,
        padding: 10,
        marginRight: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon'
    },
    buttonGroup: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-evenly'
    },
    bookGroup: {
        width: '50%',
        justifyContent: 'center'
    }
});

export default BibleScreen;