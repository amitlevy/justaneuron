import { useContext } from 'react';
import { Handle, Position } from 'reactflow';
import Latex from 'react-latex-next'
import { AppContext } from '../App';
import './operator-node.css';

function opLabel(v) {
  if (v.op === 'ReLU') return 'ReLU'
  return v.children.map(child => child.data).join(' ' + v.op + ' ');
}

function OperatorNode({ data, id }) {
  const { setHoveredNode } = useContext(AppContext);

  return (
    <div
      className="operator-node"
      key={id}
      onMouseEnter={() => setHoveredNode(data.ref)}
      onMouseLeave={() => setHoveredNode(null)}>   
      <div className="operator-inner-container">
        <span
          className="operator-label"
          data-tooltip-id={id}
          data-tooltip-content="Placeholder tooltip for Operator node"
          data-tooltip-place="right">
          <Latex>{`$${opLabel(data.ref)}$`}</Latex>
        </span>
        <span className="operator-data">Value: {data.value}</span>
        <span className="operator-grad">Grad: {data.grad}</span>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default OperatorNode;