import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'
import { database } from './Canvas'
import { useStore } from 'react-flow-renderer'
import { Link } from 'react-router-dom'

const Projects = ({ user }) => {

    const [projects, setProjects] = useState([])
    const getProjects = () => {
        database.ref('/users/' + user.uid + "/projects").once('value')
            .then(snapshot => setProjects(snapshot.val()))
    }
    useEffect(getProjects, [])

    // TODO: Create a project

    return (
        <div className="home">
            <p className="projects-owner" >{user.displayName}'s Projects</p>
            <ul>
                {projects
                    ? projects.map(projectId => <Link to={`/canvas/${projectId}`} key={projectId} className="project-id-text" >{projectId}</Link>)
                    : null}
            </ul>
        </div>
    )
}

export default Projects