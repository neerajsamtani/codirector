import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import { database } from './Canvas'

const Watch = ({ projectId }) => {

    const [error, setError] = useState("")
    const [graph, setGraph] = useState([])
    const [graphIndex, setGraphIndex] = useState(0)
    const [currentDisplay, setCurrentDisplay] = useState([])

    const incrementGraphIndex = () => {
        setGraphIndex(graphIndex+1)
    }


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
                    setCurrentDisplay(initialGraph[graphIndex])
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
            {/* {console.log(graph)} */}
            <button onClick={incrementGraphIndex} >Next</button>
            {graph && graph[graphIndex] ? <p>{JSON.stringify(graph[graphIndex])}</p> : null}
            {/* graph[graphIndex].data.label */}
        </div>
    )
}

export default Watch