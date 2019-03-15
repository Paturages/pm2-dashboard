<template>
  <div ref="root" class="line-graph">
    <div class="line-graph__25" />
    <div class="line-graph__50" />
    <div class="line-graph__75" />
    <svg ref="svg" class="line-graph__svg" />
  </div>
</template>

<script>
import { scaleLinear } from 'd3-scale'
import { line as d3line } from 'd3-shape'
import { select } from 'd3-selection'

const HEIGHT = 50

export default {
  name: 'LineGraph',
  props: {
    data: Array
  },
  mounted () {
    this.draw()
  },
  computed: {
    filteredData () {
      return this.data.filter(x => x)
    }
  },
  methods: {
    getCreatePath () {
      const width = this.$refs.root.clientWidth
      const x = scaleLinear()
        .domain([0, this.data.length])
        .range([0, width])
      const y = scaleLinear()
        .domain([0, 1])
        .range([HEIGHT, 0])
      return d3line()
        .x((d, i) => x(i))
        .y(d => y(d))
    },
    draw () {
      const svg = select(this.$refs.svg)
      const createPath = this.getCreatePath()
      svg
        .append('path')
        .attr('d', createPath(this.filteredData))
        .attr('class', 'line-graph__line')
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        const svg = select(this.$refs.svg)
        const createPath = this.getCreatePath()
        svg.select('.line-graph__line')
          .attr('d', createPath(this.filteredData))
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/colors';
.line-graph {
  height: 50px;
  position: relative;
  border: 1px solid rgba($color__text, .5);

  &__25, &__50, &__75 {
    position: absolute;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgba($color__text, .3);
  }
  &__25 {
    top: 25%;
  }
  &__50 {
    top: 50%;
  }
  &__75 {
    top: 75%;
  }

  &__svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100%;
  }
  &__line {
    fill: none;
    stroke: #eee;
    stroke-width: 1px;
  }
}
</style>
