// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage,ref } from "firebase/storage";
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjo1tFlYmp2cCeJ_Eq981FGFy9tJoySXU",
    authDomain: "learn-storage-1e0b9.firebaseapp.com",
    databaseURL: "https://learn-storage-1e0b9-default-rtdb.firebaseio.com",
    projectId: "learn-storage-1e0b9",
    storageBucket: "learn-storage-1e0b9.appspot.com",
    messagingSenderId: "894959725004",
    appId: "1:894959725004:web:36bc8a8d662f4e21a45569",
    measurementId: "G-3E4KEVZ0L0"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function getImageStorage(params) {
    // const [imageUrl, setImageUrl] = useState('')
    let refff = ref(storage,params)
    let imageUrl = ''
    await getDownloadURL(refff)
    .then((url) => {
        imageUrl = url
    })
    .catch((error) => {
        // Handle any errors
    });
    return imageUrl
}
    
export {app,storage,ref, getImageStorage}