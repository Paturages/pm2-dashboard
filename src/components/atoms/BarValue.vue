<template>
  <div class="bar-value">
    <div
      class="bar-value__fill"
      :style="fillStyle"
    />
    <div class="bar-value__value">
      {{ percent(value) }}
    </div>
  </div>
</template>

<script>
import percent from '../../utils/percent'

export default {
  name: 'CPULoad',
  props: {
    value: Number,
    color: String
  },
  computed: {
    fillStyle () {
      const style = {
        transform: `scaleX(${this.value})`
      }
      if (this.color) style.backgroundColor = this.color
      return style
    }
  },
  methods: { percent }
}
</script>

<style lang="scss">
@import '../../scss/colors';
.bar-value {
  font-size: .8em;
  position: relative;
  background: rgba($color__text, .3);
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  &__fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #aaa;
    transform-origin: left;
    transition: transform .5s ease-in-out;
  }
  &__value {
    position: relative;
    z-index: 1;
  }
}
</style>
