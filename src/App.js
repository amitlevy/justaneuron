import React, { createContext, useCallback, useState } from 'react';
import InformationPanel from './components/InformationPanel';
import OperatorNode from './components/OperatorNode';
import ValueInputNode from './components/ValueInputNode';
import { useFitViewOnResize } from './customHooks';
import { defaultNodes, defaultEdges, root } from './defaults';
import { layout, trace } from './utils';
import './App.css';
import 'reactflow/dist/style.css'
import 'katex/dist/katex.min.css';


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
          <Background color="#ccc" variant="dots" />
          <Panel position="top-left">
            <div className="panel-inner-container">
              <h1>Just A Neuron</h1>
              <p>Many people view backprop/autograd as a blackbox, but it's actually a super simple application of the chain rule. This is a minimal interactive example showing the gradients through a single neuron with two inputs. Do you understand the values of the gradients here? Why are so many of them 1.0? What is the meaning of the grad on x_1? Can you change the inputs so that all the gradients are 0.0?</p>
            </div>
          </Panel>
          <InformationPanel node={hoveredNode} />
        </ReactFlow>
      </AppContext.Provider>
    </div>
  );
}

export default App;
