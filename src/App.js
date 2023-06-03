import React, { createContext, useCallback, useState } from 'react';
import ValueInputNode from './ValueInputNode';
import { useFitViewOnResize } from './customHooks';
import { defaultNodes, defaultEdges } from './defaults';
import './App.css';
import 'reactflow/dist/style.css'

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Panel,
} from 'reactflow';

const nodeTypes = { valueInput: ValueInputNode };

export const AppContext = createContext(null);

function App() {
  useFitViewOnResize();

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

  const onValueUpdate = useCallback(
    (evt) => {
      console.info(`${evt.target.id} + ${evt.target.value}`)
    }, 
    [setNodes, setEdges],
  );

  return (
    <div className="app-container">
      <AppContext.Provider value={onValueUpdate}>
        <ReactFlow
          attributionPosition="bottom-left"
          edges={edges}
          fitView
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          nodes={nodes}
        >
          <Background color="#ccc" variant="cross" />
          <Panel position="top-left">
            <div className="panel-inner-container">
              <h1>Just a Neuron</h1>
              <p>Interactive visualization of backprop through a single neuron using React Flow and automatic gradient computation.</p>
            </div>
          </Panel>
        </ReactFlow>
      </AppContext.Provider>
    </div>
  );
}

export default App;
