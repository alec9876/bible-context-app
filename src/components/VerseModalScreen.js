import React from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView } from 'react-native';

const VerseModalScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.header}>
                        Save Verses To Your Profile!
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.dividingLine} />
                </View>
                <View>
                    <Text style={styles.body}>
                       {`\u2022`} Click on a verse number to save the verse(s) to your profile.
                    </Text>
                    <Text style={styles.body}>
                       {`\u2022`} Once clicked, the verse number will be highlighted.
                    </Text>
                    <Text style={styles.body}>
                       {`\u2022`} Click on the verse again to remove from your profile.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    header: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    body: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 10
    },
    dividingLine: {
        width: '80%',
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
})

export default VerseModalScreen;