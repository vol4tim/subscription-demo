import {
  web3Accounts,
  web3Enable,
  web3FromSource
} from "@polkadot/extension-dapp";
import { Keyring } from "@polkadot/ui-keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { useAccount } from "robonomics-interface-vue/account";
import { ref, toRaw, watch } from "vue";

export const keyring = new Keyring();
const accounts = ref([]);
const selected = ref("");

export function useAccounts() {
  (async () => {
    await cryptoWaitReady();
    await web3Enable("robonomics");
    accounts.value = await web3Accounts();
    keyring.loadAll({ isDevelopment: false }, accounts.value);
    keyring.setSS58Format(32);
    accounts.value = keyring.getPairs();
  })();

  const { setSender } = useAccount();

  const addFromUri = (suri, meta = {}, type = "sr25519") => {
    const pair = keyring.keyring.addFromUri(suri, meta, type);
    accounts.value = keyring.getPairs();
    return pair;
  };

  watch(selected, async selected => {
    const pair = accounts.value.find(item => item.address === selected);
    // if pair is from browser extension, then you need to set signer
    if (pair.meta.source) {
      const injected = await web3FromSource(pair.meta.source);
      setSender(toRaw(pair), { signer: injected.signer });
    } else {
      setSender(toRaw(pair));
    }
  });

  return {
    accounts,
    selected,
    addFromUri
  };
}
