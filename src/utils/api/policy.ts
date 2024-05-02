import { Address } from "abitype";
import { client } from ".";

const user = {
  async createNewPolicy(options: {
    insuranceContractAddress: Address;
    name: string;
    description: string;
    category: string;
    minimumClaim: number;
    maximumClaim: number;
    minimumDuration: number;
    maximumDuration: number;
    claimFunction: string;
    claimFuncDescription: string;
    claimFunctionArguments: Array<{
      name: string;
      description: string;
      htmlType: string;
    }>;
    premiumFunction: string;
    premiumFuncDescription: string;
    premiumFunctionArguments: Array<{
      name: string;
      description: string;
      htmlType: string;
    }>;
    tags: string[];
    intialStake: number;
  }) {
    const response = await client.post<{ verified: boolean }>(
      "/policy/new",
      options
    );

    const data = response.data;
    return data;
  },
};

export default user;
