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
  const [option1, setOption1] = useState(data.option1)
  const [option2, setOption2] = useState(data.option2)

  const handleQuestionChange = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/question/").set(event.target.value)
    .then(setQuestion(event.target.value))
  }

  const handleOption1Change = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/option1/").set(event.target.value)
    .then(setOption1(event.target.value))
  }

  const handleOption2Change = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/option2/").set(event.target.value)
    .then(setOption2(event.target.value))
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
          value={option1}
          placeholder="Option 1"
          onChange={handleOption1Change}
        />
        <br />
        <br />
        <input 
          value={option2}
          placeholder="Option 2"
          onChange={handleOption2Change}
        />
        <br />
      <br />
      </form>
      <Handle 
        type="source" 
        position="right" 
        id="answer1"
        style={{ bottom: 70, top: 'auto', background: '#555' }} 
      />
      <Handle 
        type="source" 
        position="right" 
        id="answer2"
        style={{ bottom: 30, top: 'auto', background: '#555' }}
      />
    </>
  );
}