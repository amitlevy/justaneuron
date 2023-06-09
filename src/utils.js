import dagre from 'dagre';

const nodeWidth = 200;
const nodeHeight = 60;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'LR' });

// recreates nodes with auto calculated positions
function layout(nodes, edges) {
  nodes.forEach(node => dagreGraph.setNode(node.id, {
    width: nodeWidth,
    height: nodeHeight,
  }));

  edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  return nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      }
    }
  });
}



// builds arrays for all nodes and edges in a graph
// nodes will not have position (x, y)
function trace(root) {
  const nodes = new Set();
  const edges = new Set();

  function build(v) {
    if (!nodes.has(v)) {
      const newNode = {
        id: v.id,
        data: {
          grad: v.grad,
          ref: v,
          value: v.data,
          label: v.label
        },
        sourcePosition: 'right',
      };

      nodes.add(v.op === '' ? {
        ...newNode,
        type: 'valueInput',
      } : {
        ...newNode,
        targetPosition: 'left',
        type: 'operator',
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
  layout,
  trace,
};