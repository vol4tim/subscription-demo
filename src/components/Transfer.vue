<script setup>
import { usePolkadotApi } from "robonomics-interface-vue";
import { useSend } from "robonomics-interface-vue/account";
import { ref } from "vue";
import { toWei } from "../tools/number";

const { instance } = usePolkadotApi();
const { tx } = useSend();

const address = ref("");
const amount = ref(100);

const click = async () => {
  await tx.send(() =>
    instance.api.tx.balances.transfer(address.value, toWei(amount.value, 9))
  );
};
</script>

<template>
  <div>
    <h1>Transfer</h1>
    <input v-model="address" placeholder="Recipient address" />
    <input v-model="amount" placeholder="Amount" />
    <button @click="click">send</button>
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
</template>
