import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    ({
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    } = require('dotenv').config().parsed)
  )

  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export default firebase
