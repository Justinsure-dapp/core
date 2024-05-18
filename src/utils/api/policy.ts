import { Address } from "abitype";
import { client } from ".";
import { Policy } from "../../types";

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

  async getByAddress(address: string) {
    const response = await client.get<{ policy: Policy }>(
      `/policy/get/${address}`
    );

    const data = response.data;
    return data.policy;
  },

  async fetchAllPolicies() {
    const response = await client.get<{ policies: Policy[] }>(
      `/policy/fetch-all`
    );

    const data = response.data;
    return data.policies;
  },
};

export default user;
