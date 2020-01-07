import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyALCv78uhZgDuwIVFE-PGbVg6M11RDMgiY',
  authDomain: 'nuxt-firebase-2c44c.firebaseapp.com',
  databaseURL: 'https://nuxt-firebase-2c44c.firebaseio.com',
  projectId: 'nuxt-firebase-2c44c',
  storageBucket: 'nuxt-firebase-2c44c.appspot.com',
  messagingSenderId: '1047674790594',
  appId: '1:1047674790594:web:2f411f60cc9d993331115b',
  measurementId: 'G-27DLVSNRHZ'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export default firebase
