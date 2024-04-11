import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { useEffect, useMemo, useState } from "react";

enum WalletReadyState {
  Loading = "Loading",
  NotFound = "NotFound",
  Found = "Found",
}
enum AdapterState {
  Loading = "Loading",
  NotFound = "NotFound",
  Disconnect = "Disconnected",
  Connected = "Connected",
}
export default function ConnectWallet() {
  const [readyState, setReadyState] = useState<WalletReadyState | AdapterState>(
    WalletReadyState.NotFound
  );
  const [account, setAccount] = useState("");
  const [netwok, setNetwork] = useState<any>({});
  const [signedMessage, setSignedMessage] = useState("");

  const adapter = useMemo(() => new TronLinkAdapter(), []);

  useEffect(() => {
    setReadyState(adapter.state);
    setAccount(adapter.address!);

    adapter.on("connect", () => {
      setAccount(adapter.address!);
    });

    adapter.on("readyStateChanged", (state) => {
      setReadyState(state);
    });

    adapter.on("accountsChanged", (data) => {
      setAccount(data);
    });

    adapter.on("chainChanged", (data) => {
      setNetwork(data);
    });

    adapter.on("disconnect", () => {
      // when disconnect from wallet
    });
    return () => {
      // remove all listeners when components is destroyed
      adapter.removeAllListeners();
    };
  }, []);

  async function sign() {
    const res = await adapter!.signMessage("helloworld");
    setSignedMessage(res);
  }

  return (
    <div className="App">
      <div>readyState: {readyState}</div>
      <div>current address: {account}</div>
      <div>current network: {JSON.stringify(netwok)}</div>
      <button disabled={adapter.connected} onClick={() => adapter.connect()}>
        Connect to TronLink
      </button>
      <button onClick={sign}>sign message</button>
      <br />
      SignedMessage: {signedMessage}
    </div>
  );
}
