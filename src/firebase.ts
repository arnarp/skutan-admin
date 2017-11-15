import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyAyyJlOXTwvxsHH_dOUyowCDgZhpH-8KWw',
  authDomain: 'skutan-82826.firebaseapp.com',
  databaseURL: 'https://skutan-82826.firebaseio.com',
  projectId: 'skutan-82826',
  storageBucket: '',
  messagingSenderId: '234753299562',
}
firebase.initializeApp(config)

export const ref = firebase.database().ref
export const firebaseAuth = firebase.auth
