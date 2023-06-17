import React, { createContext, useCallback, useState } from 'react';
import InformationPanel from './components/InformationPanel';
import OperatorNode from './components/OperatorNode';
import ValueInputNode from './components/ValueInputNode';
import { useFitViewOnResize } from './customHooks';
import { defaultNodes, defaultEdges, root } from './defaults';
import { layout, trace } from './utils';
import Latex from 'react-latex-next'
import './App.css';
import 'reactflow/dist/style.css'
import 'katex/dist/katex.min.css';


import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background
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
  const [isPanelVisible, setIsPanelVisible] = useState(true);

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
        <div className="panel-inner-container">
          <div className="panel-content" style={{ width: isPanelVisible ? '320px' : '0px' }}>
            <div className="content-wrapper">
              <h1>Just A Neuron</h1>
              <p>Most people view backprop/autograd as a black box, but it's actually a super simple application of the <a href='https://en.wikipedia.org/wiki/Chain_rule'>chain rule</a>.</p>
              <p>This is a minimal, interactive example showing the gradients through a single neuron with two inputs.</p>
              <h4>Ideas for exploration:</h4>
              <p>Do you understand the values of the gradients here? Why are so many of them 1.0? What is the meaning of the grad on <Latex>$x_1$</Latex>? Can you change the inputs so that (excluding the output) all the gradients become 0.0 <a href='https://datascience.stackexchange.com/questions/5706/what-is-the-dying-relu-problem-in-neural-networks'>("dying ReLU")</a>?</p>
              <br></br>
              <hr></hr>
              <p>Made by <a href="https://twitter.com/amitlevy64">@amitlevy</a> and <a href='https://github.com/jhar/'>@jhar</a>.</p>
              <p> Source is on <a href="https://github.com/amitlevy/justaneuron">GitHub</a>.</p>
              <p>For an in-depth explanation of everything here, I recommend <a href="https://www.youtube.com/watch?v=VMj-3S1tku0">Andrej Karpathy's video on Micrograd</a> (OpenAI Co-founder).</p>
            </div>
          </div>
          <div className="panel-toggle-button" onClick={() => setIsPanelVisible(!isPanelVisible)}>
            {isPanelVisible ? '<' : '>'}
          </div>
        </div>



        <ReactFlow
          className="reactflow-wrapper"
          attributionPosition="bottom-left"
          edges={edges}
          fitView
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          nodes={nodes}
        >
          <Background color="#ccc" variant="dots" />
          <div className="information-panel">
            <InformationPanel node={hoveredNode} />
          </div>
        </ReactFlow>
      </AppContext.Provider>
    </div>
  );
}

export default App;
