import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { db } from "../../firebase/firebaseConfig";
import { Card } from '@rneui/themed';
import { getAPIMemoryVerse } from "../../service/APICalls";

const HomeScreen = () => {

    const [memoryVerses, setMemoryVerses] = useState([]);
    const collectionRef = collection(db, 'MemoryVerse');

    useEffect(() => {
        const getVerses = async () => {
            const data = await getDocs(collectionRef);
            const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
            const randomIndex = Math.floor(Math.random() * mapData.length);
            const item = mapData[randomIndex];
            const result = await getAPIMemoryVerse(item.BookName, item.Verse);
            setMemoryVerses(result);
        };
        getVerses();
    }, []);

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.cardStyle}>
                <Card.Title style={styles.cardHeaderStyle}>Memory Verse</Card.Title>
                <Card.Divider />
                <Text style={styles.cardTextStyle}>
                    {memoryVerses.passages} 
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
    cardHeaderStyle: {
        color: 'white',
        fontSize: 20
    },
    cardTextStyle: {
        color: 'white',
        fontSize: 18
    }
});

export default HomeScreen;