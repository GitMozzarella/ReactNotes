import { initializeApp } from '@firebase/app'
import { getDatabase } from '@firebase/database'
import { getAuth } from '@firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyCdNHWPce649k2WauuggfFvpdYS5bkf5o0',
	authDomain: 'notes-eb92a.firebaseapp.com',
	databaseURL:
		'https://notes-eb92a-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'notes-eb92a',
	storageBucket: 'notes-eb92a.appspot.com',
	messagingSenderId: '2285902873',
	appId: '1:2285902873:web:9216fb7edd974cdcb69e88'
}

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

export { db, auth }
