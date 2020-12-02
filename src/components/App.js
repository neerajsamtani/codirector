import React from 'react'
import { Link, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Watch from './Watch'
import Canvas from './Canvas'
import Projects from './Projects'
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
        <button className="auth-button" onClick={signInWithGoogle}>Log in with Google</button>
    )
}

const SignOut = () => {
    return auth.currentUser && (
        <button className="auth-button" onClick={() => auth.signOut()} >Sign Out</button>
    )
}

const App = () => {
    const [user] = useAuthState(auth)

    const watchMatch = useRouteMatch('/watch/:projectId')
    const watchProjectId = watchMatch ? watchMatch.params.projectId : null

    const canvasMatch = useRouteMatch('/canvas/:projectId')
    const canvasProjectId = canvasMatch ? canvasMatch.params.projectId : null

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

    // TODO: Rename canvas to create
    // TODO: Only allow navigation to canvas if logged in
    return (
        <>
            <Header SignIn={SignIn} SignOut={SignOut} user={user} />
            <Switch>
                <Route path="/canvas/:projectId" render={() =>
                    <Canvas projectId={canvasProjectId} user={user} />
                } />
                <Route path="/watch/:projectId">
                    <Watch projectId={watchProjectId} />
                </Route>
                <Route path="/projects">
                    <Projects user={user} />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    )
}

export default App