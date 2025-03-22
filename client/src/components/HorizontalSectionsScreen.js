import React from "react";
import { StyleSheet, Text, View, Pressable, FlatList, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Slides = (data) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pressableStyle}
                onPress={() => navigation.navigate('Sections Scripture', {
                    chapter: data.data.Verses, 
                    bookName: data.data.BookName, name: `${data.data.BookName} ${data.data.Verses}`,
                    endChapter: data.data.Length})}>
                <View style={styles.box}>
                    <Text style={styles.titleStyle}>
                        {data.data.Title}
                    </Text>
                    <Text style={styles.verseStyle}>
                                {data.data.BookName} {data.data.Verses}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const HorizontalSections = props => {
    return (
        <FlatList
            data={props.sections}
            style={{ flex: 1 }}
            renderItem={({item}) => {
                return <Slides data={item} />
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth
    },
    box: {
        height: windowHeight * 0.7,
        width: windowWidth * 0.9,
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

export default HorizontalSections;