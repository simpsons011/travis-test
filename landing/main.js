import Vue from "vue";
import Index from "./Index.vue";

const isDebug_mode = process.env.NODE_ENV !== "production";
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = false;;

new Vue({
  el: "#app",
  render: h => h(Index),
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
})
