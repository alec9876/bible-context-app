import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import Constants from 'expo-constants';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HorizontalSections from "./HorizontalSectionsScreen";
import VerticalSections from "./VerticalSectionsScreen";

const FirstSubDoctrine = ({ route }) => {
    const { itemId, collectionRef} = route.params;
    const [doctrine, setDoctrine] = useState([]);
    const [activeSections, setActiveSections] = useState([]);
    const subDocRef = collection(db, collectionRef, itemId, 'SubDoctrine');

    verticalSections = () => this.setState({ vertical: true});
    horizontalSections = () => this.setState({ vertical: false});

    getSubDoctrine = async () => {
        const q = query(subDocRef, orderBy('Topic'));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setDoctrine(mapData);
    }
    
    useEffect(() => {
        getSubDoctrine();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <VerticalSections doctrine={doctrine} activeSections={activeSections} />
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
    box: {
        flex: 1,
        backgroundColor: '#333',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon',
        borderRadius: 25,
        marginVertical: '3%',
        marginHorizontal: '3.3%'
    },
    dropBox: {
        flex: 1,
        backgroundColor: '#333',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon',
        borderRadius: 25,
        marginVertical: '3%',
        marginHorizontal: '3.3%',
        padding: 5
    },
    titleStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    topicStyle: {
        fontSize: 23,
        color: 'white',
        marginTop: 5,
        alignItems: 'flex-start',
        fontWeight: 'bold'
    },
    verseStyle: {
        fontSize: 21,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 10,
    },
    subTopicStyle: {
        fontSize: 21,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 15
    },
    subVerseStyle: {
        fontSize: 19,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 40
    }   
});

export default FirstSubDoctrine;