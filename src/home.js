import React, { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "react-flow-renderer";
import { nodes as initialNodes, edges as initialEdges } from "./element";
import { Button, Modal, Input, Form } from "antd";

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            // style: { stroke: "red" },
          },
          eds
        )
      ),
    [setEdges]
  );
  const getNodeId = () => Math.random();
  function onInit() {
    console.log("Logged");
  }
  function displayCustomNamedNodeModal() {
    setIsModalVisible(true);
  }
  function handleCancel() {
    setIsModalVisible(false);
  }
  function handleOk(data) {
    onAdd(data.nodeName);
    setIsModalVisible(false);
  }
  const onAdd = useCallback(
    (data) => {
      const newNode = {
        id: String(getNodeId()),
        data: { label: data },
        position: {
          x: 50,
          y: 0,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );
  return (
    <div style={{ height: "100%", width: "100%"}}>
        <h1 style={{ textAlign:'center' }}>Interactly react flow</h1>
      <Modal
        title="Create a new node"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk} autoComplete="off" name="new node">
          <Form.Item label="Node Name" name="nodeName">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => displayCustomNamedNodeModal()}>
        Create node
      </Button>

      <div style={{ height: "500px", margin: "10px", border: '2px solid red' }} >
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            attributionPosition="bottom-left"
            connectionLineType={ConnectionLineType.SmoothStep}
        >
            <Background />
            <Controls />
        </ReactFlow>
        </div>
    </div>
  );
}

export default Flow;
