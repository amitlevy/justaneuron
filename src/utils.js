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

// builds arrays for all nodes and edges in a graph
function trace(root) {
  const nodes = new Set();
  const edges = new Set();

  function build(v) {
    if (!nodes.has(v)) {
      const newNode = {
        id: v.id,
        position: { x: 0, y: 0 }, // this needs to be calculated separately
        data: { label: v.id + ` | Data: ${v.data} | Grad: ${v.grad}` },
        sourcePosition: 'right',
        value: v,
      };

      nodes.add(v.op === '' ? {
        ...newNode,
        type: 'input',
      } : {
        ...newNode,
        targetPosition: 'left',
        style: { width: 200 },
      });

      for (const child of v.children) {
        edges.add({
          source: child.id,
          target: v.id,
          animated: true,
        });

        build(child);
      }
    }
  }

  build(root);

  return {
    nodes: Array.from(nodes),
    edges: Array.from(edges),
  }
}

export {
  createInputNode,
  createOperatorNode,
  createEdge,
  trace,
};