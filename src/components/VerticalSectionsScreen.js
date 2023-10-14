import React from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';

const VerticalSections = props => {
    return (
        <View>
            {props.sections.map((item) => {
                return (
                    <View key={item.id}
                            style={styles.box}>
                        <Pressable
                            style={styles.pressableStyle}
                            onPress={() => props.navigation.navigate('Sections Scripture', {
                                chapter: item.Verses, 
                                bookName: props.bookName, name: `${props.bookName} ${item.Verses}`,
                                endChapter: item.Length})}>
                            <Text style={styles.titleStyle}>
                                {item.Title}
                            </Text>
                            <Text style={styles.verseStyle}>
                                {item.BookName} {item.Verses}
                            </Text>
                        </Pressable>
                    </View>
                );
            })}
        </View>
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
    }   
});

export default VerticalSections;