import React from 'react'

const Buttons = ({ addVideoNode, addQuestionNode }) => (
    <header>
      <nav>
        <button className="buttons" onClick={addVideoNode} >Add Video Node</button>
        <button className="buttons" onClick={addQuestionNode}>Add Question Node</button>
      </nav>
    </header>
)

export default Buttons