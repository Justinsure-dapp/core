const address = "TRSUtVH1BMQTXv7N5LLyFeFu5njP62NPFh" as const;

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
        name: "_initialStake",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_digest",
        type: "bytes32",
      },
    ],
    name: "createNewPolicy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
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
