import { collection, getDocs, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { db } from "../../firebase/firebaseConfig";

const SectionsScreen = ({ navigation, route }) => {
    const { itemId, collectionRef, bookName } = route.params;
    const [sections, setSections] = useState([]);
    const sectionRef = collection(db, collectionRef, itemId, 'Sections');

    const getSections = async () => {
        const q = query(sectionRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setSections(mapData);
    }

    useEffect(() => {
        getSections();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    {sections.map((item) => {
                        return (
                            <View key={item.id}
                                  style={styles.box}>
                                <Pressable
                                    style={styles.pressableStyle}
                                    onPress={() => navigation.navigate('Sections Scripture', {
                                        chapter: item.Verses, 
                                        bookName: bookName, name: `${bookName} ${item.Verses}`,
                                        endChapter: item.Length})}>
                                    <Text style={styles.titleStyle}>
                                        {item.Title}
                                    </Text>
                                    <Text style={styles.verseStyle}>
                                        {item.BookName} {item.Verses}
                                    </Text>
                                </Pressable>
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
    box: {
        height: 95,
        backgroundColor: '#333',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '3.3%'
    },
    pressableStyle: {
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    verseStyle: {
        fontSize: 20,
        color: 'white',
        marginTop: 5,
        borderTopColor: 'white',
        borderTopWidth: 1,
    }   
});

export default SectionsScreen;