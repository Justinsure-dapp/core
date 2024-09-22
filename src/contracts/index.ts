import insurance from "./insuranceController";
import surity from "./surityInterface";
import usdt from "./usdj";

const contractDefinitions = { surity, usdt, insurance } as const;

export default contractDefinitions;
