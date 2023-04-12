<template>
  <div id="app" :class="'custom-' + this.$store.state.setting.theme">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app,
p {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
