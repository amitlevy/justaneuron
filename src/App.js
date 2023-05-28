import './App.css';
import React, { useState } from 'react';
import ReactFlow, { Background, Panel } from 'reactflow';
import 'reactflow/dist/style.css'
import { defaultNodes, defaultEdges } from './defaults.js';


function App() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  
  return (
    <div className="app-container">
      <ReactFlow
        attributionPosition="bottom-left"
        edges={defaultEdges}
        fitView
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
