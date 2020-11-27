import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import { database } from './Canvas'

const Watch = ({ projectId }) => {

    const [graph, setGraph] = useState([])
    const [error, setError] = useState("")

    const getGraph = () => {
        database.ref('/projects/' + projectId).once('value')
            .then(snapshot => {
                var initialGraph = []
                if (snapshot.val()) {
                    var elements = snapshot.val().elements
                    for (const currentElement of elements) {
                        if (currentElement) {
                            initialGraph.push(currentElement)
                        }
                    }
                    setGraph(initialGraph)
                } else {
                    setError("Film not found")
                }
                
            })
    }
    useEffect(getGraph, [])

    return (
        <div>
            <p>Watch this movie</p>
            {error}
            {console.log(graph)}
        </div>
    )
}

export default Watch