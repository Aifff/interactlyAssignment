import create from "zustand";

const useFlowStore = create((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  removeNode: (id) => set((state) => ({ nodes: state.nodes.filter((node) => node.id !== id) })),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
}));

export default useFlowStore;