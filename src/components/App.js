import React from 'react'
import { Link, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
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
    const match = useRouteMatch('/watch/:projectId')
    const projectId = match ? match.params.projectId : null

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

    const padding = {
        padding: 5
    }
    // TODO: Rename canvas to create
    return (
        <>
            <Header SignIn={SignIn} SignOut={SignOut} user={user} />
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/canvas">canvas</Link>
            </div>
            <Switch>
                <Route path="/canvas" render={() =>
                    user ? <Canvas projectId="WeLImpeRjuSEThIeRNIC" /> : <Redirect to="/" />
                } />
                <Route path="/watch/:projectId">
                    <Watch projectId={projectId} />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    )
}

export default App