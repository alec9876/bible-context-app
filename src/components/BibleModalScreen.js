import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { StyleSheet, ScrollView, Text, View, Pressable, SafeAreaView } from 'react-native';


const BibleModalScreen = () => {
    const [oldLegend, setOldLegend] = useState([]);
    const [newLegend, setNewLegend] = useState([]);
    const modalLegend = collection(db, 'BibleLegend')

    const getOldLegend = async () => {
        const q = query(modalLegend, where('Testament', '==', 'Old'), orderBy('Order'));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setOldLegend(mapData);
    }

    const getNewLegend = async () => {
        const q = query(modalLegend, where('Testament', '==', 'New'), orderBy('Order'));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setNewLegend(mapData);
    }

    useEffect(() => {
        getOldLegend();
        getNewLegend();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.introductionFormat}>
                    <Text style={styles.introductionStyle}>
                        Book Color Legend
                    </Text>
                </View>
                <View style={styles.testamentFormat}>
                    <Text style={styles.testamentStyle}>
                        Old Testament
                    </Text>
                </View>
                <View>
                    {oldLegend.map((item) => {
                        return (
                            <View key={item.id}>
                                <View style={styles.descriptionFormat}>
                                    <View style={[styles.circle, {backgroundColor: `${item.Color.toLowerCase()}`}]} />
                                    <Text style={styles.descriptionStyle}>{item.Description}</Text>
                                    { oldLegend.length !== item.Order ? (
                                    <View style={styles.dividingLine} />
                                    ) : null}
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.testamentLine}/>
                <View style={styles.testamentFormat}>
                    <Text style={styles.testamentStyle}>
                        New Testament
                    </Text>
                </View>
                <View>
                    {newLegend.map((item) => {
                        return (
                            <View key={item.id}>
                                <View style={styles.descriptionFormat}>
                                    <View style={[styles.circle, {backgroundColor: `${item.Color.toLowerCase()}`}]} />
                                    <Text style={styles.descriptionStyle}>{item.Description}</Text>
                                    { newLegend.length !== item.Order ? (
                                    <View style={styles.dividingLine} />
                                    ) : <View style={{marginBottom: 20}} /> }
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    introductionFormat: {
        backgroundColor: 'blue',
        alignItems: 'center',
        marginBottom: 10
    },
    introductionStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30/2
    },
    dividingLine: {
        width: '80%',
        height: 3,
        backgroundColor: '#333',
        marginTop: 10,
        marginBottom: 10
    },
    descriptionStyle: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        width: '80%'
    },
    descriptionFormat: {
        alignItems: 'center'
    },
    testamentStyle: {
        color: 'white',
        width: '60%',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: 'salmon'
    },
    testamentFormat: {
        alignItems: 'center',
        textAlign: 'center'
    },
    testamentLine: {
        width: '100%',
        height: 3,
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 10
    }
})

export default BibleModalScreen;