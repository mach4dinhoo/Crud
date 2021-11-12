import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA38PbXCWbFad_JfbeooISMDh4zVGF9G3U",
  authDomain: "tste-teste.firebaseapp.com",
  projectId: "tste-teste",
  storageBucket: "tste-teste.appspot.com",
  messagingSenderId: "442443797917",
  appId: "1:442443797917:web:9ffd7395a169df9e348b74"
};


let fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref()
