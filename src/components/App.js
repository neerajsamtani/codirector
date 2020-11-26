import React from 'react'
import Header from './Header'
import Watch from './Watch'
import Canvas from './Canvas';
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app' 
import 'firebase/auth'
import firebaseConfig from '../firebase'

const auth = firebase.auth()

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

    // TODO: Add user as database entry
    // if (user != null) {
    //     // Get current user data
    //     const currentUser = auth.currentUser;
    //     // Add current user to database
    //     database.ref('users/' + currentUser.uid).set({
    //         name: currentUser.displayName,
    //         email: currentUser.email,
    //         profile_picture : currentUser.photoURL,
    //       })        
    // }

    return(
        <>
            <Header SignIn={SignIn} SignOut={SignOut} user={user} />
            { user ? <Canvas projectId="WeLImpeRjuSEThIeRNIC" /> : <Watch /> }
        </>
    )
}

export default App