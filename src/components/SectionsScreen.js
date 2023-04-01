import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { db } from "../../firebaseConfig";

const SectionsScreen = () => {
    return (
        <View>
            <Text>Sections Screen</Text>
        </View>
    )
}

export default SectionsScreen;