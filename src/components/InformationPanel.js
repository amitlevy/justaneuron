import { Panel } from 'reactflow';
import './information-panel.css';

function message(node) {
  switch (node?.op) {
    case '':
      return 'A value node. You can change the value.';
    
    case '+':
      return 'An operator node. The operator is addition.';
    
    case '*':
      return 'An operator node. The operator is multiplication.';
    
    case 'ReLU':
      return 'The ReLU activation function, which is equal to max(x,0).';
    
    default:
      return 'Hover a node to display information here.';
  }
}

function InformationPanel({ node }) {
  return (
    <Panel position="bottom-center">
      <div className="information-panel-inner-container">
        <p>{message(node)}</p>
      </div>
    </Panel>
  );
}

export default InformationPanel;
