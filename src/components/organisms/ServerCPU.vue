<template>
  <div class="server-cpu">
    <div class="server-cpu__header">
      <div class="server-cpu__header-fill" :style="getFillStyle(average)" />
      <div class="server-cpu__title">{{ cpu.number }}x <b>{{ cpu.info }}</b></div>
      <div class="server-cpu__average">
        avg. <b>{{ percent(average) }}</b>
      </div>
    </div>
    <div class="server-cpu__loadavg">
      <BarValue
        v-for="(load, index) in loadavg"
        :key="index"
        :value="load"
      />
    </div>
  </div>
</template>

<script>
import percent from '../../utils/percent'
import BarValue from '../atoms/BarValue'

export default {
  name: 'ServerCPU',
  components: { BarValue },
  props: {
    date: Date,
    cpu: Object,
    loadavg: Array
  },
  computed: {
    average () {
      if (!this.loadavg || !this.loadavg.length) return '-'
      const sum = this.loadavg.reduce((sum, load) => sum + load, 0)
      return sum / this.loadavg.length
    }
  },
  methods: {
    percent,
    getFillStyle (value) {
      return {
        transform: `scaleX(${value})`
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/colors';
.server-cpu {
  margin: 1em 0;
  &__header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .5em;
    border-bottom: 1px solid rgba($color__text, .3);
    &-fill {
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 4px;
      background: $color__cpu;
      transform-origin: left;
      transition: transform .5s ease-in-out;
      border-radius: 10px;
    }
  }
  .bar-value {
    margin-bottom: .5em;
    &__fill {
      background: $color__cpu;
    }
  }
}
</style>
