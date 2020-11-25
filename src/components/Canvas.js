import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import VideoNode from './VideoNode';
import QuestionNode from './QuestionNode';
import Buttons from './Buttons'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from '../firebase'

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

// TODO: Allow to select project
const projectId = "WeLImpeRjuSEThIeRNIC"

// TODO: Add custom nodes to minimap

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const connectionLineStyle = { stroke: '#ddd' };

const nodeTypes = {
  videoNode: VideoNode,
  questionNode: QuestionNode,
};

const Canvas = () => {
  
  const [elements, setElements] = useState([]);
  const [nextId, setNextId] = useState(3);

  // Get elements from Firebase
  const hook = () => {
    database.ref('/projects/' + projectId + "/elements").once('value')
      .then(snapshot => setElements(snapshot.val()))
  }
  useEffect(hook, [])

  const handleVideoChange = (id, event) => {
    // console.log("HANDLE VIDEO NODE ", id, " CHANGE", event.target.value)
    setElements(els => 
      els.map(e => {
        if (e.id === id) {
          return {
            ...e,
            data: {
              ...e.data,
              value: event.target.value
            }
          }
        }
        else {
          return e
        }
      })
    )
  }

  const handleQuestionChange = (id, event) => {
    // console.log("HANDLE QUESTION NODE ", id, " CHANGE", event.target.value)
    setElements(els => 
      els.map(e => {
        if (e.id === id) {
          return {
            ...e,
            data: {
              ...e.data,
              value: event.target.value
            }
          }
        }
        else {
          return e
        }
      })
    )
  }

  const addVideoNode = () => {
    const newVideoNode = {
      id: `${nextId}`,
      type: 'videoNode',
      style: { border: '1px solid #777', padding: 10, background: '#FFF' },
      data: {
          label: (<>NEW <strong>VIDEO</strong> NODE </>),
          value: '',
          onChange: handleVideoChange,
      },
      position: { x: 0, y: 0 },
    }
    setElements(elements.concat(newVideoNode));
    setNextId(nextId + 1)
  }

  const addQuestionNode = () => {
    const newQuestionNode = {
      id: `${nextId}`,
      type: 'questionNode',
      style: { border: '1px solid #777', padding: 10, background: '#FFF' },
      data: {
          label: (<>NEW <strong>QUESTION</strong> NODE</>),
          value:'',
          onChange: handleQuestionChange,
      },
      position: { x: 0, y: 0 },
      }
    setElements(elements.concat(newQuestionNode))
    setNextId(nextId + 1)
  }

  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <>
      <Buttons addVideoNode={addVideoNode} addQuestionNode={addQuestionNode} />
      <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      connectionLineStyle={connectionLineStyle}
      nodeTypes={nodeTypes}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
    </>
  );
};

export default Canvas;