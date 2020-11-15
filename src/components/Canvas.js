import React, { useState } from 'react';

import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, isNode } from 'react-flow-renderer';
import VideoNode from './VideoNode';

const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
};

const nodeTypes = {
  videoNode: VideoNode,
};

// Log events
const onPaneContextMenu = (event) => console.log('pane context menu', event);
const onSelectionContextMenu = (event, nodes) => {
  event.preventDefault();
  console.log('selection context menu', nodes);
};
const onElementClick = (event, element) => console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element);
const onSelectionChange = (elements) => console.log('selection change', elements);
const onMoveEnd = (transform) => console.log('zoom/move end', transform);

const initialElements = [
  {
    id: '1',
    type: 'input',
    sourcePosition: 'right',
    data: {
      label: (
        <>
          This is the <strong>START</strong>
        </>
      ),
    },
    position: { x: 0, y: 200 },
  },
  {
    id: '2',
    type: 'output',
    targetPosition: 'left',
    data: {
      label: (
        <>
          This is the <strong>END</strong>
        </>
      ),
    },
    position: { x: 900, y: 200 },
  },
];

const connectionLineStyle = { stroke: '#ddd' };

const OverviewFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const [nextId, setNextId] = useState(3);

  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const addNode = () => {
    setElements(elements.concat({
    id: `${nextId}`,
    type: 'videoNode',
    style: { border: '1px solid #777', padding: 10, background: '#FFF' },
    data: {
        label: (
        <>
            NEW <strong>NODE</strong>
        </>
        ),
    },
    position: { x: 0, y: 0 },
    }));
    setNextId(nextId + 1)
  }

  return (
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onPaneClick={addNode}
      onPaneContextMenu={onPaneContextMenu}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveEnd={onMoveEnd}
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
  );
};

export default OverviewFlow;