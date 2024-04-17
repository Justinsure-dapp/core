import { client } from ".";
import { User } from "../../types";

const user = {
  async check(address: string) {
    const response = await client.get<{ exists: boolean }>(
      `/user/check/${address}`
    );

    const data = response.data;
    return data;
  },

  async requestNonce(address: string) {
    const response = await client.post<{ nonce: string }>(
      "/user/request-nonce",
      {
        address,
      }
    );

    const data = response.data;
    return data.nonce;
  },

  async verify(address: string, signedNonce: string) {
    const response = await client.post<{ verified: boolean }>("/user/verify", {
      address,
      signedNonce,
    });

    const data = response.data;
    return data.verified ? true : false;
  },

  async get(address: string) {
    const response = await client.get<{ user: User }>(`/user/get/${address}`);

    const data = response.data;
    return data;
  },
};

export default user;
