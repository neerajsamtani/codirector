import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {

    const [projectId, setProjectId] = useState("")
    const history = useHistory()

    const handleProjectIdChange = (event) => {
        setProjectId(event.target.value)
    }
    const handleFormSubmit = (event) => {
        event.preventDefault()
        history.push(`/watch/${projectId}`)
    }

    return (
        <div className="content">
            <p className="enter-the-code" >Enter the Code</p>
            <form className="film-id-form" onSubmit={handleFormSubmit}>
                <input
                    className="search-box"
                    placeholder="Enter Film ID"
                    value={projectId}
                    onChange={handleProjectIdChange}
                />
                {/* <button type="submit" className="button" >Watch</button> */}
                <button className="watch-button" type="submit" >
                    <span className="watch-text">Watch</span>
                </button>
            </form>
        </div>
    )
}

export default Home