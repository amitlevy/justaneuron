import { useContext } from 'react';
import { Handle, Position } from 'reactflow';
import { AppContext } from './App';
import './value-input-node.css';

function ValueInputNode({ data, id }) {
  const onValueUpdate = useContext(AppContext);

  return (
    <div className="value-input-node">
      <label htmlFor={id}>Data:</label>
      <input
        className="nodrag"
        id={id}
        name="text"
        onChange={evt => onValueUpdate(data.ref, parseFloat(evt.target.value))}
        type="number"
        value={data.value}
      />
      <span className="value-input-grad">Grad: {data.grad}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default ValueInputNode;