<template>
  <transition-group class="server-processes" name="processes" tag="div">
    <!--
      NB: the PID and unique_id seem to change quite often,
      so the key might have to be set to process.name
      for animation demonstration purposes
    -->
    <ServerProcess
      v-for="process in sortedProcesses"
      :key="process.unique_id"
      :totalMemory="totalMemory"
      :history="history[process.pid]"
      v-bind="process"
    />
  </transition-group>
</template>

<script>
import ServerProcess from '../molecules/ServerProcess'
export default {
  name: 'ServerProcesses',
  components: { ServerProcess },
  props: {
    processes: Array,
    totalMemory: Number,
    history: Object // the process history map
  },
  computed: {
    sortedProcesses () {
      return this.processes.slice()
        .sort((processA, processB) => {
          const memoryA = processA.memory / this.totalMemory
          const memoryB = processB.memory / this.totalMemory
          const cpuA = processA.cpu
          const cpuB = processB.cpu
          return (memoryB + cpuB) - (memoryA + cpuA)
        })
    }
  }
}
</script>

<style lang="scss">
.server-processes {
  padding: 1em 0;
  .processes {
    &-enter {
      opacity: 0;
      &-active {
        transition: opacity .5s ease-in-out;
      }
    }
    &-move {
      transition: transform 1s ease-in-out;
    }
  }
}
</style>
