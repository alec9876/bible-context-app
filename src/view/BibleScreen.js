import React, { useState, useRef, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { db } from "../../firebase/firebaseConfig";
import { ScrollView } from "react-native";
import BibleModalScreen from "../components/BibleModalScreen";
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

function BibleScreen({ navigation }) {
    const [oldTest, setOldTest] = useState([]);
    const [newTest, setNewTest] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const otRef = collection(db, 'OldTestamentBooks');
    const ntRef = collection(db, "NewTestamentBooks");

    const getOTBooks = async () => {
        const q = query(otRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setOldTest(mapData);
    };

    const getNTBooks = async () => {
        const q = query(ntRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setNewTest(mapData);
    };

    useEffect(() => {
        getOTBooks();
        getNTBooks();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.questionIcon}>
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
                            <BibleModalScreen />
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={styles.question}
                    onPress={() => setModalVisible(true)}>
                    <FontAwesome name="question" size={35} color="white" />
                </Pressable>
            </View>
            <ScrollView>
                <View>
                    <View style={styles.statusBarMargin}>
                        {oldTest.map((item) => {
                            return (
                                <View key={item.id}
                                    style={[styles.item, { backgroundColor: `${item.BackgroundColor.toLowerCase()}` }]}>
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
                                                bookName: item.BookName
                                            })}>
                                            <Text style={styles.textButton}>Chapters</Text>
                                        </Pressable>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => navigation.navigate('Sections', {
                                                itemId: item.id,
                                                collectionRef: 'OldTestamentBooks',
                                                name: `${item.BookName} Sections`,
                                                bookName: item.BookName
                                            })}>
                                            <Text style={styles.textButton}>Sections</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Pressable>

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
                                    style={[styles.item, { backgroundColor: `${item.BackgroundColor.toLowerCase()}` }]}>
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
                                                bookName: item.BookName
                                            })}>
                                            <Text style={styles.textButton}>Chapters</Text>
                                        </Pressable>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => navigation.navigate('Sections', {
                                                itemId: item.id,
                                                collectionRef: 'NewTestamentBooks',
                                                name: `${item.BookName} Sections`,
                                                bookName: item.BookName
                                            })}>
                                            <Text style={styles.textButton}>Sections</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
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
    },
    question: {
        backgroundColor: 'green',
        borderRadius: 20,
        border: 'solid',
        borderColor: '#333',
        borderWidth: 3,
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionIcon: {
        position: 'absolute',
        bottom: 15,
        left: 25,
        zIndex: 1,
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
        height: 400,
        borderColor: 'salmon',
        borderWidth: 3,
        borderRadius: 10,
        border: 'solid',
        overflow: 'hidden'
    },
    closeFormat: {
        backgroundColor: 'red',
        alignItems: 'center',
        borderBottomColor: '#333',
        borderBottomWidth: 2
    },
    closeStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default BibleScreen;