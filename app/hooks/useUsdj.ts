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
  format: (value: bigint) => number;
  decimals: number | undefined;
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

  function format(value: bigint) {
    return Number(value) / 10 ** Number(decimals);
  }

  function getUserBalance() {
    return format(balance || 0n);
  }

  return {
    allowance,
    decimals,
    getUserBalance,
    approve,
    format,
  };
}

export default useUsdjHook;
