import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import Constants from 'expo-constants';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const VerticalSections = (props) => {

    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections);
      };

    const renderHeader = (section, _, isActive) => {
        //Accordion Header view
        return (
          <View style={styles.box}>
            <Text style={styles.titleStyle}>{section.Topic}</Text>
          </View>
        );
      };
    
      const renderContent = (item, _, isActive) => {
        return(
            <View style={styles.dropBox}>
                {item.Reference && <>
                {item.Reference.map((item, index) => {
                return (
                    <View key={index}>
                        <Text style={styles.topicStyle}>{item.Topic}</Text>
                        {item.Verses &&
                            <Text style={styles.verseStyle}>{item.Verses.join("|").toString().split("|").join("\n")}</Text>}
                        {item.Reference && <>
                        {item.Reference.map((item, index) => {
                            return(
                            <View key={index}>
                                <Text style={styles.subTopicStyle}>{item.SubTopic}</Text>
                                {item.Verses &&
                                <Text style={styles.subVerseStyle}>{item.Verses.join("|").toString().split("|").join("\n")}</Text>}
                            </View>
                            )
                        })}
                        </>}
                    </View>
                    );
                })}
                </>} 
          </View>
          )
      };

    return (
        <View style={styles.statusBarMargin}>
            <ScrollView>
                <Accordion
                    activeSections={props.activeSections}
                    sections={props.doctrine}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    statusBarMargin: {
        marginTop: Constants.statusBarHeight + 10
    },
    box: {
        flex: 1,
        backgroundColor: '#333',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon',
        borderRadius: 25,
        marginVertical: '3%',
        marginHorizontal: '3.3%'
    },
    dropBox: {
        flex: 1,
        backgroundColor: '#333',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'salmon',
        borderRadius: 25,
        marginVertical: '3%',
        marginHorizontal: '3.3%',
        padding: 5
    },
    titleStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    topicStyle: {
        fontSize: 23,
        color: 'white',
        marginTop: 5,
        alignItems: 'flex-start',
        fontWeight: 'bold'
    },
    verseStyle: {
        fontSize: 21,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 10,
    },
    subTopicStyle: {
        fontSize: 21,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 15
    },
    subVerseStyle: {
        fontSize: 19,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 40
    }   
});

export default VerticalSections;