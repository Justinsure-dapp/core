import { client } from ".";
import { Marketer, User } from "../../types";

const marketer = {
  async get(address: string) {
    const response = await client.get<{ marketer: Marketer }>(
      `/marketer/get/${address}`
    );
    const data = response.data;
    return data;
  },
};

export default marketer;
