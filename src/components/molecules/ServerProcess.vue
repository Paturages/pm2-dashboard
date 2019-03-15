<template>
  <div class="server-process">
    <div class="server-process__text">
      <div class="server-process__pid">
        {{ pid }}
      </div>
      <h4 class="server-process__label">
        {{ name }}
      </h4>
      <div class="server-process__cpu">
        CPU <b>{{ cpu }}%</b>
      </div>
      <div class="server-process__memory">
        Memory <b>{{ humanMemory }}</b> ({{ percent(rateMemory) }})
      </div>
    </div>
    <svg class="server-process__graphs">
      <ProcessPath
        class="server-process__cpu-graph"
        :data="history.cpu"
      />
      <ProcessPath
        class="server-process__memory-graph"
        :data="history.memory"
      />
    </svg>
  </div>
</template>

<script>
import filesize from 'file-size'
import percent from '../../utils/percent'

import ProcessPath from '../atoms/ProcessPath'

export default {
  name: 'ServerProcess',
  components: { ProcessPath },
  props: {
    pid: Number,
    name: String,
    cpu: Number,
    memory: Number,
    totalMemory: Number,
    history: Object
  },
  computed: {
    humanMemory () {
      return filesize(this.memory).human('si')
    },
    rateMemory () {
      return this.memory / this.totalMemory
    }
  },
  methods: { percent }
}
</script>

<style lang="scss">
@import '../../scss/colors';
.server-process {
  &__text {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    border-bottom: 1px solid rgba($color__text, .3);
    > * {
      margin-right: .5em;
    }
  }
  &__label {
    font-size: 1.25em;
    margin: 0 .5em 0 0;
    flex: 1;
  }
  &__cpu, &__memory, &__pid {
    font-size: .8em;
    padding-bottom: .25em;
  }
  &__pid {
    width: 3.5em;
  }

  &__graphs {
    display: block;
    height: 50px;
    width: 100%;
  }

  &__cpu-graph {
    .process-path {
      stroke: $color__cpu;
    }
  }
  &__memory-graph {
    .process-path {
      stroke: $color__memory;
    }
  }
}
</style>
