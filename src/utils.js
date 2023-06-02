function createInputNode(id, x, y, value) {
  return {
    id,
    position: { x, y },
    data: { label: id + ` | Data: ${value.data} | Grad: ${value.grad}` },
    sourcePosition: 'right',
    type: 'input',
    value: value
  };
}

function createOperatorNode(id, x, y, label = null, value, width = 200, sourcePosition = 'right', targetPosition = 'left') {
  return {
    id,
    position: { x, y },
    data: { label: label + ` | Data: ${value.data} | Grad: ${value.grad}` },
    sourcePosition,
    targetPosition,
    style: { width },
    value: value
  };
}

function createEdge(source, target, animated = true) {
  return { source, target, animated };
}

export {
  createInputNode,
  createOperatorNode,
  createEdge,
};