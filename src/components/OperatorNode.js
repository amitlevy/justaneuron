import { Handle, Position } from 'reactflow';
import './operator-node.css';

function opLabel(v) {
  if (v.op === 'ReLU') return 'ReLU'
  return v.children.map(child => child.data).join(' ' + v.op + ' ');
}

function OperatorNode({ data, id }) {
  return (
    <div className="operator-node" key={id}>
      <div className="operator-inner-container">
        <span className="operator-label">{opLabel(data.ref)}</span>
        <span className="operator-data">Data: {data.value}</span>
        <span className="operator-grad">Grad: {data.grad}</span>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default OperatorNode;