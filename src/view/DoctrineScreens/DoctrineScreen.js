import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import Constants from 'expo-constants';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

function DoctrineScreen({ navigation }) {
    const [doctrine, setDoctrine] = useState([]);
    const docRef = collection(db, 'Doctrine');

    const getDoctrine = async () => {
        const q = query(docRef, orderBy("Order"));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setDoctrine(mapData);
    }

    useEffect(() => {
        getDoctrine();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.statusBarMargin}>
                    {doctrine.map((item) => {
                        return (
                            <View key={item.id}
                                style={styles.box}>
                                <Pressable
                                    style={styles.pressableStyle}
                                    onPress={() => navigation.navigate('FirstSubDoctrine', {
                                        itemId: item.id,
                                        collectionRef: 'Doctrine',
                                        subject: item.Subject,
                                        name: `Doctrine of ${item.Subject}`,
                                    })}>  
                                        <Text style={styles.subjectStyle}>
                                            {item.Subject}
                                        </Text>
                                </Pressable>
                            </View>
                        );
                    })}
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
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    subjectStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        paddingTop: '7.5%'
    },
});

export default DoctrineScreen;