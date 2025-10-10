import polkadot from "robonomics-interface-vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

createApp(App)
  .use(polkadot, {
    start: true,
    endpoint: "wss://polkadot.rpc.robonomics.network/"
  })
  .mount("#app");
