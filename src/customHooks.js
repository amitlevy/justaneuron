import { useLayoutEffect } from 'react';
import { useReactFlow } from 'reactflow';

function useFitViewOnResize() {
    const reactFlowInstance = useReactFlow();
    
    useLayoutEffect(() => {  
      window.addEventListener('resize', reactFlowInstance.fitView);
      reactFlowInstance.fitView();
      return () => window.removeEventListener('resize', reactFlowInstance.fitView);
    }, []);
}
  
export {
  useFitViewOnResize,
};