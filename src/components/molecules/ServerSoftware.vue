<template>
  <div class="server-software">
    <div class="server-software__type">
      <b>{{ type }} {{ arch }}</b>
    </div>
    <div class="server-software__item">
      <span>node</span>
      <b class="server-software__item-value">{{ node_version }}</b>
    </div>
    <div class="server-software__item">
      <span>pm2</span>
      <b class="server-software__item-value">v{{ pm2_version }}</b>
    </div>
    <div class="server-software__item">
      <span>agent</span>
      <b class="server-software__item-value">v{{ pm2_agent_version }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerSoftware',
  props: {
    type: String,
    arch: String,
    node_version: String,
    pm2_version: String,
    pm2_agent_version: String
  }
}
</script>

<style lang="scss">
.server-software {
  text-align: right;
  &__item {
    display: flex;
    flex-direction: row;
    width: 8em;
    &-value {
      flex: 1;
    }
  }
}
</style>
