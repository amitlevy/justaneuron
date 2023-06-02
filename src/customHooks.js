import { useLayoutEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { layout } from './utils';

function useFitViewOnResize() {
  const reactFlowInstance = useReactFlow();

  function update() {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();
    const layoutNodes = layout(nodes, edges);
    reactFlowInstance.setNodes(layoutNodes);
    reactFlowInstance.fitView();
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);
}

export {
  useFitViewOnResize,
};