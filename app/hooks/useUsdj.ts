import { useAccount, useContractRead, useContractWrite } from "wagmi";
import contractDefinitions from "../contracts";
import { UINT256_MAX } from "../config";

const useUsdj = (props: { amount: number }) => {
  const { address: stakerAddress } = useAccount();
  if (!stakerAddress) return null;

  const { data: allowance } = useContractRead({
    abi: contractDefinitions.usdj.abi,
    address: contractDefinitions.usdj.address,
    functionName: "allowance",
    args: [stakerAddress, contractDefinitions.surityInterface.address],
  });

  const { write, isSuccess, error } = useContractWrite({
    ...contractDefinitions.usdj,
    functionName: "approve",
    args: [contractDefinitions.surityInterface.address, UINT256_MAX],
  });

  let isAllowed = false;

  if (allowance && Number(allowance) >= props.amount) {
    isAllowed = true;
  }

  return {
    allowance,
    isAllowed,
    approve: write,
    isSuccess: isSuccess,
    error,
  };
};

export default useUsdj;
