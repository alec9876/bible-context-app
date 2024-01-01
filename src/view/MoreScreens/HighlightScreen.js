import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getAPIHighlights } from '../../../service/APICalls';
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { auth } from '../../../firebase/authConfig';
import Constants from 'expo-constants';
import { Card } from '@rneui/themed';
import { FontAwesome5 } from '@expo/vector-icons';
import HighlightModalScreen from '../../components/modal/HighlightModalScreen';

const HighlightScreen = () => {
    const [highlights, setHighlights] = useState([]);
    const [highlightId, setHighlightId] = useState('');
    const [visible, setVisible] = useState(false);
    const userRef = doc(db, "Users", auth.currentUser.uid);

    const getHighlights = async () => {
        let newArr = [];
        let book = [];
        let verse = [];
        const data = await getDoc(userRef);
        let arr = data.data().highlights;
        arr.shift();
        arr.forEach(e => {
            newArr.push(e.split('v').pop().split('-')[0]); 
        })
        const scripture = await getAPIHighlights(newArr);

        book = scripture.canonical.split("; ");
        verse = scripture.passages;

        const result = book.map((item, index) => (
            {
              book: item,
              verse: verse[index],
              highlightId: arr[index]
            }
          ));
          

        setHighlights(result);
    }

    const deleteHighlight = async (highlight) => {
        await updateDoc(userRef, {
            highlights: arrayRemove(highlight)
        });
        setVisible(!visible);
        getHighlights();
    }

    const toggleDialog = (id) => {
        setHighlightId(id)
        setVisible(!visible);
    }

    useEffect(() => {
        getHighlights();
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.statusBarMargin}>
                    {highlights.map((item, index) => {
                        return(
                            <Card key={index} containerStyle={styles.cardStyle}>
                                <Card.Title style={styles.title}>
                                    {item.book}
                                </Card.Title>
                                <Card.Divider />
                                <Text style={styles.highlights}>
                                    {item.verse}
                                </Text>
                                <Pressable onPress={() => toggleDialog(item.highlightId)}>
                                    <FontAwesome5 name="trash-alt" size={16} color="red" />
                                </Pressable>
                            </Card>
                        )
                    })}
                </View>
                <HighlightModalScreen visible={visible} 
                                      toggle={toggleDialog}
                                      remove={deleteHighlight}
                                      highlight={highlightId}
                                      />
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
        marginTop: Constants.statusBarHeight
    },
    title: {
        color: 'white'
    },
    highlights: {
        color: 'white',
        fontSize: 18,
        marginBottom: 15
    },
    cardStyle: {
        backgroundColor: '#333',
        marginBottom: 10
    },
})

export default HighlightScreen;