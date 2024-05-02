const address = "TQk2MEp4FGvFN37zdjP5XQ8CqtuDidKb26" as const;

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdtContractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialStake",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_claimFunction",
        type: "string",
      },
      {
        internalType: "string",
        name: "_premiumFunction",
        type: "string",
      },
    ],
    name: "createNewPolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "policySchemes",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default { address, abi };
