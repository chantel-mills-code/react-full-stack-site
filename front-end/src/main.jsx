import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7Ah2WJPhwMEMVC8RPddw45YL6e_Oe1ps",
  authDomain: "full-stack-react-4743d.firebaseapp.com",
  projectId: "full-stack-react-4743d",
  storageBucket: "full-stack-react-4743d.firebasestorage.app",
  messagingSenderId: "132407481767",
  appId: "1:132407481767:web:43fc4de195802d9dc0d282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
