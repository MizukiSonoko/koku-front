<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        koku
      </h1>
      <div class="links">
        <p>I am {{ state.account.address }}!</p>
        <p>I have {{ state.account.balance }} eth!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  SetupContext
} from "@vue/composition-api";
import accountModule, { Account } from "@/store/modules/account"
import * as zksync from "zksync";
import * as ethers from "ethers";

export default defineComponent({
  components: {},
  setup(_: any, _2: SetupContext) {
    const state = reactive({
      account: new Account(null, null)
    });
    onMounted(async () => {
      state.account = accountModule.account
      console.log(accountModule.web3);
      const syncProvider = await zksync.getDefaultProvider("rinkeby");
      const ethersProvider = ethers.getDefaultProvider("rinkeby");
      console.log("syncProvider", syncProvider)
      console.log("ethersProvider", ethersProvider)
      syncProvider
      const contractAddresses = await syncProvider.getTokens();
      console.log("contractAddresses", contractAddresses)
      const tokens =  await syncProvider.getTokens();
      console.log("tokens", tokens)
      console.log(state.account.address)
      if(state.account.address != null) {
        const account = await syncProvider.getState(state.account.address)
        console.log("account", account)
       
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log("signer", signer)
      }
    });
    
    return {
      state
    };
  }
});
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
