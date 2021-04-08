<template>
  <div id="app">
    <img :src="env.VUE_APP_STATIC_PATH + 'img/logo.png'" />
    <router-view />
    123
  </div>
</template>
3
<script>
import env from "@/utility/env"

export default {
  name: "App",
  components: {},
  data() {
    return {
      env
    }
  }
}
</script>

<style>
body,
html {
  height: 100%;
  min-height: 100%;
}

#app > p {
  color: red;
}
</style>
