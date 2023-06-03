import { useLayoutEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { layout } from './utils';

function useFitViewOnResize() {
  const reactFlowInstance = useReactFlow();

  useLayoutEffect(() => {
    function update() {
      const nodes = reactFlowInstance.getNodes();
      const edges = reactFlowInstance.getEdges();
      const layoutNodes = layout(nodes, edges);
      reactFlowInstance.setNodes(layoutNodes);
      reactFlowInstance.setEdges(edges);
      console.log(reactFlowInstance.fitView);
      reactFlowInstance.fitView();
    };

    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, [reactFlowInstance]);
}

export {
  useFitViewOnResize,
};