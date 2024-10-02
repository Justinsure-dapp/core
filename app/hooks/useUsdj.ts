import { useAccount, useReadContract, useWriteContract } from "wagmi";
import contractDefinitions from "../contracts";
import { UINT256_MAX } from "../config";
import { zeroAddress } from "viem";

type UsdjHook = {
  allowance: bigint | undefined;
  approve: () => Promise<void>;
};

const useUsdjHook = () => {
  const { address: stakerAddress } = useAccount();
  const { data: hash, writeContractAsync } = useWriteContract();

  const { data: allowance } = useReadContract({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "allowance",
    args: [stakerAddress || zeroAddress, contractDefinitions.surityInterface.address],
  });
  
  async function approve() {
    const result = await writeContractAsync({
      ...contractDefinitions.usdj,
      functionName: "approve",
      args: [contractDefinitions.surityInterface.address, UINT256_MAX],
    });

    console.log(result);
  }

  return {
    allowance,
    approve,
  }
};

export default useUsdjHook;
