<template>
  <div class="server">
    <div class="server__header">
      <ServerMetadata
        :name="server_name"
        :username="username"
        :hostname="hostname"
        :internal_ip="internal_ip"
        :remote_ip="remote_ip"
        :humanUptime="humanUptime"
      />
      <ServerSoftware
        :type="type"
        :arch="arch"
        :node_version="node_version"
        :pm2_version="pm2_version"
        :pm2_agent_version="pm2_agent_version"
      />
    </div>
    <ServerCPU
      :date="date"
      :cpu="cpu"
      :loadavg="loadavg"
    />
    <LineGraph
      class="server__cpu-graph"
      :data="history.cpuAvg"
    />
    <ServerMemory
      :total_mem="total_mem"
      :free_mem="free_mem"
    />
    <LineGraph
      class="server__memory-graph"
      :data="history.memory"
    />
    <ServerProcesses
      :processes="processes"
      :totalMemory="total_mem"
      :history="history.processes"
    />
  </div>
</template>

<script>
import getHumanTime from '../../utils/get-human-time'

import ServerMetadata from '../molecules/ServerMetadata'
import ServerSoftware from '../molecules/ServerSoftware'
import LineGraph from '../molecules/LineGraph'

import ServerCPU from '../organisms/ServerCPU'
import ServerMemory from '../organisms/ServerMemory'
import ServerProcesses from '../organisms/ServerProcesses'

export default {
  name: 'Server',
  components: {
    ServerMetadata,
    ServerSoftware,
    ServerCPU,
    ServerMemory,
    ServerProcesses,
    LineGraph
  },
  props: {
    // main payload
    internal_ip: String,
    server_name: String,
    updated_at: String,

    // "server" attribute
    active: Boolean,
    arch: String,
    cpu: Object, // { number: number, info: string }
    free_mem: Number,
    hostname: String,
    loadavg: Array, // number[]
    node_version: String,
    platform: String,
    pm2_agent_version: String,
    pm2_version: String,
    remote_ip: String,
    total_mem: Number,
    type: String,
    unique_id: String,
    uptime: Number,
    username: String,

    // Processes
    processes: Array,

    // Metrics history
    history: Object // { cpuAvg: number[], cpuCores: number[][] }
  },
  computed: {
    humanUptime () {
      return getHumanTime(this.uptime)
    },
    date () {
      return new Date(this.updated_at)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/colors';
.server {
  &__header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    text-align: left;
  }
  &__cpu {
    .line-graph__line {
      stroke: $color__cpu;
    }
  }
  .server-metadata {
    flex: 1;
  }
  &__cpu-graph {
    .line-graph__line {
      stroke: $color__cpu;
    }
  }
  &__memory-graph {
    .line-graph__line {
      stroke: $color__memory;
    }
  }
}
</style>
