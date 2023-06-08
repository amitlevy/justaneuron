import React, { createContext, useCallback, useState } from 'react';
import InformationPanel from './components/InformationPanel';
import OperatorNode from './components/OperatorNode';
import ValueInputNode from './components/ValueInputNode';
import { useFitViewOnResize } from './customHooks';
import { defaultNodes, defaultEdges, root } from './defaults';
import { layout, trace } from './utils';
import './App.css';
import 'reactflow/dist/style.css'

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Panel,
} from 'reactflow';

const nodeTypes = {
  operator: OperatorNode,
  valueInput: ValueInputNode
};

export const AppContext = createContext(null);

function App() {
  useFitViewOnResize();

  const [edges, setEdges] = useState(defaultEdges);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [nodes, setNodes] = useState(defaultNodes);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onValueUpdate = useCallback(
    (ref, val) => {
      ref.update(val, root);
      const { nodes: newNodes, edges: newEdges } = trace(root);
      const layoutNodes = layout(newNodes, newEdges);
      setNodes(layoutNodes);
      setEdges(newEdges);
    }, 
    [setNodes, setEdges],
  );

  const appContext = {
    onValueUpdate,
    setHoveredNode,
  };

  return (
    <div className="app-container">
      <AppContext.Provider value={appContext}>
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
          <InformationPanel node={hoveredNode} />
        </ReactFlow>
      </AppContext.Provider>
    </div>
  );
}

export default App;
