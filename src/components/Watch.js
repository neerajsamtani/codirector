import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import { database } from './Canvas'

// TODO: Use this to play videos: https://github.com/CookPete/react-player

const Watch = ({ projectId }) => {

    const [error, setError] = useState("")
    const [graph, setGraph] = useState([])
    const [currentDisplay, setCurrentDiplay] = useState("")

    const nextGraphIndex = () => {
        const edge = graph.find(element => element.source && element.source === currentDisplay.id)
        const nextNode = graph.find(element => element.id === edge.target)
        setCurrentDiplay(nextNode)
    }

    const selectOption1 = () => {
        const edge = graph.find(element => element.source && element.source === currentDisplay.id && 
            ((element.sourceHandle === "answer1") || (element.sourceHandle === "option1")))
        const nextNode = graph.find(element => element.id === edge.target)
        setCurrentDiplay(nextNode)
    }

    const selectOption2 = () => {
        const edge = graph.find(element => element.source && element.source === currentDisplay.id && 
            ((element.sourceHandle === "answer2") || (element.sourceHandle === "option2")))
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
                    console.log(initialGraph)
                } else {
                    setError("Film not found")
                }

            })
    }
    useEffect(getGraph, [])

    var controls = null
    if (currentDisplay && currentDisplay.type === "questionNode") {
        controls = (<div>
            <p>{currentDisplay.data.question}</p>
            <button onClick={selectOption1} >{currentDisplay.data.option1}</button>
            <button onClick={selectOption2} >{currentDisplay.data.option2}</button>
        </div>)
    }
    else if (currentDisplay && currentDisplay.type === "output") {
        controls = <p>THE END</p>
    }
    else { // (currentDisplay.type === "videoNode" || currentDisplay.type === "input")
        controls = (<div>
            <button onClick={nextGraphIndex} >Next</button>
        </div>)
    }

    return (
        <div>
            {currentDisplay ? null : <p>Loading Film</p> }
            {error}
            {/* {console.log(graph)} */}
            { controls }
            {currentDisplay ? <p>{JSON.stringify(currentDisplay)}</p> : null}
            {console.log(currentDisplay)}
        </div>
    )
}

export default Watch