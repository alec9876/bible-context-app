import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase/authConfig';

import LoginScreen from './src/view/LoginScreen';
import TabScreen from './src/view/TabScreen';

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = 
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("true");
          setUser(user);
        } else {
          console.log("false");
          setUser(null);
        }
      });

    return unsubscribe;
  }, []);

  return (
    <>
    { user ? (
      <TabScreen />
    ) : (
      <LoginScreen />
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  }
});

