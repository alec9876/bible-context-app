import { storage, db } from "../firebase/firebaseConfig";
import {
    ref as storageRef,
    uploadBytes,
  } from "firebase/storage";
import { doc, updateDoc  } from 'firebase/firestore'; 
import { auth } from '../firebase/authConfig';
import reactDom from "react-dom";

export const uploadImage = async (image) => {
    const imageRef = storageRef(storage, `profiles/${auth.currentUser.uid}`);
    const blob = await urlToBlob(image);

    uploadBytes(imageRef, blob).then((snapshot) => {
        saveImage(auth.currentUser.uid);
    })
    .catch((error) => {
        console.log("imageUploadError", error.message);
    })
}

const saveImage = async (url) => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    
    await updateDoc(userRef, {
        ImageID: url
    });
}

const urlToBlob = async (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', reject);
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      });
      xhr.open('GET', url);
      xhr.responseType = 'blob'; // convert type
      xhr.send();
    });
}