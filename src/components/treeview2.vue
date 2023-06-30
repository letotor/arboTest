<template>
  <ul>
    <li v-for="node in nodes" :key="node.id">
      <label>
        <input
          type="checkbox"
          :disabled="!canSelectNode(node)"
          v-model="node.isSelected"
          @change="selectNode(node)"
        />
        {{ node.name }}
      </label>
      <tree-view
        v-if="node.nodes"
        :nodes="node.nodes"
        :selected-node="selectedNode"
        @node-selected="$emit('node-selected', $event)"
      ></tree-view>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  nodes: {
    type: Array,
    required: true
  },
  selectedNode: {
    type: Object,
    default: null
  }
})

const canSelectNode = (node) => {
  if (!props.selectedNode) {
    return true
  }
  return node.type === props.selectedNode.type
}

const selectNode = (node) => {
  if (canSelectNode(node)) {
    $emit('node-selected', node)
  }
}
</script>
