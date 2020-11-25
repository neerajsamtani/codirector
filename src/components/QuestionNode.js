import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import parse from 'html-react-parser'
import firebase from 'firebase/app'
import firebaseConfig from '../firebase'

import {database} from './Canvas'

// TODO: Allow to select project
const projectId = "WeLImpeRjuSEThIeRNIC"

export default ({ id, data, style }) => {

  // TODO: Only allow one outgoing connection per answer
  // TODO: Allow multiple answers

  const [question, setQuestion] = useState(data.value)
  // const [answers, setAnswers] = useState([])

  const handleQuestionChange = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/value/").set(event.target.value)
    .then(setQuestion(event.target.value))
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