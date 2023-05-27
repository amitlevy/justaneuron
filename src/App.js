import './App.css';
import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css'

function createInputNode(id, x, y) {
  return {
    id,
    position: { x, y },
    data: { label: id },
    sourcePosition: 'right',
    type: 'input'
  };
}

function createOperatorNode(id, x, y, label = null, sourcePosition = 'right', targetPosition = 'left', width = 50) {
  return {
    id,
    position: { x, y },
    data: { label: label || id },
    sourcePosition,
    targetPosition,
    style: { width },
  };
}

function createEdge(source, target, animated = true) {
  return { source, target, animated };
}

const nodes = [
  createInputNode('x1', 0, 0),
  createInputNode('w1', 0, 100),
  createOperatorNode('mult1', 300, 50, '*'),
  createInputNode('x2', 0, 300),
  createInputNode('w2', 0, 400),
  createOperatorNode('mult2', 300, 350, '*'),
  createOperatorNode('add', 500, 200, '+'),
  createOperatorNode('ReLU', 700, 200, 'ReLU'),
];

const edges = [
  createEdge('x1', 'mult1'),
  createEdge('w1', 'mult1'),
  createEdge('x2', 'mult2'),
  createEdge('w2', 'mult2'),
  createEdge('mult1', 'add'),
  createEdge('mult2', 'add'),
  createEdge('add', 'ReLU'),
];

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} attributionPosition="bottom-left" fitView />
    </div>
  );
}

export default App;
