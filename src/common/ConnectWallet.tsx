import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { useEffect, useMemo, useState } from "react";

export default function ConnectWallet() {
  const [account, setAccount] = useState("");
  const [netwok, setNetwork] = useState<any>({});
  const [signedMessage, setSignedMessage] = useState("");

  const adapter = useMemo(() => new TronLinkAdapter(), []);

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
