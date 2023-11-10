import React from 'react';
import { sendEmailVerification, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/authConfig";



export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("user logged in");
        const user = userCredential.user;
        return user;
    } catch(error) {
        console.log(console.error);
        throw error;
    }
}

export const emailVerification = async () => {
    const user = auth.currentUser
    try {
        await sendEmailVerification(auth.currentUser);

    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Email verification error: ", errorCode, errorMessage);
        throw error;
    }
}

export const logout = async () => {
    signOut(auth).then(() => {

    });
}