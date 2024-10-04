import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import contractDefinitions from "../contracts";
import { UINT256_MAX } from "../config";
import { zeroAddress } from "viem";

type UsdjHook = {
  allowance: bigint | undefined;
  approve: () => Promise<boolean>;
  getUserBalance: () => number;
  decimals: number | undefined;
  multiplyWithDecimals: (value: number) => bigint;
  divideByDecimals: (value: bigint) => number;
};

function useUsdjHook(): UsdjHook {
  const { address: userAddress } = useAccount();
  const { data: txHash, writeContractAsync } = useWriteContract();

  const approvalReciept = useWaitForTransactionReceipt({
    confirmations: 2,
    hash: txHash,
  });

  const { data: decimals } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "decimals",
  });

  const { data: allowance } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "allowance",
    args: [
      userAddress || zeroAddress,
      contractDefinitions.surityInterface.address,
    ],
  });

  const { data: balance } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "balanceOf",
    args: [userAddress || zeroAddress],
  });

  async function approve() {
    await writeContractAsync({
      ...contractDefinitions.usdj,
      functionName: "approve",
      args: [contractDefinitions.surityInterface.address, UINT256_MAX],
    });

    return approvalReciept.isSuccess;
  }

  function getUserBalance() {
    if (!balance) return 0;
    return divideByDecimals(balance);
  }

  function multiplyWithDecimals(value: number) {
    if (!decimals) return 0n;
    return BigInt(value * 10 ** decimals);
  }

  function divideByDecimals(value: bigint) {
    if (!decimals) return 0;
    return Number(value) / 10 ** decimals;
  }

  return {
    allowance,
    decimals,
    getUserBalance,
    approve,
    multiplyWithDecimals,
    divideByDecimals,
  };
}

export default useUsdjHook;
