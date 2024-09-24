import surity from "./surityInterface";
import usdj from "./usdj";
import sureCoin from "./sureCoin";
import stakeToken from "./stakeToken";
import vault from "./vault";
import surityInterface from "./surityInterface";
import insuranceController from "./insuranceController";


const contractDefinitions = {
    surity,
    usdj,
    sureCoin,
    stakeToken,
    vault,
    surityInterface,
    insuranceController,
} as const;

export default contractDefinitions;
