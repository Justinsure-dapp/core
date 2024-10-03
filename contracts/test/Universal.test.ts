import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { describe } from "mocha";
import { maxInt256 } from "viem";

describe("Universal", function () {
  async function deployFixture() {
    const [owner, acc1, acc2] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const usdj = await hre.viem.deployContract("USDJ");
    const usdjDecimals = BigInt(Math.pow(10, await usdj.read.decimals()));

    usdj.write.transfer([acc1.account.address, 100_000n * usdjDecimals]);
    usdj.write.transfer([acc2.account.address, 100_000n * usdjDecimals]);

    const periphery = await hre.viem.deployContract("SurityInterface", [
      usdj.address,
    ]);

    usdj.write.approve([periphery.address, maxInt256], {
      account: acc1.account,
    });

    await periphery.write.setMinimumInitialStake([10n * usdjDecimals]);
    await periphery.write.updateStakingRewardRate([100_000_000n]);

    await periphery.write.createInsurancePolicy([
      acc1.account.address,
      "",
      "test policy",
      "TEST",
      2000000n,
      20000000n,
      200000000n,
      20000000000n,
    ]);

    const logs = await publicClient.getContractEvents({
      abi: periphery.abi,
      address: periphery.address,
      eventName: "policyCreated",
    });

    if (!logs[0].args.controller) throw "Deploy hi nahi ho paya controller";

    const controller = await hre.viem.getContractAt(
      "InsuranceController",
      logs[0].args.controller
    );

    const surecoin = await hre.viem.getContractAt(
      "SureCoin",
      await periphery.read.surecoin()
    );

    return {
      owner,
      acc1,
      acc2,
      publicClient,
      usdj,
      usdjDecimals,
      periphery,
      controller,
      surecoin,
    };
  }

  describe("SurityInterface", () => {
    it("can create new policy", async function () {
      const { controller } = await loadFixture(deployFixture);
      expect(controller.address).to.contain("0x");
    });
  });

  describe("InsuranceController", () => {
    it("is initially paused", async () => {
      const { controller } = await loadFixture(deployFixture);
      const paused = await controller.read.paused();
      expect(paused).to.equal(true);
    });

    it("unpauses when initial stake is received", async () => {
      const { controller, acc1 } = await loadFixture(deployFixture);
      await controller.write.stakeToPolicy([100_000_000n], {
        account: acc1.account,
      });

      const paused = await controller.read.paused();
      expect(paused).to.equal(false);
    });

    it("only allows creator to initiate initial stake", async () => {
      const { controller, acc2 } = await loadFixture(deployFixture);
      const result = controller.write.stakeToPolicy([100_000_000n], {
        account: acc2.account,
      });

      expect(result).to.be.rejected;
    });

    it("registers the initial stake", async () => {
      const { controller, acc1 } = await loadFixture(deployFixture);
      const stakedAmount = 100_000_000n;

      await controller.write.stakeToPolicy([stakedAmount], {
        account: acc1.account,
      });

      const totalStake = await controller.read.totalStake();
      expect(totalStake).to.equal(stakedAmount);

      const acc1Share = await controller.read.stakedAmountOfAddress([
        acc1.account.address,
      ]);
      expect(acc1Share).to.equal(stakedAmount);
    });
  });

  describe("SureCoin", () => {
    it("registers any stake", async () => {
      const { controller, acc1, surecoin } = await loadFixture(deployFixture);
      const stakedAmount = 100_000_000n;

      await controller.write.stakeToPolicy([stakedAmount], {
        account: acc1.account,
      });

      const totalStake = await surecoin.read.totalStake();
      expect(totalStake).to.equal(stakedAmount);
    });

    it("registers earnings for stakers", async () => {
      const { controller, acc1, surecoin } = await loadFixture(deployFixture);
      const stakedAmount = 100_000_000n;

      await controller.write.stakeToPolicy([stakedAmount], {
        account: acc1.account,
      });

      const earned = await surecoin.read.earned([acc1.account.address]);
      expect(earned > 0n).to.be.true;
    });
  });
});
