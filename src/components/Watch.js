import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import {database} from './Canvas'

const Watch = () => {

    const [projectId, setProjectId] = useState("")
    const [graph, setGraph] = useState([])


    const handleProjectIdChange = (event) => {
        setProjectId(event.target.value)
    }

    const getGraph = (event) => {
        event.preventDefault()
        database.ref('/projects/' + projectId).once('value')
        .then(snapshot => {
            var initialGraph = []
            var elements = snapshot.val().elements
            for (const currentElement of elements) {
                if (currentElement) {
                    initialGraph.push(currentElement)
                }
            }
            setGraph(initialGraph)
        })
    }

    return(
        <div>
            <p>Watch a movie</p>
            {console.log(graph)}
            <form onSubmit={event => getGraph(event)}>
                <input 
                    placeholder="Film ID"
                    value={projectId}
                    onChange={handleProjectIdChange}
                    />
            </form>
            <p>Example Movie: WeLImpeRjuSEThIeRNIC</p>
        </div>
    )
}

export default Watch