import React, { useState } from "react";

export default function TestnetBTT() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleRequest = async () => {
    if (!address) {
      setResponseMessage("Please enter a valid address.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        `https://testfaucetapi.bt.io/transferbttc?address=${address}&token=btt`,
        {
          method: "GET",
        },
      );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setResponseMessage("Success! You've received 10M BTTC.");
      } else {
        setResponseMessage("Failed to request BTTC. Please try again later.");
      }
    } catch (error) {
      setResponseMessage("Error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-foreground p-8 rounded-[2rem] flex flex-col items-center gap-y-2">
        <h3>Enter your wallet address</h3>
        <p className="text-sm text-slate-400">
          You can claim 10 Million BTTC every 24 hours
        </p>

        <div className="my-4 relative">
          <input
            type="text"
            name="address"
            placeholder="0x..."
            id="address"
            className="py-1 px-3 rounded-lg bg-front/20 w-[42.8ch] text-front"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="bg-front/60 px-5 py-2 text-black rounded-md hover:scale-[102%] hover:bg-front hover:-translate-y-1 hover:shadow-lg active:translate-y-1 
          active:scale-75 duration-300 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleRequest}
          disabled={loading}
        >
          {loading ? (
            <figure className="w-5 h-5 animate-spin border-2 border-dashed border-white rounded-full" />
          ) : (
            "Request"
          )}
        </button>

        {responseMessage && (
          <p className="mt-4 text-sm text-white">{responseMessage}</p>
        )}
      </div>
    </div>
  );
}
