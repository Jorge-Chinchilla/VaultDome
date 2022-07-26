// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { v4 } = require('uuid');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ1mFdIrmXofI3TU3P7Do_FkZA5C5HCh0",
  authDomain: "vaultdome.firebaseapp.com",
  projectId: "vaultdome",
  storageBucket: "vaultdome.appspot.com",
  messagingSenderId: "915987870130",
  appId: "1:915987870130:web:efec62d417dd48321434ab",
  measurementId: "G-W42ET3F24F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

firebase = {}

firebase.upload = async (file) =>{
    console.log('File Data: ', file.data)
    const firebaseDir = `${v4()}${file.name}`;
    const imageRef = ref(storage, firebaseDir);
    let snapshot = await uploadBytes(imageRef, file.data);
    let url = await getDownloadURL(snapshot.ref);
    return {url, firebaseDir};
}

firebase.deleteFile = async (dir) => {
    const removedDir = ref(storage, dir);
    let deleted = deleteObject(removedDir).then(() => {
        console.log("Removed");
    }).catch((error) => {
        console.log("Failed");
    })
    return deleted;
}

module.exports = firebase;
