import { Value } from './value';
import { layout, trace } from './utils';

let x1_val = new Value(2);
let x2_val = new Value(2);
let w1_val = new Value(4);
let w2_val = new Value(0);
let b_val = new Value(30);
let mult1_val = x1_val.mul(w1_val);
let mult2_val = x2_val.mul(w2_val);
let add_val = mult1_val.add(mult2_val);
let add2_val = add_val.add(b_val);
let relu_val = add2_val.relu();
relu_val.backward();

const { nodes, edges } = trace(relu_val);

const layoutNodes = layout(nodes, edges);

export {
  layoutNodes as defaultNodes,
  edges as defaultEdges,
  relu_val as root,
};

