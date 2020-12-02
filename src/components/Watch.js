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

    const replayExperience = () => {
        // TODO: Don't hardcode
        const startNode = graph.find(element => element.id === "1")
        setCurrentDiplayJSON(startNode)
    }

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
                    for (const i in elements) {
                        const currentElement = elements[i]
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
        currentDisplay = (<div className="center-question" >
            <p className="question-text" >{currentDisplayJSON.data.question}</p>
            <button onClick={selectOption1} className="option-button">{currentDisplayJSON.data.option1}</button>
            <button onClick={selectOption2} className="option-button">{currentDisplayJSON.data.option2}</button>
        </div>)
    }
    else if (currentDisplayJSON.type === "videoNode") {
        currentDisplay = (<div className="center-video">
            <ReactPlayer
                className='react-player'
                url={currentDisplayJSON.data.link}
                width='900px'
                height='650px'
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
        currentDisplay = <div className="center-start">
            <p className="fin">Fin.</p>
            <button onClick={replayExperience} className="replay-experience">Replay Experience</button>
        </div>
    }
    else if (currentDisplayJSON && currentDisplayJSON.type === "input") {
        currentDisplay = (<div className="center-start">
            <button onClick={nextGraphIndex} className="enter-experience">Enter Experience</button>
        </div>)
    }

    return (
        <div className="watch">
            {error}
            {/* {console.log(graph)} */}
            { currentDisplayJSON || error ? null : <div className="center-loader"><MoonLoader size={50} color={"#FFFFFF"} loading={true} /></div>}
            { currentDisplayJSON && !error ? currentDisplay : null}
            {/* {currentDisplayJSON ? <p>{JSON.stringify(currentDisplayJSON)}</p> : null} */}
            {/* {console.log(currentDisplayJSON)} */}
        </div>
    )
}

export default Watch