import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import parse from 'html-react-parser'
export default ({ id, data }) => {

  // TODO: Only allow one outgoing connection per answer
  // TODO: Allow multiple answers
  const [question, setQuestion] = useState(data.value)
  // const [answers, setAnswers] = useState([])

  const handleQuestionChange = (event) => {
    // data.onChange(id, event)
    setQuestion(event.target.value)
  }

  return (
    <>
      <Handle
        id="b"
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
      <form onSubmit={(event) => {event.preventDefault()}}>
      {parse(data.label)}
      <br />
        <input 
          value={question}
          onChange={handleQuestionChange}
        />
      </form>
      <Handle 
        type="source" 
        position="right" 
        id="a"
        style={{ background: '#555' }} 
      />
    </>
  );
}