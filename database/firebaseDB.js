import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBL1YoAKrpynMMcDuhfW157qRcZX1UrjBY",
  authDomain: "gymsaathi.firebaseapp.com",
  projectId: "gymsaathi",
  storageBucket: "gymsaathi.appspot.com",
  messagingSenderId: "294561707851",
  appId: "1:294561707851:web:fb646851f480b0d88d5ace",
  measurementId: "G-LY3SH6QX5D"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app);


  export { db , auth } ;