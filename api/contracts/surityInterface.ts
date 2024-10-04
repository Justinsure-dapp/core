import { getContract } from "viem";
import evmConfig from "../../evmConfig";
import evm from "../evm";

const surityInterface = getContract({
  client: evm.client,
  abi: evmConfig.surityInterface.abi,
  address: evmConfig.surityInterface.address,
});

export default surityInterface;
