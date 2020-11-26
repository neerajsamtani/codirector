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
  // TODO: Allow more than 2 answers
  // TODO: Improve Styling

  const [question, setQuestion] = useState(data.question)
  const [answer1, setAnswer1] = useState(data.answer1)
  const [answer2, setAnswer2] = useState(data.answer2)

  const handleQuestionChange = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/question/").set(event.target.value)
    .then(setQuestion(event.target.value))
  }

  const handleAnswer1Change = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/answer1/").set(event.target.value)
    .then(setAnswer1(event.target.value))
  }

  const handleAnswer2Change = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/answer2/").set(event.target.value)
    .then(setAnswer2(event.target.value))
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
      <form onSubmit={(event) => {event.preventDefault()}}>
      {parse(data.label)}
      <br />
      <br />
        <input 
          value={question}
          placeholder="Question"
          onChange={handleQuestionChange}
        />
        <br />
        <br />
        <input 
          value={answer1}
          placeholder="Option 1"
          onChange={handleAnswer1Change}
        />
        <br />
        <br />
        <input 
          value={answer2}
          placeholder="Option 2"
          onChange={handleAnswer2Change}
        />
        <br />
      <br />
      </form>
      <Handle 
        type="source" 
        position="right" 
        id="a"
        style={{ bottom: 70, top: 'auto', background: '#555' }} 
      />
      <Handle 
        type="source" 
        position="right" 
        id="b"
        style={{ bottom: 30, top: 'auto', background: '#555' }}
      />
    </>
  );
}