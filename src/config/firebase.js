// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-BZDyqth0FuS8A41_y3TyRptkpIpeMI4',
  authDomain: 'befit-8ce27.firebaseapp.com',
  projectId: 'befit-8ce27',
  storageBucket: 'befit-8ce27.appspot.com',
  messagingSenderId: '972301461725',
  appId: '1:972301461725:web:905d3098f933a9f5ea1334',
  measurementId: 'G-HLJVCGER23',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const provider = new GoogleAuthProvider()
export const storage = new getStorage(app)
