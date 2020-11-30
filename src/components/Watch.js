import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import { database } from './Canvas'
import MoonLoader from "react-spinners/MoonLoader"
import ReactPlayer from 'react-player/youtube'

const Watch = ({ projectId }) => {

    const [error, setError] = useState("")
    const [graph, setGraph] = useState([])
    const [currentDisplayJSON, setCurrentDiplayJSON] = useState("")

    const nextGraphIndex = () => {
        const edge = graph.find(element => element.source && element.source === currentDisplayJSON.id)
        const nextNode = graph.find(element => element.id === edge.target)
        setCurrentDiplayJSON(nextNode)
    }

    const selectOption1 = () => {
        const edge = graph.find(element => element.source && element.source === currentDisplayJSON.id &&
            ((element.sourceHandle === "answer1") || (element.sourceHandle === "option1")))
        const nextNode = graph.find(element => element.id === edge.target)
        setCurrentDiplayJSON(nextNode)
    }

    const selectOption2 = () => {
        const edge = graph.find(element => element.source && element.source === currentDisplayJSON.id &&
            ((element.sourceHandle === "answer2") || (element.sourceHandle === "option2")))
        const nextNode = graph.find(element => element.id === edge.target)
        setCurrentDiplayJSON(nextNode)
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
                    setCurrentDiplayJSON(initialGraph[0])
                    console.log(initialGraph)
                } else {
                    setError("Film not found")
                }

            })
    }
    useEffect(getGraph, [projectId]) // TODO: Check what the thing in the array should be

    var currentDisplay = null
    if (currentDisplayJSON && currentDisplayJSON.type === "questionNode") {
        currentDisplay = (<div>
            <p>{currentDisplayJSON.data.question}</p>
            <button onClick={selectOption1} >{currentDisplayJSON.data.option1}</button>
            <button onClick={selectOption2} >{currentDisplayJSON.data.option2}</button>
        </div>)
    }
    else if (currentDisplayJSON.type === "videoNode") {
        currentDisplay = (<div>
            <ReactPlayer 
                className='react-player'
                url={currentDisplayJSON.data.link}
                width='810px'
                height='540px'
                playing={true} 
                controls={false} 
                pip={false}
                loop={false}
                muted={false}
                volume={1}
                onEnded={nextGraphIndex}
                 />
            </div>
            )
    }
    else if (currentDisplayJSON && currentDisplayJSON.type === "output") {
        currentDisplay = <p>THE END</p>
    }
    else if (currentDisplayJSON && currentDisplayJSON.type === "input") {
        currentDisplay = (<div>
            <button onClick={nextGraphIndex} >START</button>
        </div>)
    }

    return (
        <div>
            {error}
            {/* {console.log(graph)} */}
            { currentDisplayJSON || error ? null : <MoonLoader size={40} color={"#123abc"}loading={true} /> }
            { currentDisplayJSON && !error ?  currentDisplay : null }
            {/* {currentDisplayJSON ? <p>{JSON.stringify(currentDisplayJSON)}</p> : null} */}
            {/* {console.log(currentDisplayJSON)} */}
        </div>
    )
}

export default Watch