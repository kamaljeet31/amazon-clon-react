// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import config from './config.js'
var key = config.fireKey
var appID = config.appID
var MID = config.measurementId
var MessageID = config.messagingSenderId

const firebaseConfig = {
  apiKey: `${key}`,
  authDomain: 'challenge-173bc.firebaseapp.com',
  projectId: 'challenge-173bc',
  storageBucket: 'challenge-173bc.appspot.com',
  messagingSenderId: `${MessageID}`,
  appId: `${appID}`,
  measurementId: `${MID}`,
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
