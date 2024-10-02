import { useAccount, useReadContract, useWriteContract } from "wagmi";
import contractDefinitions from "../contracts";
import { UINT256_MAX } from "../config";
import { zeroAddress } from "viem";

type UsdjHook = {
  allowance: bigint | undefined;
  approve: () => Promise<void>;
};

const useUsdjHook = () => {
  const { address: userAddress } = useAccount();
  const { data, writeContractAsync, isSuccess } = useWriteContract();

  const { data: decimals } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "decimals",
  });

  const { data: allowance } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "allowance",
    args: [userAddress || zeroAddress, contractDefinitions.surityInterface.address],
  });

  const { data: balance } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "balanceOf",
    args: [userAddress || zeroAddress],
  });
  
  async function approve() {
    const txhash = await writeContractAsync({
      ...contractDefinitions.usdj,
      functionName: "approve",
      args: [contractDefinitions.surityInterface.address, UINT256_MAX],
    });

    if(txhash) return isSuccess;
  }

  function format( value: bigint | undefined ) {
    if (!value || !decimals) return undefined;
    return Number(value) / 10 ** Number(decimals);
  }

  function getUserBalance() {
    return format(balance);
  }

  return {
    allowance,
    getUserBalance,
    approve,
    format,
  }
};

export default useUsdjHook;
