const defaultNodes = [
  {
    id: 'x1',
    position: {
        x: 0,
        y: 0,
    },
    data: {
        label: 'x1',
    },
    sourcePosition: 'right',
    type: 'input',
  },
  {
    id: 'w1',
    position: {
        x: 0,
        y: 100,
    },
    data: {
        label: 'w1',
    },
    sourcePosition: 'right',
    type: 'input',
  },
  {
    id: 'mult1',
    position: {
        x: 300,
        y: 50
    },
    data: {
        label: '*',
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    style: {
        width: 50,
    },
  },
  {
    id: 'x2',
    position: {
        x: 0,
        y: 300,
    },
    data: {
        label: 'x2',
    },
    sourcePosition: 'right',
    type: 'input',
  },
  {
    id: 'w2',
    position: {
        x: 0,
        y: 400,
    },
    data: {
        label: 'w2',
    },
    sourcePosition: 'right',
    type: 'input',
  },
  {
    id: 'mult2',
    position: {
        x: 300,
        y: 350
    },
    data: {
        label: '*',
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    style: {
        width: 50,
    },
  },
  {
    id: 'add',
    position: {
        x: 500,
        y: 200
    },
    data: {
        label: '+',
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    style: {
        width: 50,
    },
  },
  {
    id: 'ReLU',
    position: {
        x: 700,
        y: 200
    },
    data: {
        label: 'ReLU',
    },
    sourcePosition: 'right',
    targetPosition: 'left',
    style: {
        width: 50,
    },
  },
];

const defaultEdges = [
  {
    animated: true,
    source: 'x1',
    target: 'mult1',
  },
  {
    animated: true,
    source: 'w1',
    target: 'mult1',
  },
  {
    animated: true,
    source: 'x2',
    target: 'mult2',
  },
  {
    animated: true,
    source: 'w2',
    target: 'mult2',
  },
  {
    animated: true,
    source: 'mult1',
    target: 'add',
  },
  {
    animated: true,
    source: 'mult2',
    target: 'add',
  },
  {
    animated: true,
    source: 'add',
    target: 'ReLU',
  },
];

export {
    defaultNodes,
    defaultEdges,
};

// function createInputNode(id, x, y) {
//     return {
//       id,
//       position: { x, y },
//       data: { label: id },
//       sourcePosition: 'right',
//       type: 'input'
//     };
//   }
  
//   function createOperatorNode(id, x, y, label = null, sourcePosition = 'right', targetPosition = 'left', width = 50) {
//     return {
//       id,
//       position: { x, y },
//       data: { label: label || id },
//       sourcePosition,
//       targetPosition,
//       style: { width },
//     };
//   }
  
//   function createEdge(source, target, animated = true) {
//     return { source, target, animated };
//   }
  
//   const nodes = [
//     createInputNode('x1', 0, 0),
//     createInputNode('w1', 0, 100),
//     createOperatorNode('mult1', 300, 50, '*'),
//     createInputNode('x2', 0, 300),
//     createInputNode('w2', 0, 400),
//     createOperatorNode('mult2', 300, 350, '*'),
//     createOperatorNode('add', 500, 200, '+'),
//     createOperatorNode('ReLU', 700, 200, 'ReLU'),
//   ];
  
//   const edges = [
//     createEdge('x1', 'mult1'),
//     createEdge('w1', 'mult1'),
//     createEdge('x2', 'mult2'),
//     createEdge('w2', 'mult2'),
//     createEdge('mult1', 'add'),
//     createEdge('mult2', 'add'),
//     createEdge('add', 'ReLU'),
//   ];