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

const HighlightScreen = ({navigation}) => {
    const [highlights, setHighlights] = useState([]);
    const [highlightId, setHighlightId] = useState('');
    const [highlightLength, setHighlightLength] = useState();
    const [visible, setVisible] = useState(false);
    const userRef = doc(db, "Users", auth.currentUser.uid);

    const getHighlights = async () => {
        let newArr = [];
        let book = [];
        let verse = [];
        const data = await getDoc(userRef);
        let arr = data.data().Highlights;
        setHighlightLength(arr.length);
        if(arr.length > 1) {
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
    }

    const deleteHighlight = async (highlight) => {
        await updateDoc(userRef, {
            Highlights: arrayRemove(highlight)
        });
        setVisible(!visible);
        getHighlights();
    }

    const toggleDialog = (id) => {
        setHighlightId(id)
        setVisible(!visible);
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getHighlights();
        })
        getHighlights();
    }, [])

    return(
        <SafeAreaView style={styles.container}>
                {highlightLength > 1 ? (
                    <ScrollView>
                    <>
                        <View style={styles.statusBarMargin}>
                            {highlights.map((item, index) => {
                                return (
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
                                );
                            })}
                        </View>
                        <HighlightModalScreen visible={visible}
                            toggle={toggleDialog}
                            remove={deleteHighlight}
                            highlight={highlightId} />
                    </>
                    </ScrollView>
                ) : (
                    <View style={styles.noHighlightsFormat}>
                        <View>
                            <Text style={styles.noHighlightsTitle}>
                                You don't have highlights!
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.noHighlightsText}>
                                Navigate to the Bible tab and click on a verse
                                to highlight in order to save it for later memorization
                                or study.
                            </Text>
                        </View>
                    </View>
                )}
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
    noHighlightsFormat: { 
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#000435'
    },
    noHighlightsTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    noHighlightsText: {
        fontSize: 18,
        color: 'white',
    }
})

export default HighlightScreen;