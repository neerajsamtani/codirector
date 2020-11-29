import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import { database } from './Canvas'

const Watch = ({ projectId }) => {

    const [error, setError] = useState("")
    const [graph, setGraph] = useState([])
    const [currentDisplay, setCurrentDiplay] = useState("")

    const nextGraphIndex = () => {
        // setGraphIndex(graphIndex+1)
        // console.log()
        const edge = graph.find(element => element.source && element.source === currentDisplay.id)
        const nextNode = graph.find(element => element.id === edge.target)
        setCurrentDiplay(nextNode)
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
                    setCurrentDiplay(initialGraph[0]) // TODO: Create a START and END function
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
            <button onClick={nextGraphIndex} >Next</button>
            {currentDisplay ? <p>{JSON.stringify(currentDisplay)}</p> : null}
            {console.log(currentDisplay)}
        </div>
    )
}

export default Watch