import React from 'react'

const Buttons = ({ addVideoNode }) => (
    <header>
      <nav>
        <button className="buttons" onClick={addVideoNode} >Add Video Node</button>
        <button className="buttons" onClick={() => alert("TODO: Add Question Node")}>Add Question Node</button>
      </nav>
    </header>
)

export default Buttons