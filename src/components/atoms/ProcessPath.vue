<template>
  <path ref="path" class="process-path" />
</template>

<script>
import { scaleLinear } from 'd3-scale'
import { line as d3line } from 'd3-shape'
import { select } from 'd3-selection'

const HEIGHT = 50

export default {
  name: 'ProcessPath',
  props: {
    data: Array
  },
  computed: {
    max () {
      return Math.max(...this.data)
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    getCreatePath () {
      const width = document.body.clientWidth
      const x = scaleLinear()
        .domain([0, this.data.length])
        .range([0, width])
      const y = scaleLinear()
        .domain([0, 1.25 * this.max])
        .range([HEIGHT, 0])
      return d3line()
        .x((d, i) => x(i))
        .y(d => y(d))
    },
    draw () {
      const path = select(this.$refs.path)
      const createPath = this.getCreatePath()
      path.attr('d', createPath(this.data))
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.draw()
      }
    }
  }
}
</script>

<style lang="scss">
.process-path {
  fill: none;
  stroke: #eee;
  stroke-width: 1px;
}
</style>
