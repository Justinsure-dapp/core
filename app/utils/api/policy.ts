import { Address } from "abitype";
import { client } from ".";
import { Policy } from "../../types";
import { Args } from "../../pages/NewPolicyPage/components/ArgsTypeDefine";

type PolicyOptions = {
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
};

const policy = {
  async createNewPolicy(options: any) {
    const response = await client.post("/policy/new", options);

    const data = response.data;
    return data;
  },

  async requestNonce(address: string) {
    const response = await client.post<{ nonce: string }>(
      "/policy/request-nonce",
      {
        address,
      },
    );

    const data = response.data;
    return data.nonce;
  },

  async getByAddress(address: string) {
    const response = await client.get<{ policy: Policy }>(
      `/policy/get/${address}`,
    );

    const data = response.data;
    return data.policy;
  },

  async registerStake(address: string, amount: number) {
    const response = await client.post("policy/stake/register", {
      address,
      amount,
    });

    return response.data;
  },

  async fetchAllPolicies() {
    const response = await client.get<{ policies: Policy[] }>(
      `/policy/fetch/all`,
    );

    const data = response.data;
    return data.policies;
  },

  async fetchAllPoliciesByCreator(address: string) {
    const response = await client.get<{ policies: Policy[] }>(
      `/policy/fetch/${address}`,
    );

    const data = response.data;
    return data.policies;
  },

  async updateStakers(address: string, staker: string) {
    const response = await client.post(`policy/update/stakers/${address}`, {
      staker,
    });

    return response.data;
  },

  async calculatePremium(address: string, args: {
    arg: string;
    value: string;
  }[]) {
    const response = await client.get(`policy/premium/${address}`, {
      params: {
        args: JSON.stringify(args),
      },
    });

    return response.data;
  },

  async getExecutedKey(key: string) {
    const response = await client.get(`/functions/result/${key}`);
    return response.data;
  },

  async buyPolicy(address: string, user: string, data: any, sign: string, premium: number) {
    const response = await client.post(`policy/buy/${address}`, {
      user,
      data,
      sign,
      premium
    });

    return response.data;
  }
  
};

export default policy;
