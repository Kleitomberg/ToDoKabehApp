// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8unKMfLzuNTPdB3QhQRaasc6qxLTrWsc",
  authDomain: "todokabeh.firebaseapp.com",
  projectId: "todokabeh",
  storageBucket: "todokabeh.appspot.com",
  messagingSenderId: "1086225163656",
  appId: "1:1086225163656:web:84e8af3cdf9feead40863d",
  measurementId: "G-BXF1KMJ4P3"
};

//definindo as conts para o firebase
const firebaseApp = initializeApp(firebaseConfig);
const db =  getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

//exportando os serviços banco e auth
export {db, auth};
