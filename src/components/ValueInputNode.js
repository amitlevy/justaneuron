import { useContext } from 'react';
import { Handle, Position } from 'reactflow';
import { AppContext } from '../App';
import './value-input-node.css';

function ValueInputNode({ data, id }) {
  const { onValueUpdate, setHoveredNode } = useContext(AppContext);

  return (
    <div
      className="value-input-node"
      onMouseEnter={() => setHoveredNode(data.ref)}
      onMouseLeave={() => setHoveredNode(null)}>
      <div className="value-input-inner-container">
        <label htmlFor={id}>{data.label}</label>
        <input
          className="nodrag"
          id={id}
          name="text"
          onChange={evt => onValueUpdate(data.ref, parseFloat(evt.target.value))}
          type="number"
          value={data.value}
        />
        <span className="value-input-grad">Grad: {data.grad}</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default ValueInputNode;