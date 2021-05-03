import Web3 from "web3";

declare global {
  interface Window {
      $web3: Web3;
      ethereum: any;
  }
}

export default ({ ctx }: any) => {
  let instance: Web3;
  console.log("ctx", ctx);
  try {
    instance = new Web3(window.$web3.currentProvider);
  } catch (e) {
    try {
      instance = new Web3(Web3.givenProvider);
    } catch (e) {
      console.log("Not supported!");
      return;
    }
  }
  window.$web3 = instance;
  window.$web3.eth.getAccounts().then((accounts: string[]) => {
    if (accounts.length && accounts[0]) {
      console.log("utils", window.$web3.eth);
      window.$web3.eth.getBalance(accounts[0]).then((balance: string) => {
        const data = {
          account: accounts[0],
          balance: Number(window.$web3.utils.fromWei(balance))
            .toFixed(5)
            .toLocaleString()
        };
        console.log(data);
      });
    } else if (window.ethereum) {
      console.log("utils", window.$web3.eth);
      // privacy mode on
      window.ethereum.enable().then((accounts: string[]) => {
        window.$web3.eth.getBalance(accounts[0]).then((balance: string) => {
          const data = {
            account: accounts[0],
            balance: Number(window.$web3.utils.fromWei(balance))
              .toFixed(3)
              .toLocaleString()
          };
          console.log(data);
        });
      });
    }
  });
}
