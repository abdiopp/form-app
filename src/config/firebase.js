// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3JOaXuAss92jxJramSQZHdJFxQVjg1p8",
    authDomain: "hmaara-form-app.firebaseapp.com",
    projectId: "hmaara-form-app",
    storageBucket: "hmaara-form-app.appspot.com",
    messagingSenderId: "38964837527",
    appId: "1:38964837527:web:6a9673d450c0217d883dd2",
    measurementId: "G-D6T0N6T5M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { analytics, auth, storage };