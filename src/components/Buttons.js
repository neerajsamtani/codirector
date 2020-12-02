import React from 'react'

const Buttons = ({ addVideoNode, addQuestionNode, projectId }) => (
  <header className="canvas-toolbar">
    <nav className="canvas-toolbar" >
      <button className="add-node-button" onClick={addVideoNode} >Add Video Node</button>
      <button className="add-node-button" onClick={addQuestionNode}>Add Question Node</button>
      <span className="canvas-project-id" >Project Id: {projectId}</span>
    </nav>
  </header>
)

export default Buttons