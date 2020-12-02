import React from 'react'

const Buttons = ({ addVideoNode, addQuestionNode }) => (
    <header className="canvas-toolbar">
      <nav className="canvas-toolbar" >
        <button className="add-node-button" onClick={addVideoNode} >Add Video Node</button>
        <button className="add-node-button" onClick={addQuestionNode}>Add Question Node</button>
      </nav>
    </header>
)

export default Buttons