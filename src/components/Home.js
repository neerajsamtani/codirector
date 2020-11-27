import react, { useState } from 'react'
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
        <div>
            <p>Watch a movie</p>
            <form onSubmit={handleFormSubmit}>
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

export default Home