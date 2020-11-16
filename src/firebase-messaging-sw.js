/**
 * Firebase Cloud Messaging service worker.
 */

importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyCg05oQfz18IpyfVKLq2UxYvJD6x8RI47g',
    authDomain: 'gameeye-8eb07.firebaseapp.com',
    databaseURL: 'https://gameeye-8eb07.firebaseio.com',
    projectId: 'gameeye-8eb07',
    storageBucket: 'gameeye-8eb07.appspot.com',
    messagingSenderId: '558929409481',
    messagingKey: 'AAAAgiLJ9ck:APA91bEH9qlJ9tmJfeNc5xzs7Keyr3OrUmcKawvq5oOpEP26b73_jnwJhQ228PC3gFaYj-uphLOpdWgVTcm3TIOZ6BJdBLV_fDPe512lUn1EJEjkbMFXHrd1eANfHtkozlu_MX3RPp6q',
    appId: '1:558929409481:web:25e78c837cac3336026418',
    measurementId: 'G-9MMLBK291P'
});

// Lister for background messages
const messaging = firebase.messaging();
