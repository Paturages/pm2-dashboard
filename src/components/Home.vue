<template>
  <div class="home">
    <h1 class="home__title">PM2 Dashboard</h1>
    <div class="home__loading" v-if="!payload.server_name">
      Loading...
    </div>
    <Server
      v-if="payload.server_name"
      :server_name="payload.server_name"
      :internal_ip="payload.internal_ip"
      :updated_at="payload.updated_at"
      :history="history"
      :processes="payload.data.process"
      v-bind="payload.data.server"
    />
  </div>
</template>

<script>
import Client from '@pm2/js-api'
import Server from './organisms/Server'

const DISPLAY_LIMIT = 100

const client = new Client()
client.use('standalone', {
  client_id: process.env.VUE_APP_CLIENT_ID,
  refresh_token: process.env.VUE_APP_REFRESH_TOKEN
})

// Lock mechanism
// If a timeout is present when this is called,
// a locked flag is returned
const LOCK_DELAY = 2000
let timeout = null
const lock = fn => {
  if (timeout) {
    return true
  }
  timeout = setTimeout(() => {
    timeout = null
  }, LOCK_DELAY)
  return false
}

export default {
  name: 'Home',
  components: { Server },
  async created () {
    const { VUE_APP_BUCKET_ID } = process.env
    const { data: bucket } = await client.bucket.retrieve(VUE_APP_BUCKET_ID)
    // A cache for process data history
    const processCache = {}
    client.realtime.subscribe(VUE_APP_BUCKET_ID)
    // TODO: Handle all load balanced servers
    // client.realtime.on(`${bucket.public_id}:*:status`, payload => {
    client.realtime.on(`${bucket.public_id}:lb-1:status`, payload => {
      if (lock()) return
      this.payload = payload
      const {
        loadavg,
        total_mem: totalMem,
        free_mem: freeMem
      } = payload.data.server
      const { process: processes } = payload.data
      // payload.data.process.forEach(x => console.log(x.name, x.cpu, x.memory));
      if (loadavg && loadavg.length) {
        const sum = loadavg.reduce((sum, load) => sum + load, 0)
        // Store loadavg values and average
        const avg = sum / loadavg.length
        this.$set(this.history, 'cpuAvg', [
          ...this.history.cpuAvg,
          avg
        ].slice(-DISPLAY_LIMIT))
        this.$set(this.history, 'cpuCores', loadavg.map((load, index) => [
          ...(
            this.history.cpuCores[index] ||
            new Array(DISPLAY_LIMIT).fill(0)
          ),
          load
        ].slice(-DISPLAY_LIMIT)))
        // Store memory usage
        this.$set(this.history, 'memory', [
          ...this.history.memory,
          (totalMem - freeMem) / totalMem
        ])
        // Store process data history
        processes.forEach(process => {
          if (!processCache[process.pid]) {
            processCache[process.pid] = {
              memory: new Array(DISPLAY_LIMIT).fill(0),
              cpu: new Array(DISPLAY_LIMIT).fill(0)
            }
          }
          processCache[process.pid].memory = [
            ...processCache[process.pid].memory,
            process.memory / totalMem
          ].slice(-DISPLAY_LIMIT)
          processCache[process.pid].cpu = [
            ...processCache[process.pid].cpu,
            process.cpu
          ]
          return processCache[process.pid]
        })
        this.$set(this.history, 'processes', processCache)
      }
    })
  },
  data () {
    return {
      payload: {},
      history: {
        cpuAvg: new Array(DISPLAY_LIMIT).fill(0),
        cpuCores: [],
        memory: new Array(DISPLAY_LIMIT).fill(0),
        processes: []
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/colors';
.home {
  &__title {
    margin: 0;
  }
  &__home {
    padding-bottom: 5em;
  }
  .server {
    padding-top: 1em;
    border-top: 1px solid rgba($color__text, .3);
  }
}

// Global
html, body {
  background: $color__background;
}
</style>
