import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { initialUnencryptedStorage } from "@/globals";
import store from "@/store/store";

export class Account {
  address: string | null;
  nonce: string | null;
  signature: string | null;
  constructor(
    address: string | null,
    nonce: string | null,
    signature: string | null
  ) {
    this.address = address;
    this.nonce = nonce;
    this.signature = signature;
  }
}

@Module({
  name: "account",
  stateFactory: true,
  dynamic: true,
  namespaced: true,
  store,
  preserveState: Boolean(initialUnencryptedStorage.user)
})
class AccountModule extends VuexModule {
  public account: Account = new Account(null, null, null);

  @Mutation
  public updateAccount(account: Account) {
    this.account = account;
  }

  @Action({ rawError: true })
  public login(params: { teamId: String; callback: Function }) {
    // eslint-disable-next-line no-console
    console.log(params);
  }
}

export default getModule(AccountModule);
