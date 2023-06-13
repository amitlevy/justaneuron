import { Value } from './value';
import { layout, trace } from './utils';

let x1_val = Value.labeled_value(2, 'x_1');
let x2_val = Value.labeled_value(2, 'x_2');
let w1_val = Value.labeled_value(4, 'w_1');
let w2_val = Value.labeled_value(0, 'w_2');
let b_val = Value.labeled_value(-1, 'b');

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

