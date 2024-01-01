import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { db } from "../../firebase/firebaseConfig";
import { Card } from '@rneui/themed';
import { getAPIMemoryVerse } from "../../service/APICalls";

const HomeScreen = () => {

    const [memoryVerses, setMemoryVerses] = useState([]);
    const [passages, setPassages] = useState([]);
    const collectionRef = collection(db, 'MemoryVerse');

    useEffect(() => {
        const getVerses = async () => {
            const data = await getDocs(collectionRef);
            const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
            const randomIndex = Math.floor(Math.random() * mapData.length);
            const item = mapData[randomIndex];
            setPassages(item);
            const result = await getAPIMemoryVerse(item.BookName, item.Verse);
            const scripture = result.passages;
            setMemoryVerses(scripture);
        };
        getVerses();
    }, []);

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.cardStyle}>
                <Card.Title style={styles.cardTitleStyle}>Memory Verse:</Card.Title>
                <Text style={styles.cardHeaderStyle}>{passages.BookName} {passages.Verse}</Text>
                <Card.Divider />
                <Text style={styles.cardTextStyle}>
                    {memoryVerses} 
                </Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardStyle: {
        backgroundColor: '#333',
    },
    cardTitleStyle: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5
    },
    cardHeaderStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    cardTextStyle: {
        color: 'white',
        fontSize: 18
    }
});

export default HomeScreen;