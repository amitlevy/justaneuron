import { Value } from './value';
import { createInputNode, createOperatorNode, createEdge, trace } from './utils';

let x1_val = new Value(3);
let x2_val = new Value(2);
let w1_val = new Value(4);
let w2_val = new Value(0);

let mult1_val = x1_val.mul(w1_val);
let mult2_val = x2_val.mul(w2_val);

let add_val = mult1_val.add(mult2_val);

let relu_val = add_val.relu();

relu_val.backward();

const { nodes, edges } = trace(relu_val);


// const defaultNodes = [
//   createInputNode('x1', 0, 0, x1_val),
//   createInputNode('w1', 0, 100, w1_val),
//   createOperatorNode('mult1', 400, 50, 'w1*x1', mult1_val),
//   createInputNode('x2', 0, 300, x2_val),
//   createInputNode('w2', 0, 400, w2_val),
//   createOperatorNode('mult2', 400, 350, 'w2*x2', mult2_val),
//   createOperatorNode('add', 700, 200, 'm1+m2', add_val),
//   createOperatorNode('ReLU', 1000, 200, 'ReLU', relu_val),
// ];

// const defaultEdges = [
//   createEdge('x1', 'mult1'),
//   createEdge('w1', 'mult1'),
//   createEdge('x2', 'mult2'),
//   createEdge('w2', 'mult2'),
//   createEdge('mult1', 'add'),
//   createEdge('mult2', 'add'),
//   createEdge('add', 'ReLU'),
// ];

export {
  nodes as defaultNodes,
  edges as defaultEdges,
};

