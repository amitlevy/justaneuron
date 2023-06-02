import './App.css';
import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css'
import { Value } from './value';
import { useState } from 'react';

function createInputNode(id, x, y, value) {
  return {
    id,
    position: { x, y },
    data: { label: id + ` | Data: ${value.data} | Grad: ${value.grad}` },
    sourcePosition: 'right',
    type: 'input',
    value: value
  };
}

function createOperatorNode(id, x, y, label = null, value, width = 200, sourcePosition = 'right', targetPosition = 'left') {
  return {
    id,
    position: { x, y },
    data: { label: label + ` | Data: ${value.data} | Grad: ${value.grad}` },
    sourcePosition,
    targetPosition,
    style: { width },
    value: value
  };
}

function createEdge(source, target, animated = true) {
  return { source, target, animated };
}

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
  const [x1, setX1] = useState(3);
  let x1_val = new Value(x1);
  let x2_val = new Value(2);
  let w1_val = new Value(4);
  let w2_val = new Value(0);
  let mult1_val = x1_val.mul(w1_val);
  let mult2_val = x2_val.mul(w2_val);
  let add_val = mult1_val.add(mult2_val);
  let relu_val = add_val.relu();
  relu_val.backward();

  const nodes = [
    createInputNode('x1', 0, 0, x1_val),
    createInputNode('w1', 0, 100, w1_val),
    createOperatorNode('mult1', 400, 50, 'w1*x1', mult1_val),
    createInputNode('x2', 0, 300, x2_val),
    createInputNode('w2', 0, 400, w2_val),
    createOperatorNode('mult2', 400, 350, 'w2*x2', mult2_val),
    createOperatorNode('add', 700, 200, 'm1+m2', add_val),
    createOperatorNode('ReLU', 1000, 200, 'ReLU', relu_val),
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={() => setX1(x1+1)}>Increment x1</button>
      <ReactFlow nodes={nodes} edges={edges} attributionPosition="bottom-left" fitView />
    </div>
  );
}

export default App;
