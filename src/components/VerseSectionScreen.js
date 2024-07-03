import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAPITextVerse } from "../../service/APICalls";

const SectionVerseScreen = ({ navigation, route}) => {
    const { chapter, bookName, endChapter } = route.params;
    const [verses, setVerses] = useState([]);
    const re = new RegExp(/[?<=abc\s](\d+)/g)

    const getScripture = async () => {
        const scripture = await getAPITextVerse(bookName, chapter);
        setVerses(scripture);
    }

    useEffect(() => {
        getScripture();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.middleButtonStyle}>
                <Pressable 
                    onPress={() => navigation.navigate('Scripture', {
                        chapter: verses.query.match(re), 
                        bookName: bookName, name: `${bookName} ${verses.query.match(re)}`, 
                        endChapter: endChapter})}
                    style={styles.middleButton}>
                    <Text style={styles.middleButtonText}>Full Chapter</Text>
                </Pressable>
            </View>
            <ScrollView>
                <View>
                    <Text style={styles.scriptureStyle}>
                        {verses.passages}
                    </Text>
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
    scriptureStyle: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 10
    },
    middleButtonStyle: {
        position: 'absolute',
        zIndex: 1,
        bottom: 15,
        left: 107.5,
    },
    middleButton: {
        backgroundColor: 'salmon',
        borderRadius: 20,
        width: 200,
        alignItems: 'center',
        border: 'solid',
        borderColor: '#333',
        borderWidth: 2
    },
    middleButtonText: {
        fontSize: 15,
        color: 'black',
        padding: 10,
        alignItems: 'center'
    }
});

export default SectionVerseScreen;