<script setup>
import { useAccount, useSend } from "robonomics-interface-vue/account";
import {
  useAction,
  useAvailableSubscriptions,
  useSubscription
} from "robonomics-interface-vue/subscription";

const { account } = useAccount();
const { loading, error, data } = useSubscription(account);
const { data: freeAuctions } = useAvailableSubscriptions();
const action = useAction();
const { tx } = useSend();

const click = async () => {
  await tx.send(async () => await action.bid(1000000001));
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
        </div>
        <div v-else>You need to select an account.</div>
      </div>
      <div v-else>...</div>
    </div>

    <div>
      <h2>Buy</h2>
      <div>free auctions: {{ freeAuctions }}</div>
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
