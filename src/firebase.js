import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyASMmP83ik84eOSf9TleoKExGGWAhEN2EA",
	authDomain: "todo-app-78c98.firebaseapp.com",
	projectId: "todo-app-78c98",
	storageBucket: "todo-app-78c98.appspot.com",
	messagingSenderId: "572469145124",
	appId: "1:572469145124:web:b39f5bc1b98edac190f2b1",
	measurementId: "G-92Q04318Y8",
});

// const firebaseConfig = {};

const db = firebaseApp.firestore();

export default db ;
