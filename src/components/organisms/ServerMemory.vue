<template>
  <div class="server-memory">
    <div class="server-memory__header">
      <div class="server-memory__header-fill" :style="getFillStyle(rateUsed)" />
      <div class="server-memory__title">
        <b>{{ usedMemory }}/{{ totalMemory }}</b> memory used
      </div>
      <div class="server-memory__used">
        <b>{{ percent(rateUsed) }}</b> used
      </div>
    </div>
  </div>
</template>

<script>
import percent from '../../utils/percent'
import filesize from 'file-size'

export default {
  name: 'ServerMemory',
  props: {
    total_mem: Number,
    free_mem: Number
  },
  computed: {
    usedMemory () {
      return filesize(this.total_mem - this.free_mem).human('si')
    },
    totalMemory () {
      return filesize(this.total_mem).human('si')
    },
    rateUsed () {
      return (this.total_mem - this.free_mem) / this.total_mem
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
.server-memory {
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
      background: $color__memory;
      transform-origin: left;
      transition: transform .5s ease-in-out;
      border-radius: 10px;
    }
  }
  .bar-value {
    margin-bottom: .5em;
    &__fill {
      background: $color__memory;
    }
  }
}
</style>
