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
        <div className="home">
            <p class="enter-the-code">Enter the Code</p>
            <form onSubmit={handleFormSubmit}>
                <input
                    className="searchbox"
                    placeholder="Ex: LoCkeYL"
                    value={projectId}
                    onChange={handleProjectIdChange}
                />
                <button type="submit" className="watch-button" >Watch</button>
            </form>
            {/* <p>Example Movie: WeLImpeRjuSEThIeRNIC</p> */}
        </div>
    )
}

export default Home