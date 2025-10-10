<script setup>
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { useAccount, useBalance } from "robonomics-interface-vue/account";
import { computed, ref } from "vue";
import { useAccounts } from "../composables/useAccounts";
import { fromWei } from "../tools/number";

const { account } = useAccount();
const { balance } = useBalance(account);
const { accounts, selected, addFromUri } = useAccounts();
const suri = ref("");
const type = ref("sr25519");

const balanceFormat = computed(
  () => `${balance.value ? fromWei(balance.value, 9) : 0} XRT`
);

const handlerGenerate = () => {
  suri.value = mnemonicGenerate();
};
const handlerAdd = () => {
  try {
    const pair = addFromUri(
      suri.value,
      {
        name: `${Math.random().toString(36).slice(2, 9)}-${
          accounts.value.length + 1
        }`
      },
      type.value
    );
    selected.value = pair.address;
    suri.value = "";
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <h1>Accounts</h1>
    <select v-model="selected">
      <option value="" disabled selected>Please Choose...</option>
      <option v-for="(pair, key) in accounts" :key="key" :value="pair.address">
        {{ pair.meta.name }}
      </option>
    </select>
    <div>
      <div>Add from suri:</div>
      <button @click="handlerGenerate">generate</button>
      <input v-model="suri" placeholder="Mnemonic phrase" />
      <select v-model="type">
        <option value="sr25519">sr25519</option>
        <option value="ed25519">ed25519</option>
      </select>
      <button @click="handlerAdd">add</button>
    </div>
    <div v-if="account">
      <div>
        Sender: <b>{{ account }}</b>
      </div>
      <div>
        Balance: <b>{{ balanceFormat }}</b>
      </div>
    </div>
  </div>
</template>
