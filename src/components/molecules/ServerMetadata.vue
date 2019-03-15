<template>
  <div class="server-metadata">
    <h2 class="server-metadata__hostname">{{ username }}@{{ hostname }} - {{ name }}</h2>
    <div class="server-metadata__item">
      <span class="server-metadata__item-label">Internal IP</span>
      <b>{{ internal_ip }}</b>
    </div>
    <div class="server-metadata__item">
      <span class="server-metadata__item-label">External IP</span>
      <b>{{ remote_ip }}</b>
    </div>
    <div class="server-metadata__item">
      <span class="server-metadata__item-label">Uptime</span>
      <b>{{ humanUptime }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerMetadata',
  props: {
    name: String,
    username: String,
    hostname: String,
    internal_ip: String,
    remote_ip: String,
    humanUptime: String
  }
}
</script>

<style lang="scss">
.server-metadata {
  &__hostname {
    margin: 0;
  }
  &__item {
    width: 15em;
    display: flex;
    flex-direction: row;
    &-label {
      flex: 1;
    }
  }
}
</style>
