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

export {database}

// TODO: Do I need to listen for events to update local state? Yes, if multiple people are collaborating. 
// Yes, when making changes directly on firebase and seeing hot reloading. Not for MVP
// TODO: Add custom nodes to minimap
// TODO: Fix Styles
// TODO: BUG FIX: Fix ID Discrepancy between nextId on Firebase. An element's id changes on first interaction. 
// BUG caused by the fact that we re-write the entire elements array onMove, onConnect, onRemove
// TODO: Allow to select project
// TODO: fix bug where buttons disappear when screen is too small
const projectId = "WeLImpeRjuSEThIeRNIC"

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const nodeTypes = {
  videoNode: VideoNode,
  questionNode: QuestionNode,
};

const Canvas = () => {
  
  const [elements, setElements] = useState([]);
  const [nextId, setNextId] = useState(0);

  // Get elements from Firebase
  const hook = () => {
    database.ref('/projects/' + projectId + "/elements").once('value')
      .then(snapshot => {
        var initialElements = []
        for (const element in snapshot.val()) {
          var currentElement = snapshot.val()[element]
          initialElements.push(currentElement)
        }
        setElements(initialElements)
      })
    database.ref('/projects/' + projectId + "/nextId").once('value')
      .then(snapshot => {
        setNextId(snapshot.val())
      })
  }
  useEffect(hook, [])

  const addVideoNode = () => {
    const newVideoNode = {
      id: `${nextId}`,
      type: 'videoNode',
      style: { border: '1px solid #777', padding: 10, background: '#FFF' },
      data: {
          label: "NEW <strong>VIDEO</strong> NODE",
          value: '',
          onChange: "handleVideoChange"
      },
      position: { x: 0, y: 0 }
    }

    const newVideoNodeJSON = JSON.parse(JSON.stringify(newVideoNode))
    database.ref('projects/' + projectId + "/elements/" + (nextId - 1)).set(newVideoNodeJSON)
    .then(setElements(elements.concat(newVideoNode)))

    database.ref('projects/' + projectId + "/nextId").set(nextId + 1)
    .then(setNextId(nextId + 1))
  }

  const addQuestionNode = () => {
    const newQuestionNode = {
      id: `${nextId}`,
      type: 'questionNode',
      style: { border: '1px solid #777', padding: 10, background: '#FFF' },
      data: {
          label: "NEW <strong>QUESTION</strong> NODE",
          value:'',
          onChange: "handleQuestionChange",
      },
      position: { x: 0, y: 0 },
      }
    
    const newQuestionNodeJSON = JSON.parse(JSON.stringify(newQuestionNode))
    database.ref('projects/' + projectId + "/elements/" + (nextId - 1)).set(newQuestionNode)
    .then(setElements(elements.concat(newQuestionNode)))

    database.ref('projects/' + projectId + "/nextId").set(nextId + 1)
    .then(setNextId(nextId + 1))
  }

  // TODO: BUG FIX: Don't replace all elements, delete the appropriate ones from the database
  const onElementsRemove = (elementsToRemove) => {

    const elementsToRemoveIds = elementsToRemove.map(e => e.id)
    console.log(elementsToRemove)

    var deletions = {}
    for (const elementId in elementsToRemoveIds) {
      deletions['projects/' + projectId + "/elements/" + (elementId-1)] = null
    }
    // console.log(deletions)
    // database.ref().update(updates)
    //   .then(setElements(elements.filter(element => !elementsToRemoveIds.includes(element.id))))
  }

  const onConnect = (params) => {
    const updatedElements = addEdge(params, elements)
    const newEdge = updatedElements[updatedElements.length - 1]
    database.ref('projects/' + projectId + "/elements/" + (nextId - 1)).set(newEdge)
      .then(setElements(elements.concat(newEdge)))
    database.ref('projects/' + projectId + "/nextId").set(nextId + 1)
      .then(setNextId(nextId + 1))
  }

  const onNodeDragStop = (event, node) => {
    // The node parameter here doesn't have all the data from oldNode
    const oldNode = elements.find(n => n.id === node.id)
    const updatedNode = {
      ...oldNode,
      position: node.position
    }
    database.ref('projects/' + projectId + "/elements/" + (node.id-1) + "/position/").set(node.position)
      .then(
        setElements(els => els.map(e => e.id === node.id ? updatedNode : e ))
        )
  }

  return (
    <>
      <Buttons addVideoNode={addVideoNode} addQuestionNode={addQuestionNode} />
      <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      onNodeDragStop={onNodeDragStop}
      connectionLineStyle={{ stroke: '#ddd' }}
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