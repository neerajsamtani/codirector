import React from 'react'
import Header from './Header'
import Canvas from './Canvas';
import firebase from 'firebase/app' 
import 'firebase/auth'
import 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { useList } from 'react-firebase-hooks/database'
import firebaseConfig from '../firebase'

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
// const database = firebase.database()

const SignIn = () => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        <button className="auth-button" onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

const SignOut = () => {
    return auth.currentUser && (
        <button className="auth-button" onClick={() => auth.signOut()} >Sign Out</button>
    )
}

const App = () => {
    const [user] = useAuthState(auth)
    // const [snapshots, loading, error] = useList(database.ref('list'))

    // const currentUser = auth.currentUser;

    // TODO: Add user as database entry
    // if (currentUser != null) {
    //     database.ref('users/' + currentUser.uid).set({
    //         name: currentUser.displayName,
    //         email: currentUser.email,
    //         profile_picture : currentUser.photoURL,
    //       })
    //     console.log("Added user")
    // }

    return(
        <>
            <Header SignIn={SignIn} SignOut={SignOut} user={user} />
            { user ? <Canvas /> : null }
        </>
    )
}

export default App