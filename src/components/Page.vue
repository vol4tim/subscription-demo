<script setup>
import { usePolkadotApi } from "robonomics-interface-vue";
import Accounts from "./Accounts.vue";
import Subscription from "./Subscription.vue";
import Transfer from "./Transfer.vue";

const { isConnected, isConnecting, error } = usePolkadotApi();
</script>

<template>
  <div v-if="isConnected">
    <accounts />
    <hr />
    <transfer />
    <hr />
    <subscription />
  </div>
  <div v-else-if="isConnecting">Connecting</div>
  <div v-else-if="error">Error: {{ error }}</div>
</template>
