<script setup>
import { useAccount, useSend } from "robonomics-interface-vue/account";
import {
  useAction as useActionDevices,
  useDevices
} from "robonomics-interface-vue/devices";
import {
  useAction,
  useAvailableSubscriptions,
  useSubscription
} from "robonomics-interface-vue/subscription";
import { useAction as useActionTools } from "robonomics-interface-vue/tools";
import { ref } from "vue";

const { account } = useAccount();
const { loading, error, data } = useSubscription(account);
const { data: freeAuctions } = useAvailableSubscriptions();
const action = useAction();
const { tx } = useSend();
const { batch } = useActionTools();
const actionDevices = useActionDevices();
const { data: dataDevices } = useDevices(account);
const addressAltruist = ref("");

const click = async () => {
  const calls = [await action.bid(1000000001)];
  const addresses = [account.value, addressAltruist.value].filter(
    item => !dataDevices.value.includes(item) && addressAltruist.value
  );
  if (addresses.length > 0) {
    calls.push(actionDevices.add(dataDevices.value, addresses));
  }
  await tx.send(() => batch(calls));
};
</script>

<template>
  <div>
    <h1>Subscription</h1>
    <div>
      <h2>Subscription info</h2>
      <div v-if="!loading">
        <div v-if="error !== null">
          {{ error }}
        </div>
        <div v-else-if="data">
          <code>
            <pre>{{ data }}</pre>
          </code>
          <b>Devices</b>
          <code>
            <pre>{{ dataDevices }}</pre>
          </code>
        </div>
        <div v-else>You need to select an account.</div>
      </div>
      <div v-else>...</div>
    </div>

    <div>
      <h2>Buy</h2>
      <div>free auctions: {{ freeAuctions }}</div>
      <input v-model="addressAltruist" placeholder="Address altruist" />
      <button @click="click">buy</button>
      <div>
        <div>process: {{ tx.process }}</div>
        <div>error: {{ tx.error }}</div>
        <div>
          result:
          <code>
            <pre>{{ tx.result }}</pre>
          </code>
        </div>
      </div>
    </div>
  </div>
</template>
