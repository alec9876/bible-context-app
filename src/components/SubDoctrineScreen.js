import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import Constants from 'expo-constants';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';


const SubDoctrineScreen = ({ route, navigation }) => {
    const { itemId, collectionRef} = route.params;
    const [doctrine, setDoctrine] = useState([]);
    const subDocRef = collection(db, collectionRef, itemId, 'SubDoctrine');

    getSubDoctrine = async () => {
        const q = query(subDocRef, orderBy('Topic'));
        const data = await getDocs(q);
        const mapData = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        setDoctrine(mapData);
    }

    useEffect(() => {
        getSubDoctrine();
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
                                onPress={() => navigation.navigate('SubDoctrineDetail', {
                                    doctrineId: itemId,
                                    subDoctrineId: item.id,
                                    doctrineRef: 'Doctrine',
                                    subDoctrineRef: 'SubDoctrine',
                                    topic: item.Topic,
                                    name: `${item.Topic}`,
                                })}>
                                <Text style={styles.titleStyle}>
                                    {item.Topic}
                                </Text>
                            </Pressable>
                        </View>
                    )
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

export default SubDoctrineScreen;