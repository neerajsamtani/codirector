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
        <div class="main">
            <form onSubmit={handleFormSubmit}>
                <input
                    id="searchbox"
                    placeholder="Film ID"
                    value={projectId}
                    onChange={handleProjectIdChange}
                />
                <button type="submit" class="button" >Watch</button>
            </form>
            <p>Example Movie: WeLImpeRjuSEThIeRNIC</p>
        </div>
    )
}

export default Home