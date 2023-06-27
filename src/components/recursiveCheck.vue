<template>
    <div>
      <input type="checkbox" v-model="node.checked" @change="toggleNode(node)">
      <label>{{ node.name }}</label>
      <br>
      <div v-for="(child, index) in node.children" :key="index" class="child-node">
        <recursive-check  :node="child"></recursive-check>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  
  interface Node {
    name: string;
    checked: boolean;
    children: Node[];
  }
  
  const node: Node = reactive({
    name: 'Parent',
    checked: false,
    children: [
      {
        name: 'Child 1',
        checked: false,
        children: [
          { name: 'Petit-enfant 1', checked: false, children: [] },
          { name: 'Petit-enfant 2', checked: false, children: [] },
        ],
      },
      {
        name: 'Child 2',
        checked: false,
        children: [
          { name: 'Petit-enfant 3', checked: false, children: [] },
        ],
      },
    ],
  });
  
  const toggleNode = (node: Node) => {
    node.checked = !node.checked;
    toggleChildren(node, node.checked);
    updateParentNodes(node);
  };
  
  const toggleChildren = (node: Node, checked: boolean) => {
    for (const child of node.children) {
      child.checked = checked;
      if (child.children.length > 0) {
        toggleChildren(child, checked);
      }
    }
  };
  
  const updateParentNodes = (node: Node) => {
    const parentNode = getParentNode(node);
    if (parentNode) {
      const checkedChildren = parentNode.children.filter(child => child.checked);
      if (checkedChildren.length === 0) {
        parentNode.checked = false;
      } else if (checkedChildren.length === parentNode.children.length) {
        parentNode.checked = true;
      } else {
        parentNode.checked = false;
        updateParentNodes(parentNode);
      }
    }
  };
  
  const getParentNode = (node: Node): Node | null => {
    return findParentNode(node, node);
  };
  
  const findParentNode = (currentNode: Node, targetNode: Node): Node | null => {
    if (currentNode.children.includes(targetNode)) {
      return currentNode;
    } else {
      for (const childNode of currentNode.children) {
        const parentNode = findParentNode(childNode, targetNode);
        if (parentNode) {
          return parentNode;
        }
      }
      return null;
    }
  };
  </script>
  
  <style scoped>
  .child-node {
    margin-left: 20px;
  }
  </style>
  