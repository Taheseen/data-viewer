<template>
  <div ref="treeDiagram"></div>
  <div v-if="selectedNode">
    <NodeDetails :selectedNode="selectedNode" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import NodeDetails from './NodeDetails.vue'

const treeDiagram = ref(null)
const selectedNode = ref(null)
const jsonData = ref(null)

const createTreeDiagram = () => {
  console.log(jsonData.value)
  const data = structureData(jsonData.value.data)
  const treeLayout = d3.tree().size([400, 200])
  const root = d3.hierarchy(data)
  treeLayout(root)

  const svg = d3.select(treeDiagram.value).append('svg').attr('width', 500).attr('height', 500)

  svg
    .selectAll('path.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr(
      'd',
      d3
        .linkHorizontal()
        .x((d) => d.y + 50)
        .y((d) => d.x + 25)
    )

  const nodes = svg
    .selectAll('g.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y},${d.x})`)

  nodes
    .append('rect')
    .attr('width', 50)
    .attr('height', 50)
    .style('fill', '#fff')
    .style('stroke', '#000')

  nodes
    .append('text')
    .attr('dy', 30)
    .attr('x', (d) => (d.children ? 25 : 12))
    .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => d.data.name)

  nodes.on('click', (event, d) => {
    selectedNode.value = d
  })
}

const structureData = (data) => {
  const dataMap = data.reduce((map, node) => {
    map[node.name] = { ...node, children: [] }
    return map
  }, {})

  let rootNode = null
  data.forEach((node) => {
    if (node.parent) {
      dataMap[node.parent].children.push(dataMap[node.name])
    } else {
      rootNode = dataMap[node.name]
    }
  })
  return rootNode
}

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/data`)
  jsonData.value = await res.json()
  createTreeDiagram()
})
</script>

<style>
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>
