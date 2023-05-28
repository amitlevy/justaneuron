import './App.css';
import React, { useCallback, useState } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Panel } from 'reactflow';
import 'reactflow/dist/style.css'
import { defaultNodes, defaultEdges } from './defaults.js';


function App() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  return (
    <div className="app-container">
      <ReactFlow
        attributionPosition="bottom-left"
        edges={edges}
        fitView
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodes={nodes}
      >
        <Background color="#ccc" variant="cross" />
        <Panel position="top-left">
          <div className="panel-inner-container">
            <h1>Just a Neuron</h1>
            <p>Interactive visualization of backprop through a single neuron using React Flow and a JS implementation of Micrograd.</p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;
