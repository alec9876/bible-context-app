import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { db } from "../../firebase/firebaseConfig";

import VerticalSections from "../components/VerticalSectionsScreen";
import HorizontalSections from "../components/HorizontalSectionsScreen";

const SectionsScreen = ({ route }) => {
    const { itemId, collectionRef, bookName } = route.params;
    const [sections, setSections] = useState([]);
    const [enabled, setEnabled] = useState(true);
    const [text, setText] = useState('List View');
    const sectionRef = collection(db, collectionRef, itemId, 'Sections');
    const navigation = useNavigation();

    const toggleSwitch = () => {
        if (enabled) {
            setText('Study View');
        } else {
            setText('List View');
        }
        setEnabled(previousState => !previousState);
    }

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
            <View style={styles.headerStyle}>
                <Text style={styles.textStyle}>{text}</Text>
                <Switch
                    trackColor={{false: 'salmon', true: 'salmon'}}
                    thumbColor='white'
                    onValueChange={toggleSwitch}
                    value={enabled}
                />
            </View>
            {enabled ? (
                <ScrollView>
                    <VerticalSections sections = {sections}
                                      bookName = {bookName}
                                      navigation = {navigation}
                    />
                </ScrollView>
            ) : (
                <HorizontalSections sections = {sections}
                                    bookName = {bookName}
                                    navigation = {navigation}
                />
            )}
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
    },
    textStyle: {
        color:'white',
        fontSize: 18,
        marginTop: 10
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default SectionsScreen;